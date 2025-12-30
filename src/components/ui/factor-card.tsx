import React from 'react';

interface Factor {
  label: string;
  value: string;
}

interface FactorCardProps {
  factors: Factor[];
  type: 'positive' | 'negative';
}

export function FactorCard({ factors, type }: FactorCardProps) {
  const isPositive = type === 'positive';
  const bgColor = isPositive ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isPositive ? 'border-green-200' : 'border-red-200';
  const labelColor = isPositive ? 'text-green-900' : 'text-red-900';
  const valueColor = isPositive ? 'text-green-700' : 'text-red-700';

  return (
    <div className="space-y-3">
      {factors.map((factor, index) => (
        <div key={index} className={`p-3 ${bgColor} rounded-lg border ${borderColor}`}>
          <div className={`text-sm ${labelColor} mb-1`}>{factor.label}</div>
          <div className={`text-sm ${valueColor}`}>{factor.value}</div>
        </div>
      ))}
    </div>
  );
}




