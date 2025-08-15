import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TrackForm = () => {
  const navigate = useNavigate();
  const { trackId } = useParams();
  const isEditing = !!trackId;
  
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    genre: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch track data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchTrack = async () => {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:3000/tracks/${trackId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const track = await response.json();
          setFormData(track);
        } catch (err) {
          console.error('Error fetching track:', err);
          setError('Failed to load track data');
        } finally {
          setLoading(false);
        }
      };
      fetchTrack();
    }
  }, [trackId, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEditing 
        ? `http://localhost:3000/tracks/${trackId}`
        : 'http://localhost:3000/tracks';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`Track ${isEditing ? 'updated' : 'added'} successfully:`, result);
      
      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} track:`, err);
      setError(`Failed to ${isEditing ? 'update' : 'add'} track. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div>Loading track data...</div>;
  }

  return (
    <div className="track-form">
      <h2>{isEditing ? 'Edit Track' : 'Add New Track'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="album">Album:</label>
          <input
            type="text"
            id="album"
            name="album"
            value={formData.album}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3:45"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? (isEditing ? 'Updating...' : 'Adding Track...') : (isEditing ? 'Update Track' : 'Add Track')}
          </button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrackForm; 