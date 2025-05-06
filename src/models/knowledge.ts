export type KnowledgeType = "link" | "pdf";

export interface KnowledgeItem {
  id: string;
  title: string;
  type: KnowledgeType;
  url?: string;
  fileKey?: string;
  uploadedAt: string;
}