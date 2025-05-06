import React from 'react';
import { Plus, CheckCircle, MinusCircle } from 'lucide-react';
import { TestUser } from '../../../models/dev';
import { cn, formatTimestamp } from '../../../lib/utils';
import TestUserRow from './TestUserRow';

interface TestUsersListProps {
  users: TestUser[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpenCreate: () => void;
  loading: boolean;
}

const TestUsersList: React.FC<TestUsersListProps> = ({
  users,
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
          New Test User
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {users.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No test users yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <TestUserRow
                key={user.id}
                user={user}
                selected={user.id === selectedId}
                onClick={() => onSelect(user.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestUsersList;