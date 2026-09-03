import React, { useMemo } from 'react';
import { Application, Company, Contact } from '../types';
import { ChartPanel } from './ChartPanel';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsViewProps {
  applications: Application[];
  companies: Company[];
  contacts: Contact[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ applications, companies, contacts }) => {
  const reports = useMemo(() => {
    // Application Status Report
    const statusDistribution = [
      {
        name: 'Applied',
        count: applications.filter(a => a.status === 'applied').length,
        percentage: ((applications.filter(a => a.status === 'applied').length / applications.length) * 100).toFixed(1),
      },
      {
        name: 'Replied',
        count: applications.filter(a => a.status === 'replied').length,
        percentage: ((applications.filter(a => a.status === 'replied').length / applications.length) * 100).toFixed(1),
      },
      {
        name: 'Interview',
        count: applications.filter(a => a.status === 'interview').length,
        percentage: ((applications.filter(a => a.status === 'interview').length / applications.length) * 100).toFixed(1),
      },
      {
        name: 'Offer',
        count: applications.filter(a => a.status === 'offer').length,
        percentage: ((applications.filter(a => a.status === 'offer').length / applications.length) * 100).toFixed(1),
      },
      {
        name: 'Rejected',
        count: applications.filter(a => a.status === 'rejected').length,
        percentage: ((applications.filter(a => a.status === 'rejected').length / applications.length) * 100).toFixed(1),
      },
    ];

    // Monthly Applications
    const monthlyApps: Record<string, number> = {};
    applications.forEach(app => {
      const month = format(new Date(app.applicationDate), 'MMM yyyy');
      monthlyApps[month] = (monthlyApps[month] || 0) + 1;
    });

    const monthlyData = Object.entries(monthlyApps).map(([month, count]) => ({ month, count }));

    // Top Companies
    const companyApps: Record<string, number> = {};
    applications.forEach(app => {
      const company = companies.find(c => c.id === app.companyId);
      if (company) {
        companyApps[company.name] = (companyApps[company.name] || 0) + 1;
      }
    });

    const topCompanies = Object.entries(companyApps)
      .map(([name, count]) => ({ name, applications: count }))
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 10);

    // Contact Types
    const contactTypes: Record<string, number> = {};
    contacts.forEach(contact => {
      contactTypes[contact.type] = (contactTypes[contact.type] || 0) + 1;
    });

    const contactTypeData = Object.entries(contactTypes).map(([type, count]) => ({ type, count }));

    return {
      statusDistribution,
      monthlyData,
      topCompanies,
      contactTypeData,
      totalApplications: applications.length,
      totalCompanies: companies.length,
      totalContacts: contacts.length,
      responseRate: applications.length > 0
        ? (applications.filter(a => a.status === 'replied').length / applications.length * 100).toFixed(1)
        : 0,
    };
  }, [applications, companies, contacts]);

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Stats */}
      <div className="grid grid-3 gap-4">
        <div className="card">
          <p className="text-text-tertiary text-sm mb-2">Total Applications</p>
          <h2 className="text-3xl font-bold text-primary">{reports.totalApplications}</h2>
        </div>
        <div className="card">
          <p className="text-text-tertiary text-sm mb-2">Response Rate</p>
          <h2 className="text-3xl font-bold text-success">{reports.responseRate}%</h2>
        </div>
        <div className="card">
          <p className="text-text-tertiary text-sm mb-2">Companies Contacted</p>
          <h2 className="text-3xl font-bold text-warning">{reports.totalCompanies}</h2>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-2 gap-4">
        <ChartPanel
          title="Applications by Status"
          data={reports.statusDistribution}
          dataKey="count"
          nameKey="name"
          type="bar"
          height={300}
        />
        <ChartPanel
          title="Contact Types Distribution"
          data={reports.contactTypeData}
          dataKey="count"
          nameKey="type"
          type="pie"
          height={300}
        />
      </div>

      <ChartPanel
        title="Applications Over Time"
        data={reports.monthlyData}
        dataKey="count"
        nameKey="month"
        type="line"
        height={300}
      />

      {reports.topCompanies.length > 0 && (
        <div className="card">
          <h3 className="mb-4">Top Companies by Applications</h3>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Applications</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {reports.topCompanies.map((company, idx) => (
                  <tr key={idx}>
                    <td className="font-semibold">{company.name}</td>
                    <td>{company.applications}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-bg-tertiary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(company.applications / Math.max(...reports.topCompanies.map(c => c.applications))) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-text-tertiary">
                          {((company.applications / reports.totalApplications) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Status Distribution Table */}
      <div className="card">
        <h3 className="mb-4">Status Distribution</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {reports.statusDistribution.map((status, idx) => (
                <tr key={idx}>
                  <td className="font-semibold capitalize">{status.name}</td>
                  <td>{status.count}</td>
                  <td className="text-primary font-semibold">{status.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
