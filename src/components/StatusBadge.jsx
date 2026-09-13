import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock } from 'lucide-react';

export default function StatusBadge({ status = "CURRENT" }) {
  const norm = String(status).toUpperCase();

  let styles = "bg-slate-100 text-slate-700 border-slate-300";
  let icon = <Clock className="w-3 h-3 text-slate-600" />;

  if (norm === "CURRENT" || norm === "COMPLETED" || norm === "ACTIVE" || norm === "REAFFIRMED") {
    styles = "bg-emerald-50 text-emerald-900 border-emerald-300";
    icon = <CheckCircle2 className="w-3 h-3 text-emerald-700" />;
  } else if (norm === "SUPERSEDED" || norm === "OUTDATED" || norm === "EXPIRED" || norm === "WITHDRAWN") {
    styles = "bg-rose-50 text-rose-900 border-rose-300";
    icon = <AlertCircle className="w-3 h-3 text-rose-700" />;
  } else if (norm === "UNDER REVISION" || norm === "CHECK" || norm === "PENDING" || norm === "AMENDMENT ACTIVE") {
    styles = "bg-amber-50 text-amber-900 border-amber-300";
    icon = <AlertTriangle className="w-3 h-3 text-amber-700" />;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[10px] font-mono font-bold border uppercase tracking-wider ${styles}`}>
      {icon}
      <span>{norm}</span>
    </span>
  );
}
