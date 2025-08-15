import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrackList = ({ tracks }) => {
  const navigate = useNavigate();

  if (!tracks || tracks.length === 0) {
    return <div>No tracks available</div>;
  }

  const handleEdit = (trackId) => {
    navigate(`/edit-track/${trackId}`);
  };

  return (
    <div className="track-list">
      <h2>Available Tracks</h2>
      <div className="tracks-grid">
        {tracks.map((track) => (
          <div key={track._id} className="track-card">
            <h3>{track.title}</h3>
            <p><strong>Artist:</strong> {track.artist}</p>
            <p><strong>Album:</strong> {track.album}</p>
            <p><strong>Duration:</strong> {track.duration}</p>
            {track.genre && <p><strong>Genre:</strong> {track.genre}</p>}
            <div className="track-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(track._id)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList; 