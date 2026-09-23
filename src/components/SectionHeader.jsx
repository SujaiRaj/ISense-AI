import React from 'react';

export default function SectionHeader({
  microLabel,
  title,
  subtitle,
  actions,
  className = ''
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2.5 ${className}`}>
      <div>
        {microLabel && (
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            {microLabel}
          </span>
        )}
        <h2 className="font-headline-sm text-base font-bold text-slate-900 mt-0.5 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="font-body-sm text-slate-500 mt-0.5 text-xs">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
