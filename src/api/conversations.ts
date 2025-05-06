import { Conversation } from '../models/conversation';
import { Message } from '../models/message';

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Return request – Order #1234',
    snippet: 'I would like to return my order due to wrong size.',
    updatedAt: '2025-05-01T10:30:00Z',
    status: 'open',
    channel: 'email',
  },
  {
    id: '2',
    title: 'Shipping delay – Order #5678',
    snippet: 'When will my order arrive? It was supposed to be here yesterday.',
    updatedAt: '2025-05-01T09:15:00Z',
    status: 'open',
    channel: 'whatsapp',
    assignedTo: 'agent1',
  },
  {
    id: '3',
    title: 'Product question – Wireless headphones',
    snippet: 'Do these headphones work with Android devices?',
    updatedAt: '2025-04-30T16:45:00Z',
    status: 'closed',
    channel: 'widget',
  },
  {
    id: '4',
    title: 'Billing issue – Subscription renewal',
    snippet: 'I was charged twice for my monthly subscription.',
    updatedAt: '2025-04-30T14:20:00Z',
    status: 'open',
    channel: 'email',
  },
  {
    id: '5',
    title: 'Account access – Password reset',
    snippet: 'I cannot log in to my account after resetting my password.',
    updatedAt: '2025-04-29T11:10:00Z',
    status: 'closed',
    channel: 'widget',
  },
];

// Mock data for messages
const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      conversationId: '1',
      sender: 'user',
      content: 'Hello, I would like to return my order #1234 because I received the wrong size. I ordered a medium but received a small.',
      timestamp: '2025-05-01T10:15:00Z',
    },
    {
      id: '102',
      conversationId: '1',
      sender: 'ai',
      content: 'I understand you want to return order #1234 due to receiving the wrong size. I can help you with that process. Could you please confirm your email address associated with the order?',
      timestamp: '2025-05-01T10:17:00Z',
    },
    {
      id: '103',
      conversationId: '1',
      sender: 'user',
      content: 'My email is customer@example.com',
      timestamp: '2025-05-01T10:20:00Z',
    },
    {
      id: '104',
      conversationId: '1',
      sender: 'ai',
      content: 'Thank you for confirming. I\'ve found your order. I\'ll send you a return label to your email shortly. Once you receive it, print it and attach it to the package. Would you like a replacement in medium size or a refund?',
      timestamp: '2025-05-01T10:25:00Z',
    },
    {
      id: '105',
      conversationId: '1',
      sender: 'user',
      content: 'I would like a replacement in medium size, please.',
      timestamp: '2025-05-01T10:30:00Z',
    },
  ],
  '2': [
    {
      id: '201',
      conversationId: '2',
      sender: 'user',
      content: 'Hi, I\'m still waiting for my order #5678. It was supposed to arrive yesterday but I haven\'t received it yet. Can you check the status?',
      timestamp: '2025-05-01T09:00:00Z',
    },
    {
      id: '202',
      conversationId: '2',
      sender: 'ai',
      content: 'I apologize for the delay with your order #5678. Let me check the shipping status for you right away.',
      timestamp: '2025-05-01T09:02:00Z',
    },
    {
      id: '203',
      conversationId: '2',
      sender: 'ai',
      content: 'I found your order. It looks like there was a slight delay at our distribution center. The package is now in transit and should be delivered by tomorrow. The tracking number is TRK123456789.',
      timestamp: '2025-05-01T09:05:00Z',
    },
    {
      id: '204',
      conversationId: '2',
      sender: 'user',
      content: 'That\'s disappointing. I needed it for an event today.',
      timestamp: '2025-05-01T09:10:00Z',
    },
    {
      id: '205',
      conversationId: '2',
      sender: 'agent',
      content: 'Hello, this is Sarah from customer support. I understand your frustration. As a goodwill gesture, I\'d like to offer you a 15% discount on your next purchase. Would that help?',
      timestamp: '2025-05-01T09:15:00Z',
    },
  ],
  '3': [
    {
      id: '301',
      conversationId: '3',
      sender: 'user',
      content: 'Do your wireless headphones work with Android devices? I have a Samsung Galaxy S22.',
      timestamp: '2025-04-30T16:30:00Z',
    },
    {
      id: '302',
      conversationId: '3',
      sender: 'ai',
      content: 'Yes, our wireless headphones are compatible with all Android devices, including your Samsung Galaxy S22. They connect via Bluetooth 5.0, which is fully supported by your phone.',
      timestamp: '2025-04-30T16:32:00Z',
    },
    {
      id: '303',
      conversationId: '3',
      sender: 'user',
      content: 'Great! What\'s the battery life like?',
      timestamp: '2025-04-30T16:35:00Z',
    },
    {
      id: '304',
      conversationId: '3',
      sender: 'ai',
      content: 'The headphones offer up to 30 hours of playback time on a single charge. The charging case provides an additional 20 hours, giving you a total of 50 hours before you need to recharge the case.',
      timestamp: '2025-04-30T16:38:00Z',
    },
    {
      id: '305',
      conversationId: '3',
      sender: 'user',
      content: 'Perfect, thank you!',
      timestamp: '2025-04-30T16:42:00Z',
    },
    {
      id: '306',
      conversationId: '3',
      sender: 'ai',
      content: 'You\'re welcome! If you have any other questions, feel free to ask. Enjoy your day!',
      timestamp: '2025-04-30T16:45:00Z',
    },
  ],
  '4': [
    {
      id: '401',
      conversationId: '4',
      sender: 'user',
      content: 'I was charged twice for my monthly subscription this month. Can you help me get a refund for the duplicate charge?',
      timestamp: '2025-04-30T14:00:00Z',
    },
    {
      id: '402',
      conversationId: '4',
      sender: 'ai',
      content: 'I\'m sorry to hear about the duplicate charge. Let me look into this for you. Could you please provide the email address associated with your subscription?',
      timestamp: '2025-04-30T14:05:00Z',
    },
    {
      id: '403',
      conversationId: '4',
      sender: 'user',
      content: 'My email is billing@example.com',
      timestamp: '2025-04-30T14:10:00Z',
    },
    {
      id: '404',
      conversationId: '4',
      sender: 'ai',
      content: 'Thank you. I can confirm that there was indeed a duplicate charge on your account on April 28th. I\'ve initiated a refund for the second charge, which should be processed within 3-5 business days. You\'ll receive a confirmation email shortly.',
      timestamp: '2025-04-30T14:15:00Z',
    },
    {
      id: '405',
      conversationId: '4',
      sender: 'user',
      content: 'Thank you for resolving this quickly.',
      timestamp: '2025-04-30T14:20:00Z',
    },
  ],
  '5': [
    {
      id: '501',
      conversationId: '5',
      sender: 'user',
      content: 'I reset my password yesterday but now I can\'t log in to my account. It says "invalid credentials" every time I try.',
      timestamp: '2025-04-29T11:00:00Z',
    },
    {
      id: '502',
      conversationId: '5',
      sender: 'ai',
      content: 'I\'m sorry you\'re having trouble accessing your account. Let\'s troubleshoot this issue. Could you tell me the email address you\'re using to log in?',
      timestamp: '2025-04-29T11:02:00Z',
    },
    {
      id: '503',
      conversationId: '5',
      sender: 'user',
      content: 'I\'m using access@example.com',
      timestamp: '2025-04-29T11:05:00Z',
    },
    {
      id: '504',
      conversationId: '5',
      sender: 'ai',
      content: 'Thank you. I\'ve checked your account and it looks like there might be a case sensitivity issue with your new password. Let\'s reset it again to be safe. I\'ll send a password reset link to access@example.com now. Please check your email and follow the instructions.',
      timestamp: '2025-04-29T11:07:00Z',
    },
    {
      id: '505',
      conversationId: '5',
      sender: 'user',
      content: 'Got it, thanks. I\'ll check my email and try again.',
      timestamp: '2025-04-29T11:10:00Z',
    },
  ],
};

// API functions
export async function listConversations(params?: {
  status?: 'open' | 'closed' | 'all';
  page?: number;
  pageSize?: number;
}): Promise<{
  data: Conversation[];
  meta: { page: number; pageSize: number; total: number };
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const { status = 'all', page = 1, pageSize = 20 } = params || {};

  let filtered = [...mockConversations];
  
  if (status !== 'all') {
    filtered = filtered.filter(conv => conv.status === status);
  }

  // Sort by updatedAt (newest first)
  filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paged = filtered.slice(start, end);

  return {
    data: paged,
    meta: {
      page,
      pageSize,
      total: filtered.length,
    },
  };
}

export async function fetchMessages(conversationId: string, params?: {
  limit?: number;
  before?: string;
}): Promise<{ data: Message[] }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const { limit = 50 } = params || {};
  
  const messages = mockMessages[conversationId] || [];
  
  // Sort by timestamp (oldest first - for conversation flow)
  const sorted = [...messages].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  return {
    data: sorted.slice(0, limit),
  };
}