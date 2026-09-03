import React, { useState, useMemo } from 'react';
import { Company, Contact, Application, EmailTemplate, Activity } from '../types';
import { Search, Menu, Settings, BarChart3, AlertCircle } from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';

interface HeaderProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onOpenSettings: () => void;
  onOpenAnalytics: () => void;
  companies: Company[];
  contacts: Contact[];
  applications: Application[];
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onViewChange,
  onOpenSettings,
  onOpenAnalytics,
  companies,
  contacts,
  applications,
  onSearch,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const views = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'companies', label: 'Companies' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'applications', label: 'Applications' },
    { id: 'followups', label: 'Follow-ups' },
    { id: 'templates', label: 'Templates' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'reports', label: 'Reports' },
  ];

  return (
    <header className="bg-bg-secondary border-b border-border-color sticky top-0 z-40">
      <div className="px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-primary">📊 Kuwait Job CRM</h1>
          </div>
          <div className="flex items-center gap-4">
            <GlobalSearch
              companies={companies}
              contacts={contacts}
              applications={applications}
              onSearch={onSearch}
            />
            <button
              onClick={onOpenAnalytics}
              className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
              title="Analytics"
            >
              <BarChart3 size={20} className="text-primary" />
            </button>
            <button
              onClick={onOpenSettings}
              className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => onViewChange(view.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeView === view.id
                  ? 'bg-primary text-white'
                  : 'bg-bg-tertiary text-text-secondary hover:bg-gray-700'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
