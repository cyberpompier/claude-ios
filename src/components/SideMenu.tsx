import React from 'react';
import { 
  Home, 
  User, 
  Settings, 
  Bell, 
  Calendar, 
  Mail, 
  Image, 
  Music, 
  FileText,
  Moon,
  Sun,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Accueil', badge: 0 },
    { icon: <User size={20} />, label: 'Profil', badge: 0 },
    { icon: <Bell size={20} />, label: 'Notifications', badge: 3 },
    { icon: <Calendar size={20} />, label: 'Calendrier', badge: 1 },
    { icon: <Mail size={20} />, label: 'Messages', badge: 5 },
    { icon: <Image size={20} />, label: 'Photos', badge: 0 },
    { icon: <Music size={20} />, label: 'Musique', badge: 0 },
    { icon: <FileText size={20} />, label: 'Documents', badge: 0 },
  ];

  const bottomMenuItems = [
    { icon: <Moon size={20} />, label: 'Mode sombre' },
    { icon: <HelpCircle size={20} />, label: 'Aide' },
    { icon: <Settings size={20} />, label: 'Réglages' },
    { icon: <LogOut size={20} />, label: 'Déconnexion' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}
      
      {/* Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } rounded-tr-3xl rounded-br-3xl shadow-lg pt-20 flex flex-col`}
      >
        <div className="px-4 py-2">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              SM
            </div>
            <div>
              <h3 className="font-semibold text-lg">Sophie Martin</h3>
              <p className="text-gray-500 text-sm">sophie.martin@example.com</p>
            </div>
          </div>
          <div className="mt-3 bg-gray-100 rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Stockage iCloud</span>
              <span className="text-xs text-gray-500">45% utilisé</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">23.4 Go sur 50 Go</p>
          </div>
        </div>
        
        <div className="mt-4 flex-1 overflow-auto">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="flex items-center w-full px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-600 mr-4">{item.icon}</span>
              <span className="font-medium flex-1">{item.label}</span>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto border-t border-gray-200 pt-2 pb-6">
          {bottomMenuItems.map((item, index) => (
            <button 
              key={index}
              className="flex items-center w-full px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-600 mr-4">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
