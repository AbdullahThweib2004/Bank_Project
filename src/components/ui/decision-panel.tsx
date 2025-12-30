import React from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';

interface DecisionPanelProps {
  title: string;
  decision: 'approve' | 'reject' | null;
  onDecisionChange: (decision: 'approve' | 'reject') => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  reasonLabel: string;
  reasonPlaceholder: string;
  reasonRequired: string;
  approveLabel: string;
  rejectLabel: string;
  submitLabel: string;
  onSubmit: () => void;
}

export function DecisionPanel({
  title,
  decision,
  onDecisionChange,
  reason,
  onReasonChange,
  reasonLabel,
  reasonPlaceholder,
  reasonRequired,
  approveLabel,
  rejectLabel,
  submitLabel,
  onSubmit,
}: DecisionPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
      <h2 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-pink-600" />
        {title}
      </h2>

      <div className="space-y-3 mb-6">
        <button
          onClick={() => onDecisionChange('approve')}
          className={`w-full px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            decision === 'approve'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          {approveLabel}
        </button>
        <button
          onClick={() => onDecisionChange('reject')}
          className={`w-full px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
            decision === 'reject'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <XCircle className="w-5 h-5" />
          {rejectLabel}
        </button>
      </div>

      {decision && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              {reasonLabel} <span className="text-red-600">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder={reasonPlaceholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
              rows={6}
              required
            />
            {decision && !reason.trim() && (
              <p className="text-sm text-red-600 mt-1">{reasonRequired}</p>
            )}
          </div>

          <button
            onClick={onSubmit}
            disabled={!reason.trim()}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitLabel}
          </button>
        </div>
      )}
    </div>
  );
}




