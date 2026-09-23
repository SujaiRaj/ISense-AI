import axios from 'axios';

/**
 * Base Axios API Client for ISense AI
 * Default: Express demo server on http://localhost:3001/api
 * Override via VITE_API_BASE_URL env variable for a live AI backend.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 15000
});

// Global response interceptor for clean error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('[ISense API Warning] Live backend unreachable or endpoint error:', error?.message);
    return Promise.reject(error);
  }
);

export default apiClient;
