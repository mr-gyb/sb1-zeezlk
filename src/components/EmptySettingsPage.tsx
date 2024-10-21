import React from 'react';
import SettingsPageTemplate from './SettingsPageTemplate';

interface EmptySettingsPageProps {
  title: string;
}

const EmptySettingsPage: React.FC<EmptySettingsPageProps> = ({ title }) => {
  return (
    <SettingsPageTemplate title={title}>
      <div className="bg-gray-100 rounded-lg p-6 shadow-md">
        <p className="text-gray-600">This settings page is currently under development.</p>
      </div>
    </SettingsPageTemplate>
  );
};

export default EmptySettingsPage;