import apiClient from './api';
import { MOCK_RECOMMENDATION_DATA } from '../data/mockRecommendations';

/**
 * Service for Tender Document Analysis & Gap Analysis
 */

const USE_LIVE_API = import.meta.env.VITE_USE_LIVE_API === 'true';

export const analyzeTenderDocument = async (fileOrDemoName = 'demo_tender_led.pdf') => {
  if (USE_LIVE_API) {
    try {
      const formData = new FormData();
      if (typeof fileOrDemoName !== 'string') {
        formData.append('file', fileOrDemoName);
      } else {
        formData.append('demo_file', fileOrDemoName);
      }
      const response = await apiClient.post('/tender/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (err) {
      console.warn('[ISense AI] Live Tender API call failed. Using mock response.', err.message);
    }
  }

  // Simulated Processing Delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const baseData = MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"];

  return {
    success: true,
    data: {
      documentName: typeof fileOrDemoName === 'string' ? fileOrDemoName : fileOrDemoName.name || 'Procurement_Tender_Spec_2026.pdf',
      documentSize: "2.4 MB",
      processedDate: new Date().toISOString(),
      extractedProduct: "Outdoor LED Street Light (90W Municipal Grade)",
      detectedRequirements: [
        { label: "Power Rating", value: "90W ± 5%", present: true },
        { label: "Input Voltage", value: "230V AC, 50Hz", present: true },
        { label: "Application Area", value: "Municipal Outdoor Roadway", present: true },
        { label: "Weather Resistance", value: "IP66 Water & Dust Proofing", present: true }
      ],
      specificationGaps: [
        {
          id: "gap-1",
          type: "WARNING",
          title: "Applicable Indian Standard Reference Missing",
          description: "The tender specification does not explicitly quote IS 10322 (Part 5/Sec 3): 2024. Omitting this exposes the procurement to non-standard supplier submissions.",
          severity: "HIGH",
          recommendation: "Mandate IS 10322 (Part 5/Sec 3) in Clause 4.1 of the Technical Document."
        },
        {
          id: "gap-2",
          type: "WARNING",
          title: "Surge Protection Testing Methodology Omitted",
          description: "No testing standard specified for 10kV transient surge resistance under Indian atmospheric conditions.",
          severity: "MEDIUM",
          recommendation: "Add IS 9000 surge & environmental testing protocol."
        },
        {
          id: "gap-3",
          type: "WARNING",
          title: "QCO 2023 BIS Certification Clause Unstated",
          description: "Fails to include mandatory Quality Control Order compliance statement required for public sector PSU procurement.",
          severity: "HIGH",
          recommendation: "Insert mandatory requirement: Supplier must possess valid BIS Scheme-I License."
        }
      ],
      recommendedStandards: baseData.recommendations
    }
  };
};
