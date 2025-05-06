import React, { useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import ConversationsPage from './pages/ConversationsPage';
import SideNav from './components/Navigation/SideNav';
import EmptyState from './components/EmptyState';
import KnowledgePanel from './components/KnowledgePanel/KnowledgePanel';
import TestUsersPanel from './components/DevMode/TestUsersPanel/TestUsersPanel';
import HumanTicketsPage from './pages/HumanTicketsPage';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardPage />;
      case 'conversations':
        return <ConversationsPage />;
      case 'knowledge':
        return <KnowledgePanel />;
      case 'test-users':
        return <TestUsersPanel />;
      case 'human-tickets':
        return <HumanTicketsPage />;
      default:
        return <EmptyState />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="flex-1">
        <main className="h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;