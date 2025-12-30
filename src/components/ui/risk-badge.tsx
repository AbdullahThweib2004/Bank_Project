import React from 'react';

type RiskCategory = 'low' | 'medium' | 'high';

interface RiskBadgeProps {
  category: RiskCategory;
  label: string;
  className?: string;
}

export function RiskBadge({ category, label, className = '' }: RiskBadgeProps) {
  const getRiskColor = (cat: RiskCategory) => {
    switch (cat) {
      case 'low': return 'text-green-700 bg-green-100';
      case 'medium': return 'text-amber-700 bg-amber-100';
      case 'high': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs ${getRiskColor(category)} ${className}`}>
      {label}
    </span>
  );
}

export function getRiskColor(category: RiskCategory): string {
  switch (category) {
    case 'low': return 'text-green-700 bg-green-100';
    case 'medium': return 'text-amber-700 bg-amber-100';
    case 'high': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 750) return 'text-green-600';
  if (score >= 650) return 'text-amber-600';
  return 'text-red-600';
}




