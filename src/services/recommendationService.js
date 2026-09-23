import apiClient from './api';
import { MOCK_RECOMMENDATION_DATA, DEMO_QUERIES } from '../data/mockRecommendations';

/**
 * Recommendation Service
 *
 * Code path:
 *   1. Always tries the live Express server (POST /api/recommendations).
 *   2. If the server response includes { noMatch: true }, pass it straight
 *      through — the UI renders a graceful empty state.
 *   3. If the server call fails entirely (network error / server down),
 *      fall back to the local keyword-matched mock data — NO Gemini call.
 */

/** Local keyword-based fallback matcher (mirrors Express server logic). */
function localMatchQuery(query) {
  const lower = query.toLowerCase();

  // Score each demo product by keyword hits
  const scores = DEMO_QUERIES.map((dq) => {
    const hits = dq.query.split(' ').filter(w => lower.includes(w)).length;
    return { id: dq.id, hits, data: MOCK_RECOMMENDATION_DATA[dq.query] };
  });

  scores.sort((a, b) => b.hits - a.hits);
  const best = scores[0];

  if (best && best.hits > 0 && best.data) return best.data;

  // Try direct key lookup as final fallback
  const directKey = Object.keys(MOCK_RECOMMENDATION_DATA).find(k =>
    lower.includes(k.toLowerCase()) || k.toLowerCase().includes(lower)
  );
  return directKey ? MOCK_RECOMMENDATION_DATA[directKey] : null;
}

export const getRecommendations = async (userQuery) => {
  // ── Live Express server path ────────────────────────────────────────────────
  try {
    const response = await apiClient.post('/recommendations', { query: userQuery });
    const data = response.data;

    if (data) {
      // Pass-through: the Express server already returns the correct shape.
      // Just normalise field names so the UI components are happy.
      const recommendations = (data.recommendations || []).map((rec) => ({
        ...rec,
        // Ensure both camelCase and snake_case fields exist
        isNumber:      rec.isNumber || rec.is_number,
        relevanceScore: rec.relevanceScore || rec.relevance_score || 90,
        status:        rec.status || 'CURRENT',
        explanation:   rec.explanation || rec.reason || '',
        certification: typeof rec.certification === 'object'
          ? rec.certification
          : { isMandatory: true, statusText: rec.certification || 'BIS Mandatory Standard' }
      }));

      return {
        data: {
          query:                 data.query || userQuery,
          categoryIdentified:    data.categoryIdentified || 'Indian Standards Procurement',
          extractedRequirements: data.extractedRequirements || [],
          recommendations,
          message:               data.message,
          noMatch:               data.noMatch || false
        }
      };
    }
  } catch (err) {
    // ── Local mock fallback (no Gemini, no external call) ─────────────────────
    console.warn(
      '[ISense AI] Express server unreachable — using local mock data.',
      err.message
    );

    const matched = localMatchQuery(userQuery);

    if (matched) {
      return {
        data: {
          query:                 userQuery,
          categoryIdentified:    matched.categoryIdentified || 'Indian Standards Procurement',
          extractedRequirements: matched.extractedRequirements || [],
          recommendations:       matched.recommendations || [],
          noMatch:               false
        }
      };
    }

    // Genuine no-match fallback
    return {
      data: {
        query:                 userQuery,
        categoryIdentified:    'Unrecognised',
        extractedRequirements: [],
        recommendations:       [],
        noMatch:               true,
        message: 'No matching Indian Standard found. Try: "LED street light", "safety helmet", "portland cement", "PVC cable", or "safety shoes".'
      }
    };
  }
};
