import apiClient from './api';
import { MOCK_STANDARDS } from '../data/mockStandards';

const USE_LIVE_API = import.meta.env.VITE_USE_LIVE_API === 'true';

export const getStandardsList = async (filters = {}) => {
  if (USE_LIVE_API) {
    try {
      const response = await apiClient.get('/standards', { params: filters });
      return response.data;
    } catch (err) {
      console.warn('[ISense AI] Live Standards API unreachable. Using Mock standards library.', err.message);
    }
  }

  // Simulated quick delay
  await new Promise(res => setTimeout(res, 200));

  let result = [...MOCK_STANDARDS];

  if (filters.category && filters.category !== 'All') {
    result = result.filter(s => s.category.toLowerCase() === filters.category.toLowerCase());
  }

  if (filters.status && filters.status !== 'All') {
    result = result.filter(s => s.status.toLowerCase() === filters.status.toLowerCase());
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(s => 
      s.isNumber.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.productCategory.toLowerCase().includes(q)
    );
  }

  return {
    success: true,
    total: result.length,
    data: result
  };
};

export const getStandardById = async (id) => {
  if (USE_LIVE_API) {
    try {
      const response = await apiClient.get(`/standards/${id}`);
      return response.data;
    } catch (err) {
      console.warn('[ISense AI] Live Standard detail call failed.', err.message);
    }
  }

  await new Promise(res => setTimeout(res, 250));

  const standard = MOCK_STANDARDS.find(s => s.id === id || s.isNumber.toLowerCase().includes(id.toLowerCase()));

  if (!standard) {
    // Return fallback standard 0 if not found
    return {
      success: true,
      data: MOCK_STANDARDS[0]
    };
  }

  return {
    success: true,
    data: standard
  };
};
