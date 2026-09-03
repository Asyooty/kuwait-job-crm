import React, { useState } from 'react';
import { Company, Contact, Application, EmailTemplate, Activity } from '../types';
import { Header } from './Header';
import { DialogBase } from './DialogBase';
import { AnalyticsModal } from './AnalyticsModal';
import { TimelineView } from './TimelineView';
import { ReportsView } from './ReportsView';
import { DashboardView } from './DashboardView';
import { CompaniesView } from './CompaniesView';
import { ContactsView } from './ContactsView';
import { ApplicationsView } from './ApplicationsView';
import { FollowupsView } from './FollowupsView';
import { EmailTemplatesView } from './EmailTemplatesView';
import { SettingsModal } from './SettingsModal';

interface AppProps {
  companies: Company[];
  contacts: Contact[];
  applications: Application[];
  templates: EmailTemplate[];
  activities: Activity[];
  onAddCompany: (company: Company) => void;
  onAddContact: (contact: Contact) => void;
  onAddApplication: (application: Application) => void;
  onUpdateApplication: (application: Application) => void;
  onDeleteCompany: (id: string) => void;
  onDeleteContact: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onAddTemplate: (template: EmailTemplate) => void;
  onUpdateTemplate: (template: EmailTemplate) => void;
  onDeleteTemplate: (id: string) => void;
}

export const AppLayout: React.FC<AppProps> = ({
  companies,
  contacts,
  applications,
  templates,
  activities,
  onAddCompany,
  onAddContact,
  onAddApplication,
  onUpdateApplication,
  onDeleteCompany,
  onDeleteContact,
  onDeleteApplication,
  onAddTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
}) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView
            companies={companies}
            contacts={contacts}
            applications={applications}
            activities={activities}
          />
        );
      case 'companies':
        return (
          <CompaniesView
            companies={companies}
            onAdd={onAddCompany}
            onDelete={onDeleteCompany}
            searchQuery={searchQuery}
          />
        );
      case 'contacts':
        return (
          <ContactsView
            contacts={contacts}
            companies={companies}
            onAdd={onAddContact}
            onDelete={onDeleteContact}
            searchQuery={searchQuery}
          />
        );
      case 'applications':
        return (
          <ApplicationsView
            applications={applications}
            companies={companies}
            contacts={contacts}
            onAdd={onAddApplication}
            onUpdate={onUpdateApplication}
            onDelete={onDeleteApplication}
            searchQuery={searchQuery}
          />
        );
      case 'followups':
        return (
          <FollowupsView
            applications={applications}
            contacts={contacts}
            companies={companies}
            onUpdate={onUpdateApplication}
          />
        );
      case 'templates':
        return (
          <EmailTemplatesView
            templates={templates}
            onAdd={onAddTemplate}
            onUpdate={onUpdateTemplate}
            onDelete={onDeleteTemplate}
          />
        );
      case 'timeline':
        return <TimelineView activities={activities} applications={applications} />;
      case 'reports':
        return (
          <ReportsView applications={applications} companies={companies} contacts={contacts} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        onOpenSettings={() => setShowSettings(true)}
        onOpenAnalytics={() => setShowAnalytics(true)}
        companies={companies}
        contacts={contacts}
        applications={applications}
        onSearch={setSearchQuery}
      />

      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">{renderView()}</div>
      </main>

      {/* Analytics Modal */}
      <DialogBase
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        title="📊 Analytics & Reports"
        size="xl"
      >
        <AnalyticsModal applications={applications} activities={activities} />
      </DialogBase>

      {/* Settings Modal */}
      <DialogBase
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="⚙️ Settings"
        size="lg"
      >
        <SettingsModal />
      </DialogBase>
    </div>
  );
};
