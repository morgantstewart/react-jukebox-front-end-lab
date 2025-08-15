import React from 'react';

const NowPlaying = ({ currentTrack }) => {
  if (!currentTrack) {
    return null;
  }

  return (
    <div className="now-playing">
      <h2>Now Playing</h2>
      <div className="now-playing-card">
        <h3>{currentTrack.title}</h3>
        <p><strong>Artist:</strong> {currentTrack.artist}</p>
        <p><strong>Album:</strong> {currentTrack.album}</p>
        <p><strong>Duration:</strong> {currentTrack.duration}</p>
        {currentTrack.genre && <p><strong>Genre:</strong> {currentTrack.genre}</p>}
        <div className="playing-indicator">
          <span className="playing-dot"></span>
          <span>Playing...</span>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying; 