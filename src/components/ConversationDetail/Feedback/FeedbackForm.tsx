import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FeedbackCategory } from '../../../models/feedback';
import { cn } from '../../../lib/utils';

interface FeedbackFormProps {
  messageId: string;
  conversationId: string;
  onSubmit: (data: { category: FeedbackCategory; comment?: string }) => void;
  onCancel: () => void;
}

const categoryOptions: { value: FeedbackCategory; label: string }[] = [
  { value: 'should_mention_previous', label: 'Should mentioned a previous issue' },
  { value: 'unnecessary_information', label: 'Unnecessary information' },
  { value: 'connect_to_human', label: 'Should connect to a human' },
  { value: 'other', label: 'Other' },
];

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  messageId,
  conversationId,
  onSubmit,
  onCancel,
}) => {
  const [category, setCategory] = useState<FeedbackCategory | ''>('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category) {
      setError('Please select a feedback category');
      return;
    }

    onSubmit({
      category,
      comment: comment.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-900">Give Feedback</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {categoryOptions.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-center p-3 rounded-lg border cursor-pointer transition-colors',
              category === option.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:bg-gray-50'
            )}
          >
            <input
              type="radio"
              name="category"
              value={option.value}
              checked={category === option.value}
              onChange={(e) => {
                setCategory(e.target.value as FeedbackCategory);
                setError(null);
              }}
              className="sr-only"
            />
            <span className="text-sm text-gray-900">{option.label}</span>
          </label>
        ))}
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Comments
        </label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add any specific details or context..."
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

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
          className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;