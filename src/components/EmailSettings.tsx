import React from 'react';
import SettingsPageTemplate from './SettingsPageTemplate';

const EmailSettings: React.FC = () => {
  return (
    <SettingsPageTemplate title="Email Settings">
      <div className="bg-gray-100 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Email Address</h2>
        <p className="text-gray-600 mb-4">Your current email address: ceo@cmateo.com</p>
        <button className="bg-navy-blue text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300">
          Change Email
        </button>
      </div>
      {/* Add more email-related settings here */}
    </SettingsPageTemplate>
  );
};

export default EmailSettings;