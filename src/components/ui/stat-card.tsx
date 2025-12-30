import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  iconColor?: string; // Tailwind text color class
  subtitle?: string;
  subtitleColor?: string; // Tailwind text color class for subtitle
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = 'text-pink-600',
  subtitle,
  subtitleColor = 'text-gray-500',
  className = ''
}: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600 mb-1">{label}</div>
          <div className="text-2xl font-semibold text-gray-900">{value}</div>
          {subtitle && <div className={`text-sm mt-1 ${subtitleColor}`}>{subtitle}</div>}
        </div>

        {Icon && (
          <div className={`w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center ml-4`}> 
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
}
