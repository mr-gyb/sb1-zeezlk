import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Portfolio: React.FC = () => {
  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/settings" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Creative Portfolio</h1>
        </div>
        <div className="space-y-6">
          <p className="text-lg">Here you can edit and manage your creative portfolio.</p>
          {/* Add portfolio editing functionality here */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Portfolio Items</h2>
            <ul className="list-disc list-inside">
              <li>Project 1</li>
              <li>Project 2</li>
              <li>Project 3</li>
            </ul>
          </div>
          <button className="bg-navy-blue text-white px-4 py-2 rounded-full">
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;