/**
 * Predefined Demo Queries and Mock Recommendation Pipeline Results.
 * Structured to strictly mirror future FastAPI RAG + Vector DB API Payload.
 */

import { MOCK_STANDARDS } from './mockStandards';

export const DEMO_QUERIES = [
  {
    id: "led-street-light",
    label: "LED Street Light",
    query: "90W outdoor LED street light for municipal roads",
    category: "Electrical"
  },
  {
    id: "safety-helmet",
    label: "Safety Helmet",
    query: "Industrial safety helmet for construction workers",
    category: "Safety"
  },
  {
    id: "portland-cement",
    label: "Cement",
    query: "Portland cement for building construction",
    category: "Construction"
  },
  {
    id: "pvc-cable",
    label: "Electrical Cable",
    query: "PVC insulated electrical cable",
    category: "Electrical"
  },
  {
    id: "safety-shoes",
    label: "Safety Shoes",
    query: "Safety shoes for industrial workers",
    category: "Safety"
  }
];

export const MOCK_RECOMMENDATION_DATA = {
  "90W outdoor LED street light for municipal roads": {
    query: "90W outdoor LED street light for municipal roads",
    categoryIdentified: "Electrical / Outdoor Lighting",
    extractedRequirements: [
      { key: "Power Rating", value: "90 Watts", status: "MATCHED" },
      { key: "Application Type", value: "Municipal Roadway Illumination", status: "MATCHED" },
      { key: "Environment", value: "Outdoor Atmospheric Exposure", status: "MATCHED" },
      { key: "Light Source", value: "Solid State Light Emitting Diode (LED)", status: "MATCHED" },
      { key: "Surge Voltage Protection", value: "10 kV Required", status: "EXTRACTED_SPEC" }
    ],
    recommendations: [
      {
        ...MOCK_STANDARDS[0], // IS 10322 (Part 5/Sec 3): 2024
        relevanceScore: 96,
        explanation: "IS 10322 (Part 5/Sec 3): 2024 is the primary governing Indian Standard specifically written for public street and highway luminaires. It directly specifies performance parameters, IP66 ingress protection against outdoor monsoon weather, and electrical safety for 90W municipal fittings.",
        matchedFactors: [
          "Outdoor lighting specification",
          "LED technology luminaire",
          "Roadway & municipal safety benchmarks",
          "IP66 ingress protection compliance"
        ]
      },
      {
        ...MOCK_STANDARDS[1], // IS 16102 (Part 1): 2023
        relevanceScore: 89,
        explanation: "Relevant for mandatory LED chip self-ballasting, flame resistance, and dielectric safety requirements for integrated luminaire electronics.",
        matchedFactors: [
          "LED driver safety compliance",
          "Thermal safety & fire resistance",
          "Compulsory Registration Scheme (CRS) mandatory"
        ]
      },
      {
        ...MOCK_STANDARDS[6], // IS 15885 (Part 2/Sec 13): 2020
        relevanceScore: 85,
        explanation: "Applies to the internal electronic controlgear (LED Driver) supplying direct current to the 90W outdoor LED array.",
        matchedFactors: [
          "Electronic driver controlgear",
          "Voltage surge regulation",
          "Power Factor ≥ 0.95"
        ]
      },
      {
        ...MOCK_STANDARDS[4], // IS 694: 2022
        relevanceScore: 78,
        explanation: "Applicable for internal pole junction box wiring and external feed connections to the 90W luminaire.",
        matchedFactors: [
          "1100V rated power feed cable",
          "Flame retardant FRLS insulation"
        ]
      },
      {
        ...MOCK_STANDARDS[13], // IS 9000 (Part 1): 2020
        relevanceScore: 72,
        explanation: "Defines environmental reliability testing protocols for outdoor temperature cycles and humidity exposure.",
        matchedFactors: [
          "Environmental endurance test",
          "Thermal cycle resistance"
        ]
      }
    ]
  },

  "Industrial safety helmet for construction workers": {
    query: "Industrial safety helmet for construction workers",
    categoryIdentified: "Personal Protective Equipment (PPE) / Safety",
    extractedRequirements: [
      { key: "Equipment Type", value: "Industrial Head Protection Helmet", status: "MATCHED" },
      { key: "User Profile", value: "Civil Construction & Field Personnel", status: "MATCHED" },
      { key: "Impact Protection", value: "Shock Absorption & Penetration Resistance", status: "EXTRACTED_SPEC" }
    ],
    recommendations: [
      {
        ...MOCK_STANDARDS[2], // IS 2925: 2023
        relevanceScore: 97,
        explanation: "IS 2925: 2023 is the exclusive mandatory Indian Standard for industrial head protection. Covers mechanical shock absorption limit (< 5.0 kN), penetration resistance against falling debris, and chinstrap retention for civil construction sites.",
        matchedFactors: [
          "Industrial head safety helmet",
          "Impact & penetration test compliance",
          "Mandatory QCO ISI Marking required"
        ]
      },
      {
        ...MOCK_STANDARDS[5], // IS 15298 (Part 2): 2021
        relevanceScore: 84,
        explanation: "Highly recommended as a complementary mandatory PPE standard for construction site worker safety footwear.",
        matchedFactors: [
          "Comprehensive worker PPE protection",
          "Site safety compliance"
        ]
      }
    ]
  },

  "Portland cement for building construction": {
    query: "Portland cement for building construction",
    categoryIdentified: "Civil Engineering & Construction Materials",
    extractedRequirements: [
      { key: "Material", value: "Portland Pozzolana / Ordinary Cement", status: "MATCHED" },
      { key: "Application", value: "Structural Building Construction", status: "MATCHED" },
      { key: "Compressive Strength", value: "53 MPa Grade equivalent", status: "EXTRACTED_SPEC" }
    ],
    recommendations: [
      {
        ...MOCK_STANDARDS[3], // IS 1489 (Part 1): 2021
        relevanceScore: 95,
        explanation: "IS 1489 (Part 1): 2021 specifies Portland Pozzolana Cement (Flyash based) suitable for general structural concrete, masonry, and public civil infrastructure.",
        matchedFactors: [
          "Portland Pozzolana Cement (Flyash)",
          "Compressive strength benchmarks",
          "Mandatory Cement QCO 2020"
        ]
      },
      {
        ...MOCK_STANDARDS[11], // IS 269: 2021
        relevanceScore: 91,
        explanation: "Alternative standard for Ordinary Portland Cement (OPC 43/53 Grade) where high early strength structural casting is required.",
        matchedFactors: [
          "Ordinary Portland Cement",
          "High structural load capacity"
        ]
      }
    ]
  },

  "PVC insulated electrical cable": {
    query: "PVC insulated electrical cable",
    categoryIdentified: "Electrical / Wires & Cables",
    extractedRequirements: [
      { key: "Product", value: "PVC Insulated Electrical Cable", status: "MATCHED" },
      { key: "Voltage Rating", value: "Up to 1100 Volts", status: "MATCHED" },
      { key: "Fire Safety", value: "Flame Retardant Low Smoke (FRLS)", status: "EXTRACTED_SPEC" }
    ],
    recommendations: [
      {
        ...MOCK_STANDARDS[4], // IS 694: 2022
        relevanceScore: 96,
        explanation: "IS 694: 2022 is the primary Indian Standard governing PVC insulated cables for working voltages up to 1100V. Specifies conductor resistance, insulation dielectric strength, and FRLS flame retardancy.",
        matchedFactors: [
          "PVC cable up to 1100V",
          "FRLS fire retardant testing",
          "Mandatory Wires & Cables QCO"
        ]
      },
      {
        ...MOCK_STANDARDS[9], // IS 7098 (Part 1): 2022
        relevanceScore: 88,
        explanation: "Recommended alternative standard if underground armored cabling or higher thermal stress tolerance (XLPE) is required.",
        matchedFactors: [
          "Underground armored cabling",
          "Crosslinked polyethylene option"
        ]
      }
    ]
  },

  "Safety shoes for industrial workers": {
    query: "Safety shoes for industrial workers",
    categoryIdentified: "Personal Protective Equipment (PPE) / Footwear",
    extractedRequirements: [
      { key: "Product", value: "Industrial Safety Footwear", status: "MATCHED" },
      { key: "Toe Protection", value: "200J Impact Resistant Steel/Composite Toe", status: "EXTRACTED_SPEC" },
      { key: "Sole Protection", value: "Oil, Acid & Slip Resistance", status: "EXTRACTED_SPEC" }
    ],
    recommendations: [
      {
        ...MOCK_STANDARDS[5], // IS 15298 (Part 2): 2021
        relevanceScore: 97,
        explanation: "IS 15298 (Part 2): 2021 is the sole mandatory Indian Standard for industrial safety footwear. Mandates 200J steel toe impact testing, slip resistance (SRC), and sole penetration protection.",
        matchedFactors: [
          "Industrial safety footwear spec",
          "Steel toe cap impact resistance",
          "DPIIT mandatory Footwear QCO"
        ]
      },
      {
        ...MOCK_STANDARDS[2], // IS 2925: 2023
        relevanceScore: 83,
        explanation: "Complementary safety PPE standard recommended for workplace safety compliance.",
        matchedFactors: [
          "PPE head safety compliance"
        ]
      }
    ]
  }
};
