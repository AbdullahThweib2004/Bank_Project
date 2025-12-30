import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import { Language, UserRole } from '../App';

interface TopNavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  userRole: UserRole;
  onNavigate: (page: string) => void;
}

const translations = {
  en: {
    search: 'Search...',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    productName: 'AI Banking Intelligence Platform',
  },
  ar: {
    search: 'بحث...',
    notifications: 'الإشعارات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    productName: 'منصة الذكاء المصرفي الاصطناعي',
  }
};

export function TopNavigation({ language, onLanguageChange, userRole, onNavigate }: TopNavigationProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const t = translations[language];

  return (
    <nav className="bg-gray-900 text-white h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('employee-home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-700 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">BP</span>
          </div>
          <span className="text-sm font-semibold hidden lg:block">{t.productName}</span>
        </div>
      </div>

      {/* Right utilities */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            className="bg-gray-800 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        {/* Language Toggle */}
        <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              language === 'en' ? 'bg-pink-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('ar')}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              language === 'ar' ? 'bg-pink-600 text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            AR
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-600 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl py-2 border border-gray-200">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">
                {t.profile}
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors">
                {t.settings}
              </button>
              <hr className="my-2" />
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-pink-600 transition-colors">
                {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
