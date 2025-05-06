import React from 'react';
import { FileText, Link as LinkIcon } from 'lucide-react';
import { KnowledgeItem } from '../../models/knowledge';
import { cn, formatTimestamp } from '../../lib/utils';

interface KnowledgeListItemProps {
  item: KnowledgeItem;
  selected: boolean;
  onClick: () => void;
}

const KnowledgeListItem: React.FC<KnowledgeListItemProps> = ({
  item,
  selected,
  onClick,
}) => {
  const Icon = item.type === 'pdf' ? FileText : LinkIcon;

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50',
        selected && 'bg-primary-50 border-l-4 border-l-primary-500'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'p-2 rounded-lg',
          item.type === 'pdf' ? 'bg-error-100 text-error-700' : 'bg-success-100 text-success-700'
        )}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
          <p className="text-sm text-gray-500">
            Added {formatTimestamp(item.uploadedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeListItem;