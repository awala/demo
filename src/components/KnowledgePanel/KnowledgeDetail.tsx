import React, { useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { KnowledgeItem } from '../../models/knowledge';
import { formatTimestamp } from '../../lib/utils';

interface KnowledgeDetailProps {
  item: KnowledgeItem | null | undefined;
  onDelete: (id: string) => void;
}

const KnowledgeDetail: React.FC<KnowledgeDetailProps> = ({ item, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center p-8 bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500">
            Select a knowledge item to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
            <p className="text-sm text-gray-500">
              Added {formatTimestamp(item.uploadedAt, true)}
            </p>
          </div>
          
          {!showDeleteConfirm && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-gray-400 hover:text-error-600 rounded-lg hover:bg-error-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-error-50 rounded-lg">
            <p className="text-sm text-error-700 mb-3">
              Are you sure you want to delete this knowledge item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-error-600 rounded-md hover:bg-error-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Type</h3>
            <p className="text-sm text-gray-900 capitalize">{item.type}</p>
          </div>

          {item.type === 'link' && item.url && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">URL</h3>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                {item.url}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {item.type === 'pdf' && item.fileKey && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">File</h3>
              <p className="text-sm text-gray-900">{item.fileKey}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeDetail;