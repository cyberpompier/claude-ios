import React from 'react';
import { Home, Search, Heart, User, Grid } from 'lucide-react';

interface FooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, onTabChange }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 h-16 flex items-center justify-around px-2 z-10">
      <button 
        onClick={() => onTabChange('home')}
        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl ${activeTab === 'home' ? 'text-ios-blue' : 'text-gray-500'}`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Accueil</span>
      </button>
      
      <button 
        onClick={() => onTabChange('search')}
        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl ${activeTab === 'search' ? 'text-ios-blue' : 'text-gray-500'}`}
      >
        <Search size={24} />
        <span className="text-xs mt-1">Recherche</span>
      </button>
      
      <button 
        onClick={() => onTabChange('apps')}
        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl ${activeTab === 'apps' ? 'text-ios-blue' : 'text-gray-500'}`}
      >
        <Grid size={24} />
        <span className="text-xs mt-1">Apps</span>
      </button>
      
      <button 
        onClick={() => onTabChange('favorites')}
        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl ${activeTab === 'favorites' ? 'text-ios-blue' : 'text-gray-500'}`}
      >
        <Heart size={24} />
        <span className="text-xs mt-1">Favoris</span>
      </button>
      
      <button 
        onClick={() => onTabChange('profile')}
        className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl ${activeTab === 'profile' ? 'text-ios-blue' : 'text-gray-500'}`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profil</span>
      </button>
    </footer>
  );
};

export default Footer;
