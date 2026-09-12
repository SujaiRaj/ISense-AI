import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Info } from 'lucide-react';

export default function ComplianceBadge({ type = "REQUIRED", label }) {
  const norm = String(type).toUpperCase();

  let config = {
    bg: "bg-blue-50 text-blue-900 border-blue-200",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />,
    defaultText: "BIS CERTIFIED"
  };

  if (norm === "REQUIRED" || norm === "MANDATORY") {
    config = {
      bg: "bg-emerald-50 text-emerald-900 border-emerald-200",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />,
      defaultText: "MANDATORY QCO"
    };
  } else if (norm === "CHECK" || norm === "WARNING") {
    config = {
      bg: "bg-amber-50 text-amber-900 border-amber-200",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />,
      defaultText: "VERIFICATION REQUIRED"
    };
  } else if (norm === "MISSING" || norm === "OUTDATED") {
    config = {
      bg: "bg-rose-50 text-rose-900 border-rose-200",
      icon: <ShieldX className="w-3.5 h-3.5 text-rose-700" />,
      defaultText: "NON-COMPLIANT"
    };
  } else if (norm === "RECOMMENDED" || norm === "INFO") {
    config = {
      bg: "bg-slate-100 text-slate-700 border-slate-200",
      icon: <Info className="w-3.5 h-3.5 text-slate-500" />,
      defaultText: "RECOMMENDED SPEC"
    };
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border ${config.bg}`}>
      {config.icon}
      <span className="font-medium">{label || config.defaultText}</span>
    </span>
  );
}

