import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCheck, ShieldCheck, Printer, Download } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import EmptyState from '../components/EmptyState';
import { MOCK_RECOMMENDATION_DATA } from '../data/mockRecommendations';

export default function RecommendationResultsPage({ globalResults }) {
  const navigate = useNavigate();

  // Fallback to default demo dataset if none selected yet
  const activeData = globalResults || MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"];

  const { query, categoryIdentified, extractedRequirements = [], recommendations = [] } = activeData;

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Navigation & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/search')}
          className="inst-btn-secondary py-1.5 px-3 text-xs font-mono self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Search Workspace</span>
        </button>

        <div className="flex items-center gap-2">
          {categoryIdentified && (
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-[3px] bg-[#F4F6F8] text-[#12304A] border border-[#E3E8ED]">
              Category: {categoryIdentified}
            </span>
          )}
          <button 
            onClick={() => window.print()} 
            className="inst-btn-secondary py-1.5 px-3 text-xs font-mono hidden sm:flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-[#28536F]" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Engineering Standards Report Summary Panel */}
      <div className="bg-white p-5 rounded-[4px] border border-[#E3E8ED] space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E3E8ED] pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#28536F] uppercase tracking-wider">
            <FileCheck className="w-4 h-4 text-[#12304A]" />
            <span>Official Technical Standards Analysis Report</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 font-bold uppercase">
            Analysis Verified
          </span>
        </div>

        <div>
          <div className="text-[11px] font-mono font-semibold text-[#61707D] uppercase">
            Analyzed Procurement Specification Query:
          </div>
          <h2 className="text-base font-bold text-[#0B1F33] leading-snug mt-1 font-mono">
            "{query}"
          </h2>
        </div>

        {/* Extracted Requirement Parameters Table/Grid */}
        {extractedRequirements.length > 0 && (
          <div className="pt-3 border-t border-[#E3E8ED]">
            <div className="text-xs font-mono font-bold text-[#0B1F33] mb-2 uppercase tracking-wider">
              Extracted Technical Parameters Matrix:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
              {extractedRequirements.map((req, idx) => (
                <div key={idx} className="p-2 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED]">
                  <div className="text-[10px] text-[#61707D] font-semibold">{req.key}</div>
                  <div className="font-bold text-[#0B1F33] truncate mt-0.5">{req.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Header Bar */}
      <div className="flex items-center justify-between pt-1 border-b border-[#E3E8ED] pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
            Identified Bureau of Indian Standards ({recommendations.length})
          </h3>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-[3px] bg-emerald-50 text-emerald-950 border border-emerald-300">
            {recommendations.length} Matches Found
          </span>
        </div>
      </div>

      {/* Recommendations Cards List */}
      {recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <RecommendationCard 
              key={rec.id || index} 
              recommendation={rec} 
              rankIndex={index + 1} 
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="No Matching Indian Standards Found"
          description="Broaden your product description or specify core electrical/mechanical parameters."
          actionText="Search New Specification"
          onReset={() => navigate('/search')}
        />
      )}
    </div>
  );
}
