// A test user persona
export interface TestUser {
  id: string;            // UUID
  profile: string;       // full free-form text
  snippet: string;       // first 80 chars or so, for the table
  lastUpdated: string;   // ISO timestamp of last chat activity
  feedbackDone: boolean; // has any feedback been submitted in this chat?
}

// A message in a dev chat
export interface DevMessage {
  id: string;            // UUID
  userId: string;        // FK → TestUser.id
  sender: "user" | "ai";
  content: string;
  timestamp: string;     // ISO string
}

export type DevFeedbackCategory =
  | "should_mention_previous"
  | "unnecessary_information"
  | "connect_to_human"
  | "other";

export interface DevFeedback {
  id: string;
  messageId: string;
  userId: string;
  category: DevFeedbackCategory;
  comment?: string;
  createdAt: string;
}