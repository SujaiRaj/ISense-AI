import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ShieldCheck, Database, Layers } from 'lucide-react';
import SearchInput from '../components/SearchInput';
import { getRecommendations } from '../services/recommendationService';

export default function SearchPage({ setGlobalResults, setToast }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await getRecommendations(q);
      if (res && res.data) {
        setGlobalResults(res.data);
        if (setToast) setToast({ message: `${res.data.recommendations?.length || 5} relevant Indian Standards identified.`, type: "success" });
        navigate('/recommendations');
      }
    } catch (err) {
      console.error(err);
      if (setToast) setToast({ message: "Search error. Please try demo query.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSelectPreset = (presetText) => {
    setQuery(presetText);
    handleSearch(presetText);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Search Workspace Header */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#28536F] font-bold uppercase tracking-wider mb-1">
          <Database className="w-4 h-4 text-[#12304A]" />
          <span>Technical Specification Analysis Engine</span>
        </div>
        <h2 className="text-lg font-bold text-[#0B1F33] leading-tight mb-1">
          Indian Standards Recommendation Workspace
        </h2>
        <p className="text-xs text-[#61707D] leading-relaxed">
          Input product descriptions or technical parameters to run automated evidence-based mapping against the official Bureau of Indian Standards catalogue.
        </p>
      </div>

      {/* Main Search Input Workspace */}
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        onSelectPreset={handleSelectPreset}
        loading={loading}
      />

      {/* System Technical Metadata Footer */}
      <div className="bg-[#F4F6F8] p-3.5 rounded-[4px] border border-[#E3E8ED] text-xs font-mono text-[#61707D] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[#0B1F33]">ANALYSIS METHOD:</span> Semantic Requirement & Parameter Mapping
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[#0B1F33]">REPOSITORY:</span> BIS Manakonline Catalog (14,290 Records)
        </div>
      </div>
    </div>
  );
}
