import React from 'react';
import { LayoutGrid, FileText, Book, TestTube, UserCog } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={cn(
      'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors relative',
      active 
        ? 'bg-primary-50 text-primary-700 font-medium'
        : 'text-gray-700 hover:bg-gray-100'
    )}
  >
    {icon}
    <span>{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-error-100 text-error-700 text-xs font-medium px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </button>
);

interface SideNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-60 h-full border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Agent View</h1>
      </div>
      
      <div className="flex-1 p-3 space-y-6">
        <div className="space-y-1">
          <NavItem
            icon={<LayoutGrid className="w-5 h-5" />}
            label="Dashboard"
            active={activeSection === 'dashboard'}
            onClick={() => onSectionChange('dashboard')}
          />
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Conversations"
            active={activeSection === 'conversations'}
            onClick={() => onSectionChange('conversations')}
          />
          <NavItem
            icon={<UserCog className="w-5 h-5" />}
            label="Human Tickets"
            active={activeSection === 'human-tickets'}
            onClick={() => onSectionChange('human-tickets')}
            badge={2}
          />
        </div>

        <div>
          <div className="px-3 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Customize
            </h2>
          </div>
          <div className="space-y-1">
            <NavItem
              icon={<Book className="w-5 h-5" />}
              label="Knowledge"
              active={activeSection === 'knowledge'}
              onClick={() => onSectionChange('knowledge')}
            />
          </div>
        </div>

        <div>
          <div className="px-3 mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Dev Mode
            </h2>
          </div>
          <div className="space-y-1">
            <NavItem
              icon={<TestTube className="w-5 h-5" />}
              label="Test Users"
              active={activeSection === 'test-users'}
              onClick={() => onSectionChange('test-users')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav