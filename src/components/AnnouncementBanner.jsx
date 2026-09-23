import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBanner({
  icon = 'gavel',
  title = 'Quality Control Orders (QCO) Gazette Notice',
  badgeText = 'Gazette In Force',
  description = 'Mandatory Indian Standards conformity is enforced for central and state public procurement across indexed categories under Section 16 of the BIS Act.',
  actionText = 'View Impacted Items',
  actionTo = '/compliance',
  onActionClick
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary via-[#1E293B] to-secondary p-5 text-white shadow-md border border-slate-700/80">
      <div className="absolute right-0 top-0 w-96 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md ring-2 ring-orange-400/40">
            <span className="material-symbols-outlined text-[22px]">{icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-headline-sm font-bold text-white text-base">
                {title}
              </span>
              {badgeText && (
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-semibold text-[11px] tracking-wide">
                  {badgeText}
                </span>
              )}
            </div>
            <p className="font-body-sm text-slate-300 mt-1 max-w-3xl leading-relaxed text-xs">
              {description}
            </p>
          </div>
        </div>

        <div className="shrink-0 self-start md:self-auto">
          {actionTo ? (
            <Link
              to={actionTo}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-[#C2410C] text-white transition-all text-xs font-bold shadow-sm inline-flex items-center gap-1.5"
            >
              <span>{actionText}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          ) : (
            <button
              onClick={onActionClick}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-[#C2410C] text-white transition-all text-xs font-bold shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{actionText}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
