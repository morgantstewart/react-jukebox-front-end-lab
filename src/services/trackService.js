// API base URL configuration
const API_BASE_URL = 'http://localhost:5174/';

// Environment variable approach for the tracks endpoint
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

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

export { API_BASE_URL, BASE_URL, index };
