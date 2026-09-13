import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ComplianceBadge from './ComplianceBadge';

export default function StandardCard({ standard }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-4 flex flex-col justify-between hover:border-[#28536F] transition-all shadow-2xs">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono font-bold text-xs bg-[#12304A] text-white px-2 py-0.5 rounded-[3px] border border-[#28536F]">
            {standard.isNumber}
          </span>
          <StatusBadge status={standard.status} />
        </div>
        <h4 className="font-semibold text-[#0B1F33] text-sm mb-1.5 line-clamp-2 leading-snug">
          {standard.title}
        </h4>
        <p className="text-xs text-[#61707D] line-clamp-3 mb-3 leading-relaxed">
          {standard.scope}
        </p>
      </div>

      <div className="pt-2.5 border-t border-[#E3E8ED] flex items-center justify-between">
        <span className="text-[11px] text-[#61707D] font-mono">
          Category: <strong className="text-[#0B1F33] font-semibold">{standard.category}</strong>
        </span>
        <button
          onClick={() => navigate(`/standards/${standard.id}`)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#12304A] hover:text-[#0B1F33] transition-colors"
        >
          <span>View Technical Sheet</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
