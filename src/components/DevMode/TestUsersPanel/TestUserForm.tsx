import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createTestUser } from '../../../api/dev';
import { TestUser } from '../../../models/dev';

interface TestUserFormProps {
  onSubmit: (user: TestUser) => void;
  onCancel: () => void;
}

const TestUserForm: React.FC<TestUserFormProps> = ({ onSubmit, onCancel }) => {
  const [profile, setProfile] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!profile.trim()) {
      setError('Profile is required');
      return;
    }

    setSubmitting(true);
    try {
      const response = await createTestUser(profile);
      onSubmit(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create test user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">New Test User</h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile
          </label>
          <div className="text-xs text-gray-500 mb-2">
            Must include: skin type, skin concerns, and allergies/sensitivities
          </div>
          <textarea
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            rows={10}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Name: John Doe&#10;Age: 30&#10;Skin Type: Combination&#10;Skin Concerns: Acne, dark spots&#10;Allergies: None"
          />
        </div>

        {error && (
          <div className="mb-4 text-sm text-error-600">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Test User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestUserForm;