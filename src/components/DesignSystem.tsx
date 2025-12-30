import React from 'react';
import { Check, X, AlertCircle, Info, Loader2, Plus, Trash2, Edit } from 'lucide-react';
import { Language } from '../App';

interface DesignSystemProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Design System',
    subtitle: 'Visual language and component library',
    colors: 'Color Palette',
    primary: 'Primary (Magenta)',
    secondary: 'Secondary',
    success: 'Success',
    warning: 'Warning',
    error: 'Error',
    neutral: 'Neutral',
    typography: 'Typography',
    heading1: 'Heading 1',
    heading2: 'Heading 2',
    heading3: 'Heading 3',
    bodyText: 'Body Text',
    smallText: 'Small Text',
    buttons: 'Buttons',
    primaryButton: 'Primary Button',
    secondaryButton: 'Secondary Button',
    ghostButton: 'Ghost Button',
    dangerButton: 'Danger Button',
    inputs: 'Form Inputs',
    textInput: 'Text Input',
    select: 'Select Input',
    textarea: 'Textarea',
    checkbox: 'Checkbox',
    badges: 'Badges & Status',
    lowRisk: 'Low Risk',
    mediumRisk: 'Medium Risk',
    highRisk: 'High Risk',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    cards: 'Cards',
    alerts: 'Alerts',
    successAlert: 'Success! Your operation completed successfully.',
    warningAlert: 'Warning! Please review the information carefully.',
    errorAlert: 'Error! Something went wrong. Please try again.',
    infoAlert: 'Info: This is an informational message.',
    tables: 'Tables',
    loading: 'Loading States',
  },
  ar: {
    title: 'نظام التصميم',
    subtitle: 'اللغة المرئية ومكتبة المكونات',
    colors: 'لوحة الألوان',
    primary: 'الأساسي (الماجنتا)',
    secondary: 'الثانوي',
    success: 'النجاح',
    warning: 'التحذير',
    error: 'الخطأ',
    neutral: 'المحايد',
    typography: 'الطباعة',
    heading1: 'عنوان 1',
    heading2: 'عنوان 2',
    heading3: 'عنوان 3',
    bodyText: 'نص الجسم',
    smallText: 'نص صغير',
    buttons: 'الأزرار',
    primaryButton: 'زر أساسي',
    secondaryButton: 'زر ثانوي',
    ghostButton: 'زر شفاف',
    dangerButton: 'زر خطر',
    inputs: 'مدخلات النموذج',
    textInput: 'إدخال نص',
    select: 'اختيار',
    textarea: 'منطقة نص',
    checkbox: 'خانة اختيار',
    badges: 'الشارات والحالة',
    lowRisk: 'مخاطر منخفضة',
    mediumRisk: 'مخاطر متوسطة',
    highRisk: 'مخاطر عالية',
    pending: 'معلق',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    cards: 'البطاقات',
    alerts: 'التنبيهات',
    successAlert: 'نجح! اكتملت عمليتك بنجاح.',
    warningAlert: 'تحذير! يرجى مراجعة المعلومات بعناية.',
    errorAlert: 'خطأ! حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    infoAlert: 'معلومات: هذه رسالة إعلامية.',
    tables: 'الجداول',
    loading: 'حالات التحميل',
  }
};

export function DesignSystem({ language }: DesignSystemProps) {
  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Color Palette */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.colors}</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="h-24 bg-pink-600 rounded-lg shadow-md"></div>
            <div className="text-sm text-gray-700">{t.primary}</div>
            <div className="text-xs text-gray-500">#db2777</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-900 rounded-lg shadow-md"></div>
            <div className="text-sm text-gray-700">{t.secondary}</div>
            <div className="text-xs text-gray-500">#111827</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-green-600 rounded-lg shadow-md"></div>
            <div className="text-sm text-gray-700">{t.success}</div>
            <div className="text-xs text-gray-500">#16a34a</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-amber-600 rounded-lg shadow-md"></div>
            <div className="text-sm text-gray-700">{t.warning}</div>
            <div className="text-xs text-gray-500">#d97706</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-red-600 rounded-lg shadow-md"></div>
            <div className="text-sm text-gray-700">{t.error}</div>
            <div className="text-xs text-gray-500">#dc2626</div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-100 rounded-lg shadow-md border border-gray-200"></div>
            <div className="text-sm text-gray-700">{t.neutral}</div>
            <div className="text-xs text-gray-500">#f3f4f6</div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.typography}</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">{t.heading1}</div>
            <h1 className="text-3xl text-gray-900">{language === 'en' ? 'The quick brown fox jumps' : 'النص العربي للعرض'}</h1>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">{t.heading2}</div>
            <h2 className="text-2xl text-gray-900">{language === 'en' ? 'The quick brown fox jumps' : 'النص العربي للعرض'}</h2>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">{t.heading3}</div>
            <h3 className="text-xl text-gray-900">{language === 'en' ? 'The quick brown fox jumps' : 'النص العربي للعرض'}</h3>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">{t.bodyText}</div>
            <p className="text-gray-700">{language === 'en' ? 'The quick brown fox jumps over the lazy dog. This is body text.' : 'النص العربي للعرض في الفقرات الأساسية'}</p>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">{t.smallText}</div>
            <p className="text-sm text-gray-600">{language === 'en' ? 'This is small text for captions and labels.' : 'نص صغير للتسميات والشروحات'}</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.buttons}</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors shadow-md">
              {t.primaryButton}
            </button>
            <button className="px-6 py-3 border-2 border-pink-600 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
              {t.secondaryButton}
            </button>
            <button className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              {t.ghostButton}
            </button>
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md">
              {t.dangerButton}
            </button>
            <button className="px-6 py-3 bg-pink-600 text-white rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.loading}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <button className="p-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Form Inputs */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.inputs}</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">{t.textInput}</label>
            <input
              type="text"
              placeholder={language === 'en' ? 'Enter text...' : 'أدخل النص...'}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">{t.select}</label>
            <select className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent">
              <option>{language === 'en' ? 'Select an option...' : 'اختر خياراً...'}</option>
              <option>{language === 'en' ? 'Option 1' : 'خيار 1'}</option>
              <option>{language === 'en' ? 'Option 2' : 'خيار 2'}</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">{t.textarea}</label>
            <textarea
              placeholder={language === 'en' ? 'Enter text...' : 'أدخل النص...'}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="checkbox-example"
              className="w-5 h-5 text-pink-600 border-gray-300 rounded focus:ring-2 focus:ring-pink-600"
            />
            <label htmlFor="checkbox-example" className="text-gray-700">{t.checkbox}</label>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.badges}</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">{t.lowRisk}</span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm">{t.mediumRisk}</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm">{t.highRisk}</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">{t.pending}</span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">{t.approved}</span>
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm">{t.rejected}</span>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.cards}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h3 className="text-lg text-gray-900 mb-2">{language === 'en' ? 'Card Title' : 'عنوان البطاقة'}</h3>
            <p className="text-gray-600">{language === 'en' ? 'Card content goes here.' : 'محتوى البطاقة هنا.'}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg text-gray-900 mb-2">{language === 'en' ? 'Hover Card' : 'بطاقة التمرير'}</h3>
            <p className="text-gray-600">{language === 'en' ? 'This card has hover effect.' : 'هذه البطاقة لها تأثير التمرير.'}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl shadow-md p-6 text-white">
            <h3 className="text-lg mb-2">{language === 'en' ? 'Accent Card' : 'بطاقة مميزة'}</h3>
            <p className="text-pink-100">{language === 'en' ? 'Card with gradient background.' : 'بطاقة مع خلفية متدرجة.'}</p>
          </div>
        </div>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.alerts}</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">{t.successAlert}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800">{t.warningAlert}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{t.errorAlert}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-800">{t.infoAlert}</p>
          </div>
        </div>
      </section>

      {/* Tables */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.tables}</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{language === 'en' ? 'Name' : 'الاسم'}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{language === 'en' ? 'Status' : 'الحالة'}</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600 uppercase tracking-wider">{language === 'en' ? 'Role' : 'الدور'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">Ahmad Khaled</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">{t.approved}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{language === 'en' ? 'Credit Officer' : 'ضابط ائتمان'}</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">Layla Hassan</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">{t.pending}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{language === 'en' ? 'Credit Officer' : 'ضابط ائتمان'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-2xl text-gray-900 mb-6">{t.loading}</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <div className="flex flex-wrap gap-6 items-center">
            <Loader2 className="w-8 h-8 text-pink-600 animate-spin" />
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-pink-600 animate-spin" />
              <span className="text-gray-700">{language === 'en' ? 'Loading...' : 'جاري التحميل...'}</span>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
