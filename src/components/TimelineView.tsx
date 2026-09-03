import React, { useMemo } from 'react';
import { Activity, Application } from '../types';
import { format } from 'date-fns';
import { Mail, MessageSquare, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineViewProps {
  activities: Activity[];
  applications: Application[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'email-sent':
      return <Mail size={16} className="text-primary" />;
    case 'email-received':
      return <MessageSquare size={16} className="text-success" />;
    case 'followup-scheduled':
      return <Clock size={16} className="text-warning" />;
    case 'interview-scheduled':
      return <CheckCircle size={16} className="text-success" />;
    default:
      return <AlertCircle size={16} className="text-text-tertiary" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'email-sent':
      return 'bg-primary bg-opacity-10 border-primary';
    case 'email-received':
      return 'bg-success bg-opacity-10 border-success';
    case 'interview-scheduled':
      return 'bg-success bg-opacity-10 border-success';
    case 'followup-scheduled':
      return 'bg-warning bg-opacity-10 border-warning';
    default:
      return 'bg-bg-tertiary border-border-color';
  }
};

export const TimelineView: React.FC<TimelineViewProps> = ({ activities, applications }) => {
  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [activities]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, Activity[]> = {};
    sortedActivities.forEach(activity => {
      const date = format(new Date(activity.timestamp), 'MMMM dd, yyyy');
      if (!groups[date]) groups[date] = [];
      groups[date].push(activity);
    });
    return groups;
  }, [sortedActivities]);

  if (sortedActivities.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-text-tertiary">No activities yet. Start by adding a company or contact.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groupedByDate).map(([date, dateActivities], dateIndex) => (
        <motion.div
          key={date}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dateIndex * 0.05 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-wide">{date}</h3>
            <div className="h-px bg-border-color flex-1" />
          </div>

          <div className="flex flex-col gap-3 ml-6">
            {dateActivities.map((activity, actIndex) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: dateIndex * 0.05 + actIndex * 0.02 }}
                className={`card border-l-2 ${getActivityColor(activity.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-text-primary">{activity.description}</p>
                    <p className="text-text-tertiary text-sm mt-1">
                      {format(new Date(activity.timestamp), 'HH:mm:ss')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
