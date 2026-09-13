import React from 'react';
import { Search, X, ArrowRight, FileText } from 'lucide-react';
import { DEMO_QUERIES } from '../data/mockRecommendations';

export default function SearchInput({ 
  value = "", 
  onChange, 
  onSearch, 
  onSelectPreset,
  loading = false 
}) {
  const charCount = value.length;
  const maxChars = 800;

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="bg-white rounded-[4px] border border-[#E3E8ED] p-5 space-y-4 shadow-2xs">
      {/* Sample Specification Buttons */}
      <div className="border-b border-[#E3E8ED] pb-3">
        <div className="text-xs font-mono font-bold text-[#0B1F33] mb-2 uppercase tracking-wider">
          Pre-defined Procurement Specification Profiles:
        </div>
        <div className="flex flex-wrap gap-2">
          {DEMO_QUERIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectPreset(item.query)}
              className="px-3 py-1 rounded-[3px] text-xs font-mono bg-[#F4F6F8] hover:bg-[#E3E8ED] text-[#12304A] border border-[#E3E8ED] transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3 h-3 text-[#28536F]" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea Container */}
      <div className="space-y-2.5">
        <label className="block text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
          Product Technical Specification Input:
        </label>
        <textarea
          rows={5}
          maxLength={maxChars}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter product description, technical parameters, or procurement clause (e.g. 90W outdoor LED street light for municipal roads with IP66 protection, 120 lm/W efficiency, surge protection)..."
          className="w-full p-3.5 text-xs sm:text-sm text-[#17212B] placeholder-[#61707D] bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] focus:border-[#12304A] focus:bg-white focus:ring-1 focus:ring-[#12304A] outline-none transition-all resize-y font-mono"
        />

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono ${charCount > 700 ? 'text-amber-600 font-bold' : 'text-[#61707D]'}`}>
              {charCount} / {maxChars} Characters
            </span>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1 text-xs text-[#61707D] hover:text-[#0B1F33] font-mono font-semibold transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear Text
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={!value.trim() || loading}
            onClick={() => onSearch(value)}
            className="inst-btn-primary py-2 px-5 font-mono text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Standards Analysis...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Analyze Specification</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="text-[11px] text-[#61707D] font-mono pt-2 border-t border-[#E3E8ED]">
        Note: Analysis cross-references active Bureau of Indian Standards (BIS) technical codes and Quality Control Orders (QCO).
      </div>
    </div>
  );
}
