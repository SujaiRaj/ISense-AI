import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
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
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 leading-tight mb-1">
          Standards Search
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
          Search by product, service, technical specification or procurement requirement to identify applicable Indian Standards.
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
      <div className="bg-slate-50 p-3.5 rounded-md border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-normal">
        <div>
          <span className="font-medium text-slate-700">Search method:</span> Semantic requirement matching
        </div>
        <div>
          <span className="font-medium text-slate-700">Indexed source:</span> Indian Standards repository (BIS Catalogue)
        </div>
      </div>
    </div>
  );
}

