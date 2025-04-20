import axios from 'axios';

export default axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// retrieves the token stored in the frontend 
// (from localStorage or sessionStorage) and 
// attaches it to every API request sent to the backend.