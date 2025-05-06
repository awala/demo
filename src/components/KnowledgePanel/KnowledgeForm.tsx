import React, { useState } from 'react';
import { X, Link as LinkIcon, FileText } from 'lucide-react';
import { KnowledgeType } from '../../models/knowledge';
import { cn } from '../../lib/utils';

interface KnowledgeFormProps {
  onSubmit: (data: {
    title: string;
    type: KnowledgeType;
    url?: string;
    file?: File;
  }) => void;
  onCancel: () => void;
}

const KnowledgeForm: React.FC<KnowledgeFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<KnowledgeType>('link');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (type === 'link' && !url.trim()) {
      setError('URL is required for link type');
      return;
    }

    if (type === 'pdf' && !file) {
      setError('PDF file is required');
      return;
    }

    onSubmit({
      title: title.trim(),
      type,
      url: type === 'link' ? url.trim() : undefined,
      file: type === 'pdf' ? file : undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else if (selectedFile) {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add Knowledge</h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="e.g., Return Policy FAQ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border cursor-pointer',
                type === 'link'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              <input
                type="radio"
                name="type"
                value="link"
                checked={type === 'link'}
                onChange={(e) => {
                  setType(e.target.value as KnowledgeType);
                  setError(null);
                }}
                className="sr-only"
              />
              <LinkIcon className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">Link</span>
            </label>

            <label
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border cursor-pointer',
                type === 'pdf'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:bg-gray-50'
              )}
            >
              <input
                type="radio"
                name="type"
                value="pdf"
                checked={type === 'pdf'}
                onChange={(e) => {
                  setType(e.target.value as KnowledgeType);
                  setError(null);
                }}
                className="sr-only"
              />
              <FileText className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">PDF</span>
            </label>
          </div>
        </div>

        {type === 'link' && (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="https://example.com/article"
            />
          </div>
        )}

        {type === 'pdf' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF File
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
            {file && (
              <p className="mt-2 text-sm text-success-600">
                Selected file: {file.name}
              </p>
            )}
          </div>
        )}

        {error && (
          <p className="text-sm text-error-600">{error}</p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            Add Knowledge
          </button>
        </div>
      </form>
    </div>
  );
};

export default KnowledgeForm;