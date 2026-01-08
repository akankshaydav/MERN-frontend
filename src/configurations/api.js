const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000;

// API Endpoints
export const API_ENDPOINTS = {
  // Reservations
  RESERVATIONS: '/api/v1/reservations',
  RESERVATION_BY_ID: (id) => `/api/v1/reservations/${id}`,
  
  // Tables
  TABLES: '/api/v1/tables',
  AVAILABLE_TABLES: '/api/v1/tables/available',
  
  // Users (if you have authentication)
  AUTH_REGISTER: '/api/v1/auth/register',
  AUTH_LOGIN: '/api/v1/auth/login',
  AUTH_LOGOUT: '/api/v1/auth/logout',
  
  // Contact
  CONTACT: '/api/v1/contact',
};

export { API_BASE_URL, API_TIMEOUT };
export default API_BASE_URL;
```