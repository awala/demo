import { KnowledgeItem, KnowledgeType } from '../models/knowledge';

// Mock data store
const mockKnowledge: KnowledgeItem[] = [
  {
    id: '1',
    title: 'Return Policy FAQ',
    type: 'link',
    url: 'https://example.com/return-policy',
    uploadedAt: '2025-03-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Product Care Guide',
    type: 'pdf',
    fileKey: 'product-care-guide.pdf',
    uploadedAt: '2025-03-14T15:30:00Z',
  },
];

export async function listKnowledge(): Promise<{ data: KnowledgeItem[] }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: [...mockKnowledge],
  };
}

export async function createKnowledge(data: {
  title: string;
  type: KnowledgeType;
  url?: string;
  file?: File;
}): Promise<{ item: KnowledgeItem }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newItem: KnowledgeItem = {
    id: `k-${Date.now()}`,
    title: data.title,
    type: data.type,
    url: data.url,
    fileKey: data.file?.name,
    uploadedAt: new Date().toISOString(),
  };

  mockKnowledge.unshift(newItem);

  return { item: newItem };
}

export async function deleteKnowledge(id: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = mockKnowledge.findIndex(item => item.id === id);
  if (index !== -1) {
    mockKnowledge.splice(index, 1);
  }
}