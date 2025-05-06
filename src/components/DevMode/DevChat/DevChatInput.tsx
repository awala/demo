import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface DevChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

const DevChatInput: React.FC<DevChatInputProps> = ({ onSend, disabled }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() || disabled) return;
    
    onSend(content.trim());
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your message..."
            rows={3}
            disabled={disabled}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={!content.trim() || disabled}
          className={cn(
            "p-3 rounded-full",
            content.trim() && !disabled
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default DevChatInput;