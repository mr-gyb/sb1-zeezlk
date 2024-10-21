import React, { useState } from 'react';
import { ChevronLeft, User, MapPin, Video, Image, Headphones, FileText, Youtube, Facebook, Linkedin, Instagram, Twitter, ChevronDown, ChevronUp, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const contentTypes = [
    { type: 'Video', icon: Video, platforms: ['YouTube', 'Facebook', 'Instagram', 'TikTok'] },
    { type: 'Photo', icon: Image, platforms: ['Instagram', 'Facebook', 'Twitter'] },
    { type: 'Audio', icon: Headphones, platforms: ['Spotify', 'Apple Podcasts', 'Google Podcasts'] },
    { type: 'Written', icon: FileText, platforms: ['Medium', 'LinkedIn', 'WordPress'] },
  ];

  const platformIcons: { [key: string]: React.ElementType } = {
    YouTube: Youtube,
    Facebook: Facebook,
    LinkedIn: Linkedin,
    Instagram: Instagram,
    Twitter: Twitter,
    TikTok: Music, // Using Music icon as a replacement for TikTok
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="bg-white min-h-screen text-navy-blue">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="mr-4 text-navy-blue">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-navy-blue">Create New Post</h1>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="flex-grow p-2 border rounded"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <button
                onClick={() => toggleSection('tagPeople')}
                className="w-full p-2 bg-navy-blue text-white rounded flex items-center justify-between"
              >
                <span className="flex items-center">
                  <User size={20} className="mr-2" />
                  Tag People
                </span>
                {expandedSections.includes('tagPeople') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.includes('tagPeople') && (
                <div className="mt-2 p-2 border rounded">
                  <input type="text" placeholder="Search people..." className="w-full p-2 border rounded" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <button
                onClick={() => toggleSection('addLocation')}
                className="w-full p-2 bg-navy-blue text-white rounded flex items-center justify-between"
              >
                <span className="flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Add Location
                </span>
                {expandedSections.includes('addLocation') ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {expandedSections.includes('addLocation') && (
                <div className="mt-2 p-2 border rounded">
                  <input type="text" placeholder="Search locations..." className="w-full p-2 border rounded" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Post to Other Accounts</h3>
            {contentTypes.map((contentType) => (
              <div key={contentType.type} className="border rounded p-2">
                <button
                  onClick={() => toggleSection(contentType.type)}
                  className="w-full flex items-center justify-between"
                >
                  <span className="flex items-center">
                    <contentType.icon size={20} className="mr-2" />
                    {contentType.type}
                  </span>
                  {expandedSections.includes(contentType.type) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections.includes(contentType.type) && (
                  <div className="mt-2 space-y-2">
                    {contentType.platforms.map((platform) => (
                      <div key={platform} className="flex items-center justify-between">
                        <span className="flex items-center">
                          {platformIcons[platform] && React.createElement(platformIcons[platform], { size: 20, className: "mr-2" })}
                          {platform}
                        </span>
                        <input type="checkbox" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;