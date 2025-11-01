
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExamMaker } from './components/tools/ExamMaker';
import { LessonExplainer } from './components/tools/LessonExplainer';
import { ProjectBuilder } from './components/tools/ProjectBuilder';
import { Tool } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.ExamMaker);

  const ActiveToolComponent = useMemo(() => {
    switch (activeTool) {
      case Tool.ExamMaker:
        return <ExamMaker />;
      case Tool.LessonExplainer:
        return <LessonExplainer />;
      case Tool.ProjectBuilder:
        return <ProjectBuilder />;
      default:
        return <ExamMaker />;
    }
  }, [activeTool]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-purple-900/80 to-blue-900/90 text-white font-sans flex flex-col animated-gradient">
      <Header activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-grow container mx-auto px-4 py-8 flex">
        {ActiveToolComponent}
      </main>
      <Footer />
    </div>
  );
};

export default App;
