import { Company, Contact, Application, EmailTemplate, Activity } from '../types';

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const weekAgo = new Date(Date.now() - 604800000).toISOString().split('T')[0];
const monthAgo = new Date(Date.now() - 2592000000).toISOString().split('T')[0];

export const mockCompanies: Company[] = [];

export const mockContacts: Contact[] = [];

export const mockApplications: Application[] = [];

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Initial Outreach',
    category: 'initial',
    subject: 'Exciting Opportunity at {{CompanyName}} - {{Position}}',
    body: `Dear {{FirstName}},

I hope this email finds you well. I am reaching out to express my interest in {{Position}} opportunities at {{CompanyName}}.

With my background in {{Industry}}, I believe I can bring significant value to your team.

Best regards,
{{MyName}}
{{MyPhone}}
{{MyEmail}}`,
    variables: ['FirstName', 'CompanyName', 'Position', 'Industry', 'MyName', 'MyPhone', 'MyEmail'],
    createdAt: monthAgo,
    updatedAt: monthAgo,
  },
  {
    id: '2',
    name: 'Follow-up #1',
    category: 'followup-1',
    subject: 'Following up on {{Position}} at {{CompanyName}}',
    body: `Hi {{FirstName}},

I wanted to follow up on my previous email regarding {{Position}} opportunities.

I remain very interested in contributing to {{CompanyName}}'s success.

Looking forward to hearing from you.

Best regards,
{{MyName}}`,
    variables: ['FirstName', 'CompanyName', 'Position', 'MyName'],
    createdAt: monthAgo,
    updatedAt: monthAgo,
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'company-added',
    description: 'Company profile created',
    timestamp: today,
  },
  {
    id: '2',
    type: 'contact-added',
    description: 'HR Contact added to company',
    timestamp: today,
  },
  {
    id: '3',
    type: 'email-sent',
    description: 'Outreach email sent',
    timestamp: yesterday,
  },
  {
    id: '4',
    type: 'email-received',
    description: 'Reply received from recruiter',
    timestamp: weekAgo,
  },
];
