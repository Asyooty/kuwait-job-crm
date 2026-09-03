import React, { useMemo } from 'react';
import { Application, Company, Contact } from '../types';
import { ChartPanel } from './ChartPanel';
import { motion } from 'framer-motion';

interface DashboardViewProps {
  companies: Company[];
  contacts: Contact[];
  applications: Application[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  companies,
  contacts,
  applications,
}) => {
  const stats = useMemo(() => ({
    totalCompanies: companies.length,
    totalContacts: contacts.length,
    totalApplications: applications.length,
    repliedApplications: applications.filter(a => a.status === 'replied').length,
    interviewApplications: applications.filter(a => a.status === 'interview').length,
    offerApplications: applications.filter(a => a.status === 'offer').length,
    responseRate:
      applications.length > 0
        ? ((applications.filter(a => a.status === 'replied').length / applications.length) * 100).toFixed(1)
        : '0',
  }), [applications, companies, contacts]);

  const recentApplications = useMemo(() => applications.slice(-5).reverse(), [applications]);

  const applicationsByStatus = useMemo(() => [
    { name: 'Applied', value: applications.filter(a => a.status === 'applied').length },
    { name: 'Replied', value: applications.filter(a => a.status === 'replied').length },
    { name: 'Interview', value: applications.filter(a => a.status === 'interview').length },
    { name: 'Offer', value: applications.filter(a => a.status === 'offer').length },
    { name: 'Rejected', value: applications.filter(a => a.status === 'rejected').length },
  ], [applications]);

  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid grid-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-tertiary text-sm mb-1">Total Companies</p>
              <h3 className="text-2xl font-bold text-primary">{stats.totalCompanies}</h3>
            </div>
            <div className="text-3xl">🏢</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-tertiary text-sm mb-1">Contacts</p>
              <h3 className="text-2xl font-bold text-secondary">{stats.totalContacts}</h3>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-tertiary text-sm mb-1">Applications</p>
              <h3 className="text-2xl font-bold text-success">{stats.totalApplications}</h3>
            </div>
            <div className="text-3xl">📧</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-tertiary text-sm mb-1">Response Rate</p>
              <h3 className="text-2xl font-bold text-warning">{stats.responseRate}%</h3>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-2 gap-4">
        <ChartPanel
          title="Applications by Status"
          data={applicationsByStatus}
          dataKey="value"
          nameKey="name"
          type="pie"
          height={300}
        />
        <ChartPanel
          title="Pipeline Overview"
          data={applicationsByStatus}
          dataKey="value"
          nameKey="name"
          type="bar"
          height={300}
        />
      </div>

      {/* Recent Applications */}
      <div className="card">
        <h3 className="mb-4 flex items-center gap-2">
          <span>📝</span> Recent Applications
        </h3>
        {recentApplications.length === 0 ? (
          <p className="text-text-tertiary text-center py-6">No applications yet</p>
        ) : (
          <div className="space-y-2">
            {recentApplications.map(app => {
              const company = companies.find(c => c.id === app.companyId);
              return (
                <div key={app.id} className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-text-primary">{company?.name}</p>
                    <p className="text-xs text-text-tertiary capitalize">{app.status}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      app.status === 'applied'
                        ? 'bg-primary bg-opacity-20 text-primary'
                        : app.status === 'replied'
                          ? 'bg-success bg-opacity-20 text-success'
                          : app.status === 'interview'
                            ? 'bg-warning bg-opacity-20 text-warning'
                            : app.status === 'offer'
                              ? 'bg-success bg-opacity-20 text-success'
                              : 'bg-danger bg-opacity-20 text-danger'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
