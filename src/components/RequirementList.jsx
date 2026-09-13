import React from 'react';
import { AlertTriangle, AlertCircle, FileCheck } from 'lucide-react';

export default function RequirementList({ detectedRequirements = [], specificationGaps = [] }) {
  return (
    <div className="space-y-6">
      {/* Extracted Specifications */}
      <div className="bg-white rounded-lg border border-[#E3E8ED] p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8ED]">
          <h3 className="text-xs font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#2F6F73]" />
            <span>Extracted Specification Parameters</span>
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#F4F6F8] text-[#12304A] border border-[#E3E8ED]">
            {detectedRequirements.length} Attributes Mapped
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {detectedRequirements.map((req, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-[#F4F6F8] rounded-md border border-[#E3E8ED]">
              <span className="font-semibold text-[#0B1F33]">{req.label}:</span>
              <span className="font-mono font-bold text-[#12304A] bg-white px-2 py-0.5 rounded border border-[#E3E8ED]">
                {req.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Specification Gaps Section */}
      <div className="bg-white rounded-lg border border-[#E3E8ED] p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8ED]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <h3 className="text-xs font-bold text-[#0B1F33] uppercase tracking-wider">
              Identified Specification Gaps ({specificationGaps.length})
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-950 border border-amber-300">
            Action Recommended
          </span>
        </div>

        <div className="space-y-3">
          {specificationGaps.map((gap) => (
            <div key={gap.id} className="p-4 bg-amber-50/50 rounded-md border border-amber-300 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-amber-950">
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  {gap.title}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-100 text-amber-950 rounded border border-amber-300">
                  {gap.severity} RISK
                </span>
              </div>
              <p className="text-[#17212B] text-xs leading-relaxed pl-6 font-normal">
                {gap.description}
              </p>
              <div className="pl-6 pt-2 border-t border-amber-200 text-xs font-semibold text-[#0B1F33]">
                <span>Recommended Action:</span> {gap.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

