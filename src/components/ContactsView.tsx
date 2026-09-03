import React, { useState, useMemo } from 'react';
import { Contact, Company } from '../types';
import { Plus, Trash2, Mail } from 'lucide-react';
import { DialogBase } from './DialogBase';
import { FormBuilder } from './FormBuilder';
import { motion } from 'framer-motion';

interface ContactsViewProps {
  contacts: Contact[];
  companies: Company[];
  onAdd: (contact: Contact) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  contacts,
  companies,
  onAdd,
  onDelete,
  searchQuery = '',
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    const q = searchQuery.toLowerCase();
    return contacts.filter(
      c => c.fullName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.jobTitle.toLowerCase().includes(q)
    );
  }, [contacts, searchQuery]);

  const formFields = [
    { name: 'firstName', label: 'First Name', type: 'text' as const, required: true },
    { name: 'lastName', label: 'Last Name', type: 'text' as const, required: true },
    {
      name: 'companyId',
      label: 'Company',
      type: 'select' as const,
      required: true,
      options: companies.map(c => ({ value: c.id, label: c.name })),
    },
    { name: 'jobTitle', label: 'Job Title', type: 'text' as const, required: true },
    { name: 'department', label: 'Department', type: 'text' as const },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'Phone', type: 'tel' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      companyId: formData.companyId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`,
      jobTitle: formData.jobTitle,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      type: 'recruiter',
      status: 'active',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onAdd(newContact);
    setShowDialog(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">👥 Contacts</h2>
        <button onClick={() => setShowDialog(true)} className="btn btn-primary">
          <Plus size={18} /> Add Contact
        </button>
      </div>

      {filteredContacts.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-tertiary text-lg mb-4">No contacts found</p>
          <button onClick={() => setShowDialog(true)} className="btn btn-primary">
            <Plus size={18} /> Add First Contact
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => {
                const company = companies.find(c => c.id === contact.companyId);
                return (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    hover={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <td className="font-semibold">{contact.fullName}</td>
                    <td className="text-text-secondary">{company?.name}</td>
                    <td className="text-text-secondary">{contact.jobTitle}</td>
                    <td className="text-primary">{contact.email}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          contact.status === 'active'
                            ? 'bg-success bg-opacity-20 text-success'
                            : 'bg-danger bg-opacity-20 text-danger'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-bg-tertiary rounded transition-colors">
                          <Mail size={16} className="text-primary" />
                        </button>
                        <button
                          onClick={() => onDelete(contact.id)}
                          className="p-2 hover:bg-bg-tertiary rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-danger" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Contact Dialog */}
      <DialogBase
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="➕ Add New Contact"
        size="lg"
      >
        <FormBuilder
          title="Contact Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => setShowDialog(false)}
          submitLabel="Add Contact"
        />
      </DialogBase>
    </div>
  );
};
