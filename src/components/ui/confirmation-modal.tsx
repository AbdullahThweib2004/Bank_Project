import React from 'react';

interface ConfirmationModalProps {
  title: string;
  message: string;
  actionLabel: string;
  actionType: 'approve' | 'reject';
  onConfirm: () => void;
  onCancel: () => void;
  cancelLabel: string;
}

export function ConfirmationModal({
  title,
  message,
  actionLabel,
  actionType,
  onConfirm,
  onCancel,
  cancelLabel,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
              actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}




