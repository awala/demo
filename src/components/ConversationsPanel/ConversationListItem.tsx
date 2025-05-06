import React from 'react';
import { Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { Conversation } from '../../models/conversation';
import { cn, formatTimestamp, getChannelIcon } from '../../lib/utils';

interface ConversationListItemProps {
  conversation: Conversation;
  selected: boolean;
  onClick: () => void;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({
  conversation,
  selected,
  onClick,
}) => {
  const { title, snippet, updatedAt, status, channel } = conversation;

  const renderChannelIcon = () => {
    const iconType = getChannelIcon(channel);
    
    switch (iconType) {
      case 'mail':
        return <Mail className="h-4 w-4" />;
      case 'message-square':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'border-b border-gray-200 p-4 cursor-pointer transition-colors hover:bg-gray-50',
        'animate-fade-in',
        selected ? 'bg-primary-50 border-l-4 border-l-primary-500' : ''
      )}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-gray-900 truncate mr-2">{title}</h3>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {formatTimestamp(updatedAt)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 truncate mb-2">{snippet}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span 
            className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              status === 'open' 
                ? 'bg-success-100 text-success-800' 
                : 'bg-gray-100 text-gray-800'
            )}
          >
            {status}
          </span>
          
          <span className="flex items-center text-xs text-gray-500">
            <span className="bg-gray-100 p-1 rounded-full mr-1">
              {renderChannelIcon()}
            </span>
            <span className="capitalize">{channel}</span>
          </span>
        </div>
        
        {conversation.assignedTo && (
          <span className="text-xs bg-secondary-100 text-secondary-800 px-2 py-0.5 rounded-full">
            Assigned
          </span>
        )}
      </div>
    </div>
  );
};

export default ConversationListItem;