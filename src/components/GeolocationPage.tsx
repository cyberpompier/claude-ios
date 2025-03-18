import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ArrowLeft, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationInfo {
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  distance?: number;
}

interface LocationRecord {
  id?: number;
  created_at?: string;
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  distance?: number;
}

const GeolocationPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [referenceAddress] = useState("5 avenue de la gare, noyon, france");
  
  const referenceCoordinates = {
    latitude: 49.5811,
    longitude: 3.0014
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);
    setSaveStatus(null);
    
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas prise en charge par votre navigateur");
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        
        const distance = calculateDistance(
          latitude, 
          longitude, 
          referenceCoordinates.latitude, 
          referenceCoordinates.longitude
        );
        
        setTimeout(() => {
          setLocationInfo({
            address: "Votre position actuelle",
            city: "À proximité de Noyon",
            country: "France",
            postalCode: "60400",
            distance: distance
          });
          setLoading(false);
        }, 1000);
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError("L'utilisateur a refusé la demande de géolocalisation");
            break;
          case error.POSITION_UNAVAILABLE:
            setError("Les informations de localisation sont indisponibles");
            break;
          case error.TIMEOUT:
            setError("La demande de localisation a expiré");
            break;
          default:
            setError("Une erreur inconnue s'est produite");
            break;
        }
        setLoading(false);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c;
    return Math.round(distance * 10) / 10;
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  const saveLocationToSupabase = async () => {
    if (!coordinates || !locationInfo) return;

    setSaveStatus('saving');
    
    try {
      const locationData: LocationRecord = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        address: locationInfo.address,
        city: locationInfo.city,
        distance: locationInfo.distance
      };

      const { data, error } = await supabase
        .from('locations')
        .insert([locationData])
        .select();

      if (error) {
        console.error('Error saving location:', error);
        setSaveStatus('error');
      } else {
        console.log('Location saved:', data);
        setSaveStatus('success');
      }
    } catch (err) {
      console.error('Exception saving location:', err);
      setSaveStatus('error');
    }
  };
  
  useEffect(() => {
    getLocation();
  }, []);
  
  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 h-14 flex items-center px-4">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 text-center font-semibold text-lg">
          Localisation
        </div>
        <button 
          onClick={getLocation}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold mb-1">Adresse de référence</h2>
            <p className="text-gray-600">{referenceAddress}</p>
          </div>
          
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Votre position</h2>
            
            {error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4">
                <p className="font-medium">Erreur de géolocalisation</p>
                <p className="text-sm">{error}</p>
                <button 
                  onClick={getLocation}
                  className="mt-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  Réessayer
                </button>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-ios-blue rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600">Recherche de votre position...</p>
              </div>
            ) : coordinates ? (
              <>
                <div className="bg-gray-100 rounded-xl p-4 mb-4">
                  <div className="flex items-start">
                    <div className="bg-ios-blue w-10 h-10 rounded-full flex items-center justify-center text-white mr-3">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{locationInfo?.address}</h3>
                      <p className="text-gray-600 text-sm">
                        {locationInfo?.city}, {locationInfo?.postalCode}
                      </p>
                      <p className="text-gray-600 text-sm">{locationInfo?.country}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-xl p-4 mb-4">
                  <h3 className="font-medium mb-2">Coordonnées GPS</h3>
                  <p className="text-gray-600 text-sm">Latitude: {coordinates.latitude.toFixed(6)}</p>
                  <p className="text-gray-600 text-sm">Longitude: {coordinates.longitude.toFixed(6)}</p>
                </div>
                
                {locationInfo?.distance !== undefined && (
                  <div className="bg-gray-100 rounded-xl p-4 mb-4">
                    <div className="flex items-start">
                      <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white mr-3">
                        <Navigation size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Distance par rapport à l'adresse de référence</h3>
                        <p className="text-gray-600">
                          {locationInfo.distance} km de 5 avenue de la gare, Noyon
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={saveLocationToSupabase}
                  disabled={loading || saveStatus === 'saving'}
                  className="w-full bg-ios-blue text-white font-medium py-3 rounded-xl mb-4 flex items-center justify-center"
                >
                  {saveStatus === 'saving' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enregistrement...
                    </>
                  ) : 'Enregistrer ma position'}
                </button>

                {saveStatus === 'success' && (
                  <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-4 text-center">
                    Position enregistrée avec succès!
                  </div>
                )}

                {saveStatus === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-center">
                    Erreur lors de l'enregistrement. Veuillez réessayer.
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Impossible d'obtenir votre position
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">À propos de la géolocalisation</h2>
            <p className="text-gray-600 text-sm mb-3">
              Cette fonctionnalité utilise l'API Geolocation de votre navigateur pour déterminer votre position actuelle.
            </p>
            <p className="text-gray-600 text-sm mb-3">
              Les données de localisation sont stockées dans une base de données Supabase sécurisée.
            </p>
            <p className="text-gray-600 text-sm">
              La précision peut varier en fonction de votre appareil et de votre environnement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeolocationPage;
