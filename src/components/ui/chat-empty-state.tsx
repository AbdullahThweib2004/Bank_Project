import React from 'react';
import { Bot } from 'lucide-react';

interface ChatEmptyStateProps {
  title: string;
  description: string;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export function ChatEmptyState({ title, description, suggestions, onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-6">
        <Bot className="w-10 h-10 text-pink-600" />
      </div>
      <h2 className="text-xl text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-600 mb-8 max-w-md">{description}</p>
      
      <div className="w-full max-w-2xl">
        <div className="text-sm text-gray-700 mb-3">Suggested Questions</div>
        <div className="grid gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-pink-600 hover:bg-pink-50 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}




