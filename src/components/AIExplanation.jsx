import React from 'react';
import { Check } from 'lucide-react';

export default function AIExplanation({ explanation, matchedFactors = [] }) {
  return (
    <div className="bg-[#F4F6F8] text-[#17212B] p-4 rounded-md border border-[#E3E8ED] my-4 text-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#E3E8ED]">
        <span className="text-[#0B1F33] font-bold uppercase tracking-wider text-xs">
          Why this standard?
        </span>
      </div>

      <p className="text-[#17212B] leading-relaxed text-xs sm:text-sm font-normal">
        {explanation || `Applies directly to the specified product category and technical scope. Mandatory clauses and test methods align with Indian Standards procurement guidelines.`}
      </p>

      {matchedFactors.length > 0 && (
        <div className="pt-2 border-t border-[#E3E8ED]">
          <div className="text-xs font-semibold text-[#61707D] mb-2">
            Matched Parameters:
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedFactors.map((factor, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[#17212B] bg-white px-2.5 py-1 rounded border border-[#E3E8ED] text-xs">
                <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

