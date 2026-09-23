import React from 'react';

export default function ConfidenceScore({ score = 90 }) {
  const numScore = Math.min(100, Math.max(0, Math.round(Number(score) || 0)));
  
  const radius = 16;
  const circumference = 2 * Math.PI * radius; // ~100.53
  const strokeDashoffset = circumference - (numScore / 100) * circumference;

  let strokeColor = "text-primary";
  let label = "High match";
  if (numScore >= 90) {
    strokeColor = "text-emerald-600";
    label = "High match";
  } else if (numScore >= 75) {
    strokeColor = "text-primary";
    label = "Moderate";
  } else {
    strokeColor = "text-amber-600";
    label = "Partial";
  }

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 38 38">
          <circle
            className="text-slate-100"
            cx="19"
            cy="19"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <circle
            className={`${strokeColor} transition-all duration-500`}
            cx="19"
            cy="19"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[11px] font-bold font-code-sm text-slate-800">
          {numScore}%
        </span>
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
          Confidence
        </span>
        <span className="text-xs font-medium text-slate-700">
          {label}
        </span>
      </div>
    </div>
  );
}
