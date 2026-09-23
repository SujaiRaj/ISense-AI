import React from 'react';

export default function StatusBadge({ 
  status = 'Active', 
  type, 
  text, 
  icon,
  className = '' 
}) {
  const displayLabel = text || status;
  const normalized = (type || status || '').toLowerCase();

  // Compliant / Active / Verified
  if (normalized.includes('active') || normalized.includes('compliant') || normalized.includes('current') || normalized.includes('verified') || normalized.includes('pass')) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
        <span>{displayLabel}</span>
      </span>
    );
  }

  // Error / Non-compliant / Breach / Gaps
  if (normalized.includes('error') || normalized.includes('breach') || normalized.includes('gap') || normalized.includes('missing') || normalized.includes('withdrawn') || normalized.includes('high')) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-rose-50 text-rose-800 border border-rose-200 font-medium font-code-sm ${className}`}>
        <span className="material-symbols-outlined text-[13px] text-rose-600">error</span>
        <span>{displayLabel}</span>
      </span>
    );
  }

  // Warning / Deviation / Amber
  if (normalized.includes('warn') || normalized.includes('deviation') || normalized.includes('medium') || normalized.includes('superseded')) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-amber-50 text-amber-800 border border-amber-200 font-medium ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
        <span>{displayLabel}</span>
      </span>
    );
  }

  // Standard Tag (IS 10322, etc.)
  if (normalized.includes('standard') || normalized.includes('code')) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-800 border border-slate-200 font-code-sm font-semibold ${className}`}>
        {icon && <span className="material-symbols-outlined text-[12px] text-slate-500">{icon}</span>}
        <span>{displayLabel}</span>
      </span>
    );
  }

  // Neutral / General
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium ${className}`}>
      {icon && <span className="material-symbols-outlined text-[12px] text-slate-400">{icon}</span>}
      <span>{displayLabel}</span>
    </span>
  );
}
