import React from 'react';

export default function RequirementList({ detectedRequirements = [], specificationGaps = [] }) {
  return (
    <div className="space-y-5">
      {/* Extracted Specifications Table */}
      <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Tender Specifications
            </span>
            <h3 className="font-headline-sm font-bold text-slate-900 text-sm">
              Extracted Parameters
            </h3>
          </div>
          <span className="font-code-sm text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
            {detectedRequirements.length} Attributes Mapped
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {detectedRequirements.map((req, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <span className="text-slate-500 font-medium truncate">
                {req.label || req.key}
              </span>
              <span className="font-code-sm font-semibold text-slate-900 ml-2 shrink-0">
                {req.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Specification Gaps Section */}
      <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Compliance Deficiencies
            </span>
            <h3 className="font-headline-sm font-bold text-slate-900 text-sm">
              Specification Gaps &amp; Missing Mandates
            </h3>
          </div>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-code-sm font-semibold bg-rose-50 text-rose-800 border border-rose-200">
            <span className="material-symbols-outlined text-[13px]">warning</span>
            <span>{specificationGaps.length} gaps detected</span>
          </span>
        </div>

        <div className="space-y-2.5">
          {specificationGaps.map((gap, idx) => {
            const isHigh = (gap.severity || '').toLowerCase() === 'high';
            return (
              <div
                key={gap.id || idx}
                className="p-3.5 rounded-lg bg-slate-50/60 border border-slate-200/80 space-y-1.5 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-rose-600">
                      report_problem
                    </span>
                    <span className="font-semibold text-slate-900">
                      {gap.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-code-sm text-slate-500 text-[11px]">
                      {gap.standardRef || "Missing Standard"}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold font-code-sm uppercase ${
                      isHigh
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {gap.severity || 'HIGH'} RISK
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed pl-5 text-[11px]">
                  {gap.description}
                </p>

                {gap.recommendation && (
                  <div className="pl-5 pt-1.5 border-t border-slate-200/60 flex items-center gap-1 text-[11px] text-slate-800 font-medium">
                    <span className="text-slate-400">Action:</span>
                    <span>{gap.recommendation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
