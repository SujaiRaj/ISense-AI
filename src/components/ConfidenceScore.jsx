import React from 'react';

export default function ConfidenceScore({ score = 90 }) {
  const numScore = Math.round(Number(score) || 0);

  let barColor = "bg-[#28536F]";
  let textColor = "text-[#0B1F33]";
  if (numScore >= 90) {
    barColor = "bg-emerald-700";
    textColor = "text-emerald-900";
  } else if (numScore < 70) {
    barColor = "bg-amber-700";
    textColor = "text-amber-900";
  }

  return (
    <div className="flex flex-col items-end min-w-[110px]">
      <div className="text-xs font-mono text-[#61707D] flex items-center gap-1 mb-1">
        <span>Relevance:</span>
        <span className={`font-bold font-mono ${textColor}`}>{numScore}%</span>
      </div>
      <div className="w-24 bg-[#E3E8ED] rounded-[2px] h-1.5 overflow-hidden border border-slate-200">
        <div
          className={`h-full rounded-[2px] ${barColor}`}
          style={{ width: `${numScore}%` }}
        />
      </div>
    </div>
  );
}
