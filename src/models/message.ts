export type MessageSender = "user" | "agent" | "ai" | "system";

export interface MessageAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  isReceipt?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  subject?: string;      // For email messages
  quotedText?: string;   // For email replies
  attachments?: MessageAttachment[];
}