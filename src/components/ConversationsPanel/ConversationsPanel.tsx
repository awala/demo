import React, { useEffect, useState } from 'react';
import { Inbox, Search, Filter } from 'lucide-react';
import ConversationList from './ConversationList';
import { Conversation } from '../../models/conversation';
import { listConversations } from '../../api/conversations';

interface ConversationsPanelProps {
  onSelectConversation: (id: string) => void;
  selectedId: string | null;
}

const ConversationsPanel: React.FC<ConversationsPanelProps> = ({
  onSelectConversation,
  selectedId,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'all' | 'open' | 'closed'>('all');

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await listConversations({ status });
        setConversations(response.data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [status]);

  const handleStatusChange = (newStatus: 'all' | 'open' | 'closed') => {
    setStatus(newStatus);
  };

  return (
    <div className="flex flex-col h-full border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Inbox className="h-5 w-5 text-primary-500" />
            Conversations
          </h2>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Status:</span>
        </div>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'all'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleStatusChange('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'open'
                ? 'bg-success-100 text-success-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleStatusChange('open')}
          >
            Open
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-full ${
              status === 'closed'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => handleStatusChange('closed')}
          >
            Closed
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={onSelectConversation}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ConversationsPanel;