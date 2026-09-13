import React from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, Info } from 'lucide-react';

export default function ComplianceBadge({ type = "REQUIRED", label }) {
  const norm = String(type).toUpperCase();

  let config = {
    bg: "bg-[#12304A] text-white border-[#28536F]",
    icon: <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />,
    defaultText: "BIS CERTIFIED"
  };

  if (norm === "REQUIRED" || norm === "MANDATORY" || norm === "QCO MANDATORY") {
    config = {
      bg: "bg-emerald-50 text-emerald-950 border-emerald-300",
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />,
      defaultText: "QCO MANDATORY"
    };
  } else if (norm === "CHECK" || norm === "WARNING" || norm === "VERIFICATION NEEDED") {
    config = {
      bg: "bg-amber-50 text-amber-950 border-amber-300",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />,
      defaultText: "VERIFICATION REQUIRED"
    };
  } else if (norm === "MISSING" || norm === "OUTDATED" || norm === "NON-COMPLIANT") {
    config = {
      bg: "bg-rose-50 text-rose-950 border-rose-300",
      icon: <ShieldX className="w-3.5 h-3.5 text-rose-700" />,
      defaultText: "NON-COMPLIANT"
    };
  } else if (norm === "RECOMMENDED" || norm === "INFO" || norm === "APPLICABLE") {
    config = {
      bg: "bg-[#F4F6F8] text-[#0B1F33] border-[#E3E8ED]",
      icon: <Info className="w-3.5 h-3.5 text-[#28536F]" />,
      defaultText: "RECOMMENDED SPEC"
    };
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] text-[11px] font-mono font-semibold border ${config.bg}`}>
      {config.icon}
      <span>{label || config.defaultText}</span>
    </span>
  );
}
