import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, FileCheck } from 'lucide-react';

export default function RequirementList({ detectedRequirements = [], specificationGaps = [] }) {
  return (
    <div className="space-y-4">
      {/* Extracted Specifications */}
      <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-5 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8ED]">
          <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-[#2F6F73]" />
            Extracted Technical Requirement Parameters
          </h3>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[3px] bg-[#F4F6F8] text-[#12304A] border border-[#E3E8ED]">
            {detectedRequirements.length} Technical Attributes Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {detectedRequirements.map((req, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED]">
              <span className="font-semibold text-[#0B1F33]">{req.label}:</span>
              <span className="font-mono font-bold text-[#12304A] bg-white px-2 py-0.5 rounded-[3px] border border-[#E3E8ED]">
                {req.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Specification Gaps Section */}
      <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-5 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8ED]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
              Specification & Standards Gaps Identified ({specificationGaps.length})
            </h3>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-[3px] bg-amber-50 text-amber-950 border border-amber-300">
            ACTION REQUIRED
          </span>
        </div>

        <div className="space-y-2.5">
          {specificationGaps.map((gap) => (
            <div key={gap.id} className="p-3 bg-amber-50/50 rounded-[3px] border border-amber-300 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between font-bold text-amber-950">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  {gap.title}
                </span>
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-amber-100 text-amber-950 rounded font-bold border border-amber-300">
                  {gap.severity} RISK GAP
                </span>
              </div>
              <p className="text-[#17212B] text-[11px] leading-relaxed pl-5 font-normal">
                {gap.description}
              </p>
              <div className="pl-5 pt-1.5 border-t border-amber-200 text-[11px] font-semibold text-[#0B1F33]">
                <span>Recommended Standards Action:</span> {gap.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
