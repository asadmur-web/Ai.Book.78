// Fix: Provide full content for ExamMaker.tsx
import React, { useState } from 'react';
import { ToolInterface } from './ToolInterface';
import { PencilIcon, UploadIcon, TrashIcon } from '../icons/Icons';
import { geminiService } from '../../services/geminiService';
import { Difficulty, ExamType, ExamQuestion } from '../../types';

export const ExamMaker: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [examType, setExamType] = useState<ExamType>(ExamType.Mixed);
  const [numQuestions, setNumQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);

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
    setQuestions([]);
    
    let prompt = `أنشئ اختبارًا من ${numQuestions} سؤالًا حول الموضوع التالي: "${topic}".`;
    prompt += `\nمستوى الصعوبة يجب أن يكون: ${difficulty}.`;
    prompt += `\nنوع الأسئلة: ${examType}.`;
    if (examType === ExamType.Mixed) {
      prompt += `\nقم بتضمين مزيج من أنواع الأسئلة (اختيار من متعدد، املأ الفراغ، صح/خطأ).`
    }
    
    try {
      const responseJson = await geminiService.generateJsonExam(prompt, file || undefined, difficulty, examType);
      const parsedQuestions = JSON.parse(responseJson);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Failed to parse exam questions:", error);
      alert("فشل في تحليل أسئلة الاختبار. قد يكون هناك خطأ في الاستجابة من الـ API.");
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const sidebarControls = (
    <>
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">الموضوع</label>
        <textarea
          id="topic"
          rows={3}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="أدخل موضوعًا مثل 'تاريخ الفن الحديث' أو الصق النص هنا..."
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
      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-300 mb-1">مستوى الصعوبة</label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)} className="w-full bg-gray-800/60 border border-white/20 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500">
          {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="examType" className="block text-sm font-medium text-gray-300 mb-1">نوع الاختبار</label>
        <select id="examType" value={examType} onChange={(e) => setExamType(e.target.value as ExamType)} className="w-full bg-gray-800/60 border border-white/20 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500">
          {Object.values(ExamType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-300 mb-1">عدد الأسئلة: {numQuestions}</label>
        <input type="range" id="numQuestions" min="1" max="20" value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
      </div>
    </>
  );

  const mainContent = (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-white">أسئلة الاختبار التي تم إنشاؤها</h3>
      {isLoading && <div className="text-center p-8">جاري إنشاء الاختبار...</div>}
      {!isLoading && questions.length === 0 && (
        <div className="flex-grow flex items-center justify-center text-center text-gray-500">
          <p>سيتم عرض أسئلة الاختبار هنا.<br/>اضبط الإعدادات على اليسار وانقر على "أنشئ بواسطة الذكاء الاصطناعي".</p>
        </div>
      )}
      {questions.length > 0 && (
        <div className="overflow-y-auto space-y-4 pr-2">
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              {q.type === 'multiple-choice' && q.options && (
                <ul className="space-y-1 list-inside list-disc pl-2">
                  {q.options.map((opt, i) => <li key={i}>{opt}</li>)}
                </ul>
              )}
              <p className="text-sm text-green-400 mt-2">
                <span className="font-bold">الإجابة:</span> {q.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <ToolInterface
      title="صانع الاختبارات"
      description="قم بإنشاء اختبارات حول أي موضوع أو من أي نص أو مستند."
      sidebarControls={sidebarControls}
      mainContent={mainContent}
      onGenerate={handleGenerate}
      isLoading={isLoading}
      Icon={PencilIcon}
    />
  );
};
