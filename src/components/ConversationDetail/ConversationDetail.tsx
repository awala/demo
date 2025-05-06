import React, { useEffect, useState } from 'react';
import { ArrowLeft, MoreHorizontal, Check, X, Send } from 'lucide-react';
import MessageList from './MessageList';
import { Message } from '../../models/message';
import { Feedback, FeedbackCategory } from '../../models/feedback';
import { fetchMessages } from '../../api/conversations';
import { fetchFeedback, submitFeedback } from '../../api/feedback';
import { cn } from '../../lib/utils';

interface ConversationDetailProps {
  conversationId: string | null;
  onBack?: () => void;
  isMobile?: boolean;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({ 
  conversationId, 
  onBack,
  isMobile = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      setFeedback({});
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const [messagesResponse, feedbackResponse] = await Promise.all([
          fetchMessages(conversationId),
          fetchFeedback(conversationId),
        ]);
        
        setMessages(messagesResponse.data);
        
        // Index feedback by messageId for easy lookup
        const feedbackMap = feedbackResponse.data.reduce((acc, fb) => {
          acc[fb.messageId] = fb;
          return acc;
        }, {} as Record<string, Feedback>);
        
        setFeedback(feedbackMap);
      } catch (error) {
        console.error('Failed to fetch conversation data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [conversationId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !conversationId) return;
    
    // Optimistic update (in a real app, this would be sent to an API)
    const mockNewMessage: Message = {
      id: `new-${Date.now()}`,
      conversationId,
      sender: 'agent',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, mockNewMessage]);
    setNewMessage('');
  };

  const handleFeedbackSubmit = async (
    messageId: string,
    data: { category: FeedbackCategory; comment?: string }
  ) => {
    if (!conversationId) return;

    try {
      const response = await submitFeedback(conversationId, messageId, data);
      setFeedback((prev) => ({
        ...prev,
        [messageId]: response.feedback,
      }));
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  if (!conversationId) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-4 text-gray-500">
        <p className="text-lg mb-2">Select a conversation</p>
        <p className="text-sm text-center max-w-md">
          Choose a conversation from the list to view the message history
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col h-full bg-white",
      isMobile ? "absolute inset-0 z-10" : ""
    )}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
        {isMobile && (
          <button 
            onClick={onBack} 
            className="p-1 mr-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        
        <div>
          <h2 className="font-semibold">Conversation Details</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Check className="h-5 w-5 text-success-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-error-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <MessageList 
          messages={messages}
          feedback={feedback}
          loading={loading}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-end">
          <div className="flex-1 mr-2">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none min-h-[80px]"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={cn(
              "p-3 rounded-full",
              newMessage.trim()
                ? "bg-primary-500 text-white hover:bg-primary-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationDetail;