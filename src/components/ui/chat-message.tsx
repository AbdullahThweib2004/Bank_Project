import React from 'react';
import { Bot, User, BookOpen, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Language } from '../../App';

interface ChatMessageProps {
  type: 'user' | 'assistant';
  content: string;
  sources?: string[];
  confidence?: number;
  feedback?: 'up' | 'down' | null;
  onFeedback?: (feedback: 'up' | 'down') => void;
  showFeedbackForm?: boolean;
  feedbackComment?: string;
  onFeedbackCommentChange?: (comment: string) => void;
  onSubmitFeedback?: () => void;
  language: Language;
  t: {
    confidence: string;
    sources: string;
    feedback: string;
    feedbackComment: string;
    submitFeedback: string;
  };
}

export function ChatMessage({
  type,
  content,
  sources,
  confidence,
  feedback,
  onFeedback,
  showFeedbackForm,
  feedbackComment,
  onFeedbackCommentChange,
  onSubmitFeedback,
  language,
  t,
}: ChatMessageProps) {
  const isUser = type === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-gray-200' : 'bg-pink-100'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-gray-700" />
        ) : (
          <Bot className="w-5 h-5 text-pink-600" />
        )}
      </div>

      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block max-w-[80%] p-4 rounded-2xl ${
          isUser 
            ? 'bg-pink-600 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}>
          <div className="whitespace-pre-wrap">{content}</div>
        </div>

        {!isUser && (
          <div className="mt-3 space-y-3">
            {confidence && (
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  {t.confidence}: <span className="font-medium text-gray-900">{confidence}%</span>
                </div>
              </div>
            )}

            {sources && sources.length > 0 && (
              <div className="text-sm">
                <div className="text-gray-600 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {t.sources}:
                </div>
                <ul className="space-y-1">
                  {sources.map((source, index) => (
                    <li key={index} className="text-pink-600 hover:underline cursor-pointer">
                      • {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{t.feedback}</span>
              <button
                onClick={() => onFeedback?.('up')}
                className={`p-2 rounded-lg transition-colors ${
                  feedback === 'up' 
                    ? 'bg-green-100 text-green-600' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onFeedback?.('down')}
                className={`p-2 rounded-lg transition-colors ${
                  feedback === 'down' 
                    ? 'bg-red-100 text-red-600' 
                    : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>

            {showFeedbackForm && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <label className="block text-sm text-gray-700 mb-2">{t.feedbackComment}</label>
                <textarea
                  value={feedbackComment || ''}
                  onChange={(e) => onFeedbackCommentChange?.(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={onSubmitFeedback}
                  className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {t.submitFeedback}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}




