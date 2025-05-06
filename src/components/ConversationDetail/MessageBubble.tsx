import React, { useState } from 'react';
import { User, Bot, Check, MessageSquarePlus } from 'lucide-react';
import { Message } from '../../models/message';
import { Feedback, FeedbackCategory } from '../../models/feedback';
import { cn, formatTimestamp } from '../../lib/utils';
import FeedbackBadge from './Feedback/FeedbackBadge';
import FeedbackForm from './Feedback/FeedbackForm';

interface MessageBubbleProps {
  message: Message;
  feedback?: Feedback | null;
  onFeedbackSubmit: (data: { category: FeedbackCategory; comment?: string }) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  feedback,
  onFeedbackSubmit,
}) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  const isUser = message.sender === 'user';
  const isAgent = message.sender === 'agent';
  const isAI = message.sender === 'ai';

  const renderIcon = () => {
    if (isUser) {
      return (
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-gray-600" />
        </div>
      );
    } else if (isAI) {
      return (
        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-primary-600" />
        </div>
      );
    } else {
      return (
        <div className="h-8 w-8 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0">
          <Check className="h-4 w-4 text-secondary-600" />
        </div>
      );
    }
  };

  const handleFeedbackSubmit = (data: { category: FeedbackCategory; comment?: string }) => {
    onFeedbackSubmit(data);
    setShowFeedbackForm(false);
  };

  return (
    <div
      className={cn(
        'flex mb-4 animate-fade-in',
        isUser ? 'justify-start' : 'justify-end'
      )}
    >
      <div
        className={cn(
          'flex max-w-[80%] flex-col',
          isUser ? 'items-start' : 'items-end'
        )}
      >
        <div
          className={cn(
            'flex max-w-full',
            isUser ? 'flex-row' : 'flex-row-reverse'
          )}
        >
          <div className={cn('m-1', isUser ? 'mr-2' : 'ml-2')}>
            {renderIcon()}
          </div>
          
          <div
            className={cn(
              'rounded-lg px-4 py-3',
              isUser
                ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                : isAI
                ? 'bg-primary-50 text-gray-800 rounded-tr-none'
                : 'bg-secondary-50 text-gray-800 rounded-tr-none border-l-4 border-l-secondary-400'
            )}
          >
            <div className="flex items-center mb-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  isUser
                    ? 'text-gray-700'
                    : isAI
                    ? 'text-primary-700'
                    : 'text-secondary-700'
                )}
              >
                {isUser ? 'User' : isAI ? 'AI' : 'Support Agent'}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {formatTimestamp(message.timestamp, true)}
              </span>
            </div>
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>

        {isAI && (
          <div className={cn('mt-1', isUser ? 'ml-11' : 'mr-11')}>
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
          </div>
        )}

        {isAI && showFeedbackForm && (
          <div className={cn('mt-2', isUser ? 'ml-11' : 'mr-11')}>
            <FeedbackForm
              messageId={message.id}
              conversationId={message.conversationId}
              onSubmit={handleFeedbackSubmit}
              onCancel={() => setShowFeedbackForm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;