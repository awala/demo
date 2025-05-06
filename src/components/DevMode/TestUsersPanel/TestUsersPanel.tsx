import React, { useState, useEffect } from 'react';
import { listTestUsers } from '../../../api/dev';
import { TestUser } from '../../../models/dev';
import TestUsersList from './TestUsersList';
import TestUserForm from './TestUserForm';
import DevChat from '../DevChat/DevChat';

const TestUsersPanel: React.FC = () => {
  const [users, setUsers] = useState<TestUser[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await listTestUsers();
        setUsers(response.data);
        if (response.data.length > 0 && !selectedId) {
          setSelectedId(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to load test users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleUserCreated = (user: TestUser) => {
    setUsers(prev => [user, ...prev]);
    setSelectedId(user.id);
    setShowForm(false);
  };

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-200">
        <TestUsersList
          users={users}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onOpenCreate={() => setShowForm(true)}
          loading={loading}
        />
      </div>
      
      <div className="w-2/3">
        {showForm ? (
          <TestUserForm
            onSubmit={handleUserCreated}
            onCancel={() => setShowForm(false)}
          />
        ) : selectedId ? (
          <DevChat userId={selectedId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a test user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default TestUsersPanel;