import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function LoadingAnalysis({ onComplete, duration = 2400 }) {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, label: "Requirement received" },
    { id: 2, label: "Product category identified" },
    { id: 3, label: "Technical requirements extracted" },
    { id: 4, label: "Searching standards repository" },
    { id: 5, label: "Checking related standards & QCO status" },
    { id: 6, label: "Preparing recommendations" }
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
    <div className="bg-white rounded-md p-6 border border-slate-200 my-5 max-w-xl mx-auto space-y-4">
      <div className="pb-3 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-900">
          Analyzing procurement requirement
        </h3>
        <p className="text-xs text-slate-500 font-normal">
          Matching technical specification parameters against Indian Standards database...
        </p>
      </div>

      <div className="space-y-2.5">
        {steps.map((step) => {
          const isDone = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isPending = step.id > currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between p-2.5 rounded border text-xs font-medium transition-colors ${
                isDone 
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' 
                  : isCurrent 
                  ? 'bg-blue-50/60 border-blue-200 text-blue-950 font-semibold' 
                  : 'bg-slate-50/40 border-slate-200/80 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                {isCurrent && <Loader2 className="w-4 h-4 text-blue-700 animate-spin shrink-0" />}
                {isPending && <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0 ml-0.5" />}
                <span>{step.label}</span>
              </div>

              {isDone && <span className="text-[10px] font-medium text-emerald-800 uppercase">Complete</span>}
              {isCurrent && <span className="text-[10px] font-medium text-blue-800 uppercase">Processing</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

