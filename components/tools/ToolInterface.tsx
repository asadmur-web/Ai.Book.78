import React, { useState } from 'react';

interface ToolInterfaceProps {
  title: string;
  description: string;
  sidebarControls: React.ReactNode;
  mainContent: React.ReactNode;
  onGenerate: () => void;
  isLoading: boolean;
  Icon: React.ElementType;
}

export const ToolInterface: React.FC<ToolInterfaceProps> = ({ title, description, sidebarControls, mainContent, onGenerate, isLoading, Icon }) => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 bg-black/20 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 md:p-6 overflow-hidden">
      {/* Sidebar for controls */}
      <aside className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 flex flex-col gap-6 p-4 bg-gray-900/40 rounded-lg border border-white/10 overflow-y-auto">
        <div className="flex items-center gap-3">
          <Icon className="h-8 w-8 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <div className="space-y-4">{sidebarControls}</div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="mt-auto w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {isLoading ? '...جاري الإنشاء' : 'أنشئ بواسطة الذكاء الاصطناعي'}
        </button>
      </aside>

      {/* Main content area for results */}
      <section className="w-full md:w-2/3 lg:w-3/4 flex-grow flex flex-col bg-gray-900/20 rounded-lg p-4 border border-white/10">
        {mainContent}
      </section>
    </div>
  );
};