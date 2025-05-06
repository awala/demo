import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { DevMessage, DevFeedback, DevFeedbackCategory } from '../../../models/dev';
import { cn, formatTimestamp } from '../../../lib/utils';
import FeedbackBadge from '../../ConversationDetail/Feedback/FeedbackBadge';
import FeedbackForm from '../../ConversationDetail/Feedback/FeedbackForm';

interface DevMessageBubbleProps {
  message: DevMessage;
  feedback?: DevFeedback;
  onFeedbackSubmit: (messageId: string, data: { category: DevFeedbackCategory; comment?: string }) => void;
}

const DevMessageBubble: React.FC<DevMessageBubbleProps> = ({
  message,
  feedback,
  onFeedbackSubmit,
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleFeedbackSubmit = (data: { category: DevFeedbackCategory; comment?: string }) => {
    onFeedbackSubmit(message.id, data);
    setShowFeedbackForm(false);
  };

  return (
    <div
      className={cn(
        'mb-4',
        message.sender === 'user' ? 'text-right' : 'text-left'
      )}
    >
      <div
        className={cn(
          'inline-block max-w-[80%] rounded-lg px-4 py-2',
          message.sender === 'user'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 text-gray-900'
        )}
      >
        <div className="text-sm mb-1">
          {message.sender === 'user' ? 'Test User' : 'AI'}
        </div>
        <div className="text-sm whitespace-pre-wrap">
          {message.content}
        </div>
        <div className="text-xs mt-1 opacity-75">
          {formatTimestamp(message.timestamp, true)}
        </div>
      </div>

      {message.sender === 'ai' && (
        <div className="mt-1">
          {feedback ? (
            <FeedbackBadge
              category={feedback.category}
              comment={feedback.comment}
            />
          ) : !showFeedbackForm && (
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
            >
              <MessageSquarePlus className="w-3 h-3" />
              Give feedback
            </button>
          )}

          {showFeedbackForm && (
            <div className="mt-2">
              <FeedbackForm
                messageId={message.id}
                conversationId={message.userId}
                onSubmit={handleFeedbackSubmit}
                onCancel={() => setShowFeedbackForm(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DevMessageBubble;