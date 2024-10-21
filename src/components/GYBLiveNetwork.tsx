import React, { useState } from 'react';
import { ChevronLeft, List, Map, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  category: string;
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
  lat: number;
  lng: number;
  rating: number;
}

const GYBLiveNetwork: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', icon: '👥', label: 'All' },
    { id: 'videographers', icon: '🎥', label: 'Videographers' },
    { id: 'writers', icon: '✍️', label: 'Writers' },
    { id: 'coders', icon: '💻', label: 'Coders' },
    { id: 'designers', icon: '🎨', label: 'Designers' },
    { id: 'marketers', icon: '📊', label: 'Marketers' },
  ];

  const users: User[] = [
    { id: 1, name: 'Alice', category: 'videographers', experience: 'expert', lat: 40.7128, lng: -74.0060, rating: 4.8 },
    { id: 2, name: 'Bob', category: 'writers', experience: 'intermediate', lat: 40.7282, lng: -73.7949, rating: 4.2 },
    { id: 3, name: 'Charlie', category: 'coders', experience: 'beginner', lat: 40.7489, lng: -73.9680, rating: 3.9 },
    { id: 4, name: 'Diana', category: 'designers', experience: 'advanced', lat: 40.6782, lng: -73.9442, rating: 4.7 },
    { id: 5, name: 'Eva', category: 'marketers', experience: 'proficient', lat: 40.7831, lng: -73.9712, rating: 4.5 },
  ];

  const filteredUsers = selectedCategory === 'all' 
    ? users 
    : users.filter(user => user.category === selectedCategory);

  const handleUserClick = (user: User) => {
    navigate(`/user-profile/${user.id}`, { state: { experience: user.experience } });
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'beginner': return 'bg-red-500 text-white';
      case 'intermediate': return 'bg-orange-500 text-white';
      case 'proficient': return 'bg-blue-500 text-white';
      case 'advanced': return 'bg-green-500 text-white';
      case 'expert': return 'bg-yellow-400 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getExperienceNumber = (level: string) => {
    switch (level) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'proficient': return 3;
      case 'advanced': return 4;
      case 'expert': return 5;
      default: return 0;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-navy-blue">
              <ChevronLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-navy-blue">GYB-Live Network</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <List size={24} />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded ${viewMode === 'map' ? 'bg-navy-blue text-white' : 'bg-gray-200 text-navy-blue'}`}
            >
              <Map size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4">
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gray-100 rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                onClick={() => handleUserClick(user)}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full ${getExperienceColor(user.experience)} flex items-center justify-center font-bold mr-2`}>
                    {getExperienceNumber(user.experience)}
                  </div>
                  <h3 className="font-bold">{user.name}</h3>
                </div>
                <p className="mb-2">Category: {user.category}</p>
                <p className="mb-2">Experience: {user.experience}</p>
                {renderStars(user.rating)}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 rounded-lg h-[calc(100vh-200px)] relative shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-navy-blue text-2xl font-bold">Map View (Placeholder)</p>
            </div>
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`absolute w-8 h-8 rounded-full ${getExperienceColor(user.experience)} flex items-center justify-center font-bold cursor-pointer`}
                style={{
                  left: `${(user.lng + 74.1) * 100}%`,
                  top: `${(40.9 - user.lat) * 100}%`,
                }}
                title={`${user.name} (${user.category})`}
                onClick={() => handleUserClick(user)}
              >
                {getExperienceNumber(user.experience)}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-4 overflow-x-auto shadow-md">
        <div className="flex space-x-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-full ${
                selectedCategory === category.id ? 'bg-navy-blue text-white' : 'bg-white text-navy-blue'
              } transition-all duration-300 transform hover:scale-110 shadow-md`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs text-center">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GYBLiveNetwork;