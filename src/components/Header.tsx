import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideMenu from './SideMenu';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getPageTitle = () => {
    // ... (keep existing switch statement)
  };

  const handleLogoClick = () => {
    navigate('/new-chat', { state: { selectedAgent: 'Mr.GYB AI' } });
  };

  return (
    <>
      <header className="bg-white text-navy-blue shadow-md">
        <div className="container mx-auto flex items-center justify-between p-2 sm:p-4">
          <button className="text-navy-blue" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button onClick={handleLogoClick} className="flex items-center space-x-2">
              <img src="/gyb-logo.svg" alt="GYB Logo" className="h-8 sm:h-10" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold">{getPageTitle()}</h1>
          </div>
          <div className="w-6"></div>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} userData={userData} />
    </>
  );
};

export default Header;