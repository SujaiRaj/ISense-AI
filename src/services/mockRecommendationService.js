import { MOCK_RECOMMENDATION_DATA } from '../data/mockRecommendations';
import { MOCK_STANDARDS } from '../data/mockStandards';

/**
 * Simulated AI Recommendation Engine for ISense AI MVP
 * Provides realistic semantic similarity scoring & requirement extraction.
 */

export const mockGetRecommendations = async (userQuery) => {
  // Simulate network latency (800ms to 1200ms)
  await new Promise((resolve) => setTimeout(resolve, 900));

  const trimmedQuery = userQuery.trim();
  const lowerQuery = trimmedQuery.toLowerCase();

  // 1. Direct match with exact pre-configured demo queries
  if (MOCK_RECOMMENDATION_DATA[trimmedQuery]) {
    return {
      success: true,
      data: MOCK_RECOMMENDATION_DATA[trimmedQuery]
    };
  }

  // 2. Fallback dynamic semantic keyword matching engine across MOCK_STANDARDS
  const keywords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  const scoredStandards = MOCK_STANDARDS.map(standard => {
    let matchPoints = 0;
    const textToMatch = `${standard.title} ${standard.category} ${standard.productCategory} ${standard.explanation} ${standard.keyRequirements.join(' ')}`.toLowerCase();

    keywords.forEach(kw => {
      if (textToMatch.includes(kw)) {
        matchPoints += 20;
      }
    });

    // Special category match boosts
    if (lowerQuery.includes('led') || lowerQuery.includes('street') || lowerQuery.includes('light') || lowerQuery.includes('luminaire')) {
      if (standard.productCategory.includes('LED') || standard.productCategory.includes('Light')) matchPoints += 40;
    }
    if (lowerQuery.includes('helmet') || lowerQuery.includes('head') || lowerQuery.includes('safety')) {
      if (standard.category === 'Safety') matchPoints += 30;
    }
    if (lowerQuery.includes('cement') || lowerQuery.includes('concrete') || lowerQuery.includes('building')) {
      if (standard.category === 'Construction') matchPoints += 30;
    }
    if (lowerQuery.includes('cable') || lowerQuery.includes('wire') || lowerQuery.includes('electrical')) {
      if (standard.productCategory.includes('Cable') || standard.category === 'Electrical') matchPoints += 30;
    }

    const calculatedScore = Math.min(97, Math.max(68, 65 + matchPoints));

    return {
      ...standard,
      relevanceScore: calculatedScore,
      explanation: `Analyzed against query "${trimmedQuery}". Standard ${standard.isNumber} governs technical parameters, performance benchmarks, and safety specifications for ${standard.productCategory} in government procurement specifications.`,
      matchedFactors: [
        `Extracted intent matching ${standard.productCategory}`,
        `BIS Category alignment: ${standard.category}`,
        `Mandatory certification check: ${standard.certification.bisScheme}`
      ]
    };
  });

  // Sort by score descending and pick top 4
  const sorted = scoredStandards.sort((a, b) => b.relevanceScore - a.relevanceScore);
  const topRecommendations = sorted.slice(0, 4);

  // Dynamic requirement extraction simulation
  const extractedRequirements = [
    { key: "Detected Product Category", value: topRecommendations[0]?.productCategory || "General Technical Supply", status: "MATCHED" },
    { key: "Domain Classification", value: topRecommendations[0]?.category || "Engineering Procurement", status: "MATCHED" },
    { key: "Primary BIS Standard", value: topRecommendations[0]?.isNumber || "IS Mandatory Standard", status: "MATCHED" },
    { key: "Certification Status", value: topRecommendations[0]?.certification.statusText || "Verification Required", status: "EXTRACTED_SPEC" }
  ];

  return {
    success: true,
    data: {
      query: trimmedQuery,
      categoryIdentified: topRecommendations[0]?.category || "General Procurement",
      extractedRequirements,
      recommendations: topRecommendations
    }
  };
};
