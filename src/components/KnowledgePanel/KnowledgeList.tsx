import React from 'react';
import { Plus } from 'lucide-react';
import { KnowledgeItem } from '../../models/knowledge';
import KnowledgeListItem from './KnowledgeListItem';

interface KnowledgeListProps {
  items: KnowledgeItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpenCreate: () => void;
  loading: boolean;
}

const KnowledgeList: React.FC<KnowledgeListProps> = ({
  items,
  selectedId,
  onSelect,
  onOpenCreate,
  loading,
}) => {
  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onOpenCreate}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="w-4 h-4" />
          Add Knowledge
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No knowledge items yet
          </div>
        ) : (
          items.map((item) => (
            <KnowledgeListItem
              key={item.id}
              item={item}
              selected={item.id === selectedId}
              onClick={() => onSelect(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgeList;