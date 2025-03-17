import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronRight } from 'lucide-react';

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  
  const posts = [
    {
      id: 1,
      author: 'Sophie Martin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      image: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      caption: 'Exploring the new design trends inspired by iOS18. The minimalist approach with subtle shadows and translucent elements creates a fresh look.',
      likes: 423,
      comments: 28,
      time: '2h'
    },
    {
      id: 2,
      author: 'Thomas Dubois',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      image: 'https://images.unsplash.com/photo-1575467678930-c7acd65d2c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      caption: 'La nouvelle interface utilisateur est incroyablement intuitive. J\'adore les animations fluides et les transitions subtiles.',
      likes: 287,
      comments: 14,
      time: '4h'
    }
  ];

  const quickActions = [
    { icon: '🎵', label: 'Musique', color: 'from-purple-400 to-purple-600' },
    { icon: '📸', label: 'Photos', color: 'from-blue-400 to-blue-600' },
    { icon: '📝', label: 'Notes', color: 'from-yellow-400 to-yellow-600' },
    { icon: '🗓️', label: 'Calendrier', color: 'from-red-400 to-red-600' }
  ];

  const notifications = [
    { 
      id: 1, 
      app: 'Messages', 
      icon: '💬', 
      message: 'Marie: Est-ce qu\'on se retrouve à 18h?', 
      time: 'Il y a 5 min' 
    },
    { 
      id: 2, 
      app: 'Rappels', 
      icon: '⏰', 
      message: 'Réunion d\'équipe à 14h30', 
      time: 'Il y a 20 min' 
    },
    { 
      id: 3, 
      app: 'Photos', 
      icon: '🖼️', 
      message: 'Vos souvenirs d\'il y a un an', 
      time: 'Il y a 1h' 
    }
  ];

  const renderHomeTab = () => (
    <>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bienvenue sur iOS18 PWA</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
            alt="iOS18 Design" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">Design Moderne</h3>
            <p className="text-gray-600">
              Découvrez l'interface élégante et intuitive inspirée des principes de design d'iOS18.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Actions Rapides</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button key={index} className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white text-2xl mb-2 shadow-sm`}>
                {action.icon}
              </div>
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Fonctionnalités</h2>
          <button className="text-ios-blue text-sm font-medium">Tout voir</button>
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Mise en page responsive</h3>
              <p className="text-gray-600 text-sm">Optimisé pour tous les appareils</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Navigation fixe</h3>
              <p className="text-gray-600 text-sm">Accès facile avec en-tête et pied de page fixes</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Menu latéral</h3>
              <p className="text-gray-600 text-sm">Menu pratique pour options supplémentaires</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Support PWA</h3>
              <p className="text-gray-600 text-sm">Installez sur votre appareil</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </section>
    </>
  );

  const renderFeedTab = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Fil d'actualité</h2>
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 flex items-center">
              <img 
                src={post.avatar} 
                alt={post.author} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-gray-500 text-xs">{post.time}</p>
              </div>
              <button className="text-gray-400">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full aspect-video object-cover"
            />
            <div className="p-4">
              <p className="text-gray-800 mb-3">{post.caption}</p>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <div className="flex space-x-5">
                  <button className="flex items-center space-x-1">
                    <Heart size={18} />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1">
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button>
                    <Bookmark size={18} />
                  </button>
                  <button>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderNotificationsTab = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
        {notifications.map(notification => (
          <div key={notification.id} className="p-4 flex items-start">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl mr-3">
              {notification.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">{notification.app}</h3>
                <span className="text-gray-500 text-xs">{notification.time}</span>
              </div>
              <p className="text-gray-600 text-sm">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'feed':
        return renderFeedTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'home':
      default:
        return renderHomeTab();
    }
  };

  return (
    <main className="flex-1 pt-16 pb-16 overflow-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6 bg-white/70 backdrop-blur-md rounded-full p-1 flex justify-between shadow-sm">
          <button 
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${activeTab === 'home' ? 'bg-ios-blue text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('home')}
          >
            Accueil
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${activeTab === 'feed' ? 'bg-ios-blue text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('feed')}
          >
            Fil d'actualité
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium ${activeTab === 'notifications' ? 'bg-ios-blue text-white' : 'text-gray-600'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>
        
        {renderContent()}
      </div>
    </main>
  );
};

export default Content;
