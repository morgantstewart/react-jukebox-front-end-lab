import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackList from './TrackList';
import { index as fetchTracks } from '../services/trackService';

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTracks = async () => {
      try {
        setLoading(true);
        const fetchedTracks = await fetchTracks();
        setTracks(fetchedTracks);
        setError(null);
      } catch (err) {
        console.error('Error fetching tracks:', err);
        setError('Failed to load tracks');
      } finally {
        setLoading(false);
      }
    };

    getTracks();
  }, []);

  if (loading) {
    return <div>Loading tracks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1>Jukebox</h1>
      <button 
        className="add-track-btn"
        onClick={() => navigate('/add-track')}
      >
        Add New Track
      </button>
      <TrackList tracks={tracks} />
    </div>
  );
};

export default Home; 