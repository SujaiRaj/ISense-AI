import axios from 'axios';

/**
 * Base Axios API Client for ISense AI
 * Pointing to FastAPI Backend Endpoint (http://localhost:8000/api by default)
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

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
