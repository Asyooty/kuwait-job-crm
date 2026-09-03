import React from 'react';
import { Company } from '../types';
import { Plus, Trash2, Eye } from 'lucide-react';
import { DialogBase } from './DialogBase';
import { FormBuilder } from './FormBuilder';
import { motion } from 'framer-motion';

interface CompaniesViewProps {
  companies: Company[];
  onAdd: (company: Company) => void;
  onDelete: (id: string) => void;
  searchQuery?: string;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  onAdd,
  onDelete,
  searchQuery = '',
}) => {
  const [showDialog, setShowDialog] = React.useState(false);

  const filteredCompanies = React.useMemo(() => {
    if (!searchQuery) return companies;
    const q = searchQuery.toLowerCase();
    return companies.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.arabicName?.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
    );
  }, [companies, searchQuery]);

  const formFields = [
    { name: 'name', label: 'Company Name', type: 'text' as const, required: true },
    { name: 'arabicName', label: 'Arabic Name', type: 'text' as const },
    { name: 'industry', label: 'Industry', type: 'text' as const, required: true },
    { name: 'website', label: 'Website', type: 'text' as const },
    { name: 'location', label: 'Location', type: 'text' as const, required: true },
    { name: 'area', label: 'Area', type: 'text' as const },
    { name: 'careersEmail', label: 'Careers Email', type: 'email' as const },
    { name: 'notes', label: 'Notes', type: 'textarea' as const },
  ];

  const handleSubmit = (formData: Record<string, string>) => {
    const newCompany: Company = {
      id: Date.now().toString(),
      name: formData.name,
      arabicName: formData.arabicName,
      industry: formData.industry,
      website: formData.website,
      location: formData.location,
      area: formData.area,
      careersEmail: formData.careersEmail,
      status: 'target',
      notes: formData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onAdd(newCompany);
    setShowDialog(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🏢 Companies</h2>
        <button onClick={() => setShowDialog(true)} className="btn btn-primary">
          <Plus size={18} /> Add Company
        </button>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-text-tertiary text-lg mb-4">No companies found</p>
          <button onClick={() => setShowDialog(true)} className="btn btn-primary">
            <Plus size={18} /> Add First Company
          </button>
        </div>
      ) : (
        <div className="grid grid-2 gap-4">
          {filteredCompanies.map(company => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary">{company.name}</h3>
                  {company.arabicName && (
                    <p className="text-sm text-text-tertiary">{company.arabicName}</p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                    company.status === 'target'
                      ? 'bg-primary bg-opacity-20 text-primary'
                      : company.status === 'contacted'
                        ? 'bg-warning bg-opacity-20 text-warning'
                        : 'bg-success bg-opacity-20 text-success'
                  }`}
                >
                  {company.status}
                </span>
              </div>

              <div className="space-y-1 mb-4 text-sm">
                <p>
                  <span className="text-text-tertiary">Industry:</span> {company.industry}
                </p>
                <p>
                  <span className="text-text-tertiary">Location:</span> {company.location}
                </p>
                {company.careersEmail && (
                  <p>
                    <span className="text-text-tertiary">Email:</span> {company.careersEmail}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 btn btn-secondary btn-sm">
                  <Eye size={16} /> View
                </button>
                <button
                  onClick={() => onDelete(company.id)}
                  className="btn btn-danger btn-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Company Dialog */}
      <DialogBase
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="✚ Add New Company"
        size="lg"
      >
        <FormBuilder
          title="Company Details"
          fields={formFields}
          onSubmit={handleSubmit}
          onCancel={() => setShowDialog(false)}
          submitLabel="Add Company"
        />
      </DialogBase>
    </div>
  );
};
