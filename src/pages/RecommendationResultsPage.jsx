import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigate('/search')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-800 transition-colors bg-white px-3 py-1.5 rounded border border-slate-200 shadow-2xs self-start"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search</span>
        </button>

        {categoryIdentified && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-normal text-slate-500">Category Scope:</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
              {categoryIdentified}
            </span>
          </div>
        )}
      </div>

      {/* Analyzed Procurement Requirement Technical Card */}
      <div className="bg-white p-5 rounded-md border border-slate-200 space-y-3">
        <div className="text-xs font-medium text-slate-500 tracking-wide">
          Procurement Requirement
        </div>

        <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          "{query}"
        </h2>

        {/* Extracted Requirement Parameters Table/Grid */}
        {extractedRequirements.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-2">
              Identified Parameters:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
              {extractedRequirements.map((req, idx) => (
                <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-200/80 font-normal">
                  <div className="text-xs text-slate-400 font-normal">{req.key}</div>
                  <div className="font-medium text-slate-800 truncate">{req.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">
            Applicable Indian Standards
          </h3>
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
            {recommendations.length} Standards Found
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
          title="No Matching Indian Standards"
          description="Try broadening your procurement description or check for spelling errors."
          onReset={() => navigate('/search')}
        />
      )}
    </div>
  );
}

