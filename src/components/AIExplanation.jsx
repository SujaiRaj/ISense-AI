import React from 'react';
import { Check } from 'lucide-react';

export default function AIExplanation({ explanation, matchedFactors = [] }) {
  return (
    <div className="bg-[#F4F6F8] text-[#17212B] p-4 rounded-[4px] border border-[#E3E8ED] my-3 text-xs space-y-2.5">
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E3E8ED]">
        <span className="text-[#0B1F33] font-bold font-mono uppercase tracking-wider text-[11px]">
          Rationale for Standard Alignment
        </span>
        <span className="text-[10px] font-mono font-semibold bg-white text-[#12304A] px-2 py-0.5 rounded-[3px] border border-[#E3E8ED]">
          Technical Recommendation Analysis
        </span>
      </div>

      {/* Rationale Text */}
      <p className="text-[#17212B] leading-relaxed font-normal">
        {explanation || `Standard aligns directly with official Bureau of Indian Standards (BIS) scope. Technical parameters, safety ratings, and test methods meet specified procurement parameters.`}
      </p>

      {/* Detailed Match Factors */}
      {matchedFactors.length > 0 && (
        <div className="pt-2 border-t border-[#E3E8ED]">
          <div className="text-[11px] font-mono font-semibold text-[#61707D] mb-1.5 uppercase">
            Parameter Mapping Matrix:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {matchedFactors.map((factor, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[#17212B] bg-white px-2.5 py-1 rounded-[3px] border border-[#E3E8ED] text-xs font-mono">
                <Check className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
