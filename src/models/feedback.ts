export type FeedbackCategory =
  | "should_mention_previous"
  | "unnecessary_information"
  | "connect_to_human"
  | "other";

export interface Feedback {
  id: string;
  messageId: string;
  conversationId: string;
  category: FeedbackCategory;
  comment?: string;
  createdBy: string;
  createdAt: string;
}