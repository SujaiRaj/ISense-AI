import React from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { DEMO_QUERIES } from '../data/mockRecommendations';

export default function SearchInput({ 
  value = "", 
  onChange, 
  onSearch, 
  onSelectPreset,
  loading = false 
}) {
  const charCount = value.length;
  const maxChars = 500;

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="bg-white rounded-md border border-slate-200 p-5 mb-5 space-y-4">
      {/* Example searches */}
      <div>
        <div className="text-xs font-medium text-slate-500 mb-2">
          Example searches:
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_QUERIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPreset(item.query)}
              className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Container */}
      <div className="space-y-3">
        <label className="block text-xs font-medium text-slate-700">
          Procurement Requirement Specification
        </label>
        <textarea
          rows={4}
          maxLength={maxChars}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe product or procurement requirement (e.g. 90W outdoor LED street light for municipal roads with weather resistance and energy efficiency...)"
          className="w-full p-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-slate-50/60 rounded-md border border-slate-300 focus:border-blue-700 focus:bg-white focus:ring-1 focus:ring-blue-700 outline-none transition-all resize-y font-normal"
        />

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono ${charCount > 450 ? 'text-amber-600 font-medium' : 'text-slate-400'}`}>
              {charCount} / {maxChars}
            </span>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={!value.trim() || loading}
            onClick={() => onSearch(value)}
            className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium rounded-md text-xs sm:text-sm transition-colors disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching Standards...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Search Standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="text-xs text-slate-400 font-normal pt-2 border-t border-slate-100">
        Recommendation results should be verified against active Bureau of Indian Standards notifications and Quality Control Orders.
      </div>
    </div>
  );
}

