import React from 'react';

interface ActivityItemProps {
  action: string;
  account?: string;
  query?: string;
  time: string;
  status: 'completed' | 'pending';
  language: 'en' | 'ar';
}

export function ActivityItem({ action, account, query, time, status, language }: ActivityItemProps) {
  const statusLabels = {
    completed: language === 'en' ? 'Completed' : 'مكتمل',
    pending: language === 'en' ? 'Pending' : 'قيد الانتظار',
  };

  const statusStyles = {
    completed: 'px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full',
    pending: 'px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full',
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-gray-900">{action}</span>
            <span className={statusStyles[status]}>
              {statusLabels[status]}
            </span>
          </div>
          {account && (
            <div className="text-sm text-gray-600">{account}</div>
          )}
          {query && (
            <div className="text-sm text-gray-600">{query}</div>
          )}
        </div>
        <span className="text-sm text-gray-500 whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
}




