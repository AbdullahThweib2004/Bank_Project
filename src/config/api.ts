export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const endpoints = {
    creditAssessment: `${API_BASE_URL}/api/credit-assessment`,
    chat: `${API_BASE_URL}/api/chat`,
};

export interface CreditAssessmentResponse {
    score: number;
    category: 'Low' | 'Medium' | 'High';
    insights: string[];
}

export interface ChatResponse {
    answer: string;
    citations?: string[];
}
