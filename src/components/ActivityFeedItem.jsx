import React from 'react';

export default function ActivityFeedItem({
  icon = 'psychology',
  title,
  subtitle,
  timestamp,
  chipText,
  chipType = 'info', // 'success', 'warning', 'error', 'info', 'neutral'
  chipIcon,
  metaText,
  onClick
}) {
  let chipClass = "bg-slate-100 text-slate-700 border-slate-200";
  if (chipType === 'success') {
    chipClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
  } else if (chipType === 'warning') {
    chipClass = "bg-amber-50 text-amber-800 border-amber-200";
  } else if (chipType === 'error') {
    chipClass = "bg-rose-50 text-rose-800 border-rose-200";
  } else if (chipType === 'info') {
    chipClass = "bg-orange-50 text-primary border-orange-200 font-bold";
  }

  return (
    <div
      onClick={onClick}
      className={`py-2.5 px-3 rounded-xl bg-white border border-slate-200/70 hover:bg-orange-50/40 hover:border-primary/30 transition-all ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[16px] text-slate-400 shrink-0">
            {icon}
          </span>
          <span className="font-label-sm text-slate-900 font-semibold truncate leading-snug">
            {title}
          </span>
        </div>
        {timestamp && (
          <span className="font-code-sm text-slate-400 text-xs shrink-0">
            {timestamp}
          </span>
        )}
      </div>

      <div className="pl-6 mt-1 flex items-center justify-between gap-2">
        <span className="font-body-sm text-slate-500 truncate text-xs">
          {subtitle}
        </span>
        {metaText && (
          <span className="font-code-sm text-slate-400 text-xs truncate shrink-0">
            {metaText}
          </span>
        )}
      </div>

      {chipText && (
        <div className="pl-6 mt-2 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-code-sm font-medium border ${chipClass}`}>
            {chipType === 'success' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
            {chipIcon && <span className="material-symbols-outlined text-[12px]">{chipIcon}</span>}
            <span>{chipText}</span>
          </span>
        </div>
      )}
    </div>
  );
}
