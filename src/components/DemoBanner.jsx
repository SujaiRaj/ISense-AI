import React from 'react';
import { ShieldCheck, Database, Award } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-secondary text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 select-none">
      <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-slate-300">
        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          Government Procurement Intelligence Portal
        </span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="hidden sm:inline text-slate-400">
          Bureau of Indian Standards (BIS) Technical Catalogue Index
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>BIS Registry: Active (v2.4.1)</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-slate-400">
          <Database className="w-3 h-3 text-primary" />
          <span>14,290 Standards Indexed</span>
        </div>
      </div>
    </div>
  );
}
