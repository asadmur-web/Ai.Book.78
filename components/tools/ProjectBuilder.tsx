// Fix: Provide full content for ProjectBuilder.tsx
import React, { useState } from 'react';
import { ToolInterface } from './ToolInterface';
import { CodeIcon } from '../icons/Icons';
import { geminiService } from '../../services/geminiService';

export const ProjectBuilder: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projectPlan, setProjectPlan] = useState('');

  const handleGenerate = async () => {
    if (!idea) {
      alert('يرجى تقديم فكرة المشروع.');
      return;
    }
    setIsLoading(true);
    setProjectPlan('');

    const prompt = `بناءً على فكرة المشروع التالية، قم بإنشاء خطة مشروع مفصلة. يجب أن تتضمن الخطة:
1.  **ملخص المشروع:** وصف موجز للمشروع وأهدافه.
2.  **الميزات الرئيسية:** قائمة بالميزات الأساسية للمشروع.
3.  **التقنيات المقترحة:** قائمة بالتقنيات (لغات البرمجة، الأطر، قواعد البيانات) التي يمكن استخدامها.
4.  **خطوات التنفيذ:** خطة عمل مقسمة إلى مراحل مع مهام محددة لكل مرحلة.
5.  **تحديات محتملة:** ذكر بعض التحديات التي قد تواجه المشروع وكيفية التغلب عليها.

فكرة المشروع: "${idea}"`;
    
    try {
      const result = await geminiService.generateContent(prompt);
      setProjectPlan(result);
    } catch (error) {
      console.error("Failed to generate project plan:", error);
      setProjectPlan("حدث خطأ أثناء إنشاء خطة المشروع.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const sidebarControls = (
    <>
      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-gray-300 mb-1">فكرة المشروع</label>
        <textarea
          id="idea"
          rows={5}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="صف فكرة مشروعك هنا، على سبيل المثال: 'تطبيق جوال لتتبع عادات القراءة'."
          className="w-full bg-gray-800/60 border border-white/20 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
    </>
  );

  const mainContent = (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-white">خطة المشروع المقترحة</h3>
      {isLoading && <div className="text-center p-8">جاري بناء الخطة...</div>}
      {!isLoading && !projectPlan && (
        <div className="flex-grow flex items-center justify-center text-center text-gray-500">
          <p>ستظهر خطة المشروع هنا.<br/>أدخل فكرتك على اليسار وانقر على "أنشئ بواسطة الذكاء الاصطناعي".</p>
        </div>
      )}
      {projectPlan && (
        <div className="whitespace-pre-wrap overflow-y-auto p-4 bg-gray-800/50 rounded-md border border-white/10">
          {projectPlan}
        </div>
      )}
    </div>
  );

  return (
    <ToolInterface
      title="باني المشاريع"
      description="حوّل أفكارك إلى خطط مشاريع قابلة للتنفيذ مع خطوات وتقنيات مقترحة."
      sidebarControls={sidebarControls}
      mainContent={mainContent}
      onGenerate={handleGenerate}
      isLoading={isLoading}
      Icon={CodeIcon}
    />
  );
};
