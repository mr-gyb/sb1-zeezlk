import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resume: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/settings" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Professional Resume</h1>
        </div>
        <div className="space-y-6">
          <p className="text-lg">Here you can edit and manage your professional work resume.</p>
          {/* Add resume editing functionality here */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Resume Sections</h2>
            <ul className="list-disc list-inside">
              <li>Personal Information</li>
              <li>Work Experience</li>
              <li>Education</li>
              <li>Skills</li>
            </ul>
          </div>
          <button className="bg-navy-blue text-white px-4 py-2 rounded-full">
            Edit Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;