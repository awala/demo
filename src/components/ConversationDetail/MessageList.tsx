import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../../models/message';
import { Feedback, FeedbackCategory } from '../../models/feedback';

interface MessageListProps {
  messages: Message[];
  feedback: Record<string, Feedback>;
  loading: boolean;
  onFeedbackSubmit: (messageId: string, data: { category: FeedbackCategory; comment?: string }) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
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
      <div className="p-4 space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`animate-pulse flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className="rounded-lg h-24 bg-gray-100 w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
        <p>No messages in this conversation</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          feedback={feedback[message.id]}
          onFeedbackSubmit={(data) => onFeedbackSubmit(message.id, data)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;