import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Language } from '../../App';
import { ChatMessage } from '../ui/chat-message';
import { ChatEmptyState } from '../ui/chat-empty-state';
import { endpoints, ChatResponse } from '../../config/api';

interface AIAssistantProps {
  language: Language;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  confidence?: number;
  feedback?: 'up' | 'down' | null;
}

const translations = {
  en: {
    title: 'Internal AI Assistant',
    subtitle: 'Ask questions about policies, procedures, and banking regulations',
    placeholder: 'Type your question...',
    send: 'Send',
    confidence: 'Confidence',
    sources: 'Sources',
    feedback: 'Was this helpful?',
    feedbackComment: 'Tell us more (optional)',
    submitFeedback: 'Submit Feedback',
    emptyTitle: 'How can I help you today?',
    emptyDesc: 'Ask me anything about banking policies, procedures, loan processes, or regulations.',
    suggestions: 'Suggested Questions',
    suggestion1: 'What is the loan approval process?',
    suggestion2: 'What are the credit scoring criteria?',
    suggestion3: 'How do I handle a high-risk assessment?',
    suggestion4: 'What documents are required for business loans?',
  },
  ar: {
    title: 'المساعد الذكي الداخلي',
    subtitle: 'اسأل عن السياسات والإجراءات واللوائح المصرفية',
    placeholder: 'اكتب سؤالك...',
    send: 'إرسال',
    confidence: 'الثقة',
    sources: 'المصادر',
    feedback: 'هل كان هذا مفيداً؟',
    feedbackComment: 'أخبرنا المزيد (اختياري)',
    submitFeedback: 'إرسال التقييم',
    emptyTitle: 'كيف يمكنني مساعدتك اليوم؟',
    emptyDesc: 'اسألني أي شيء عن السياسات المصرفية أو الإجراءات أو عمليات القروض أو اللوائح.',
    suggestions: 'أسئلة مقترحة',
    suggestion1: 'ما هي عملية الموافقة على القرض؟',
    suggestion2: 'ما هي معايير التسجيل الائتماني؟',
    suggestion3: 'كيف أتعامل مع تقييم مخاطر عالية؟',
    suggestion4: 'ما هي المستندات المطلوبة للقروض التجارية؟',
  }
};

// Mocks removed

export function AIAssistant({ language }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState<number | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(endpoints.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat response');
      }

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: data.answer,
        timestamp: new Date(),
        sources: data.citations,
        confidence: undefined, // API doesn't return confidence
        feedback: null,
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: language === 'en' ? 'Sorry, I encountered an error. Please try again.' : 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (messageId: number, feedback: 'up' | 'down') => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
    if (feedback === 'down') {
      setShowFeedback(messageId);
    } else {
      setShowFeedback(null);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <ChatEmptyState
              title={t.emptyTitle}
              description={t.emptyDesc}
              suggestions={[t.suggestion1, t.suggestion2, t.suggestion3, t.suggestion4]}
              onSuggestionClick={(suggestion) => {
                setInput(suggestion);
              }}
            />
          ) : (
            <>
              {messages.map((message) => (
                <div key={message.id}>
                  <ChatMessage
                    type={message.type}
                    content={message.content}
                    sources={message.sources}
                    confidence={message.confidence}
                    feedback={message.feedback}
                    onFeedback={(feedback) => handleFeedback(message.id, feedback)}
                    showFeedbackForm={showFeedback === message.id}
                    feedbackComment={feedbackComment}
                    onFeedbackCommentChange={setFeedbackComment}
                    onSubmitFeedback={() => {
                      setShowFeedback(null);
                      setFeedbackComment('');
                    }}
                    language={language}
                    t={{
                      confidence: t.confidence,
                      sources: t.sources,
                      feedback: t.feedback,
                      feedbackComment: t.feedbackComment,
                      submitFeedback: t.submitFeedback,
                    }}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">{t.send}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




