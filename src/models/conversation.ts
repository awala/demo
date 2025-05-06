export type ConversationStatus = 
  | "open" 
  | "closed"
  | "pending_receipt"
  | "awaiting_review"
  | "resolved";

export type ConversationChannel = 
  | "email" 
  | "whatsapp" 
  | "widget";

export interface ReceiptData {
  date: string;
  products: string[];
  total: number;
}

export interface Conversation {
  id: string;
  title: string;
  snippet: string;
  updatedAt: string;
  status: ConversationStatus;
  channel: ConversationChannel;
  assignedTo?: string;
  subject?: string;        // For email threads
  receiptData?: ReceiptData; // OCR extracted data
  lastReminderSent?: string; // Timestamp of last reminder
  draftResponse?: string;    // For human review
}