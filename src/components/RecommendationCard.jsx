import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, ChevronRight, Bookmark, ShieldCheck, FileCheck, TestTube } from 'lucide-react';
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
    source = {},
    requirements = [],
    clauses = ["Clause 4.1 - Technical Specs", "Clause 6.2 - Safety Protocols", "Clause 8.1 - Test Methods"],
    testMethods = ["High Voltage Test", "Thermal Endurance Test", "IP66 Ingress Test"]
  } = recommendation;

  const handleViewDetails = () => {
    navigate(`/standards/${id}`);
  };

  return (
    <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-5 hover:border-[#28536F] transition-all shadow-2xs">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#E3E8ED]">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="font-mono font-bold text-sm bg-[#12304A] text-white px-2.5 py-0.5 rounded-[3px] border border-[#28536F]">
              {isNumber}
            </span>
            <StatusBadge status={status} />
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-[3px] bg-[#F4F6F8] text-[#12304A] border border-[#E3E8ED]">
              {category}
            </span>
          </div>
          <h3 
            onClick={handleViewDetails}
            className="text-base font-semibold text-[#0B1F33] hover:text-[#28536F] transition-colors cursor-pointer leading-snug"
          >
            {title}
          </h3>
        </div>

        {/* Relevance Score Indicator */}
        <div className="shrink-0">
          <ConfidenceScore score={relevanceScore} />
        </div>
      </div>

      {/* Rationale & Technical Match Analysis */}
      <AIExplanation 
        explanation={explanation} 
        matchedFactors={matchedFactors} 
      />

      {/* Evidence Breakdown Grid: Requirements, Clauses, Test Methods, Allied Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#E3E8ED] text-xs font-mono">
        <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#61707D] mb-1 flex items-center gap-1">
            <FileCheck className="w-3 h-3 text-[#28536F]" />
            Applicable Clauses & Scope
          </div>
          <ul className="space-y-1 text-[11px] text-[#17212B]">
            {clauses.map((c, i) => (
              <li key={i} className="truncate">• {c}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#61707D] mb-1 flex items-center gap-1">
            <TestTube className="w-3 h-3 text-[#2F6F73]" />
            Mandatory Test Methods
          </div>
          <ul className="space-y-1 text-[11px] text-[#17212B]">
            {testMethods.map((t, i) => (
              <li key={i} className="truncate">• {t}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#61707D] mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-teal-700" />
            Compliance & Gazette Order
          </div>
          <div className="mt-1 space-y-1">
            <ComplianceBadge 
              type={certification.isMandatory ? "REQUIRED" : "RECOMMENDED"} 
              label={certification.statusText || "BIS Certification Mandatory"} 
            />
            {relatedStandards.length > 0 && (
              <div className="text-[10px] text-[#61707D] pt-1">
                {relatedStandards.length} Allied Normative References
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4 pt-3 border-t border-[#E3E8ED] text-xs">
        <div className="text-[11px] text-[#61707D] font-mono">
          Source Repository: <strong className="text-[#0B1F33]">{source.portal || "BIS Technical Standards Index"}</strong>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleViewDetails}
            className="inst-btn-primary py-1 px-3 text-xs"
          >
            <span>View Full Technical Sheet</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
