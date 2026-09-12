import React from 'react';

/**
 * ConfidenceScore Component
 * Clean relevance score indicator for standards matching.
 */
export default function ConfidenceScore({ score = 90 }) {
  const numScore = Math.round(Number(score) || 0);

  let barColor = "bg-blue-700";
  if (numScore >= 90) {
    barColor = "bg-emerald-700";
  } else if (numScore < 70) {
    barColor = "bg-amber-700";
  }

  return (
    <div className="flex flex-col items-end min-w-[100px]">
      <div className="text-xs font-medium text-slate-800 flex items-center gap-1 mb-1">
        <span className="text-slate-500 font-normal">Relevance:</span>
        <span className="font-semibold font-mono">{numScore}/100</span>
      </div>
      <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${numScore}%` }}
        />
      </div>
    </div>
  );
}

