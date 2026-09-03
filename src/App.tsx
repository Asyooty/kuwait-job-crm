import React, { useState } from 'react';
import { Company, Contact, Application, EmailTemplate, Activity } from './types';
import { AppLayout } from './components/AppLayout';
import { mockCompanies, mockContacts, mockApplications, mockEmailTemplates, mockActivities } from './data/mockData';

function App() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockEmailTemplates);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const handleAddCompany = (company: Company) => {
    setCompanies([...companies, company]);
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        companyId: company.id,
        type: 'company-added',
        description: `Added company: ${company.name}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleAddContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        contactId: contact.id,
        type: 'contact-added',
        description: `Added contact: ${contact.fullName}`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleAddApplication = (application: Application) => {
    setApplications([...applications, application]);
    setActivities([
      ...activities,
      {
        id: Date.now().toString(),
        applicationId: application.id,
        type: 'email-sent',
        description: `Application submitted`,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleUpdateApplication = (application: Application) => {
    setApplications(applications.map(a => (a.id === application.id ? application : a)));
  };

  const handleDeleteCompany = (id: string) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(applications.filter(a => a.id !== id));
  };

  const handleAddTemplate = (template: EmailTemplate) => {
    setTemplates([...templates, template]);
  };

  const handleUpdateTemplate = (template: EmailTemplate) => {
    setTemplates(templates.map(t => (t.id === template.id ? template : t)));
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <AppLayout
      companies={companies}
      contacts={contacts}
      applications={applications}
      templates={templates}
      activities={activities}
      onAddCompany={handleAddCompany}
      onAddContact={handleAddContact}
      onAddApplication={handleAddApplication}
      onUpdateApplication={handleUpdateApplication}
      onDeleteCompany={handleDeleteCompany}
      onDeleteContact={handleDeleteContact}
      onDeleteApplication={handleDeleteApplication}
      onAddTemplate={handleAddTemplate}
      onUpdateTemplate={handleUpdateTemplate}
      onDeleteTemplate={handleDeleteTemplate}
    />
  );
}

export default App;
