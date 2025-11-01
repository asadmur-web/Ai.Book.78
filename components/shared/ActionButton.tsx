
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, text }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-700/50 border border-white/20 rounded-lg hover:bg-gray-600/50 transition-all duration-200"
  >
    {icon}
    {text}
  </button>
);
