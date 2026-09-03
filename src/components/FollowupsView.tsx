import React, { useState, useMemo } from 'react';
import { Application, Company, Contact } from '../types';
import { Plus, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface FollowupsViewProps {
  applications: Application[];
  contacts: Contact[];
  companies: Company[];
  onUpdate: (application: Application) => void;
}

export const FollowupsView: React.FC<FollowupsViewProps> = ({
  applications,
  contacts,
  companies,
  onUpdate,
}) => {
  const [filter, setFilter] = useState<'all' | 'due' | 'upcoming'>('all');

  const followups = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return applications
      .filter(app => app.nextFollowup && app.status !== 'offer')
      .map(app => ({
        ...app,
        daysUntil: Math.floor(
          (new Date(app.nextFollowup!).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        ),
      }))
      .filter(app => {
        if (filter === 'due') return app.daysUntil <= 0;
        if (filter === 'upcoming') return app.daysUntil > 0 && app.daysUntil <= 7;
        return true;
      })
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [applications, filter]);

  const handleMarkDone = (app: Application) => {
    onUpdate({
      ...app,
      nextFollowup: undefined,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🔔 Follow-ups</h2>
        <div className="flex gap-2">
          {(['all', 'due', 'upcoming'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                filter === f ? 'bg-primary text-white' : 'bg-bg-tertiary text-text-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {followups.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-tertiary text-lg">
            {filter === 'due'
              ? 'No overdue follow-ups! 🎉'
              : filter === 'upcoming'
                ? 'No upcoming follow-ups'
                : 'No follow-ups scheduled'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {followups.map(app => {
            const company = companies.find(c => c.id === app.companyId);
            const contact = contacts.find(c => c.id === app.contactId);
            const isDue = app.daysUntil <= 0;

            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`card border-l-4 ${
                  isDue ? 'border-danger' : 'border-warning'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary">{company?.name}</h3>
                    <p className="text-sm text-text-tertiary">{contact?.fullName}</p>
                    <p className="text-xs text-text-tertiary mt-1">
                      {isDue ? (
                        <span className="text-danger font-semibold">📍 Due Today!</span>
                      ) : (
                        <span>Due in {app.daysUntil} days</span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkDone(app)}
                      className="btn btn-primary btn-sm"
                    >
                      <CheckCircle size={16} /> Done
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
