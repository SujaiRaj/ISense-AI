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

  let bg = "bg-slate-900 text-white border-slate-800";
  let icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;

  if (type === "error") {
    bg = "bg-rose-900 text-white border-rose-800";
    icon = <AlertCircle className="w-5 h-5 text-rose-300" />;
  } else if (type === "info") {
    bg = "bg-blue-900 text-white border-blue-800";
    icon = <Info className="w-5 h-5 text-blue-300" />;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs sm:text-sm font-semibold max-w-md ${bg}`}>
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
