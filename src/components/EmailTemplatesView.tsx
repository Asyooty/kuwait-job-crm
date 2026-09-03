import React, { useState, useMemo } from 'react';
import { EmailTemplate } from '../types';
import { Plus, Trash2, Edit2, Copy } from 'lucide-react';
import { DialogBase } from './DialogBase';
import { FormBuilder } from './FormBuilder';
import { motion } from 'framer-motion';

interface EmailTemplatesViewProps {
  templates: EmailTemplate[];
  onAdd: (template: EmailTemplate) => void;
  onUpdate: (template: EmailTemplate) => void;
  onDelete: (id: string) => void;
}

export const EmailTemplatesView: React.FC<EmailTemplatesViewProps> = ({
  templates,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const categories = ['initial', 'followup-1', 'followup-2', 'value-pitch', 'post-interview'];
  const categoryLabels: Record<string, string> = {
    initial: '📧 Initial Outreach',
    'followup-1': '📮 Follow-up #1',
    'followup-2': '📬 Follow-up #2',
    'value-pitch': '💡 Value Pitch',
    'post-interview': '✨ Post-Interview',
  };

  const formFields = [
    { name: 'name', label: 'Template Name', type: 'text' as const, required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      required: true,
      options: categories.map(c => ({ value: c, label: categoryLabels[c] })),
    },
    { name: 'subject', label: 'Subject Line', type: 'text' as const, required: true },
    { name: 'body', label: 'Email Body', type: 'textarea' as const, required: true },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    if (editingId) {
      const template = templates.find(t => t.id === editingId);
      if (template) {
        onUpdate({
          ...template,
          name: formData.name,
          category: formData.category as any,
          subject: formData.subject,
          body: formData.body,
          updatedAt: new Date().toISOString(),
        });
      }
    } else {
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category as any,
        subject: formData.subject,
        body: formData.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onAdd(newTemplate);
    }
    setShowDialog(false);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">📝 Email Templates</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setShowDialog(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={18} /> New Template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-tertiary text-lg mb-4">No templates yet</p>
          <button
            onClick={() => setShowDialog(true)}
            className="btn btn-primary"
          >
            <Plus size={18} /> Create First Template
          </button>
        </div>
      ) : (
        <div className="grid grid-2 gap-4">
          {templates.map(template => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-primary">{template.name}</h3>
                <p className="text-sm text-text-tertiary">
                  {categoryLabels[template.category]}
                </p>
              </div>

              <div className="mb-4 bg-bg-tertiary p-3 rounded">
                <p className="text-xs font-semibold text-text-tertiary mb-1">Subject:</p>
                <p className="text-sm text-text-primary line-clamp-2">{template.subject}</p>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-text-tertiary mb-1">Preview:</p>
                <p className="text-sm text-text-secondary line-clamp-3">{template.body}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(template.id);
                    setShowDialog(true);
                  }}
                  className="flex-1 btn btn-secondary btn-sm"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button className="btn btn-secondary btn-sm">
                  <Copy size={16} /> Duplicate
                </button>
                <button
                  onClick={() => onDelete(template.id)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Template Dialog */}
      <DialogBase
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setEditingId(null);
        }}
        title={editingId ? '✏️ Edit Template' : '➕ New Template'}
        size="lg"
      >
        <FormBuilder
          title={editingId ? 'Update Email Template' : 'Create New Template'}
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowDialog(false);
            setEditingId(null);
          }}
          submitLabel={editingId ? 'Update' : 'Create'}
        />
      </DialogBase>
    </div>
  );
};
