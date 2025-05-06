import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ConversationDetail from '../ConversationDetail/ConversationDetail';

interface EmailDetailProps {
  conversationId: string | null;
  onBack?: () => void;
  isMobile?: boolean;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ conversationId, onBack, isMobile }) => {
  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select an email to view details</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {isMobile && onBack && (
        <div className="p-4 border-b">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Emails
          </button>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        <ConversationDetail conversationId={conversationId} />
      </div>
    </div>
  );
};

export default EmailDetail;