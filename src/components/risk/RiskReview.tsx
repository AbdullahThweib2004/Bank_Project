import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, User, Clock, FileText } from 'lucide-react';
import { Language } from '../../App';
import { StatCard } from '../ui/stat-card';
import { RiskBadge } from '../ui/risk-badge';
import { FactorCard } from '../ui/factor-card';
import { DecisionPanel } from '../ui/decision-panel';
import { ConfirmationModal } from '../ui/confirmation-modal';
import { SuccessModal } from '../ui/success-modal';
import { DocumentList } from '../ui/document-list';

type RiskCategory = 'low' | 'medium' | 'high';

interface QueueApplication {
  id: number;
  customer: string;
  account: string;
  score: number;
  category: RiskCategory;
  submittedBy: string;
  submittedDate: string;
  amount: string;
}

interface RiskReviewProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Risk Department Review',
    subtitle: 'Review and approve credit assessment decisions',
    queueTitle: 'Applications Requiring Risk Review',
    customer: 'Customer',
    account: 'Account',
    score: 'Score',
    category: 'Category',
    submittedBy: 'Submitted By',
    submittedDate: 'Submitted',
    action: 'Action',
    review: 'Review',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    reviewTitle: 'Risk Review Decision',
    customerSnapshot: 'Customer Snapshot',
    riskAssessment: 'Risk Assessment',
    riskScore: 'Risk Score',
    riskCategory: 'Risk Category',
    modelConfidence: 'Model Confidence',
    explainability: 'Explainability & Key Factors',
    positiveFactors: 'Positive Factors',
    riskFactors: 'Risk Factors',
    documents: 'Attached Documents',
    viewDocument: 'View',
    decision: 'Your Decision',
    approve: 'Approve',
    reject: 'Reject',
    reasonLabel: 'Decision Reason / Notes',
    reasonPlaceholder: 'Please provide detailed reasoning for your decision...',
    reasonRequired: 'Reason is required',
    submitDecision: 'Submit Decision',
    cancel: 'Cancel',
    confirmTitle: 'Confirm Decision',
    confirmMessage: 'Are you sure you want to',
    confirmApprove: 'approve',
    confirmReject: 'reject',
    confirmMessageEnd: 'this application? This action will be recorded in the audit trail.',
    confirmButton: 'Confirm Decision',
    successTitle: 'Decision Submitted',
    successMessage: 'Your decision has been recorded and the applicant will be notified.',
    close: 'Close',
    pendingReview: 'Pending Review',
    name: 'Name',
    branch: 'Branch',
    requestedAmount: 'Requested Amount',
  },
  ar: {
    title: 'مراجعة قسم المخاطر',
    subtitle: 'مراجعة والموافقة على قرارات تقييم الائتمان',
    queueTitle: 'الطلبات التي تتطلب مراجعة المخاطر',
    customer: 'العميل',
    account: 'الحساب',
    score: 'النقاط',
    category: 'الفئة',
    submittedBy: 'مقدم من',
    submittedDate: 'تاريخ التقديم',
    action: 'الإجراء',
    review: 'مراجعة',
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    reviewTitle: 'قرار مراجعة المخاطر',
    customerSnapshot: 'لمحة عن العميل',
    riskAssessment: 'تقييم المخاطر',
    riskScore: 'درجة المخاطر',
    riskCategory: 'فئة المخاطر',
    modelConfidence: 'ثقة النموذج',
    explainability: 'القابلية للتفسير والعوامل الرئيسية',
    positiveFactors: 'عوامل إيجابية',
    riskFactors: 'عوامل المخاطر',
    documents: 'المستندات المرفقة',
    viewDocument: 'عرض',
    decision: 'قرارك',
    approve: 'موافقة',
    reject: 'رفض',
    reasonLabel: 'سبب القرار / الملاحظات',
    reasonPlaceholder: 'يرجى تقديم تبرير مفصل لقرارك...',
    reasonRequired: 'السبب مطلوب',
    submitDecision: 'إرسال القرار',
    cancel: 'إلغاء',
    confirmTitle: 'تأكيد القرار',
    confirmMessage: 'هل أنت متأكد من أنك تريد',
    confirmApprove: 'الموافقة على',
    confirmReject: 'رفض',
    confirmMessageEnd: 'هذا الطلب؟ سيتم تسجيل هذا الإجراء في سجل المراجعة.',
    confirmButton: 'تأكيد القرار',
    successTitle: 'تم إرسال القرار',
    successMessage: 'تم تسجيل قرارك وسيتم إخطار مقدم الطلب.',
    close: 'إغلاق',
    pendingReview: 'قيد المراجعة',
    name: 'الاسم',
    branch: 'الفرع',
    requestedAmount: 'المبلغ المطلوب',
  }
};

const queueDataEn: QueueApplication[] = [
  { id: 1, customer: 'Layla Ibrahim', account: 'ACC-2024-5680', score: 620, category: 'high', submittedBy: 'Ahmad Khaled', submittedDate: '5 hours ago', amount: '$25,000' },
  { id: 2, customer: 'Omar Khalil', account: 'ACC-2024-5681', score: 780, category: 'low', submittedBy: 'Layla Hassan', submittedDate: '1 day ago', amount: '$15,000' },
  { id: 3, customer: 'Nour Salem', account: 'ACC-2024-5682', score: 650, category: 'medium', submittedBy: 'Omar Saleh', submittedDate: '1 day ago', amount: '$30,000' },
];

const queueDataAr: QueueApplication[] = [
  { id: 1, customer: 'ليلى إبراهيم', account: 'ACC-2024-5680', score: 620, category: 'high', submittedBy: 'أحمد خالد', submittedDate: 'منذ 5 ساعات', amount: '25,000 دولار' },
  { id: 2, customer: 'عمر خليل', account: 'ACC-2024-5681', score: 780, category: 'low', submittedBy: 'ليلى حسن', submittedDate: 'منذ يوم', amount: '15,000 دولار' },
  { id: 3, customer: 'نور سالم', account: 'ACC-2024-5682', score: 650, category: 'medium', submittedBy: 'عمر صالح', submittedDate: 'منذ يوم', amount: '30,000 دولار' },
];

export function RiskReview({ language }: RiskReviewProps) {
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [reason, setReason] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const t = translations[language];
  const queueData = language === 'en' ? queueDataEn : queueDataAr;


  const handleReview = (application: any) => {
    setSelectedApplication(application);
    setDecision(null);
    setReason('');
  };

  const handleSubmitDecision = () => {
    if (!decision || !reason.trim()) {
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmDecision = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const closeSuccess = () => {
    setShowSuccessModal(false);
    setSelectedApplication(null);
    setDecision(null);
    setReason('');
  };

  const positiveFactors = [
    { label: language === 'en' ? 'Account age' : 'عمر الحساب', value: language === 'en' ? '4+ years with bank' : 'أكثر من 4 سنوات مع البنك' },
    { label: language === 'en' ? 'Income stability' : 'استقرار الدخل', value: language === 'en' ? 'Regular monthly salary' : 'راتب شهري منتظم' },
  ];

  const riskFactors = [
    { label: language === 'en' ? 'High credit utilization' : 'استخدام ائتماني مرتفع', value: language === 'en' ? '75% - Above safe threshold' : '75% - أعلى من الحد الآمن' },
    { label: language === 'en' ? 'Recent late payment' : 'دفعة متأخرة حديثة', value: language === 'en' ? '1 payment 30+ days late' : 'دفعة واحدة متأخرة 30+ يوم' },
  ];

  const documents = [
    { name: language === 'en' ? 'National ID Copy' : 'نسخة الهوية الوطنية', type: 'PDF' },
    { name: language === 'en' ? 'Salary Certificate' : 'شهادة الراتب', type: 'PDF' },
    { name: language === 'en' ? 'Bank Statements' : 'كشوفات البنك', type: 'PDF' },
  ];

  if (selectedApplication) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={() => setSelectedApplication(null)}
            className="text-pink-600 hover:text-pink-700 mb-4 transition-colors"
          >
            ← {language === 'en' ? 'Back to Queue' : 'العودة إلى القائمة'}
          </button>
          <h1 className="text-2xl text-gray-900">{t.reviewTitle}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Snapshot */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-pink-600" />
                {t.customerSnapshot}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.name}</div>
                  <div className="text-gray-900">{selectedApplication.customer}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.account}</div>
                  <div className="text-gray-900">{selectedApplication.account}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.requestedAmount}</div>
                  <div className="text-gray-900">{selectedApplication.amount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.branch}</div>
                  <div className="text-gray-900">{language === 'en' ? 'Ramallah Main Branch' : 'الفرع الرئيسي رام الله'}</div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-pink-600" />
                {t.riskAssessment}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">{t.riskScore}</div>
                  <div className="text-4xl text-gray-900">{selectedApplication.score}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">{t.riskCategory}</div>
                  <RiskBadge
                    category={selectedApplication.category}
                    label={selectedApplication.category === 'low' ? t.low : selectedApplication.category === 'medium' ? t.medium : t.high}
                    className="px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">{t.modelConfidence}</div>
                  <div className="text-4xl text-gray-900">85%</div>
                </div>
              </div>
            </div>

            {/* Explainability */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-pink-600" />
                {t.explainability}
              </h2>

              <div className="space-y-6">
                {/* Positive Factors */}
                <div>
                  <h3 className="text-sm text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {t.positiveFactors}
                  </h3>
                  <FactorCard
                    factors={positiveFactors}
                    type="positive"
                  />
                </div>

                {/* Risk Factors */}
                <div>
                  <h3 className="text-sm text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {t.riskFactors}
                  </h3>
                  <FactorCard
                    factors={riskFactors}
                    type="negative"
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-lg text-gray-900 mb-4">{t.documents}</h2>
              <DocumentList
                documents={documents}
                viewLabel={t.viewDocument}
              />
            </div>
          </div>

          {/* Decision Panel */}
          <div className="lg:col-span-1">
            <DecisionPanel
              title={t.decision}
              decision={decision}
              onDecisionChange={(d) => setDecision(d)}
              reason={reason}
              onReasonChange={setReason}
              reasonLabel={t.reasonLabel}
              reasonPlaceholder={t.reasonPlaceholder}
              reasonRequired={t.reasonRequired}
              approveLabel={t.approve}
              rejectLabel={t.reject}
              submitLabel={t.submitDecision}
              onSubmit={handleSubmitDecision}
            />
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && decision && (
          <ConfirmationModal
            title={t.confirmTitle}
            message={`${t.confirmMessage} ${decision === 'approve' ? t.confirmApprove : t.confirmReject} ${t.confirmMessageEnd}`}
            actionLabel={t.confirmButton}
            actionType={decision}
            onConfirm={confirmDecision}
            onCancel={() => setShowConfirmModal(false)}
            cancelLabel={t.cancel}
          />
        )}

        {/* Success Modal */}
        {showSuccessModal && decision && (
          <SuccessModal
            title={t.successTitle}
            message={t.successMessage}
            actionType={decision}
            onClose={closeSuccess}
            closeLabel={t.close}
          />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          label={t.pendingReview}
          value={queueData.length}
          icon={Clock}
          iconColor="text-amber-600"
          subtitle={language === 'en' ? 'Requires attention' : 'يتطلب الاهتمام'}
        />
        <StatCard
          label={language === 'en' ? 'Reviewed Today' : 'تمت المراجعة اليوم'}
          value={8}
          icon={CheckCircle}
          iconColor="text-green-600"
          subtitle={language === 'en' ? '6 approved, 2 rejected' : '6 موافق، 2 مرفوض'}
          subtitleColor="text-green-600"
        />
        <StatCard
          label={language === 'en' ? 'Avg Review Time' : 'متوسط وقت المراجعة'}
          value={language === 'en' ? '45 min' : '45 دقيقة'}
          icon={Clock}
          iconColor="text-pink-600"
          subtitle={language === 'en' ? 'Per application' : 'لكل طلب'}
        />
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">{t.queueTitle}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.customer}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.account}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.score}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.category}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.submittedBy}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.submittedDate}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {queueData.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{application.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{application.account}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{application.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge
                      category={application.category}
                      label={application.category === 'low' ? t.low : application.category === 'medium' ? t.medium : t.high}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{application.submittedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{application.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleReview(application)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm"
                    >
                      <Shield className="w-4 h-4" />
                      {t.review}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

