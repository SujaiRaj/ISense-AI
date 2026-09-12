import apiClient from './api';
import { mockGetRecommendations } from './mockRecommendationService';

/**
 * Service Wrapper for AI Recommendations
 * 
 * ARCHITECTURE FOR FUTURE BACKEND INTEGRATION:
 * When VITE_USE_LIVE_API is 'true', this service routes to FastAPI endpoint:
 * POST /api/recommendations { query: string }
 * 
 * Pipeline connected on FastAPI:
 * User Query -> LLM Requirements Extraction -> Embedding Generation -> pgvector Vector Search -> RERANK -> RAG -> Output
 */

const USE_LIVE_API = import.meta.env.VITE_USE_LIVE_API === 'true';

export const getRecommendations = async (userQuery) => {
  if (USE_LIVE_API) {
    try {
      const response = await apiClient.post('/recommendations', { query: userQuery });
      return response.data;
    } catch (err) {
      console.warn('[ISense AI] Live backend call failed. Falling back to Mock Engine.', err.message);
      return await mockGetRecommendations(userQuery);
    }
  }

  // MVP Mode: Call simulated local AI engine
  return await mockGetRecommendations(userQuery);
};
