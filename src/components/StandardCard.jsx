import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, Shield } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ComplianceBadge from './ComplianceBadge';

export default function StandardCard({ standard }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono font-semibold text-sm bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
            {standard.isNumber}
          </span>
          <StatusBadge status={standard.status} />
        </div>
        <h4 className="font-semibold text-slate-900 text-base mb-2 line-clamp-2">
          {standard.title}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed font-normal">
          {standard.scope}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-normal">
          Category: <strong className="text-slate-700 font-medium">{standard.category}</strong>
        </span>
        <button
          onClick={() => navigate(`/standards/${standard.id}`)}
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
