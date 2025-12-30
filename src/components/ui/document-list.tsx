import React from 'react';
import { FileText } from 'lucide-react';

interface Document {
  name: string;
  type: string;
}

interface DocumentListProps {
  documents: Document[];
  viewLabel: string;
  onView?: (doc: Document) => void;
}

export function DocumentList({ documents, viewLabel, onView }: DocumentListProps) {
  return (
    <div className="space-y-3">
      {documents.map((doc, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <div className="text-gray-900">{doc.name}</div>
              <div className="text-sm text-gray-600">{doc.type}</div>
            </div>
          </div>
          <button
            onClick={() => onView?.(doc)}
            className="px-3 py-1.5 text-sm text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
          >
            {viewLabel}
          </button>
        </div>
      ))}
    </div>
  );
}




