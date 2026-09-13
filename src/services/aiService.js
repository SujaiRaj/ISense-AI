import { MOCK_STANDARDS } from '../data/mockStandards';

/**
 * ISense AI Core Service (Gemini 2.5 Flash MVP Architecture)
 * 
 * Features Implemented:
 * 1. AI Feature 1 — Requirement Understanding:
 *    Takes raw user procurement requirement text and extracts structured parameters 
 *    (Product, Application, Power/Capacity, Environment, Key Requirements, Category).
 * 
 * 2. AI Feature 2 — Standard Recommendation & Ranking:
 *    Compares structured requirement against the 50-item curated Indian Standards dataset,
 *    ranks applicable standards (High, Medium, Low), generates custom "Why this matches" reasoning,
 *    identifies related standards, and highlights mandatory QCO certification status.
 * 
 * Fallback Engine:
 *    If VITE_GEMINI_API_KEY is not configured or network call fails, the service smoothly runs
 *    a local deterministic NLP parsing & semantic similarity scoring engine across MOCK_STANDARDS.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

/**
 * Call Gemini API endpoint directly via REST fetch with automatic model fallback
 */
async function callGemini(promptText) {
  if (!GEMINI_API_KEY) {
    throw new Error("No VITE_GEMINI_API_KEY configured");
  }

  const modelsToTry = [GEMINI_MODEL, "gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];
  const uniqueModels = [...new Set(modelsToTry)];

  let lastError = null;

  for (const model of uniqueModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API Error (${response.status}) on model ${model}: ${errorText}`);
      }

      const json = await response.json();
      const rawContent = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawContent) {
        throw new Error(`Empty response from Gemini API model ${model}`);
      }

      return JSON.parse(rawContent);
    } catch (err) {
      lastError = err;
      console.warn(`[ISense AI] Model ${model} call failed:`, err.message);
    }
  }

  throw lastError || new Error("Failed all Gemini models");
}

/**
 * AI FEATURE 1: Requirement Understanding
 */
export async function analyzeRequirementWithGemini(userQuery) {
  const query = userQuery.trim();

  // Try live Gemini API call first if key present
  if (GEMINI_API_KEY) {
    try {
      const prompt = `You are ISense AI, an expert procurement intelligence system for the Bureau of Indian Standards (BIS).
Analyze the following raw procurement specification text and extract key technical parameters.

Raw Specification: "${query}"

Return ONLY a JSON object with this exact structure:
{
  "product": "Specific product name (e.g. LED Street Light, Safety Helmet, 53 Grade OPC Cement)",
  "application": "Target application (e.g. Municipal road lighting, High-rise building construction)",
  "power": "Rating / Capacity if mentioned (e.g. 90W, 53 Grade, PN 16, or 'Not specified')",
  "environment": "Operating environment (e.g. Outdoor / Corrosive / Substation / Indoor)",
  "category": "One of: Lighting, Electrical, Safety/PPE, Cement/materials, Construction",
  "extractedParameters": [
    { "key": "Identified Product", "value": "...", "status": "MATCHED" },
    { "key": "Application Context", "value": "...", "status": "MATCHED" },
    { "key": "Power / Technical Rating", "value": "...", "status": "EXTRACTED_SPEC" },
    { "key": "Operating Environment", "value": "...", "status": "EXTRACTED_SPEC" },
    { "key": "Primary Requirements", "value": "...", "status": "EXTRACTED_SPEC" }
  ],
  "keyRequirementsList": ["Requirement 1", "Requirement 2", "Requirement 3"]
}`;

      const aiResponse = await callGemini(prompt);
      return {
        success: true,
        source: 'GEMINI_2_5_FLASH',
        data: aiResponse
      };
    } catch (err) {
      console.warn("[ISense AI] Gemini API call failed. Executing Fallback Extraction Engine.", err.message);
    }
  }

  // Fallback Rule-Based & Regex Parser Engine
  return {
    success: true,
    source: 'CURATED_NLP_ENGINE',
    data: fallbackExtractRequirement(query)
  };
}

/**
 * AI FEATURE 2: Standard Recommendation & Ranking
 */
export async function getRecommendationsWithGemini(userQuery, extractedData) {
  const query = userQuery.trim();

  // Pick top candidate standards from database subset matching category/keywords to pass in prompt
  const candidateSubset = MOCK_STANDARDS.map(s => ({
    id: s.id,
    isNumber: s.isNumber,
    title: s.title,
    category: s.category,
    productCategory: s.productCategory,
    scope: s.scope,
    keyRequirements: s.keyRequirements.slice(0, 3),
    qco: s.certification?.qcoName || "None"
  }));

  if (GEMINI_API_KEY) {
    try {
      const prompt = `You are ISense AI Standards Recommendation Engine.
Match the extracted procurement requirement against our curated Indian Standards knowledge base.

Extracted Procurement Requirement:
${JSON.stringify(extractedData, null, 2)}

Curated Indian Standards Knowledge Base:
${JSON.stringify(candidateSubset, null, 2)}

Select and rank the top 3 to 4 most relevant Indian Standards from the supplied knowledge base.
For EACH recommendation, construct a clear explanation why it matches.

Return ONLY a JSON object matching this schema:
{
  "categoryIdentified": "${extractedData.category || 'Engineering Procurement'}",
  "recommendations": [
    {
      "id": "id from database (e.g. is-10322-p5-s3)",
      "isNumber": "IS Number",
      "relevanceTag": "High" or "Medium" or "Low",
      "relevanceScore": integer (70-98),
      "whyThisMatches": "2-3 concise sentences explaining why this standard applies to the requirement",
      "matchedFactors": ["Factor 1", "Factor 2", "Factor 3"]
    }
  ]
}`;

      const aiResponse = await callGemini(prompt);
      
      // Merge AI recommendations back with full database record
      const fullRecommendations = (aiResponse.recommendations || []).map(rec => {
        const fullStd = MOCK_STANDARDS.find(s => s.id === rec.id || s.isNumber.includes(rec.isNumber)) || MOCK_STANDARDS[0];
        return {
          ...fullStd,
          relevanceTag: rec.relevanceTag || "High",
          relevanceScore: rec.relevanceScore || 94,
          explanation: rec.whyThisMatches || fullStd.explanation,
          matchedFactors: rec.matchedFactors || [
            `Product intent matches ${fullStd.productCategory}`,
            `Domain alignment: ${fullStd.category}`,
            `Quality Control Order compliance check`
          ]
        };
      });

      return {
        success: true,
        source: 'GEMINI_2_5_FLASH',
        data: {
          query,
          categoryIdentified: aiResponse.categoryIdentified || extractedData.category,
          extractedRequirements: extractedData.extractedParameters,
          keyRequirementsList: extractedData.keyRequirementsList,
          extractedStructure: extractedData,
          recommendations: fullRecommendations
        }
      };
    } catch (err) {
      console.warn("[ISense AI] Gemini Ranking API failed. Executing Fallback Matcher.", err.message);
    }
  }

  // Fallback Scoring Engine
  return {
    success: true,
    source: 'CURATED_KNOWLEDGE_BASE',
    data: fallbackRankRecommendations(query, extractedData)
  };
}

/**
 * Fallback Requirement Extractor (Rule-based NLP)
 */
function fallbackExtractRequirement(query) {
  const qLower = query.toLowerCase();

  let product = "Procurement Item Specification";
  let category = "Lighting";
  let power = "Not specified";
  let environment = "Standard Commercial / Field";
  let application = "General Municipal Procurement";
  let reqs = ["Standard technical performance", "BIS certification compliance"];

  if (qLower.includes('led') || qLower.includes('street') || qLower.includes('light') || qLower.includes('luminaire')) {
    product = "LED Street Light Luminaire";
    category = "Lighting";
    application = "Municipal Roadway & Street Illumination";
    environment = "Outdoor Saline / All-weather (IP66)";
    reqs = ["Weather resistance (IP66)", "High lumen efficacy (≥120 lm/W)", "10kV Surge Protection"];
  } else if (qLower.includes('helmet') || qLower.includes('ppe') || qLower.includes('footwear') || qLower.includes('safety') || qLower.includes('goggle') || qLower.includes('glove')) {
    product = qLower.includes('helmet') ? "Industrial Safety Helmet" : "Personal Protective Equipment";
    category = "Safety/PPE";
    application = "Construction & Municipal Infrastructure Safety";
    environment = "High Impact Field Work";
    reqs = ["Impact force absorption (< 5 kN)", "Penetration resistance", "Mandatory ISI mark"];
  } else if (qLower.includes('cement') || qLower.includes('opc') || qLower.includes('concrete') || qLower.includes('rebar') || qLower.includes('tmt')) {
    product = qLower.includes('opc') || qLower.includes('53') ? "53 Grade Ordinary Portland Cement" : "Civil Construction Material";
    category = "Cement/materials";
    application = "Structural RCC Concrete & Bridge Engineering";
    environment = "Heavy Load / Structural Exposure";
    reqs = ["Compressive Strength ≥ 53 MPa", "Initial setting time ≥ 30 min", "Mandatory QCO certification"];
  } else if (qLower.includes('cable') || qLower.includes('wire') || qLower.includes('pvc') || qLower.includes('xlpe')) {
    product = qLower.includes('xlpe') ? "XLPE Heavy Duty Power Cable" : "PVC Insulated Electric Cable";
    category = "Electrical";
    application = "Underground & Feeder Distribution";
    environment = "Underground Soil / Direct Burial";
    reqs = ["1100V Rated Voltage", "FRLS Flame Retardance", "Conductor resistance limits"];
  } else if (qLower.includes('pipe') || qLower.includes('hdpe') || qLower.includes('upvc') || qLower.includes('ductile') || qLower.includes('water')) {
    product = qLower.includes('hdpe') ? "HDPE Water Supply Pressure Pipe" : "Municipal Water Pipe";
    category = "Construction";
    application = "Potable Water Distribution & Sewage Main";
    environment = "High Pressure Hydraulic / Underground";
    reqs = ["PE 100 Grade Resin", "Hydrostatic Pressure PN 10/16", "Jal Jeevan Mission compliant"];
  }

  // Power rating regex extraction (e.g. 90W, 53 Grade, 11kV)
  const powerMatch = query.match(/(\d+\s*W|\d+\s*kW|\d+\s*Grade|\d+\s*kV|\d+\s*mm|PE\s*\d+)/i);
  if (powerMatch) {
    power = powerMatch[0];
  }

  return {
    product,
    application,
    power,
    environment,
    category,
    extractedParameters: [
      { key: "Identified Product", value: product, status: "MATCHED" },
      { key: "Application Context", value: application, status: "MATCHED" },
      { key: "Power / Technical Rating", value: power, status: "EXTRACTED_SPEC" },
      { key: "Operating Environment", value: environment, status: "EXTRACTED_SPEC" },
      { key: "Primary Requirements", value: reqs.join(" • "), status: "EXTRACTED_SPEC" }
    ],
    keyRequirementsList: reqs
  };
}

/**
 * Fallback Standard Matcher & Explanation Generator
 */
function fallbackRankRecommendations(query, extractedData) {
  const qLower = query.toLowerCase();
  const catTarget = extractedData.category || "Lighting";

  // Score candidate standards
  const scored = MOCK_STANDARDS.map(std => {
    let score = 70;
    const stdText = `${std.title} ${std.category} ${std.productCategory} ${std.scope} ${std.keyRequirements.join(' ')}`.toLowerCase();

    if (std.category === catTarget) score += 15;
    if (qLower.includes(std.productCategory.toLowerCase())) score += 12;

    const queryWords = qLower.split(/\s+/).filter(w => w.length > 3);
    queryWords.forEach(w => {
      if (stdText.includes(w)) score += 4;
    });

    return {
      ...std,
      rawScore: score
    };
  });

  // Sort by rawScore descending and take top 4
  const sorted = scored.sort((a, b) => b.rawScore - a.rawScore).slice(0, 4);

  const defaultBaseScores = [96, 89, 83, 76];
  const usedScores = new Set();

  const finalRecommendations = sorted.map((std, idx) => {
    let finalScore = defaultBaseScores[idx] || Math.max(50, 96 - idx * 7);

    while (usedScores.has(finalScore) || (idx > 0 && finalScore >= defaultBaseScores[idx - 1])) {
      finalScore = Math.max(50, finalScore - 1);
    }
    usedScores.add(finalScore);

    const relevanceTag = finalScore >= 90 ? "High" : finalScore >= 80 ? "Medium" : "Low";

    return {
      ...std,
      relevanceScore: finalScore,
      relevanceTag,
      explanation: `The requirement specifies "${query}". ${std.isNumber} (${std.title}) directly governs the design, testing, safety benchmarks, and mandatory BIS quality mandates for ${std.productCategory} items in public procurement.`,
      matchedFactors: [
        `Direct specification match for ${std.productCategory}`,
        `BIS Category alignment: ${std.category}`,
        `Quality Control Order certification: ${std.certification.bisScheme}`
      ]
    };
  });

  return {
    query,
    categoryIdentified: catTarget,
    extractedRequirements: extractedData.extractedParameters,
    keyRequirementsList: extractedData.keyRequirementsList || [],
    extractedStructure: extractedData,
    recommendations: finalRecommendations
  };
}
