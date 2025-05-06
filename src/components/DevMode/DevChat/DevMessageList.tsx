import React, { useRef, useEffect } from 'react';
import { DevMessage, DevFeedback, DevFeedbackCategory } from '../../../models/dev';
import { cn, formatTimestamp } from '../../../lib/utils';
import DevMessageBubble from './DevMessageBubble';

interface DevMessageListProps {
  messages: DevMessage[];
  feedback: Record<string, DevFeedback>;
  loading: boolean;
  onFeedbackSubmit: (messageId: string, data: { category: DevFeedbackCategory; comment?: string }) => void;
}

const DevMessageList: React.FC<DevMessageListProps> = ({ 
  messages, 
  feedback,
  loading,
  onFeedbackSubmit,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className={`h-20 bg-gray-100 rounded-lg w-3/4 ${i % 2 === 0 ? 'ml-auto' : ''}`}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <DevMessageBubble
            key={message.id}
            message={message}
            feedback={feedback[message.id]}
            onFeedbackSubmit={onFeedbackSubmit}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default DevMessageList;