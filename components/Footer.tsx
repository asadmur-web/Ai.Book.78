import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon } from './icons/Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} AI Book. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><GithubIcon className="h-5 w-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-5 w-5" /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
};