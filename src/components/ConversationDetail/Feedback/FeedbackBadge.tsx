import React from 'react';
import { MessageSquareWarning } from 'lucide-react';
import { FeedbackCategory } from '../../../models/feedback';
import { cn } from '../../../lib/utils';

interface FeedbackBadgeProps {
  category: FeedbackCategory;
  comment?: string;
}

const categoryLabels: Record<FeedbackCategory, string> = {
  should_mention_previous: 'Should mentioned a previous issue',
  unnecessary_information: 'Unnecessary information',
  connect_to_human: 'Should connect to a human',
  other: 'Other',
};

const FeedbackBadge: React.FC<FeedbackBadgeProps> = ({ category, comment }) => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-warning-50 text-warning-700 text-xs">
      <MessageSquareWarning className="w-3 h-3" />
      <span>{categoryLabels[category]}</span>
      {comment && (
        <span className="sr-only">Comment: {comment}</span>
      )}
    </div>
  );
};

export default FeedbackBadge;