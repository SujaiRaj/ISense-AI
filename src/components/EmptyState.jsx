import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ 
  title = "No Standards Found", 
  description = "Try adjusting your query or selecting a predefined demo requirement.",
  onReset 
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6 max-w-lg mx-auto">
      <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed font-normal">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors"
        >
          Reset Search
        </button>
      )}
    </div>
  );
}
