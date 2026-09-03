export interface Company {
  id: string;
  name: string;
  arabicName?: string;
  industry: string;
  website?: string;
  location: string;
  area?: string;
  phone?: string;
  generalEmail?: string;
  careersEmail?: string;
  linkedIn?: string;
  status: 'target' | 'contacted' | 'active' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  department?: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  type: 'hr-manager' | 'recruiter' | 'hiring-manager' | 'talent-acquisition' | 'ceo' | 'other';
  status: 'active' | 'no-contact' | 'unresponsive';
  lastContactDate?: string;
  nextFollowup?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  companyId: string;
  contactId?: string;
  title: string;
  department?: string;
  location: string;
  url?: string;
  source?: string;
  dateFound: string;
  closingDate?: string;
  salaryMin?: number;
  salaryMax?: number;
  description?: string;
  requirements?: string;
  status: 'new' | 'interested' | 'applied' | 'interview' | 'offer' | 'rejected' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  companyId: string;
  contactId?: string;
  jobId?: string;
  cvId?: string;
  applicationDate: string;
  method: 'email' | 'linkedin' | 'website' | 'manual';
  status: 'applied' | 'replied' | 'interview' | 'offer' | 'rejected';
  lastContactDate?: string;
  nextFollowup?: string;
  threadId?: string;
  messageId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'initial' | 'followup-1' | 'followup-2' | 'value-pitch' | 'post-interview';
  subject: string;
  body: string;
  variables?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FollowUp {
  id: string;
  applicationId: string;
  contactId?: string;
  scheduledAt: string;
  templateId?: string;
  status: 'pending' | 'completed' | 'skipped';
  completedAt?: string;
  notes?: string;
}

export interface Activity {
  id: string;
  companyId?: string;
  contactId?: string;
  applicationId?: string;
  type: 'email-sent' | 'email-received' | 'followup-scheduled' | 'interview-scheduled' | 'note-added' | 'status-changed' | 'contact-added' | 'company-added';
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Report {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  data: any;
}

export interface AnalyticsData {
  totalApplications: number;
  totalReplies: number;
  totalInterviews: number;
  totalOffers: number;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
  applicationsByIndustry: Record<string, number>;
  applicationsByMonth: Array<{ month: string; count: number }>;
  applicationsByStatus: Record<string, number>;
  topCompanies: Array<{ name: string; applications: number }>;
  recentActivities: Activity[];
}
