import React, { useState } from 'react';
import { Search, Loader2, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { Language } from '../../App';
import { StatCard } from '../ui/stat-card';
import { RiskBadge, getScoreColor } from '../ui/risk-badge';
import { FactorCard } from '../ui/factor-card';
import { endpoints, CreditAssessmentResponse } from '../../config/api';

interface CreditAssessmentProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const translations = {
  en: {
    title: 'Credit Assessment',
    subtitle: 'Enter customer account number to start credit scoring',
    accountLabel: 'Customer Account Number',
    accountPlaceholder: 'e.g., ACC-2024-1234',
    startButton: 'Start Assessment',
    loading: 'Processing credit assessment...',
    resultsTitle: 'Assessment Results',
    customerInfo: 'Customer Information',
    riskScore: 'Risk Score',
    riskCategory: 'Risk Category',
    confidence: 'Model Confidence',
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
    keyFactors: 'Key Risk Factors',
    positiveFactors: 'Positive Factors',
    negativeFactors: 'Risk Factors',
    recommendations: 'Recommendations',
    accountAge: 'Account age',
    creditHistory: 'Credit history',
    incomeLevel: 'Income level',
    debtRatio: 'Debt-to-income ratio',
    paymentHistory: 'Payment history',
    submit: 'Submit for Review',
    newAssessment: 'New Assessment',
  },
  ar: {
    title: 'تقييم الائتمان',
    subtitle: 'أدخل رقم حساب العميل لبدء التسجيل الائتماني',
    accountLabel: 'رقم حساب العميل',
    accountPlaceholder: 'مثال: ACC-2024-1234',
    startButton: 'بدء التقييم',
    loading: 'جاري معالجة تقييم الائتمان...',
    resultsTitle: 'نتائج التقييم',
    customerInfo: 'معلومات العميل',
    riskScore: 'درجة المخاطر',
    riskCategory: 'فئة المخاطر',
    confidence: 'ثقة النموذج',
    low: 'مخاطر منخفضة',
    medium: 'مخاطر متوسطة',
    high: 'مخاطر عالية',
    keyFactors: 'عوامل المخاطر الرئيسية',
    positiveFactors: 'عوامل إيجابية',
    negativeFactors: 'عوامل المخاطر',
    recommendations: 'التوصيات',
    accountAge: 'عمر الحساب',
    creditHistory: 'التاريخ الائتماني',
    incomeLevel: 'مستوى الدخل',
    debtRatio: 'نسبة الدين إلى الدخل',
    paymentHistory: 'تاريخ الدفع',
    submit: 'إرسال للمراجعة',
    newAssessment: 'تقييم جديد',
  }
};

export function CreditAssessment({ language, onNavigate }: CreditAssessmentProps) {
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(endpoints.creditAssessment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_number: accountNumber }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch credit assessment');
      }

      const data: CreditAssessmentResponse = await response.json();

      // Transform API response to UI state structure
      const transformedResults = {
        customer: {
          name: language === 'en' ? 'Customer' : 'زبون', // Placeholder as API doesn't return name
          account: accountNumber,
          branch: language === 'en' ? 'Main Branch' : 'الفرع الرئيسي',
          accountAge: '-',
        },
        score: data.score,
        category: data.category.toLowerCase(),
        confidence: 90, // Placeholder
        positiveFactors: [], // API doesn't return structured factors yet
        negativeFactors: [],
        recommendation: data.insights.join('\n\n'),
      };

      setResults(transformedResults);
    } catch (error) {
      console.error('Error fetching credit assessment:', error);
      // In a real app, we would show an error message to the user here
      // For now, we'll just not show results
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Input Form */}
      {!results && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">{t.accountLabel}</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={t.accountPlaceholder}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.loading}
                </>
              ) : (
                t.startButton
              )}
            </button>
          </form>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-pink-600 animate-spin" />
            <p className="text-gray-600">{t.loading}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-gray-900">{t.resultsTitle}</h2>
            <button
              onClick={() => {
                setResults(null);
                setAccountNumber('');
              }}
              className="text-pink-600 hover:text-pink-700 transition-colors"
            >
              {t.newAssessment}
            </button>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4">{t.customerInfo}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Name' : 'الاسم'}</div>
                <div className="text-gray-900">{results.customer.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Account' : 'الحساب'}</div>
                <div className="text-gray-900">{results.customer.account}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">{language === 'en' ? 'Branch' : 'الفرع'}</div>
                <div className="text-gray-900">{results.customer.branch}</div>
              </div>
            </div>
          </div>

          {/* Score Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-2">{t.riskScore}</div>
              <div className={`text-4xl ${getScoreColor(results.score)}`}>{results.score}</div>
              <div className="text-sm text-gray-500 mt-2">{language === 'en' ? 'Out of 850' : 'من 850'}</div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="text-sm text-gray-600 mb-3">{t.riskCategory}</div>
              <RiskBadge
                category={results.category}
                label={results.category === 'low' ? t.low : results.category === 'medium' ? t.medium : t.high}
                className="px-4 py-2 text-sm"
              />
            </div>

            <StatCard
              label={t.confidence}
              value={`${results.confidence}%`}
              subtitle={language === 'en' ? 'High confidence' : 'ثقة عالية'}
            />
          </div>

          {/* Factors */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                {t.positiveFactors}
              </h3>
              <FactorCard
                factors={results.positiveFactors.map((f: any) => ({ label: f.label, value: f.value }))}
                type="positive"
              />
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                {t.negativeFactors}
              </h3>
              <FactorCard
                factors={results.negativeFactors.map((f: any) => ({ label: f.label, value: f.value }))}
                type="negative"
              />
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-600" />
              {t.recommendations}
            </h3>
            <p className="text-gray-700 leading-relaxed">{results.recommendation}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('employee-home')}
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              {t.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




