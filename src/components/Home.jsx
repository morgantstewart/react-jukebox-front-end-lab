import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackList from './TrackList';
import NowPlaying from './NowPlaying';
import { index as fetchTracks, deleteTrack } from '../services/trackService';

const Home = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const navigate = useNavigate();

  const handleDeleteTrack = async (trackId) => {
    try {
      await deleteTrack(trackId);
      // Remove the deleted track from the local state
      setTracks(tracks.filter(track => track._id !== trackId));
      // If the deleted track was currently playing, stop it
      if (currentTrack && currentTrack._id === trackId) {
        setCurrentTrack(null);
      }
    } catch (err) {
      console.error('Error deleting track:', err);
      throw err;
    }
  };

  const handlePlayTrack = (track) => {
    setCurrentTrack(track);
  };

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
      <TrackList tracks={tracks} onDeleteTrack={handleDeleteTrack} onPlayTrack={handlePlayTrack} />
      <NowPlaying currentTrack={currentTrack} />
    </div>
  );
};

export default Home; 