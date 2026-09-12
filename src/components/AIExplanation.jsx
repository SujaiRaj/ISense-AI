import React from 'react';
import { Check } from 'lucide-react';

/**
/ * Basis for Recommendation Component
/ * Documents the technical rationale for standard alignment.
/ */
export default function AIExplanation({ explanation, matchedFactors = [] }) {
  return (
    <div className="bg-slate-50 text-slate-800 p-4 rounded-md border border-slate-200/90 my-3 text-xs space-y-2.5">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 font-semibold">
        <span className="text-slate-900 text-xs font-semibold">Why this standard matches</span>
        <span className="text-xs text-slate-500 font-medium bg-white px-2 py-0.5 rounded border border-slate-200">
          Basis for recommendation
        </span>
      </div>

      {/* Rationale Text */}
      <p className="text-slate-700 leading-relaxed font-normal">
        {explanation || `Standard matches official Bureau of Indian Standards scope. Technical parameters and testing specifications directly align with the specified requirement parameters.`}
      </p>

      {/* Detailed Match Factors */}
      {matchedFactors.length > 0 && (
        <div className="pt-1.5 border-t border-slate-200/70">
          <div className="text-xs font-medium text-slate-500 mb-1.5">
            Matched Parameters:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {matchedFactors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 text-xs font-normal">
                <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

