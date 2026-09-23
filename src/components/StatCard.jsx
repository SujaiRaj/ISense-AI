import React from 'react';

export default function StatCard({
  icon,
  title,
  value,
  unit,
  badge,
  trendIcon,
  badgeColor = 'text-slate-700 bg-slate-100 border border-slate-200',
  description,
  footerText,
  onClick,
  className = ''
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white p-5 border border-slate-200/90 shadow-xs hover:border-primary/40 transition-all group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-500 font-label-sm font-semibold uppercase tracking-wider">
          {icon && (
            <span className="material-symbols-outlined text-[16px] text-slate-400">
              {icon}
            </span>
          )}
          <span>{title}</span>
        </div>
        {badge && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-code-sm font-bold text-xs ${badgeColor}`}>
            {trendIcon && (
              <span className="material-symbols-outlined text-[12px]">{trendIcon}</span>
            )}
            <span>{badge}</span>
          </span>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-slate-900 tracking-tight text-3xl font-bold font-sans">
          {value}
        </span>
        {unit && <span className="font-body-sm text-slate-500">{unit}</span>}
      </div>

      {description && (
        <p className="mt-2 font-body-sm text-slate-600 leading-relaxed text-xs">
          {description}
        </p>
      )}

      {footerText && (
        <div className="mt-3 pt-3 flex items-center justify-between text-slate-400 border-t border-slate-100 text-xs">
          <span className="font-code-sm text-slate-500">{footerText}</span>
          <span className="material-symbols-outlined text-[15px] text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
            arrow_forward
          </span>
        </div>
      )}
    </div>
  );
}
