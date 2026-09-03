import React from 'react';
import { FormBuilder } from './FormBuilder';

export const SettingsModal: React.FC = () => {
  const handleSubmit = (formData: Record<string, string>) => {
    console.log('Settings updated:', formData);
  };

  const settingsFields = [
    { name: 'userName', label: 'Your Name', type: 'text' as const, required: true },
    { name: 'userEmail', label: 'Your Email', type: 'email' as const, required: true },
    { name: 'userPhone', label: 'Your Phone', type: 'tel' as const },
    {
      name: 'cooldownDays',
      label: 'Company Contact Cool-down (Days)',
      type: 'number' as const,
    },
    {
      name: 'followupDays',
      label: 'Default Follow-up Days',
      type: 'number' as const,
    },
    {
      name: 'theme',
      label: 'Theme',
      type: 'select' as const,
      options: [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <FormBuilder
        title="Application Settings"
        fields={settingsFields}
        onSubmit={handleSubmit}
        submitLabel="Save Settings"
      />
    </div>
  );
};
