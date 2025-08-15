// API base URL configuration
const API_BASE_URL = 'http://localhost:5174/';

// Environment variable approach for the tracks endpoint
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

// Export the base URL for use in other parts of the application
export { API_BASE_URL, BASE_URL };
