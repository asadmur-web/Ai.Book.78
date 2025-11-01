// Fix: Provide full content for LessonExplainer.tsx
import React, { useState } from 'react';
import { ToolInterface } from './ToolInterface';
import { LightbulbIcon, UploadIcon, TrashIcon } from '../icons/Icons';
import { geminiService } from '../../services/geminiService';

export const LessonExplainer: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!topic && !file) {
      alert('يرجى تقديم موضوع أو تحميل ملف.');
      return;
    }
    setIsLoading(true);
    setExplanation('');

    const prompt = `اشرح الموضوع التالي بطريقة بسيطة وواضحة، كأنك تشرحه لطالب. استخدم التعداد النقطي والعناوين لتنظيم الشرح. الموضوع: "${topic}"`;
    
    try {
      const result = await geminiService.generateContent(prompt, file || undefined);
      setExplanation(result);
    } catch (error) {
      console.error("Failed to generate explanation:", error);
      setExplanation("حدث خطأ أثناء إنشاء الشرح.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const sidebarControls = (
    <>
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">الموضوع أو الدرس</label>
        <textarea
          id="topic"
          rows={5}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="أدخل مفهومًا معقدًا أو الصق نص الدرس هنا..."
          className="w-full bg-gray-800/60 border border-white/20 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      <div>
         <label className="block text-sm font-medium text-gray-300 mb-1">أو قم بتحميل ملف</label>
         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
           <div className="space-y-1 text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
             <div className="flex text-sm text-gray-400">
               <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-purple-500">
                 <span>اختر ملفًا</span>
                 <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.txt" />
               </label>
               <p className="pl-1">أو اسحبه وأفلته</p>
             </div>
             <p className="text-xs text-gray-500">صور أو ملفات نصية فقط</p>
             {file && (
                <div className="text-sm text-green-400 flex items-center justify-center gap-2 pt-2">
                    <span>{file.name}</span>
                    <button onClick={() => setFile(null)} className="text-red-400 hover:text-red-300"><TrashIcon className="h-4 w-4" /></button>
                </div>
             )}
           </div>
         </div>
       </div>
    </>
  );

  const mainContent = (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-white">الشرح المبسط</h3>
      {isLoading && <div className="text-center p-8">جاري إنشاء الشرح...</div>}
      {!isLoading && !explanation && (
        <div className="flex-grow flex items-center justify-center text-center text-gray-500">
          <p>سيظهر شرح الدرس هنا.<br/>أدخل موضوعًا على اليسار وانقر على "أنشئ بواسطة الذكاء الاصطناعي".</p>
        </div>
      )}
      {explanation && (
        <div className="whitespace-pre-wrap overflow-y-auto p-4 bg-gray-800/50 rounded-md border border-white/10">
          {explanation}
        </div>
      )}
    </div>
  );

  return (
    <ToolInterface
      title="شرح الدروس"
      description="احصل على شروحات بسيطة وواضحة للمفاهيم والمواضيع المعقدة."
      sidebarControls={sidebarControls}
      mainContent={mainContent}
      onGenerate={handleGenerate}
      isLoading={isLoading}
      Icon={LightbulbIcon}
    />
  );
};
