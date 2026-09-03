import React, { useMemo } from 'react';
import { Application, Company, Contact } from '../types';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { DialogBase } from './DialogBase';
import { FormBuilder } from './FormBuilder';
import { motion } from 'framer-motion';

interface ApplicationsViewProps {
  applications: Application[];
  companies: Company[];
  contacts: Contact[];
  onAdd: (application: Application) => void;
  onUpdate: (application: Application) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  companies,
  contacts,
  onAdd,
  onUpdate,
  onDelete,
  searchQuery = '',
}) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const filteredApplications = useMemo(() => {
    if (!searchQuery) return applications;
    const q = searchQuery.toLowerCase();
    return applications.filter(app => {
      const company = companies.find(c => c.id === app.companyId);
      const contact = contacts.find(co => co.id === app.contactId);
      return (
        company?.name.toLowerCase().includes(q) ||
        contact?.fullName.toLowerCase().includes(q) ||
        app.status.includes(q)
      );
    });
  }, [applications, companies, contacts, searchQuery]);

  const formFields = [
    {
      name: 'companyId',
      label: 'Company',
      type: 'select' as const,
      required: true,
      options: companies.map(c => ({ value: c.id, label: c.name })),
    },
    {
      name: 'contactId',
      label: 'Contact',
      type: 'select' as const,
      options: contacts.map(c => ({ value: c.id, label: c.fullName })),
    },
    {
      name: 'applicationDate',
      label: 'Application Date',
      type: 'date' as const,
      required: true,
    },
    {
      name: 'method',
      label: 'Application Method',
      type: 'select' as const,
      options: [
        { value: 'email', label: 'Email' },
        { value: 'linkedin', label: 'LinkedIn' },
        { value: 'website', label: 'Company Website' },
        { value: 'manual', label: 'Manual' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'applied', label: 'Applied' },
        { value: 'replied', label: 'Replied' },
        { value: 'interview', label: 'Interview' },
        { value: 'offer', label: 'Offer' },
        { value: 'rejected', label: 'Rejected' },
      ],
    },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    if (editingId) {
      const app = applications.find(a => a.id === editingId);
      if (app) {
        onUpdate({
          ...app,
          ...formData,
          updatedAt: new Date().toISOString(),
        });
      }
    } else {
      const newApp: Application = {
        id: Date.now().toString(),
        companyId: formData.companyId,
        contactId: formData.contactId,
        applicationDate: formData.applicationDate,
        method: formData.method as any,
        status: formData.status as any,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onAdd(newApp);
    }
    setShowDialog(false);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📧 Applications</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setShowDialog(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={18} /> Add Application
        </button>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-tertiary text-lg mb-4">No applications found</p>
          <button
            onClick={() => setShowDialog(true)}
            className="btn btn-primary"
          >
            <Plus size={18} /> Add First Application
          </button>
        </div>
      ) : (
        <div className="grid grid-2 gap-4">
          {filteredApplications.map(app => {
            const company = companies.find(c => c.id === app.companyId);
            const contact = contacts.find(c => c.id === app.contactId);
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary">{company?.name}</h3>
                    {contact && (
                      <p className="text-sm text-text-tertiary">{contact.fullName}</p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
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

                <div className="space-y-1 mb-4 text-sm">
                  <p>
                    <span className="text-text-tertiary">Applied:</span>{' '}
                    {new Date(app.applicationDate).toLocaleDateString()}
                  </p>
                  <p className="capitalize">
                    <span className="text-text-tertiary">Method:</span> {app.method}
                  </p>
                  {app.notes && <p className="text-text-secondary italic">{app.notes}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(app.id);
                      setShowDialog(true);
                    }}
                    className="flex-1 btn btn-secondary btn-sm"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(app.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Application Dialog */}
      <DialogBase
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setEditingId(null);
        }}
        title={editingId ? '✏️ Edit Application' : '➕ Add New Application'}
        size="lg"
      >
        <FormBuilder
          title={editingId ? 'Update Application' : 'Application Details'}
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowDialog(false);
            setEditingId(null);
          }}
          submitLabel={editingId ? 'Update' : 'Add Application'}
        />
      </DialogBase>
    </div>
  );
};
