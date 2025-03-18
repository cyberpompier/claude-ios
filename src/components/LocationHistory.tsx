import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LocationRecord {
  id: number;
  created_at: string;
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  distance?: number;
}

const LocationHistory: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [locations, setLocations] = useState<LocationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<{ id: number, status: string } | null>(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching locations:', error);
        setError('Impossible de charger l\'historique des positions');
      } else {
        setLocations(data || []);
      }
    } catch (err) {
      console.error('Exception fetching locations:', err);
      setError('Une erreur est survenue lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const deleteLocation = async (id: number) => {
    setDeleteStatus({ id, status: 'deleting' });
    
    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting location:', error);
        setDeleteStatus({ id, status: 'error' });
        setTimeout(() => setDeleteStatus(null), 2000);
      } else {
        setDeleteStatus({ id, status: 'success' });
        setTimeout(() => {
          setDeleteStatus(null);
          setLocations(locations.filter(loc => loc.id !== id));
        }, 500);
      }
    } catch (err) {
      console.error('Exception deleting location:', err);
      setDeleteStatus({ id, status: 'error' });
      setTimeout(() => setDeleteStatus(null), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  useEffect(() => {
    fetchLocations();
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
          Historique des positions
        </div>
        <div className="w-10"></div>
      </div>
      
      <div className="p-4">
        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4">
            <p className="font-medium">Erreur</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={fetchLocations}
              className="mt-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              Réessayer
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-ios-blue rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Chargement de l'historique...</p>
          </div>
        ) : locations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Aucune position enregistrée</h3>
            <p className="text-gray-600">
              Vos positions enregistrées apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold">Positions enregistrées</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {locations.map(location => (
                <div 
                  key={location.id} 
                  className={`p-4 transition-colors ${
                    deleteStatus?.id === location.id && deleteStatus.status === 'deleting' 
                      ? 'bg-red-50' 
                      : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="bg-ios-blue w-10 h-10 rounded-full flex items-center justify-center text-white mr-3">
                      <MapPin size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{location.address || 'Position enregistrée'}</h3>
                          <p className="text-gray-500 text-sm">
                            {formatDate(location.created_at)}
                          </p>
                        </div>
                        <button 
                          onClick={() => deleteLocation(location.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          disabled={deleteStatus?.id === location.id}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}</p>
                        {location.city && <p>Ville: {location.city}</p>}
                        {location.distance !== undefined && (
                          <p>Distance: {location.distance} km de l'adresse de référence</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationHistory;
