import React, { useState, useEffect } from 'react';
import ConversationsPanel from '../components/ConversationsPanel/ConversationsPanel';
import ConversationDetail from '../components/ConversationDetail/ConversationDetail';
import { listConversations } from '../api/conversations';

const ConversationsPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-select the first conversation on initial load
  useEffect(() => {
    const selectFirstConversation = async () => {
      try {
        const response = await listConversations();
        if (response.data.length > 0) {
          setSelectedId(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch initial conversation:', error);
      }
    };

    selectFirstConversation();
  }, []);

  const handleSelectConversation = (id: string) => {
    setSelectedId(id);
    if (isMobile) {
      setShowMobileDetail(true);
    }
  };

  const handleBackToList = () => {
    setShowMobileDetail(false);
  };

  // Mobile layout
  if (isMobile) {
    return (
      <div className="h-screen bg-white">
        {!showMobileDetail ? (
          <ConversationsPanel
            onSelectConversation={handleSelectConversation}
            selectedId={selectedId}
          />
        ) : (
          <ConversationDetail
            conversationId={selectedId}
            onBack={handleBackToList}
            isMobile={true}
          />
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex h-screen bg-white">
      <div className="w-1/3 h-full">
        <ConversationsPanel
          onSelectConversation={handleSelectConversation}
          selectedId={selectedId}
        />
      </div>
      <div className="w-2/3 h-full">
        <ConversationDetail conversationId={selectedId} />
      </div>
    </div>
  );
};

export default ConversationsPage;