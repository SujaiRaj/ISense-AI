import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Search } from 'lucide-react';
import RecommendationCard from '../components/RecommendationCard';
import EmptyState from '../components/EmptyState';
import { MOCK_RECOMMENDATION_DATA } from '../data/mockRecommendations';

export default function RecommendationResultsPage({ globalResults }) {
  const navigate = useNavigate();

  // Fallback to default demo dataset if none selected yet
  const activeData = globalResults || MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"];

  const { query, categoryIdentified, extractedRequirements = [], recommendations = [], message } = activeData;

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans text-[#0B1F33]">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
        <div>
          <button
            onClick={() => navigate('/search')}
            className="text-xs font-semibold text-[#64748B] hover:text-[#0B1F33] inline-flex items-center gap-1.5 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>New Specification Search</span>
          </button>
          <h1 className="text-2xl font-bold text-[#102A43] tracking-tight">
            Standard Recommendation Report
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {categoryIdentified && (
            <span className="text-xs font-semibold px-3 py-1 rounded bg-[#F1F5F9] text-[#0B1F33] border border-[#E2E8F0]">
              Category: {categoryIdentified}
            </span>
          )}
          <button 
            onClick={() => window.print()} 
            className="px-3 py-1.5 bg-white hover:bg-[#F8FAFC] text-[#0B1F33] border border-[#E2E8F0] text-xs font-semibold rounded inline-flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Query Quotation & Extracted Parameters Section */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E2E8F0] space-y-6 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block mb-1">
            Analyzed Procurement Specification:
          </span>
          <blockquote className="text-lg sm:text-xl font-bold text-[#0B1F33] border-l-4 border-[#0B1F33] pl-4 py-1 bg-[#F8FAFC] rounded-r">
            "{query}"
          </blockquote>
        </div>

        {extractedRequirements.length > 0 && (
          <div className="pt-4 border-t border-[#E2E8F0]">
            <span className="text-xs font-bold text-[#0B1F33] uppercase tracking-wider block mb-3">
              Extracted Technical Parameters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {extractedRequirements.map((req, idx) => (
                <div key={idx} className="p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                  <span className="text-xs text-[#64748B] font-medium block">{req.key}</span>
                  <span className="font-bold text-[#0B1F33] block truncate mt-0.5">{req.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message or Recommendations List */}
      {message && (
        <div className="p-4 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900 font-medium">
          {message}
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
          <h2 className="text-lg font-bold text-[#0B1F33]">
            Recommended Indian Standards ({recommendations.length})
          </h2>
          <span className="text-xs text-[#64748B]">
            Ranked by parameter relevance
          </span>
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((rec, idx) => (
              <RecommendationCard key={rec.id || idx} recommendation={rec} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg border border-[#E2E8F0] text-center space-y-3">
            <p className="text-xs text-[#64748B]">No sufficiently relevant Indian Standard was found in the current knowledge base.</p>
            <Link to="/search" className="inst-btn-primary py-2 px-4 text-xs font-semibold inline-block">
              Try Another Specification
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
