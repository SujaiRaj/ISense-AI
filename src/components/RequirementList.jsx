import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

export default function RequirementList({ detectedRequirements = [], specificationGaps = [] }) {
  return (
    <div className="space-y-5">
      {/* Extracted Specifications */}
      <div className="bg-white rounded-md border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Extracted Procurement Requirements
          </h3>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            {detectedRequirements.length} Attributes Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {detectedRequirements.map((req, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200/80">
              <span className="font-medium text-slate-700">{req.label}:</span>
              <span className="font-mono font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {req.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Specification Gaps Section */}
      <div className="bg-white rounded-md border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
              Specification & Standards Gaps Identified ({specificationGaps.length})
            </h3>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
            Review Required
          </span>
        </div>

        <div className="space-y-2.5">
          {specificationGaps.map((gap) => (
            <div key={gap.id} className="p-3 bg-amber-50/40 rounded border border-amber-200/90 text-xs space-y-1.5">
              <div className="flex items-center justify-between font-medium text-amber-950">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  {gap.title}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-semibold border border-amber-200">
                  {gap.severity} RISK
                </span>
              </div>
              <p className="text-slate-700 text-[11px] leading-relaxed pl-5 font-normal">
                {gap.description}
              </p>
              <div className="pl-5 pt-1.5 border-t border-amber-200/60 text-[11px] font-normal text-slate-900">
                <strong className="font-medium">Suggested Action / Standard:</strong> {gap.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

