import React, { useState } from 'react';
import { TrendingUp, Users, Clock, CheckCircle, Eye, Filter } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language } from '../../App';
import { StatCard } from '../ui/stat-card';
import { RiskBadge } from '../ui/risk-badge';

interface BranchManagerDashboardProps {
  language: Language;
  onNavigate: (page: string) => void;
}

const translations = {
  en: {
    title: 'Branch Manager Dashboard',
    subtitle: 'Overview of branch performance and pending requests',
    totalAssessments: 'Total Assessments',
    approvalRate: 'Approval Rate',
    avgProcessingTime: 'Avg Processing Time',
    pendingReviews: 'Pending Reviews',
    assessmentsOverTime: 'Assessments Over Time',
    riskDistribution: 'Risk Category Distribution',
    pendingRequests: 'Pending Loan Requests',
    customer: 'Customer',
    account: 'Account',
    score: 'Score',
    riskCategory: 'Risk Category',
    status: 'Status',
    lastUpdate: 'Last Update',
    action: 'Action',
    viewDetails: 'View Details',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    filters: 'Filters',
    dateRange: 'Date Range',
    department: 'Department',
    applyFilters: 'Apply Filters',
    viewTeamActivity: 'View Team Activity',
    days: 'days',
    hours: 'hours',
  },
  ar: {
    title: 'لوحة تحكم مدير الفرع',
    subtitle: 'نظرة عامة على أداء الفرع والطلبات المعلقة',
    totalAssessments: 'إجمالي التقييمات',
    approvalRate: 'معدل الموافقة',
    avgProcessingTime: 'متوسط وقت المعالجة',
    pendingReviews: 'المراجعات المعلقة',
    assessmentsOverTime: 'التقييمات عبر الزمن',
    riskDistribution: 'توزيع فئات المخاطر',
    pendingRequests: 'طلبات القروض المعلقة',
    customer: 'العميل',
    account: 'الحساب',
    score: 'النقاط',
    riskCategory: 'فئة المخاطر',
    status: 'الحالة',
    lastUpdate: 'آخر تحديث',
    action: 'الإجراء',
    viewDetails: 'عرض التفاصيل',
    low: 'منخفض',
    medium: 'متوسط',
    high: 'عالي',
    pending: 'معلق',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    filters: 'الفلاتر',
    dateRange: 'نطاق التاريخ',
    department: 'القسم',
    applyFilters: 'تطبيق الفلاتر',
    viewTeamActivity: 'عرض نشاط الفريق',
    days: 'أيام',
    hours: 'ساعات',
  }
};

const timeSeriesData = [
  { date: 'Mon', assessments: 45 },
  { date: 'Tue', assessments: 52 },
  { date: 'Wed', assessments: 48 },
  { date: 'Thu', assessments: 61 },
  { date: 'Fri', assessments: 55 },
  { date: 'Sat', assessments: 38 },
  { date: 'Sun', assessments: 42 },
];

const riskDistributionData = [
  { name: 'Low', value: 45, color: '#10b981' },
  { name: 'Medium', value: 35, color: '#f59e0b' },
  { name: 'High', value: 20, color: '#ef4444' },
];

const pendingRequestsEn = [
  { id: 1, customer: 'Sarah Ahmed', account: 'ACC-2024-5678', score: 680, risk: 'medium', status: 'pending', lastUpdate: '2 hours ago' },
  { id: 2, customer: 'Mahmoud Hassan', account: 'ACC-2024-5679', score: 720, risk: 'medium', status: 'pending', lastUpdate: '4 hours ago' },
  { id: 3, customer: 'Layla Ibrahim', account: 'ACC-2024-5680', score: 620, risk: 'high', status: 'pending', lastUpdate: '5 hours ago' },
  { id: 4, customer: 'Omar Khalil', account: 'ACC-2024-5681', score: 780, risk: 'low', status: 'pending', lastUpdate: '1 day ago' },
  { id: 5, customer: 'Nour Salem', account: 'ACC-2024-5682', score: 650, risk: 'medium', status: 'pending', lastUpdate: '1 day ago' },
];

const pendingRequestsAr = [
  { id: 1, customer: 'سارة أحمد', account: 'ACC-2024-5678', score: 680, risk: 'medium', status: 'pending', lastUpdate: 'منذ ساعتين' },
  { id: 2, customer: 'محمود حسن', account: 'ACC-2024-5679', score: 720, risk: 'medium', status: 'pending', lastUpdate: 'منذ 4 ساعات' },
  { id: 3, customer: 'ليلى إبراهيم', account: 'ACC-2024-5680', score: 620, risk: 'high', status: 'pending', lastUpdate: 'منذ 5 ساعات' },
  { id: 4, customer: 'عمر خليل', account: 'ACC-2024-5681', score: 780, risk: 'low', status: 'pending', lastUpdate: 'منذ يوم' },
  { id: 5, customer: 'نور سالم', account: 'ACC-2024-5682', score: 650, risk: 'medium', status: 'pending', lastUpdate: 'منذ يوم' },
];

export function BranchManagerDashboard({ language, onNavigate }: BranchManagerDashboardProps) {
  const [showFilters, setShowFilters] = useState(false);
  const t = translations[language];
  const pendingRequests = language === 'en' ? pendingRequestsEn : pendingRequestsAr;


  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <button
          onClick={() => onNavigate('team-activity')}
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          {t.viewTeamActivity}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          label={t.totalAssessments}
          value={341}
          icon={TrendingUp}
          iconColor="text-pink-600"
          subtitle="+12% this week"
          subtitleColor="text-green-600"
        />
        <StatCard
          label={t.approvalRate}
          value="78%"
          icon={CheckCircle}
          iconColor="text-green-600"
          subtitle="Target: 75%"
        />
        <StatCard
          label={t.avgProcessingTime}
          value={`3.2 ${t.days}`}
          icon={Clock}
          iconColor="text-amber-600"
          subtitle="-0.5 days vs last week"
          subtitleColor="text-amber-600"
        />
        <StatCard
          label={t.pendingReviews}
          value={23}
          icon={Users}
          iconColor="text-pink-600"
          subtitle="Requires attention"
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Time Series Chart */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg text-gray-900">{t.assessmentsOverTime}</h3>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line type="monotone" dataKey="assessments" stroke="#db2777" strokeWidth={2} dot={{ fill: '#db2777' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-lg text-gray-900 mb-6">{t.riskDistribution}</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {riskDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-sm text-gray-700">
                      {entry.name === 'Low' && t.low}
                      {entry.name === 'Medium' && t.medium}
                      {entry.name === 'High' && t.high}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">{t.pendingRequests}</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.customer}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.account}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.score}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.riskCategory}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.status}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.lastUpdate}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{request.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{request.account}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{request.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge
                      category={request.risk}
                      label={request.risk === 'low' ? t.low : request.risk === 'medium' ? t.medium : t.high}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs text-amber-700 bg-amber-100">
                      {t.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.lastUpdate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onNavigate('loan-details')}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      {t.viewDetails}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {language === 'en' ? 'Showing 1 to 5 of 23 results' : 'عرض 1 إلى 5 من 23 نتيجة'}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              {language === 'en' ? 'Previous' : 'السابق'}
            </button>
            <button className="px-3 py-1.5 bg-pink-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">2</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">3</button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              {language === 'en' ? 'Next' : 'التالي'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




