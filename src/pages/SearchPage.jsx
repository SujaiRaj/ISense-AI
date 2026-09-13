import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E3E8ED] shadow-2xs space-y-2">
        <h1 className="text-2xl font-bold text-[#0B1F33]">
          Standards Search
        </h1>
        <p className="text-sm text-[#61707D]">
          Enter product parameters or procurement specifications to map governing Indian Standards and Quality Control Orders.
        </p>
      </div>

      {/* Main Search Workspace */}
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        onSelectPreset={handleSelectPreset}
        loading={loading}
      />
    </div>
  );
}

