import React, { useState } from 'react';
import { ArrowLeft, User, FileText, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Language } from '../../App';

interface LoanRequestDetailsProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const translations = {
  en: {
    backToDashboard: 'Back to Dashboard',
    title: 'Loan Request Details',
    customerProfile: 'Customer Profile',
    name: 'Name',
    account: 'Account Number',
    branch: 'Branch',
    accountAge: 'Account Age',
    customerSince: 'Customer Since',
    financialIndicators: 'Financial Indicators',
    monthlyIncome: 'Monthly Income',
    existingDebt: 'Existing Debt',
    debtToIncome: 'Debt-to-Income Ratio',
    creditUtilization: 'Credit Utilization',
    riskAssessment: 'Risk Assessment',
    riskScore: 'Risk Score',
    riskCategory: 'Risk Category',
    modelConfidence: 'Model Confidence',
    assessmentDate: 'Assessment Date',
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
    explainableInsights: 'Explainable Insights',
    keyFactors: 'Key Risk Factors',
    positiveFactors: 'Positive Factors',
    negativeFactors: 'Risk Factors',
    auditTrail: 'Audit Trail',
    documents: 'Documents',
    viewDocument: 'View',
    downloadDocument: 'Download',
    decisionPanel: 'Decision Panel',
    approve: 'Approve Request',
    reject: 'Reject Request',
    requiresAction: 'This request requires your approval',
  },
  ar: {
    backToDashboard: 'العودة إلى لوحة التحكم',
    title: 'تفاصيل طلب القرض',
    customerProfile: 'ملف العميل',
    name: 'الاسم',
    account: 'رقم الحساب',
    branch: 'الفرع',
    accountAge: 'عمر الحساب',
    customerSince: 'عميل منذ',
    financialIndicators: 'المؤشرات المالية',
    monthlyIncome: 'الدخل الشهري',
    existingDebt: 'الديون الحالية',
    debtToIncome: 'نسبة الدين إلى الدخل',
    creditUtilization: 'استخدام الائتمان',
    riskAssessment: 'تقييم المخاطر',
    riskScore: 'درجة المخاطر',
    riskCategory: 'فئة المخاطر',
    modelConfidence: 'ثقة النموذج',
    assessmentDate: 'تاريخ التقييم',
    low: 'مخاطر منخفضة',
    medium: 'مخاطر متوسطة',
    high: 'مخاطر عالية',
    explainableInsights: 'رؤى قابلة للتفسير',
    keyFactors: 'عوامل المخاطر الرئيسية',
    positiveFactors: 'عوامل إيجابية',
    negativeFactors: 'عوامل المخاطر',
    auditTrail: 'سجل المراجعة',
    documents: 'المستندات',
    viewDocument: 'عرض',
    downloadDocument: 'تحميل',
    decisionPanel: 'لوحة القرار',
    approve: 'الموافقة على الطلب',
    reject: 'رفض الطلب',
    requiresAction: 'يتطلب هذا الطلب موافقتك',
  }
};

const auditTrailEn = [
  { id: 1, action: 'Credit assessment initiated', user: 'Ahmad Khaled', timestamp: 'Dec 17, 2024 09:15 AM', status: 'completed' },
  { id: 2, action: 'Automated scoring completed', user: 'AI System', timestamp: 'Dec 17, 2024 09:17 AM', status: 'completed' },
  { id: 3, action: 'Submitted for branch manager review', user: 'Ahmad Khaled', timestamp: 'Dec 17, 2024 09:20 AM', status: 'completed' },
  { id: 4, action: 'Pending final approval', user: 'System', timestamp: 'Dec 17, 2024 09:20 AM', status: 'pending' },
];

const auditTrailAr = [
  { id: 1, action: 'بدء تقييم الائتمان', user: 'أحمد خالد', timestamp: '17 ديسمبر 2024، 09:15 صباحاً', status: 'completed' },
  { id: 2, action: 'اكتمل التسجيل الآلي', user: 'نظام الذكاء الاصطناعي', timestamp: '17 ديسمبر 2024، 09:17 صباحاً', status: 'completed' },
  { id: 3, action: 'تم إرساله لمراجعة مدير الفرع', user: 'أحمد خالد', timestamp: '17 ديسمبر 2024، 09:20 صباحاً', status: 'completed' },
  { id: 4, action: 'بانتظار الموافقة النهائية', user: 'النظام', timestamp: '17 ديسمبر 2024، 09:20 صباحاً', status: 'pending' },
];

const documentsEn = [
  { id: 1, name: 'National ID Copy', type: 'PDF', size: '2.4 MB', uploadDate: 'Dec 15, 2024' },
  { id: 2, name: 'Salary Certificate', type: 'PDF', size: '1.1 MB', uploadDate: 'Dec 15, 2024' },
  { id: 3, name: 'Bank Statements (6 months)', type: 'PDF', size: '5.8 MB', uploadDate: 'Dec 15, 2024' },
  { id: 4, name: 'Employment Contract', type: 'PDF', size: '890 KB', uploadDate: 'Dec 15, 2024' },
];

const documentsAr = [
  { id: 1, name: 'نسخة الهوية الوطنية', type: 'PDF', size: '2.4 ميجابايت', uploadDate: '15 ديسمبر 2024' },
  { id: 2, name: 'شهادة الراتب', type: 'PDF', size: '1.1 ميجابايت', uploadDate: '15 ديسمبر 2024' },
  { id: 3, name: 'كشوفات البنك (6 أشهر)', type: 'PDF', size: '5.8 ميجابايت', uploadDate: '15 ديسمبر 2024' },
  { id: 4, name: 'عقد العمل', type: 'PDF', size: '890 كيلوبايت', uploadDate: '15 ديسمبر 2024' },
];

export function LoanRequestDetails({ language, onNavigate }: LoanRequestDetailsProps) {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const t = translations[language];
  const auditTrail = language === 'en' ? auditTrailEn : auditTrailAr;
  const documents = language === 'en' ? documentsEn : documentsAr;

  const positiveFactors = [
    { label: language === 'en' ? 'Account age' : 'عمر الحساب', value: language === 'en' ? '5+ years with bank' : 'أكثر من 5 سنوات مع البنك' },
    { label: language === 'en' ? 'Payment history' : 'تاريخ الدفع', value: language === 'en' ? 'No missed payments in 2 years' : 'لا دفعات مفقودة في عامين' },
    { label: language === 'en' ? 'Income stability' : 'استقرار الدخل', value: language === 'en' ? 'Regular monthly salary' : 'راتب شهري منتظم' },
  ];

  const negativeFactors = [
    { label: language === 'en' ? 'Debt ratio' : 'نسبة الدين', value: language === 'en' ? '42% - Above recommended threshold' : '42% - أعلى من العتبة الموصى بها' },
    { label: language === 'en' ? 'Credit utilization' : 'استخدام الائتمان', value: language === 'en' ? '68% - High utilization' : '68% - استخدام مرتفع' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => onNavigate('branch-manager')}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToDashboard}
        </button>
        <h1 className="text-2xl text-gray-900">{t.title}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Profile */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-pink-600" />
              {t.customerProfile}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">{t.name}</div>
                <div className="text-gray-900">{language === 'en' ? 'Mahmoud Hassan' : 'محمود حسن'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">{t.account}</div>
                <div className="text-gray-900">ACC-2024-5679</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">{t.branch}</div>
                <div className="text-gray-900">{language === 'en' ? 'Ramallah Main Branch' : 'الفرع الرئيسي رام الله'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">{t.customerSince}</div>
                <div className="text-gray-900">{language === 'en' ? 'January 2019' : 'يناير 2019'}</div>
              </div>
            </div>
          </div>

          {/* Financial Indicators */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg text-gray-900 mb-4">{t.financialIndicators}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{t.monthlyIncome}</div>
                <div className="text-2xl text-gray-900">{language === 'en' ? '$4,500' : '4,500 دولار'}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{t.existingDebt}</div>
                <div className="text-2xl text-gray-900">{language === 'en' ? '$1,890' : '1,890 دولار'}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{t.debtToIncome}</div>
                <div className="text-2xl text-amber-600">42%</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">{t.creditUtilization}</div>
                <div className="text-2xl text-amber-600">68%</div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg text-gray-900 mb-4">{t.riskAssessment}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 mb-2">{t.riskScore}</div>
                <div className="text-4xl text-amber-600">720</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">{t.riskCategory}</div>
                <span className="inline-flex px-4 py-2 rounded-full text-sm text-amber-700 bg-amber-100">
                  {t.medium}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-2">{t.modelConfidence}</div>
                <div className="text-4xl text-gray-900">89%</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">{t.assessmentDate}</div>
              <div className="text-gray-900">
                {language === 'en' ? 'December 17, 2024 at 09:17 AM' : '17 ديسمبر 2024 الساعة 09:17 صباحاً'}
              </div>
            </div>
          </div>

          {/* Explainable Insights */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-600" />
              {t.explainableInsights}
            </h2>
            
            <div className="space-y-6">
              {/* Positive Factors */}
              <div>
                <h3 className="text-sm text-green-700 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {t.positiveFactors}
                </h3>
                <div className="space-y-2">
                  {positiveFactors.map((factor, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm text-green-900 mb-1">{factor.label}</div>
                      <div className="text-sm text-green-700">{factor.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negative Factors */}
              <div>
                <h3 className="text-sm text-red-700 mb-3 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  {t.negativeFactors}
                </h3>
                <div className="space-y-2">
                  {negativeFactors.map((factor, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="text-sm text-red-900 mb-1">{factor.label}</div>
                      <div className="text-sm text-red-700">{factor.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg text-gray-900 mb-4">{t.documents}</h2>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">{doc.name}</div>
                      <div className="text-sm text-gray-600">{doc.type} • {doc.size}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                      {t.viewDocument}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Trail */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-600" />
              {t.auditTrail}
            </h2>
            <div className="space-y-4">
              {auditTrail.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                    }`}>
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    {index < auditTrail.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-gray-900">{item.action}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.user} • {item.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decision Panel - Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg text-gray-900 mb-4">{t.decisionPanel}</h2>
            
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{t.requiresAction}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowApprovalModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {t.approve}
              </button>
              <button
                onClick={() => setShowApprovalModal(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                {t.reject}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl text-gray-900 mb-4">
              {language === 'en' ? 'Confirm Decision' : 'تأكيد القرار'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'en' 
                ? 'Are you sure you want to proceed with this decision? This action will be recorded in the audit trail.'
                : 'هل أنت متأكد من أنك تريد المتابعة بهذا القرار؟ سيتم تسجيل هذا الإجراء في سجل المراجعة.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {language === 'en' ? 'Cancel' : 'إلغاء'}
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  onNavigate('branch-manager');
                }}
                className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
              >
                {language === 'en' ? 'Confirm' : 'تأكيد'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




