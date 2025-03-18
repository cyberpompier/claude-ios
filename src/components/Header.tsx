import React, { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20">
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 h-14 flex items-center px-4">
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex-1 text-center font-semibold text-lg">
            iOS18 PWA
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
