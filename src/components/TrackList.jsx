import React from 'react';

const TrackList = ({ tracks }) => {
  if (!tracks || tracks.length === 0) {
    return <div>No tracks available</div>;
  }

  return (
    <div className="track-list">
      <h2>Available Tracks</h2>
      <div className="tracks-grid">
        {tracks.map((track) => (
          <div key={track.id} className="track-card">
            <h3>{track.title}</h3>
            <p><strong>Artist:</strong> {track.artist}</p>
            <p><strong>Album:</strong> {track.album}</p>
            <p><strong>Duration:</strong> {track.duration}</p>
            {track.genre && <p><strong>Genre:</strong> {track.genre}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackList; 