// API base URL configuration
const API_BASE_URL = 'http://localhost:3000/';

// Environment variable approach for the tracks endpoint
const BASE_URL = `${API_BASE_URL}tracks`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error('Error fetching tracks:', err);
    throw err;
  }
};

const deleteTrack = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error('Error deleting track:', err);
    throw err;
  }
};

export { API_BASE_URL, BASE_URL, index, deleteTrack };
