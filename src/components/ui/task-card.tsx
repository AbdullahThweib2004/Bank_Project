import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TaskCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function TaskCard({ icon: Icon, title, description, buttonText, onButtonClick }: TaskCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group">
      <div className="p-8">
        <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:scale-110 transition-all">
          <Icon className="w-8 h-8 text-pink-600 group-hover:text-white transition-colors" />
        </div>
        <h2 className="text-xl mb-3">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <button 
          onClick={onButtonClick}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}




