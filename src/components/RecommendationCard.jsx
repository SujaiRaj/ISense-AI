import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Layers, ChevronRight } from 'lucide-react';
import ConfidenceScore from './ConfidenceScore';
import StatusBadge from './StatusBadge';
import ComplianceBadge from './ComplianceBadge';
import AIExplanation from './AIExplanation';

export default function RecommendationCard({ recommendation }) {
  const navigate = useNavigate();
  const {
    id,
    isNumber,
    title,
    relevanceScore = 90,
    status = "CURRENT",
    explanation,
    matchedFactors = [],
    category,
    productCategory,
    certification = {},
    relatedStandards = [],
    source = {}
  } = recommendation;

  const handleViewDetails = () => {
    navigate(`/standards/${id}`);
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 p-5 hover:border-slate-300 transition-colors">
      {/* Top Bar: IS Number, Badges & Confidence Score */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono font-semibold text-base text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {isNumber}
            </span>
            <StatusBadge status={status} />
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {category}
            </span>
          </div>
          <h3 
            onClick={handleViewDetails}
            className="text-base font-semibold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer leading-snug"
          >
            {title}
          </h3>
        </div>

        {/* Relevance Score Indicator */}
        <div className="shrink-0">
          <ConfidenceScore score={relevanceScore} />
        </div>
      </div>

      {/* Rationale for Recommendation */}
      <AIExplanation 
        explanation={explanation} 
        matchedFactors={matchedFactors} 
      />

      {/* Matched Attributes & Certification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 text-xs">
        <div>
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            Matched Scope Parameters:
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-normal">
              ✓ {productCategory || category}
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-normal">
              ✓ Technical Specification
            </span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-normal">
              ✓ Testing & Quality Standard
            </span>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            Certification & References:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ComplianceBadge 
              type={certification.isMandatory ? "REQUIRED" : "RECOMMENDED"} 
              label={certification.statusText || "BIS Certification Applicable"} 
            />
            {relatedStandards.length > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-normal">
                <Layers className="w-3 h-3 text-slate-500" />
                {relatedStandards.length} Related References
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
        <span className="text-slate-500 font-normal">
          Source: <strong className="text-slate-700 font-medium">{source.portal || "BIS Manakonline Portal"}</strong>
        </span>

        <button
          onClick={handleViewDetails}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-medium text-xs transition-colors"
        >
          <span>View Standard Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

