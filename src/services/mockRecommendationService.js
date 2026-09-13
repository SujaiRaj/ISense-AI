import { analyzeRequirementWithGemini, getRecommendationsWithGemini } from './aiService';

/**
 * Service Wrapper executing Gemini 2.5 Flash MVP Pipeline
 */
export const mockGetRecommendations = async (userQuery) => {
  // Simulate AI processing latency (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Step 1: AI Feature 1 — Requirement Understanding
  const extractionResult = await analyzeRequirementWithGemini(userQuery);

  // Step 2: AI Feature 2 — Standard Recommendation & Explanation
  const recommendationResult = await getRecommendationsWithGemini(userQuery, extractionResult.data);

  return recommendationResult;
};
