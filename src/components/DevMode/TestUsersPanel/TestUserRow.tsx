import React from 'react';
import { CheckCircle, MinusCircle } from 'lucide-react';
import { TestUser } from '../../../models/dev';
import { cn, formatTimestamp } from '../../../lib/utils';

interface TestUserRowProps {
  user: TestUser;
  selected: boolean;
  onClick: () => void;
}

const TestUserRow: React.FC<TestUserRowProps> = ({ user, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 cursor-pointer hover:bg-gray-50',
        selected && 'bg-primary-50 border-l-4 border-l-primary-500'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.snippet}
          </p>
          <p className="text-xs text-gray-500">
            ID: {user.id}
          </p>
        </div>
        
        <div className="ml-4 flex items-center">
          {user.feedbackDone ? (
            <CheckCircle className="w-4 h-4 text-success-500" />
          ) : (
            <MinusCircle className="w-4 h-4 text-gray-300" />
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Last updated: {formatTimestamp(user.lastUpdated)}
      </div>
    </div>
  );
};

export default TestUserRow;