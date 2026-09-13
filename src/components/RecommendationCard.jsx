import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';
import ConfidenceScore from './ConfidenceScore';

export default function RecommendationCard({ recommendation }) {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const {
    id,
    isNumber,
    title,
    relevanceScore = 90,
    status = "CURRENT",
    explanation,
    matchedFactors = [],
    category,
    certification = {},
    relatedStandards = [],
    scope,
    source_url,
    sourceUrl
  } = recommendation;

  const bisUrl = source_url || sourceUrl;

  const handleViewDetails = () => {
    navigate(`/standards/${id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 space-y-4 font-sans hover:border-[#0B1F33] transition-colors">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-[#E2E8F0]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-mono font-bold text-sm text-[#0B1F33] bg-[#F1F5F9] px-2.5 py-0.5 rounded border border-[#E2E8F0]">
              {isNumber}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {status}
            </span>
            {certification?.statusText && (
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                {certification.statusText}
              </span>
            )}
          </div>
          
          <h3 
            onClick={handleViewDetails}
            className="text-base sm:text-lg font-bold text-[#0B1F33] hover:text-[#1E3A8A] transition-colors cursor-pointer leading-snug"
          >
            {title}
          </h3>
        </div>

        {/* Subtle Relevance Score */}
        <div className="shrink-0 self-start sm:self-auto">
          <ConfidenceScore score={relevanceScore} />
        </div>
      </div>

      {/* Matching Reasoning & Explanation */}
      <div className="bg-[#F8FAFC] p-4 rounded border border-[#E2E8F0] space-y-2 text-xs">
        <span className="font-bold text-[#0B1F33] uppercase tracking-wider block text-[11px]">
          Matching Rationale:
        </span>
        <p className="text-[#334155] leading-relaxed">
          {explanation || scope || "Applies directly to the specified product category and technical scope governed by BIS specifications."}
        </p>

        {matchedFactors.length > 0 && (
          <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap gap-2 text-[11px] text-[#475569]">
            {matchedFactors.map((factor, idx) => (
              <span key={idx} className="bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                • {factor}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable Technical Details Button */}
      <div className="pt-1">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold text-[#0B1F33] hover:underline inline-flex items-center gap-1 focus:outline-none"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Hide Scope Details</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>View Technical Scope & Allied Standards</span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Technical Scope */}
      {showDetails && (
        <div className="p-4 bg-[#F8FAFC] rounded border border-[#E2E8F0] space-y-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-[#0B1F33] block">Scope & Benchmark Standards:</span>
            <p className="text-[#475569] leading-relaxed">{scope || "Technical requirements governed under BIS Compulsory Registration Framework."}</p>
          </div>

          {relatedStandards.length > 0 && (
            <div className="pt-2 border-t border-[#E2E8F0] space-y-1">
              <span className="font-bold text-[#0B1F33] block">Referred Indian Standards:</span>
              <ul className="space-y-1 text-[#475569]">
                {relatedStandards.map((rel, idx) => (
                  <li key={idx}>
                    • <strong>{rel.is_number || rel.isNumber}</strong>: {rel.title || rel.relationship}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0] text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#64748B]">
            Category: <strong className="text-[#0B1F33]">{category || 'Lighting / Engineering'}</strong>
          </span>
          {bisUrl && (
            <a
              href={bisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1"
            >
              <span>Official BIS Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => navigate(`/compliance?id=${id || ''}&is=${encodeURIComponent(isNumber || '')}`)}
            className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0B1F33] rounded text-xs font-semibold border border-[#E2E8F0] transition-colors"
          >
            Check Compliance
          </button>

          <button
            onClick={handleViewDetails}
            className="px-3 py-1.5 bg-[#0B1F33] hover:bg-[#1E3A8A] text-white rounded text-xs font-semibold transition-colors inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
