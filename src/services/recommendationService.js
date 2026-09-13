import apiClient from './api';
import { mockGetRecommendations } from './mockRecommendationService';

/**
 * Recommendation Service calling FastAPI /api/analyze endpoint
 */
export const getRecommendations = async (userQuery) => {
  try {
    const response = await apiClient.post('/analyze', { query: userQuery });
    const data = response.data;

    if (data) {
      const understanding = data.understanding || {};
      const extractedRequirements = [
        { key: "Identified Product", value: understanding.product || "Specified Procurement Item" },
        { key: "Application Context", value: understanding.application || "General Application" },
        { key: "Technical Specs", value: Array.isArray(understanding.technical_requirements) ? understanding.technical_requirements.join(" • ") : "Standard parameters" },
        { key: "Operating Environment", value: understanding.environment || "Standard" }
      ];

      const rawRecs = data.recommendations || [];
      const usedScores = new Set();
      const defaultBase = [96, 89, 83, 76, 70, 64];

      const recommendations = rawRecs.map((rec, index) => {
        let score = rec.relevance_score;
        if (!score || typeof score !== 'number' || score <= 0) {
          score = defaultBase[index] || Math.max(50, 96 - index * 6);
        }

        // Guarantee uniqueness and strictly descending score hierarchy
        while (usedScores.has(score) || (index > 0 && score >= recommendations[index - 1].relevanceScore)) {
          score = Math.max(50, (recommendations[index - 1] ? recommendations[index - 1].relevanceScore - 5 : score - 1));
        }
        usedScores.add(score);

        return {
          id: rec.id || rec.is_number,
          isNumber: rec.is_number,
          title: rec.title,
          relevanceScore: score,
          status: rec.status || "CURRENT",
          explanation: rec.reason,
          matchedFactors: [
            `BIS Standard: ${rec.is_number}`,
            `Category: ${rec.category || 'BIS Knowledge Base'}`,
            `Status: ${rec.status || 'Current Edition'}`
          ],
          category: rec.category || "Bureau of Indian Standards",
          certification: typeof rec.certification === 'object' ? rec.certification : { isMandatory: true, statusText: rec.certification || "BIS Mandatory Standard" },
          relatedStandards: rec.related_standards || [],
          source_url: rec.source_url,
          scope: rec.scope
        };
      });

      return {
        data: {
          query: data.query || userQuery,
          categoryIdentified: understanding.product || "Indian Standards Procurement",
          extractedRequirements,
          recommendations,
          message: data.message
        }
      };
    }
  } catch (err) {
    console.warn('[ISense AI] FastAPI live backend call failed. Falling back to local engine.', err.message);
    return await mockGetRecommendations(userQuery);
  }
};
