import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

interface FormBuilderProps {
  title: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
  onCancel?: () => void;
  submitLabel?: string;
  isLoading?: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  title,
  fields,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || '' }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Invalid email format';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      {fields.map(field => (
        <div key={field.name} className="flex flex-col gap-2">
          <label htmlFor={field.name} className="font-semibold text-sm">
            {field.label}
            {field.required && <span className="text-danger"> *</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              className={clsx('p-3 rounded border', {
                'border-danger': errors[field.name],
                'border-border-color': !errors[field.name],
              })}
              rows={4}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              className={clsx('p-3 rounded border', {
                'border-danger': errors[field.name],
                'border-border-color': !errors[field.name],
              })}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name] || ''}
              onChange={e => handleChange(field.name, e.target.value)}
              className={clsx('p-3 rounded border', {
                'border-danger': errors[field.name],
                'border-border-color': !errors[field.name],
              })}
            />
          )}
          {errors[field.name] && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-danger text-sm"
            >
              {errors[field.name]}
            </motion.p>
          )}
        </div>
      ))}

      <div className="flex gap-3 mt-6 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Loading...' : submitLabel}
        </button>
      </div>
    </form>
  );
};
