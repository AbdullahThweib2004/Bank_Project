import React, { useState } from 'react';
import { EmployeeHome } from './components/employee/EmployeeHome';
import { BranchManagerDashboard } from './components/branch-manager/BranchManagerDashboard';
import { LoanRequestDetails } from './components/branch-manager/LoanRequestDetails';
import { TeamActivity } from './components/TeamActivity';
import { RiskReview } from './components/risk/RiskReview';
import { AIAssistant } from './components/employee/AIAssistant';
import { DesignSystem } from './components/DesignSystem';
import { CreditAssessment } from './components/employee/CreditAssessment';
import { TopNavigation } from './components/TopNavigation';
import { Sidebar } from './components/Sidebar';

export type UserRole = 'employee' | 'branch-manager' | 'risk-employee';
export type Language = 'en' | 'ar';

function App() {
  const [currentPage, setCurrentPage] = useState('employee-home');
  const [userRole, setUserRole] = useState<UserRole>('employee');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <TopNavigation 
        language={language} 
        onLanguageChange={setLanguage}
        userRole={userRole}
        onNavigate={setCurrentPage}
      />
      
      <div className="flex pt-16">
        <Sidebar 
          language={language} 
          userRole={userRole}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onRoleChange={setUserRole}
        />
        
        <main className="flex-1 pt-8 px-8 pb-8" style={{ marginInlineStart: '288px' }}>
          {currentPage === 'employee-home' && <EmployeeHome language={language} onNavigate={setCurrentPage} />}
          {currentPage === 'branch-manager' && <BranchManagerDashboard language={language} onNavigate={setCurrentPage} />}
          {currentPage === 'loan-details' && <LoanRequestDetails language={language} onNavigate={setCurrentPage} />}
          {currentPage === 'team-activity' && <TeamActivity language={language} />}
          {currentPage === 'risk-review' && <RiskReview language={language} />}
          {currentPage === 'ai-assistant' && <AIAssistant language={language} />}
          {currentPage === 'credit-assessment' && <CreditAssessment language={language} onNavigate={setCurrentPage} />}
          {currentPage === 'design-system' && <DesignSystem language={language} />}
        </main>
      </div>
    </div>
  );
}

export default App;
