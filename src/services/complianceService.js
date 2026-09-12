import { MOCK_STANDARDS } from '../data/mockStandards';

/**
 * Service for Product Compliance & BIS QCO Regulatory Tracking
 */

export const checkProductCompliance = async (productOrCategory) => {
  await new Promise(res => setTimeout(res, 350));

  const normalized = (productOrCategory || 'LED Street Light').toLowerCase();

  const matchedStandards = MOCK_STANDARDS.filter(s => 
    s.productCategory.toLowerCase().includes(normalized) ||
    s.category.toLowerCase().includes(normalized) ||
    normalized.includes(s.productCategory.toLowerCase())
  );

  const activeStandards = matchedStandards.length > 0 ? matchedStandards : [MOCK_STANDARDS[0]];

  return {
    success: true,
    productQueried: productOrCategory,
    standardsFoundCount: activeStandards.length,
    overallComplianceStatus: "MANDATORY_QCO_ENFORCED",
    disclaimer: "Compliance information shown in this MVP is demonstrative. Final procurement decisions must be verified against current official BIS notifications, QCOs and applicable regulations.",
    standards: activeStandards.map(std => ({
      id: std.id,
      isNumber: std.isNumber,
      title: std.title,
      status: std.status,
      category: std.category,
      qcoApplicable: std.certification.qcoApplicable,
      qcoName: std.certification.qcoName || "Quality Control Order 2023",
      certificationScheme: std.certification.bisScheme,
      statusBadge: std.status === 'CURRENT' ? 'CURRENT' : 'OUTDATED',
      certificationBadge: std.certification.isMandatory ? 'REQUIRED' : 'RECOMMENDED',
      amendmentsCount: std.amendments ? std.amendments.length : 0,
      requirementsSummary: std.keyRequirements.slice(0, 3)
    }))
  };
};
