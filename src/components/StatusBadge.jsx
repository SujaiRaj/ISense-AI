import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Clock } from 'lucide-react';

export default function StatusBadge({ status = "CURRENT" }) {
  const norm = String(status).toUpperCase();

  let styles = "bg-slate-100 text-slate-700 border-slate-200";
  let icon = <Clock className="w-3 h-3 text-slate-500" />;

  if (norm === "CURRENT" || norm === "COMPLETED" || norm === "ACTIVE") {
    styles = "bg-emerald-50 text-emerald-900 border-emerald-200";
    icon = <CheckCircle2 className="w-3 h-3 text-emerald-700" />;
  } else if (norm === "SUPERSEDED" || norm === "OUTDATED" || norm === "EXPIRED") {
    styles = "bg-rose-50 text-rose-900 border-rose-200";
    icon = <AlertCircle className="w-3 h-3 text-rose-700" />;
  } else if (norm === "UNDER REVISION" || norm === "CHECK" || norm === "PENDING") {
    styles = "bg-amber-50 text-amber-900 border-amber-200";
    icon = <AlertTriangle className="w-3 h-3 text-amber-700" />;
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border uppercase tracking-wide ${styles}`}>
      {icon}
      <span className="font-semibold">{norm}</span>
    </span>
  );
}

