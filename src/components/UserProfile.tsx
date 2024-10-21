import React, { useState } from 'react';
import { Grid, Video, Users, MapPin, Calendar, Link as LinkIcon, Mail, Image, MessageCircle, Star, Film, ChevronLeft } from 'lucide-react';
import { useParams, useLocation, Link } from 'react-router-dom';

interface LocationState {
  experience: 'beginner' | 'intermediate' | 'proficient' | 'advanced' | 'expert';
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { experience } = (location.state as LocationState) || { experience: 'intermediate' };
  const [activeTab, setActiveTab] = useState('posts');

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'border-red-500 text-red-500';
      case 'intermediate': return 'border-orange-500 text-orange-500';
      case 'proficient': return 'border-blue-500 text-blue-500';
      case 'advanced': return 'border-green-500 text-green-500';
      case 'expert': return 'border-yellow-400 text-yellow-400';
      default: return 'border-gray-300 text-gray-300';
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

  const profileData = {
    name: `User ${userId}`,
    username: `@user${userId}`,
    bio: 'Web Development Expert',
    location: 'San Francisco, CA',
    website: `https://user${userId}.com`,
    joinDate: 'Joined January 2024',
    following: 185,
    followers: 6993,
    posts: 2416,
    rating: 4.7,
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200"></div>
            ))}
          </div>
        );
      case 'replies':
      case 'highlights':
      case 'media':
        return <p className="text-center py-8">No {activeTab} to show.</p>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Link to="/gyb-live-network" className="flex items-center text-navy-blue mb-4">
          <ChevronLeft size={24} className="mr-2" />
          Back to GYB Live Network
        </Link>
        <div className="relative">
          <div className="h-32 bg-gray-300"></div>
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <div className={`w-24 h-24 rounded-full border-4 ${getExperienceColor(experience)} overflow-hidden`}>
              <img
                src={`https://source.unsplash.com/random/96x96?face&u=${userId}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {renderStars(profileData.rating)}
          </div>
        </div>

        <div className="mt-20 px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <p className="text-gray-600 flex items-center">
                {profileData.username}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${getExperienceColor(experience)}`}>
                  {getExperienceNumber(experience)}
                </span>
              </p>
            </div>
            <button className="bg-navy-blue text-white px-4 py-2 rounded-full">
              Follow
            </button>
          </div>

          <p className="mt-2">{profileData.bio}</p>

          <div className="flex flex-wrap gap-y-2 mt-2 text-gray-600">
            <span className="flex items-center mr-4"><MapPin size={16} className="mr-1" />{profileData.location}</span>
            <span className="flex items-center mr-4"><LinkIcon size={16} className="mr-1" />{profileData.website}</span>
            <span className="flex items-center mr-4"><Calendar size={16} className="mr-1" />{profileData.joinDate}</span>
          </div>

          <div className="flex mt-4 space-x-4">
            <span><strong>{profileData.following}</strong> Following</span>
            <span><strong>{profileData.followers}</strong> Followers</span>
          </div>

          <div className="flex border-b mt-4">
            {['Posts', 'Replies', 'Highlights', 'Media'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${activeTab === tab.toLowerCase() ? 'border-b-2 border-navy-blue' : ''}`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;