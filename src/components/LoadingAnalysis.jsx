import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

export default function LoadingAnalysis({ onComplete, duration = 2400 }) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Tender document received & text extracted" },
    { id: 2, label: "Product & technical category identified" },
    { id: 3, label: "Technical scope & parameters mapped" },
    { id: 4, label: "Cross-referencing Bureau of Indian Standards database" },
    { id: 5, label: "Checking mandatory Quality Control Orders (QCO)" },
    { id: 6, label: "Generating technical compliance audit report" }
  ];

  useEffect(() => {
    const intervalTime = Math.floor(duration / steps.length);

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 300);
          return steps.length;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, steps.length, onComplete]);

  return (
    <div className="bg-white rounded-[4px] p-6 border border-[#E3E8ED] my-5 max-w-xl mx-auto space-y-4 shadow-2xs">
      <div className="pb-3 border-b border-[#E3E8ED]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#28536F] uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-[#12304A]" />
          <span>Technical Document Intelligence Engine</span>
        </div>
        <h3 className="text-base font-bold text-[#0B1F33]">
          Analyzing Procurement Tender Document
        </h3>
        <p className="text-xs text-[#61707D] font-mono">
          Matching extracted specifications against official BIS technical standards...
        </p>
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-2.5 rounded-[3px] border text-xs font-mono transition-colors ${
                isDone 
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-300' 
                  : isCurrent 
                  ? 'bg-[#12304A]/10 border-[#12304A] text-[#0B1F33] font-bold' 
                  : 'bg-[#F4F6F8] border-[#E3E8ED] text-[#61707D]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                {isCurrent && <Loader2 className="w-4 h-4 text-[#12304A] animate-spin shrink-0" />}
                {isPending && <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 ml-0.5" />}
                <span>{step.label}</span>
              </div>

              {isDone && <span className="text-[9px] font-bold text-emerald-800 uppercase">DONE</span>}
              {isCurrent && <span className="text-[9px] font-bold text-[#12304A] uppercase">RUNNING</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
