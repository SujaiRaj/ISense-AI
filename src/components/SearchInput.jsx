import React from 'react';

export default function SearchInput({ 
  value = "", 
  onChange, 
  onSearch, 
  onSelectPreset,
  loading = false,
  placeholder = "Describe your product, service or procurement requirement details..."
}) {
  const maxChars = 800;

  const sampleQueries = [
    { label: "street light", query: "street light" },
    { label: "helmet", query: "helmet" },
    { label: "cement", query: "cement" },
    { label: "electrical cable", query: "electrical cable" }
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#0F172A]">
          Procurement Specification / Requirement Details
        </label>
        
        <textarea
          rows={5}
          maxLength={maxChars}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-white rounded border border-[#E2E8F0] focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all resize-y leading-relaxed"
        />

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          <div className="text-xs text-[#64748B]">
            {value.length} / {maxChars} characters
          </div>

          {/* Clean loading state button - normal text hidden completely while loading */}
          <button
            type="button"
            disabled={!value.trim() || loading}
            onClick={() => onSearch(value)}
            className="w-52 h-10 bg-primary hover:bg-[#C2410C] text-white rounded-xl font-bold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center justify-center cursor-pointer shadow-xs"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analysing requirement...</span>
              </span>
            ) : (
              <span>Start Analysis</span>
            )}
          </button>
        </div>
      </div>

      {/* Example Queries as Clean Text Links (no pill boxes) */}
      <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className="text-[#64748B]">Example queries:</span>
        {sampleQueries.map((item, idx) => (
          <React.Fragment key={idx}>
            <button
              type="button"
              onClick={() => onSelectPreset ? onSelectPreset(item.query) : onSearch(item.query)}
              className="text-[#0F172A] hover:text-primary hover:underline font-medium transition-colors cursor-pointer"
            >
              {item.label}
            </button>
            {idx < sampleQueries.length - 1 && <span className="text-[#CBD5E1]">•</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
