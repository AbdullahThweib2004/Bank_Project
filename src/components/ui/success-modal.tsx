import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface SuccessModalProps {
  title: string;
  message: string;
  actionType: 'approve' | 'reject';
  onClose: () => void;
  closeLabel: string;
}

export function SuccessModal({ title, message, actionType, onClose, closeLabel }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            actionType === 'approve' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {actionType === 'approve' ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h3 className="text-xl text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}




