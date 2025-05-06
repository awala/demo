import { Feedback, FeedbackCategory } from '../models/feedback';

// Mock feedback data store
const mockFeedback: Record<string, Feedback[]> = {};

export async function submitFeedback(
  conversationId: string,
  messageId: string,
  data: {
    category: FeedbackCategory;
    comment?: string;
  }
): Promise<{ feedback: Feedback }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const feedback: Feedback = {
    id: `fb-${Date.now()}`,
    messageId,
    conversationId,
    category: data.category,
    comment: data.comment,
    createdBy: 'current-agent', // In a real app, this would come from auth
    createdAt: new Date().toISOString(),
  };

  if (!mockFeedback[conversationId]) {
    mockFeedback[conversationId] = [];
  }
  mockFeedback[conversationId].push(feedback);

  return { feedback };
}

export async function fetchFeedback(conversationId: string): Promise<{ data: Feedback[] }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    data: mockFeedback[conversationId] || [],
  };
}