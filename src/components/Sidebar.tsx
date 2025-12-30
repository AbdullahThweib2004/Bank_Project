import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  FileCheck, 
  MessageSquare, 
  Users, 
  Shield, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Palette
} from 'lucide-react';
import { Language, UserRole } from '../App';

interface SidebarProps {
  language: Language;
  userRole: UserRole;
  currentPage: string;
  onNavigate: (page: string) => void;
  onRoleChange: (role: UserRole) => void;
}

const translations = {
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    assessments: 'Credit Assessment',
    aiAssistant: 'AI Assistant',
    teamActivity: 'Team Activity',
    riskReview: 'Risk Review',
    settings: 'Settings',
    designSystem: 'Design System',
    roleSelector: 'Switch Role',
    employee: 'Employee',
    branchManager: 'Branch Manager',
    riskEmployee: 'Risk Employee',
  },
  ar: {
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    assessments: 'تقييم الائتمان',
    aiAssistant: 'المساعد الذكي',
    teamActivity: 'نشاط الفريق',
    riskReview: 'مراجعة المخاطر',
    settings: 'الإعدادات',
    designSystem: 'نظام التصميم',
    roleSelector: 'تبديل الدور',
    employee: 'موظف',
    branchManager: 'مدير الفرع',
    riskEmployee: 'موظف المخاطر',
  }
};

export function Sidebar({ language, userRole, currentPage, onNavigate, onRoleChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const t = translations[language];

  const employeeMenuItems = [
    { id: 'employee-home', label: t.home, icon: Home },
    { id: 'credit-assessment', label: t.assessments, icon: FileCheck },
    { id: 'ai-assistant', label: t.aiAssistant, icon: MessageSquare },
  ];

  const branchManagerMenuItems = [
    { id: 'branch-manager', label: t.dashboard, icon: BarChart3 },
    { id: 'team-activity', label: t.teamActivity, icon: Users },
    { id: 'ai-assistant', label: t.aiAssistant, icon: MessageSquare },
  ];

  const riskEmployeeMenuItems = [
    { id: 'risk-review', label: t.riskReview, icon: Shield },
    { id: 'ai-assistant', label: t.aiAssistant, icon: MessageSquare },
  ];

  const menuItems = 
    userRole === 'employee' ? employeeMenuItems :
    userRole === 'branch-manager' ? branchManagerMenuItems :
    riskEmployeeMenuItems;

  return (
    <aside 
      className={`fixed top-16 ${language === 'ar' ? 'right-0' : 'left-0'} bottom-0 bg-white border-gray-200 shadow-lg transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
      style={{ borderWidth: language === 'ar' ? '0 0 0 1px' : '0 1px 0 0' }}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute top-4 ${language === 'ar' ? 'left-2' : 'right-2'} p-1.5 hover:bg-gray-100 rounded-lg transition-colors`}
      >
        {(collapsed && language === 'en') || (!collapsed && language === 'ar') ? (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Role Selector */}
      <div className="p-4 pt-16 border-b border-gray-200">
        {!collapsed && (
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-left hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <span className="text-sm truncate">
                {userRole === 'employee' ? t.employee : 
                 userRole === 'branch-manager' ? t.branchManager : 
                 t.riskEmployee}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
            
            {showRoleMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => {
                    onRoleChange('employee');
                    onNavigate('employee-home');
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  {t.employee}
                </button>
                <button
                  onClick={() => {
                    onRoleChange('branch-manager');
                    onNavigate('branch-manager');
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  {t.branchManager}
                </button>
                <button
                  onClick={() => {
                    onRoleChange('risk-employee');
                    onNavigate('risk-review');
                    setShowRoleMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  {t.riskEmployee}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-pink-50 text-pink-600 shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-pink-600' : 'text-gray-600'}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-1">
        <button
          onClick={() => onNavigate('design-system')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentPage === 'design-system'
              ? 'bg-pink-50 text-pink-600 shadow-sm'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
          title={collapsed ? t.designSystem : ''}
        >
          <Palette className={`w-5 h-5 flex-shrink-0 ${currentPage === 'design-system' ? 'text-pink-600' : 'text-gray-600'}`} />
          {!collapsed && <span className="truncate">{t.designSystem}</span>}
        </button>
        
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
          title={collapsed ? t.settings : ''}
        >
          <Settings className="w-5 h-5 flex-shrink-0 text-gray-600" />
          {!collapsed && <span className="truncate">{t.settings}</span>}
        </button>
      </div>
    </aside>
  );
}
