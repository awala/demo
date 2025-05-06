import { TestUser, DevMessage, DevFeedback, DevFeedbackCategory } from '../models/dev';

// Mock data store
const mockTestUsers: TestUser[] = [
  {
    id: '1',
    profile: 'Name: Sarah Johnson\nAge: 32\nSkin Type: Combination\nSkin Concerns: Acne, dark spots\nAllergies: None',
    snippet: 'Sarah Johnson, 32, Combination skin, Acne concerns',
    lastUpdated: '2025-03-15T10:00:00Z',
    feedbackDone: true,
  },
  {
    id: '2',
    profile: 'Name: Mike Chen\nAge: 28\nSkin Type: Oily\nSkin Concerns: Large pores, shine\nAllergies: Fragrance sensitivity',
    snippet: 'Mike Chen, 28, Oily skin, Pore concerns',
    lastUpdated: '2025-03-14T15:30:00Z',
    feedbackDone: false,
  },
];

const mockMessages: Record<string, DevMessage[]> = {
  '1': [
    {
      id: 'm1',
      userId: '1',
      sender: 'user',
      content: 'I need help with my acne scars',
      timestamp: '2025-03-15T10:00:00Z',
    },
    {
      id: 'm2',
      userId: '1',
      sender: 'ai',
      content: 'I understand you\'re looking to address acne scars. Given your combination skin type, I\'d recommend...',
      timestamp: '2025-03-15T10:00:05Z',
    },
  ],
};

const mockFeedback: Record<string, DevFeedback[]> = {};

export async function listTestUsers(): Promise<{ data: TestUser[] }> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { data: [...mockTestUsers] };
}

export async function createTestUser(profile: string): Promise<{ user: TestUser }> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validation
  const required = ['skin type', 'skin concerns', 'allergies'];
  const missing = required.filter(term => 
    !profile.toLowerCase().includes(term.toLowerCase())
  );
  
  if (missing.length > 0) {
    throw new Error(`Profile must include: ${missing.join(', ')}`);
  }

  const user: TestUser = {
    id: `test-${Date.now()}`,
    profile,
    snippet: profile.split('\n')[0].slice(0, 80) + '...',
    lastUpdated: new Date().toISOString(),
    feedbackDone: false,
  };

  mockTestUsers.unshift(user);
  return { user };
}

export async function getMessages(
  userId: string,
  params?: { limit?: number }
): Promise<{ data: DevMessage[] }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    data: mockMessages[userId] || [],
  };
}

export async function sendMessage(
  userId: string,
  content: string
): Promise<{ message: DevMessage; reply: DevMessage }> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const timestamp = new Date().toISOString();
  
  const message: DevMessage = {
    id: `m-${Date.now()}`,
    userId,
    sender: 'user',
    content,
    timestamp,
  };

  const reply: DevMessage = {
    id: `m-${Date.now() + 1}`,
    userId,
    sender: 'ai',
    content: `This is a mock AI response to: "${content}"`,
    timestamp: new Date(Date.parse(timestamp) + 5000).toISOString(),
  };

  if (!mockMessages[userId]) {
    mockMessages[userId] = [];
  }
  
  mockMessages[userId].push(message, reply);

  // Update lastUpdated
  const user = mockTestUsers.find(u => u.id === userId);
  if (user) {
    user.lastUpdated = timestamp;
  }

  return { message, reply };
}

export async function submitDevFeedback(
  userId: string,
  messageId: string,
  data: {
    category: DevFeedbackCategory;
    comment?: string;
  }
): Promise<{ feedback: DevFeedback }> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const feedback: DevFeedback = {
    id: `fb-${Date.now()}`,
    messageId,
    userId,
    category: data.category,
    comment: data.comment,
    createdAt: new Date().toISOString(),
  };

  if (!mockFeedback[userId]) {
    mockFeedback[userId] = [];
  }
  mockFeedback[userId].push(feedback);

  // Update feedbackDone status
  const user = mockTestUsers.find(u => u.id === userId);
  if (user) {
    user.feedbackDone = true;
  }

  return { feedback };
}

export async function getDevFeedback(userId: string): Promise<{ data: DevFeedback[] }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { data: mockFeedback[userId] || [] };
}