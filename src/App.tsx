import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import GeolocationPage from './components/GeolocationPage';
import LocationHistory from './components/LocationHistory';

function App() {
  const [isInstallPromptShown, setIsInstallPromptShown] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => {
        if (!isInstallPromptShown) {
          setIsInstallPromptShown(true);
        }
      }, 3000);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
      });
    };
  }, [isInstallPromptShown]);

  const handleInstallClick = () => {
    setIsInstallPromptShown(false);
    
    if (deferredPrompt) {
      deferredPrompt.prompt();
      
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'apps') {
      setCurrentPage('geolocation');
    } else {
      setActiveTab(tab);
      setCurrentPage('home');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'geolocation':
        return <GeolocationPage onBack={() => setCurrentPage('home')} />;
      case 'history':
        return <LocationHistory onBack={() => setCurrentPage('home')} />;
      case 'home':
      default:
        return <Content />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      {renderCurrentPage()}
      <Footer activeTab={activeTab} onTabChange={handleTabChange} />
      
      {isInstallPromptShown && currentPage === 'home' && (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-2xl shadow-lg p-4 z-50 flex items-center">
          <div className="mr-4 bg-gradient-to-br from-blue-400 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl">
            📱
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Installer l'application</h3>
            <p className="text-sm text-gray-600">Ajoutez cette application à votre écran d'accueil pour y accéder plus rapidement.</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsInstallPromptShown(false)}
              className="px-3 py-1.5 text-sm font-medium text-gray-600"
            >
              Plus tard
            </button>
            <button 
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-ios-blue text-white text-sm font-medium rounded-full"
            >
              Installer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
