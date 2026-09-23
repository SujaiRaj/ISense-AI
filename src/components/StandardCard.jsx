import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ComplianceBadge from './ComplianceBadge';

export default function StandardCard({ standard }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-4 flex flex-col justify-between hover:border-primary/50 transition-all shadow-2xs group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-code-sm font-bold text-xs bg-orange-50 text-primary px-2 py-0.5 rounded border border-orange-200/80">
            {standard.isNumber}
          </span>
          <StatusBadge status={standard.status} />
        </div>
        <h4 className="font-semibold text-slate-900 text-sm mb-1.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {standard.title}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-3 mb-3 leading-relaxed">
          {standard.scope}
        </p>
      </div>

      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-mono">
          Category: <strong className="text-slate-700 font-semibold">{standard.category}</strong>
        </span>
        <button
          onClick={() => navigate(`/standards/${standard.id}`)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-[#C2410C] transition-colors cursor-pointer"
        >
          <span>View Technical Sheet</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
