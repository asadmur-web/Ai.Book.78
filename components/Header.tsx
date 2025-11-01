
import React from 'react';
import { Tool } from '../types';
import { BrainIcon, BookIcon } from './icons/Icons';

interface HeaderProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTool, setActiveTool }) => {
  const tools: Tool[] = [Tool.ExamMaker, Tool.LessonExplainer, Tool.ProjectBuilder];

  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BookIcon className="h-8 w-8 text-blue-400" />
            <BrainIcon className="h-5 w-5 text-purple-400 absolute -top-1 -right-2 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AI Book
          </h1>
        </div>
        <nav className="hidden md:flex items-center bg-gray-800/50 rounded-full p-1 border border-white/10">
          {tools.map((tool) => (
            <button
              key={tool}
              onClick={() => setActiveTool(tool)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                activeTool === tool
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                  : 'bg-transparent text-gray-300 hover:text-white'
              }`}
            >
              {tool}
            </button>
          ))}
        </nav>
        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
};
