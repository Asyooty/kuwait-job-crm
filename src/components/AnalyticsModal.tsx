import React, { useMemo } from 'react';
import { Application, Activity } from '../types';
import { ChartPanel } from './ChartPanel';
import { TrendingUp, Mail, Zap } from 'lucide-react';

interface AnalyticsModalProps {
  applications: Application[];
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ applications }) => {
  const analytics = useMemo(() => {
    const total = applications.length;
    const replied = applications.filter(a => a.status === 'replied').length;
    const interviewed = applications.filter(a => a.status === 'interview').length;
    const offers = applications.filter(a => a.status === 'offer').length;

    const byStatus = [
      { name: 'Applied', value: applications.filter(a => a.status === 'applied').length },
      { name: 'Replied', value: replied },
      { name: 'Interview', value: interviewed },
      { name: 'Offer', value: offers },
      { name: 'Rejected', value: applications.filter(a => a.status === 'rejected').length },
    ];

    const timeline: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      timeline[dateStr] = 0;
    }

    applications.forEach(app => {
      const appDate = new Date(app.applicationDate).toLocaleDateString();
      if (timeline.hasOwnProperty(appDate)) {
        timeline[appDate]++;
      }
    });

    const timelineData = Object.entries(timeline).map(([date, count]) => ({ date, count }));

    const responseTimeline: Record<string, number> = {};
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      responseTimeline[dateStr] = 0;
    }

    applications
      .filter(a => a.lastContactDate)
      .forEach(app => {
        const contactDate = new Date(app.lastContactDate!).toLocaleDateString();
        if (responseTimeline.hasOwnProperty(contactDate)) {
          responseTimeline[contactDate]++;
        }
      });

    const responseData = Object.entries(responseTimeline).map(([date, count]) => ({ date, count }));

    return {
      total,
      replied,
      interviewed,
      offers,
      responseRate: total > 0 ? ((replied / total) * 100).toFixed(1) : '0',
      interviewRate: replied > 0 ? ((interviewed / replied) * 100).toFixed(1) : '0',
      offerRate: interviewed > 0 ? ((offers / interviewed) * 100).toFixed(1) : '0',
      byStatus,
      timelineData,
      responseData,
    };
  }, [applications]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-primary bg-opacity-20 p-3 rounded-lg">
              <Zap size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-text-tertiary text-sm">Total Applications</p>
              <h3 className="text-2xl font-bold">{analytics.total}</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-success bg-opacity-20 p-3 rounded-lg">
              <Mail size={24} className="text-success" />
            </div>
            <div>
              <p className="text-text-tertiary text-sm">Response Rate</p>
              <h3 className="text-2xl font-bold">{analytics.responseRate}%</h3>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="bg-warning bg-opacity-20 p-3 rounded-lg">
              <TrendingUp size={24} className="text-warning" />
            </div>
            <div>
              <p className="text-text-tertiary text-sm">Interview Rate</p>
              <h3 className="text-2xl font-bold">{analytics.interviewRate}%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2 gap-4">
        <ChartPanel
          title="Applications by Status"
          data={analytics.byStatus}
          dataKey="value"
          nameKey="name"
          type="pie"
          height={350}
        />
        <ChartPanel
          title="Applications Trend (30 Days)"
          data={analytics.timelineData}
          dataKey="count"
          nameKey="date"
          type="area"
          height={350}
        />
      </div>

      <ChartPanel
        title="Response Timeline"
        data={analytics.responseData}
        dataKey="count"
        nameKey="date"
        type="line"
        height={300}
      />
    </div>
  );
};
