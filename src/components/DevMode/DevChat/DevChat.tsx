import React, { useState, useEffect } from 'react';
import { getMessages, sendMessage, getDevFeedback, submitDevFeedback } from '../../../api/dev';
import { DevMessage, DevFeedback, DevFeedbackCategory } from '../../../models/dev';
import DevMessageList from './DevMessageList';
import DevChatInput from './DevChatInput';

interface DevChatProps {
  userId: string;
}

const DevChat: React.FC<DevChatProps> = ({ userId }) => {
  const [messages, setMessages] = useState<DevMessage[]>([]);
  const [feedback, setFeedback] = useState<Record<string, DevFeedback>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [messagesResponse, feedbackResponse] = await Promise.all([
          getMessages(userId),
          getDevFeedback(userId),
        ]);
        
        setMessages(messagesResponse.data);
        
        // Index feedback by messageId for easy lookup
        const feedbackMap = feedbackResponse.data.reduce((acc, fb) => {
          acc[fb.messageId] = fb;
          return acc;
        }, {} as Record<string, DevFeedback>);
        
        setFeedback(feedbackMap);
      } catch (error) {
        console.error('Failed to load chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const handleSend = async (content: string) => {
    try {
      const response = await sendMessage(userId, content);
      setMessages(prev => [...prev, response.message, response.reply]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleFeedbackSubmit = async (
    messageId: string,
    data: { category: DevFeedbackCategory; comment?: string }
  ) => {
    try {
      const response = await submitDevFeedback(userId, messageId, data);
      setFeedback(prev => ({
        ...prev,
        [messageId]: response.feedback,
      }));
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <DevMessageList 
        messages={messages} 
        feedback={feedback}
        loading={loading}
        onFeedbackSubmit={handleFeedbackSubmit}
      />
      <DevChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
};

export default DevChat;