import React, { useState } from 'react';
import { Download, Filter, Calendar, User, TrendingUp } from 'lucide-react';
import { Language } from '../App';

interface TeamActivityProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Team Activity & Reports',
    subtitle: 'Monitor employee performance and export reports',
    filters: 'Filters',
    dateRange: 'Date Range',
    employee: 'Employee',
    branch: 'Branch',
    applyFilters: 'Apply Filters',
    clearFilters: 'Clear',
    exportReport: 'Export Re  port',
    employeeName: 'Employee Name',
    role: 'Role',
    assessments: 'Assessments',
    approved: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    avgProcessingTime: 'Avg Time',
    performance: 'Performance',
    lastActive: 'Last Active',
    viewDetails: 'View Details',
    allEmployees: 'All Employees',
    allBranches: 'All Branches',
    last7days: 'Last 7 days',
    last30days: 'Last 30 days',
    thisMonth: 'This month',
    customRange: 'Custom range',
  },
  ar: {
    title: 'نشاط الفريق والتقارير',
    subtitle: 'راقب أداء الموظفين وقم بتصدير التقارير',
    filters: 'الفلاتر',
    dateRange: 'نطاق التاريخ',
    employee: 'الموظف',
    branch: 'الفرع',
    applyFilters: 'تطبيق الفلاتر',
    clearFilters: 'مسح',
    exportReport: 'تصدير التقرير',
    employeeName: 'اسم الموظف',
    role: 'الدور',
    assessments: 'التقييمات',
    approved: 'موافق عليها',
    rejected: 'مرفوضة',
    pending: 'معلقة',
    avgProcessingTime: 'متوسط الوقت',
    performance: 'الأداء',
    lastActive: 'آخر نشاط',
    viewDetails: 'عرض التفاصيل',
    allEmployees: 'جميع الموظفين',
    allBranches: 'جميع الفروع',
    last7days: 'آخر 7 أيام',
    last30days: 'آخر 30 يوم',
    thisMonth: 'هذا الشهر',
    customRange: 'نطاق مخصص',
  }
};

const teamDataEn = [
  { 
    id: 1, 
    name: 'Ahmad Khaled', 
    role: 'Credit Officer', 
    assessments: 45, 
    approved: 35, 
    rejected: 8, 
    pending: 2, 
    avgTime: '2.8 days', 
    performance: 92,
    lastActive: '2 hours ago'
  },
  { 
    id: 2, 
    name: 'Layla Hassan', 
    role: 'Credit Officer', 
    assessments: 38, 
    approved: 28, 
    rejected: 7, 
    pending: 3, 
    avgTime: '3.2 days', 
    performance: 88,
    lastActive: '4 hours ago'
  },
  { 
    id: 3, 
    name: 'Omar Saleh', 
    role: 'Credit Officer', 
    assessments: 52, 
    approved: 42, 
    rejected: 6, 
    pending: 4, 
    avgTime: '2.5 days', 
    performance: 95,
    lastActive: '1 hour ago'
  },
  { 
    id: 4, 
    name: 'Nour Ibrahim', 
    role: 'Senior Officer', 
    assessments: 61, 
    approved: 48, 
    rejected: 10, 
    pending: 3, 
    avgTime: '2.1 days', 
    performance: 97,
    lastActive: '30 minutes ago'
  },
  { 
    id: 5, 
    name: 'Sarah Mahmoud', 
    role: 'Credit Officer', 
    assessments: 42, 
    approved: 32, 
    rejected: 8, 
    pending: 2, 
    avgTime: '3.0 days', 
    performance: 90,
    lastActive: '3 hours ago'
  },
];

const teamDataAr = [
  { 
    id: 1, 
    name: 'أحمد خالد', 
    role: 'ضابط ائتمان', 
    assessments: 45, 
    approved: 35, 
    rejected: 8, 
    pending: 2, 
    avgTime: '2.8 أيام', 
    performance: 92,
    lastActive: 'منذ ساعتين'
  },
  { 
    id: 2, 
    name: 'ليلى حسن', 
    role: 'ضابط ائتمان', 
    assessments: 38, 
    approved: 28, 
    rejected: 7, 
    pending: 3, 
    avgTime: '3.2 أيام', 
    performance: 88,
    lastActive: 'منذ 4 ساعات'
  },
  { 
    id: 3, 
    name: 'عمر صالح', 
    role: 'ضابط ائتمان', 
    assessments: 52, 
    approved: 42, 
    rejected: 6, 
    pending: 4, 
    avgTime: '2.5 أيام', 
    performance: 95,
    lastActive: 'منذ ساعة'
  },
  { 
    id: 4, 
    name: 'نور إبراهيم', 
    role: 'ضابط أول', 
    assessments: 61, 
    approved: 48, 
    rejected: 10, 
    pending: 3, 
    avgTime: '2.1 أيام', 
    performance: 97,
    lastActive: 'منذ 30 دقيقة'
  },
  { 
    id: 5, 
    name: 'سارة محمود', 
    role: 'ضابط ائتمان', 
    assessments: 42, 
    approved: 32, 
    rejected: 8, 
    pending: 2, 
    avgTime: '3.0 أيام', 
    performance: 90,
    lastActive: 'منذ 3 ساعات'
  },
];

export function TeamActivity({ language }: TeamActivityProps) {
  const [showFilters, setShowFilters] = useState(false);
  const t = translations[language];
  const teamData = language === 'en' ? teamDataEn : teamDataAr;

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-700 bg-green-100';
    if (score >= 85) return 'text-blue-700 bg-blue-100';
    if (score >= 75) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
          <Download className="w-4 h-4" />
          {t.exportReport}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-900 flex items-center gap-2">
            <Filter className="w-5 h-5 text-pink-600" />
            {t.filters}
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-pink-600 hover:text-pink-700 transition-colors text-sm"
          >
            {showFilters ? t.clearFilters : t.applyFilters}
          </button>
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t.dateRange}</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent">
                <option>{t.last7days}</option>
                <option>{t.last30days}</option>
                <option>{t.thisMonth}</option>
                <option>{t.customRange}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t.employee}</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent">
                <option>{t.allEmployees}</option>
                {teamData.map(employee => (
                  <option key={employee.id}>{employee.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">{t.branch}</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent">
                <option>{t.allBranches}</option>
                <option>{language === 'en' ? 'Ramallah Main' : 'رام الله الرئيسي'}</option>
                <option>{language === 'en' ? 'Nablus Branch' : 'فرع نابلس'}</option>
                <option>{language === 'en' ? 'Hebron Branch' : 'فرع الخليل'}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{language === 'en' ? 'Total Team Members' : 'إجمالي أعضاء الفريق'}</span>
            <User className="w-5 h-5 text-pink-600" />
          </div>
          <div className="text-3xl text-gray-900">5</div>
          <div className="text-sm text-gray-500 mt-2">{language === 'en' ? 'Active employees' : 'موظفون نشطون'}</div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{t.assessments}</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl text-gray-900">238</div>
          <div className="text-sm text-green-600 mt-2">+18% this week</div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{language === 'en' ? 'Team Avg Time' : 'متوسط وقت الفريق'}</span>
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl text-gray-900">{language === 'en' ? '2.7 days' : '2.7 أيام'}</div>
          <div className="text-sm text-amber-600 mt-2">-0.3 days improvement</div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">{language === 'en' ? 'Avg Performance' : 'متوسط الأداء'}</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl text-gray-900">92%</div>
          <div className="text-sm text-green-600 mt-2">Excellent team performance</div>
        </div>
      </div>

      {/* Team Activity Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.employeeName}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.role}</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">{t.assessments}</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">{t.approved}</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">{t.rejected}</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">{t.pending}</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">{t.avgProcessingTime}</th>
                <th className="px-6 py-3 text-center text-xs text-gray-600 uppercase tracking-wider">{t.performance}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{t.lastActive}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teamData.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-pink-600" />
                      </div>
                      <div className="text-gray-900">{employee.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{employee.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">{employee.assessments}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-green-700">{employee.approved}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-red-700">{employee.rejected}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-amber-700">{employee.pending}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-900">{employee.avgTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getPerformanceColor(employee.performance)}`}>
                      {employee.performance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{employee.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
