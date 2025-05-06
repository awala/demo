import React from 'react';
import { Sparkles } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-8">
      <div className="bg-primary-100 p-3 rounded-full mb-4">
        <Sparkles className="w-8 h-8 text-primary-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Explore Agent View
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        Select a section from the navigation menu to get started with managing your AI-powered customer support.
      </p>
    </div>
  );
};

export default EmptyState;