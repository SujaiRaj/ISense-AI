/**
 * Predefined Demo Queries and Mock Recommendation Pipeline Results.
 * Structured to strictly mirror future FastAPI RAG + Vector DB API Payload.
 */

import { MOCK_STANDARDS } from './mockStandards';

export const DEMO_QUERIES = [
  {
    id: "led-street-light",
    label: "street light",
    query: "street light",
    category: "Electrical"
  },
  {
    id: "safety-helmet",
    label: "helmet",
    query: "helmet",
    category: "Safety"
  },
  {
    id: "portland-cement",
    label: "cement",
    query: "cement",
    category: "Construction"
  },
  {
    id: "pvc-cable",
    label: "electrical cable",
    query: "electrical cable",
    category: "Electrical"
  }
];

const STREET_LIGHT_DATA = {
  query: "street light",
  categoryIdentified: "Electrical / Outdoor Lighting",
  extractedRequirements: [
    { key: "Application Type", value: "Outdoor Illumination & Street Lighting", status: "MATCHED" },
    { key: "Environment", value: "Weather & Atmospheric Exposure", status: "MATCHED" },
    { key: "Light Source", value: "LED Luminaire Array", status: "MATCHED" }
  ],
  recommendations: [
    {
      ...MOCK_STANDARDS[0],
      relevanceScore: 96,
      explanation: "IS 10322 (Part 5/Sec 3) specifies performance, ingress protection (IP66), and electrical safety parameters for outdoor street lighting and public luminaires.",
      matchedFactors: [
        "Outdoor lighting specification",
        "Street luminaire safety standards",
        "Weather protection compliance"
      ]
    },
    {
      ...MOCK_STANDARDS[1],
      relevanceScore: 89,
      explanation: "IS 16102 (Part 1) governs mandatory safety requirements for self-ballasted LED lamps and general lighting components.",
      matchedFactors: [
        "LED safety compliance",
        "CRS mandatory registration"
      ]
    }
  ]
};

const HELMET_DATA = {
  query: "helmet",
  categoryIdentified: "Personal Protective Equipment",
  extractedRequirements: [
    { key: "Product Type", value: "Industrial Helmet / Head Protection", status: "MATCHED" },
    { key: "Impact Resistance", value: "Standard Shock Absorption", status: "MATCHED" }
  ],
  recommendations: [
    {
      ...MOCK_STANDARDS[2],
      relevanceScore: 98,
      explanation: "IS 2925 governs industrial safety helmets, testing shock absorption, penetration resistance, and chin strap strength.",
      matchedFactors: [
        "Head protection specification",
        "Mandatory BIS certification mark"
      ]
    }
  ]
};

const CEMENT_DATA = {
  query: "cement",
  categoryIdentified: "Civil Engineering & Construction",
  extractedRequirements: [
    { key: "Material Type", value: "Ordinary Portland Cement", status: "MATCHED" },
    { key: "Structural Use", value: "RCC & Concrete Construction", status: "MATCHED" }
  ],
  recommendations: [
    {
      ...MOCK_STANDARDS[3],
      relevanceScore: 95,
      explanation: "IS 269 defines testing methods and quality requirements for Ordinary Portland Cement used in structural concrete works.",
      matchedFactors: [
        "Portland cement specification",
        "Compulsory BIS certification"
      ]
    }
  ]
};

const CABLE_DATA = {
  query: "electrical cable",
  categoryIdentified: "Electrical Infrastructure",
  extractedRequirements: [
    { key: "Conductor Type", value: "Insulated Electrical Wiring Cable", status: "MATCHED" },
    { key: "Voltage Grade", value: "Up to 1100V", status: "MATCHED" }
  ],
  recommendations: [
    {
      ...MOCK_STANDARDS[4],
      relevanceScore: 97,
      explanation: "IS 694 regulates PVC insulated heavy duty electrical cables for working voltages up to and including 1100V.",
      matchedFactors: [
        "PVC cable safety specification",
        "Mandatory Standard Mark"
      ]
    }
  ]
};

export const MOCK_RECOMMENDATION_DATA = {
  "street light": STREET_LIGHT_DATA,
  "90W outdoor LED street light for municipal roads": STREET_LIGHT_DATA,
  "helmet": HELMET_DATA,
  "Industrial safety helmet for construction workers": HELMET_DATA,
  "cement": CEMENT_DATA,
  "53 Grade OPC cement for bridge RCC concrete": CEMENT_DATA,
  "Portland cement for building construction": CEMENT_DATA,
  "electrical cable": CABLE_DATA,
  "PVC insulated electrical cable": CABLE_DATA,
  "PVC insulated electrical cable for building wiring": CABLE_DATA
};

export const MOCK_HISTORY = [
  {
    id: "hist-1",
    query: "90W outdoor LED street light for municipal roads",
    standardsCount: 5,
    highestMatch: 96,
    date: "Today, 14:20",
    resultData: MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"]
  },
  {
    id: "hist-2",
    query: "Industrial safety helmet for construction workers",
    standardsCount: 4,
    highestMatch: 97,
    date: "Yesterday, 11:45",
    resultData: MOCK_RECOMMENDATION_DATA["Industrial safety helmet for construction workers"]
  },
  {
    id: "hist-3",
    query: "53 Grade OPC cement for bridge RCC concrete",
    standardsCount: 4,
    highestMatch: 95,
    date: "12 Sep 2026",
    resultData: MOCK_RECOMMENDATION_DATA["53 Grade OPC cement for bridge RCC concrete"]
  },
  {
    id: "hist-4",
    query: "PVC insulated electrical cable for building wiring",
    standardsCount: 3,
    highestMatch: 94,
    date: "10 Sep 2026",
    resultData: MOCK_RECOMMENDATION_DATA["PVC insulated electrical cable"]
  }
];

