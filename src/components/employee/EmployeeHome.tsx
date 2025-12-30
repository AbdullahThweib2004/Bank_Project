import React from 'react';
import { FileCheck, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Language } from '../../App';
import { TaskCard } from '../ui/task-card';
import { StatCard } from '../ui/stat-card';
import { ActivityItem } from '../ui/activity-item';

interface EmployeeHomeProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const translations = {
  en: {
    greeting: 'Welcome back',
    employeeName: 'Ahmad Khaled',
    subtitle: 'Here are your main tasks for today',
    taskATitle: 'Start Credit Assessment',
    taskADesc: 'Enter customer account number to begin credit scoring and risk evaluation',
    taskAButton: 'Start Assessment',
    taskBTitle: 'Internal AI Assistant',
    taskBDesc: 'Ask questions about policies, procedures, and banking regulations',
    taskBButton: 'Open Assistant',
    statsTitle: 'Today\'s Overview',
    assessmentsToday: 'Assessments Today',
    pendingReviews: 'Pending Reviews',
    assistantQueries: 'Assistant Queries',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
  },
  ar: {
    greeting: 'مرحباً بعودتك',
    employeeName: 'أحمد خالد',
    subtitle: 'إليك مهامك الرئيسية لليوم',
    taskATitle: 'بدء تقييم الائتمان',
    taskADesc: 'أدخل رقم حساب العميل لبدء التسجيل الائتماني وتقييم المخاطر',
    taskAButton: 'بدء التقييم',
    taskBTitle: 'المساعد الذكي الداخلي',
    taskBDesc: 'اسأل عن السياسات والإجراءات واللوائح المصرفية',
    taskBButton: 'فتح المساعد',
    statsTitle: 'نظرة عامة على اليوم',
    assessmentsToday: 'التقييمات اليوم',
    pendingReviews: 'المراجعات المعلقة',
    assistantQueries: 'استفسارات المساعد',
    recentActivity: 'النشاط الأخير',
    viewAll: 'عرض الكل',
  }
};

const recentActivitiesEn = [
  { id: 1, action: 'Credit assessment completed', account: 'ACC-2024-1234', time: '10 minutes ago', status: 'completed' },
  { id: 2, action: 'Risk review requested', account: 'ACC-2024-1235', time: '25 minutes ago', status: 'pending' },
  { id: 3, action: 'AI Assistant query', query: 'Loan approval process', time: '1 hour ago', status: 'completed' },
  { id: 4, action: 'Credit assessment completed', account: 'ACC-2024-1236', time: '2 hours ago', status: 'completed' },
];

const recentActivitiesAr = [
  { id: 1, action: 'اكتمل تقييم الائتمان', account: 'ACC-2024-1234', time: 'منذ 10 دقائق', status: 'completed' },
  { id: 2, action: 'طلب مراجعة المخاطر', account: 'ACC-2024-1235', time: 'منذ 25 دقيقة', status: 'pending' },
  { id: 3, action: 'استفسار المساعد الذكي', query: 'عملية الموافقة على القرض', time: 'منذ ساعة', status: 'completed' },
  { id: 4, action: 'اكتمل تقييم الائتمان', account: 'ACC-2024-1236', time: 'منذ ساعتين', status: 'completed' },
];

export function EmployeeHome({ language, onNavigate }: EmployeeHomeProps) {
  const t = translations[language];
  const recentActivities = language === 'en' ? recentActivitiesEn : recentActivitiesAr;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Greeting Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl mb-2">{t.greeting}, {t.employeeName}</h1>
        <p className="text-pink-100">{t.subtitle}</p>
      </div>

      {/* Main Task Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <TaskCard
          icon={FileCheck}
          title={t.taskATitle}
          description={t.taskADesc}
          buttonText={t.taskAButton}
          onButtonClick={() => onNavigate('credit-assessment')}
        />
        <TaskCard
          icon={MessageSquare}
          title={t.taskBTitle}
          description={t.taskBDesc}
          buttonText={t.taskBButton}
          onButtonClick={() => onNavigate('ai-assistant')}
        />
      </div>

      {/* Quick Stats */}
      <div>
        <h3 className="text-lg mb-4 text-gray-800">{t.statsTitle}</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            label={t.assessmentsToday}
            value={12}
            icon={TrendingUp}
            iconColor="text-green-600"
            subtitle="+3 from yesterday"
            subtitleColor="text-green-600"
          />
          <StatCard
            label={t.pendingReviews}
            value={5}
            icon={Clock}
            iconColor="text-amber-600"
            subtitle="Awaiting risk approval"
          />
          <StatCard
            label={t.assistantQueries}
            value={8}
            icon={CheckCircle}
            iconColor="text-pink-600"
            subtitle="Questions answered"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg text-gray-900">{t.recentActivity}</h3>
          <button className="text-pink-600 hover:text-pink-700 transition-colors text-sm">
            {t.viewAll}
          </button>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <ActivityItem
              key={activity.id}
              action={activity.action}
              account={activity.account}
              query={activity.query}
              time={activity.time}
              status={activity.status as 'completed' | 'pending'}
              language={language}
            />
          ))}
        </div>
      </div>
    </div>
  );
}




