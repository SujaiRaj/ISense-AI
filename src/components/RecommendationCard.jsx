import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfidenceScore from './ConfidenceScore';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../context/LanguageContext';

export default function RecommendationCard({ recommendation }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const {
    id,
    isNumber,
    title,
    relevanceScore = 94,
    status = "CURRENT",
    explanation,
    matchedFactors = [],
    category,
    certification = {},
    relatedStandards = [],
    scope,
    source_url,
    sourceUrl
  } = recommendation;

  const bisUrl = source_url || sourceUrl;
  const standardId = id || (isNumber ? isNumber.replace(/[^a-zA-Z0-9]/g, '-') : 'IS-10322');

  const certText = typeof certification === 'string'
    ? certification
    : certification?.statusText || "Mandatory Certification";

  return (
    <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:border-primary/40 transition-all space-y-4">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-slate-100">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="font-code-sm font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {isNumber || "IS 10322"}
            </span>
            <StatusBadge status={status} />
            {certText && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                <span>{certText}</span>
              </span>
            )}
            {category && (
              <span className="font-code-sm text-slate-400 hidden md:inline-block">
                • {category}
              </span>
            )}
          </div>

          <h3
            onClick={() => navigate(`/standards/${standardId}`)}
            className="font-headline-sm font-semibold text-slate-900 hover:text-primary transition-colors cursor-pointer leading-snug"
          >
            {title}
          </h3>
        </div>

        {/* Circular Confidence Score Ring */}
        <div className="shrink-0 self-start sm:self-center">
          <ConfidenceScore score={relevanceScore} />
        </div>
      </div>

      {/* Matching Rationale Box */}
      <div className="p-3.5 rounded-lg bg-slate-50/70 border border-slate-100 space-y-2 text-xs">
        <span className="font-label-sm text-slate-500 uppercase tracking-wider font-semibold block text-[11px]">
          {t('rec.scope_mandate', 'Scope & Compliance Mandate:')}
        </span>
        <p className="font-body-sm text-slate-700 leading-relaxed">
          {explanation || scope || "Applies directly to specified technical parameters, material standards, and statutory testing requirements under gazetted procurement orders."}
        </p>

        {matchedFactors.length > 0 && (
          <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1.5">
            {matchedFactors.map((factor, idx) => (
              <span 
                key={idx} 
                className="font-code-sm text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[12px] text-emerald-600">check</span>
                <span>{factor}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Expandable Technical Details */}
      {showDetails && (
        <div className="pt-2 space-y-3 border-t border-slate-100 text-xs">
          {scope && (
            <div>
              <span className="font-label-sm text-slate-500 uppercase tracking-wider font-semibold block mb-1">
                Standard Scope:
              </span>
              <p className="font-body-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                {scope}
              </p>
            </div>
          )}

          {relatedStandards.length > 0 && (
            <div>
              <span className="font-label-sm text-slate-500 uppercase tracking-wider font-semibold block mb-1.5">
                Allied Standards:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {relatedStandards.map((std, idx) => (
                  <span
                    key={idx}
                    className="font-code-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                  >
                    {typeof std === 'string' ? std : std.code || std.isNumber}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-slate-600 hover:text-primary font-medium inline-flex items-center gap-1 cursor-pointer"
        >
          <span>{showDetails ? t('rec.hide_scope', 'Hide scope details') : t('rec.view_scope', 'View scope & allied standards')}</span>
          <span className="material-symbols-outlined text-[15px] text-slate-400">
            {showDetails ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {bisUrl && (
            <a
              href={bisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <span className="material-symbols-outlined text-[14px] text-slate-400">open_in_new</span>
              <span>BIS Gazette</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => navigate(`/standards/${standardId}`)}
            className="px-3.5 py-1.5 rounded-lg bg-primary text-white hover:bg-[#C2410C] transition-colors inline-flex items-center gap-1 font-semibold cursor-pointer shadow-xs"
          >
            <span>{t('rec.specification_btn', 'Specification')}</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
