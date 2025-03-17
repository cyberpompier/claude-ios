import React, { useState } from 'react';
import { Home, Search, Bell, Settings, Layers } from 'lucide-react';

interface FooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, onTabChange }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200 h-16 flex items-center justify-around z-20">
      <button 
        className={`p-2 rounded-full transition-colors flex flex-col items-center ${activeTab === 'home' ? 'text-ios-blue' : 'text-gray-600 hover:bg-gray-100'}`}
        onClick={() => onTabChange('home')}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Accueil</span>
      </button>
      <button 
        className={`p-2 rounded-full transition-colors flex flex-col items-center ${activeTab === 'discover' ? 'text-ios-blue' : 'text-gray-600 hover:bg-gray-100'}`}
        onClick={() => onTabChange('discover')}
      >
        <Search size={24} />
        <span className="text-xs mt-1">Découvrir</span>
      </button>
      <button 
        className={`p-2 rounded-full transition-colors flex flex-col items-center ${activeTab === 'apps' ? 'text-ios-blue' : 'text-gray-600 hover:bg-gray-100'}`}
        onClick={() => onTabChange('apps')}
      >
        <Layers size={24} />
        <span className="text-xs mt-1">Apps</span>
      </button>
      <button 
        className={`p-2 rounded-full transition-colors flex flex-col items-center ${activeTab === 'notifications' ? 'text-ios-blue' : 'text-gray-600 hover:bg-gray-100'}`}
        onClick={() => onTabChange('notifications')}
      >
        <Bell size={24} />
        <span className="text-xs mt-1">Notifications</span>
      </button>
      <button 
        className={`p-2 rounded-full transition-colors flex flex-col items-center ${activeTab === 'settings' ? 'text-ios-blue' : 'text-gray-600 hover:bg-gray-100'}`}
        onClick={() => onTabChange('settings')}
      >
        <Settings size={24} />
        <span className="text-xs mt-1">Réglages</span>
      </button>
    </footer>
  );
};

export default Footer;
