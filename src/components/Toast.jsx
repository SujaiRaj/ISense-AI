import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  let bg = "bg-[#0B1F33] text-white border-[#12304A]";
  let icon = <CheckCircle2 className="w-4 h-4 text-teal-300" />;

  if (type === "error") {
    bg = "bg-rose-950 text-white border-rose-800";
    icon = <AlertCircle className="w-4 h-4 text-rose-300" />;
  } else if (type === "info") {
    bg = "bg-[#12304A] text-white border-[#28536F]";
    icon = <Info className="w-4 h-4 text-blue-300" />;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-[4px] border shadow-md text-xs font-mono font-semibold max-w-md ${bg}`}>
        {icon}
        <span className="flex-1">{message}</span>
        <button 
          onClick={onClose} 
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
