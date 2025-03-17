import React, { useState, useEffect } from 'react';
import { Menu, X, Wifi, Battery, Search } from 'lucide-react';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(100);

  useEffect(() => {
    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    
    // Simulate battery drain
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = prev - Math.random() * 0.5;
        return newLevel < 10 ? 100 : newLevel;
      });
    }, 30000);
    
    return () => {
      clearInterval(interval);
      clearInterval(batteryInterval);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20">
        {/* Status bar */}
        <div className="bg-black/5 backdrop-blur-xl h-6 px-4 flex items-center justify-between text-xs font-medium">
          <span>{currentTime}</span>
          <div className="flex items-center space-x-1">
            <Wifi size={12} />
            <div className="flex items-center">
              <Battery size={14} />
              <span className="ml-1">{Math.round(batteryLevel)}%</span>
            </div>
          </div>
        </div>
        
        {/* Main header */}
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
