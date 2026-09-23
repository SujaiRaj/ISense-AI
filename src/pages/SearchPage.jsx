import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import { getRecommendations } from '../services/recommendationService';

export default function SearchPage({ setGlobalResults, setToast }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || "";
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const presets = [
    { label: "LED Street Light",   query: "led street light" },
    { label: "Safety Helmet",      query: "safety helmet" },
    { label: "Portland Cement",    query: "portland cement" },
    { label: "PVC Cable",          query: "PVC cable" },
    { label: "Safety Shoes",       query: "safety shoes" }
  ];

  const featuredCorpus = [
    {
      code: "IS 10322 (Part 5/Sec 3)",
      title: "Luminaires for Road & Street Lighting",
      badge: "Mandatory QCO",
      badgeColor: "bg-orange-50 text-primary border border-orange-200",
      icon: "lightbulb",
      score: "94.8% Match",
      description: "Specifications for municipal street lighting luminaires with ingress protection (IP66) and surge protection standards.",
      division: "Division ETD 13 • Active"
    },
    {
      code: "IS 2925:1984",
      title: "Industrial Safety Helmets Specification",
      badge: "Compulsory CRS",
      badgeColor: "bg-emerald-50 text-emerald-800 border border-emerald-200",
      icon: "shield",
      score: "98.2% Match",
      description: "Non-metallic protective helmets for personnel in engineering, civil construction, mining, and hazardous operations.",
      division: "Division TXD 08 • Gazetted"
    },
    {
      code: "IS 1489 (Part 1):2015",
      title: "Portland Pozzolana Cement (Fly-Ash Based)",
      badge: "Mandatory BIS",
      badgeColor: "bg-emerald-50 text-emerald-800 border border-emerald-200",
      icon: "foundation",
      score: "91.5% Match",
      description: "Standard specifications for fly-ash based pozzolana cement utilized in load-bearing masonry and structural foundations.",
      division: "Division CED 02 • Active"
    },
    {
      code: "IS 7098 (Part 2):2011",
      title: "XLPE Insulated Cables (3.3kV-33kV)",
      badge: "Scheme-I Mandatory",
      badgeColor: "bg-slate-100 text-slate-800 border border-slate-200",
      icon: "electrical_services",
      score: "89.4% Match",
      description: "Thermosetting insulated electric cables for electricity distribution utilities, power infrastructure, and substations.",
      division: "Division ETD 09 • Gazetted"
    }
  ];

  const handleSearch = async (searchQuery) => {
    const q = (searchQuery !== undefined ? searchQuery : query).trim();
    if (!q) return;

    setLoading(true);
    setSearchResults(null); // clear stale results so loading spinner is visible
    try {
      const res = await getRecommendations(q);
      if (res && res.data) {
        setSearchResults(res.data);
        if (setGlobalResults) {
          setGlobalResults(res.data);
        }
        const recCount = res.data.recommendations?.length || 0;
        if (setToast) {
          setToast({
            message: res.data.noMatch
              ? "No matching standard found. Try one of the preset queries."
              : `${recCount} Indian Standard${recCount !== 1 ? 's' : ''} identified for this requirement.`,
            type: res.data.noMatch ? "error" : "success"
          });
        }
      }
    } catch (err) {
      console.error("Search error:", err);
      if (setToast) {
        setToast({
          message: "Unable to complete requirement search. Check server is running on port 3001.",
          type: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handlePresetClick = (preset) => {
    setQuery(preset.query);
    handleSearch(preset.query);
  };

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200/80 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              BIS Requirement Search
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              12,486 Indexed Specifications
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Indian Standards Requirement Search
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Input product specifications or tender parameters to identify matching Indian Standards and mandatory QCO orders.
          </p>
        </div>

        {searchResults && (
          <button
            onClick={() => navigate('/recommendations')}
            className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start md:self-auto shrink-0"
          >
            <span>Detailed Match Report</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        )}
      </div>

      <div className="px-6 pb-10 space-y-6">
        {/* Search Input Box with Neutral Slate Preset Tags */}
        <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="space-y-3"
          >
            <div className="relative flex items-center w-full px-3.5 py-2.5 rounded-lg bg-surface border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-white transition-all">
              <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2.5 shrink-0">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter item description or parameters (e.g. 90W outdoor LED street light, protective helmets, cement)..."
                className="w-full bg-transparent border-none outline-none font-body-sm text-slate-900 placeholder:text-slate-400 text-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-2 transition-colors cursor-pointer"
                  title="Clear query"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
              <kbd className="hidden sm:inline-flex font-code-sm text-[11px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400 shrink-0 mr-2.5">
                ⌘K
              </kbd>
              <button
                type="submit"
                disabled={!query.trim() || loading}
                className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] transition-all text-xs font-bold shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">search</span>
                    <span>Search Standards</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Preset Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 font-medium mr-1">
              Sample queries:
            </span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-orange-50 hover:text-primary hover:border-primary/40 text-slate-700 font-code-sm text-xs transition-colors border border-slate-200/60 cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Area */}
        {/* Loading state — shows during the 1-2s server processing delay */}
        {loading && (
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs p-8 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-orange-100 border-t-primary rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">Analysing requirement against BIS catalog…</p>
              <p className="text-xs text-slate-500 mt-1">Cross-referencing 1,250+ indexed specifications and active QCO mandates</p>
            </div>
          </div>
        )}

        {!loading && searchResults && searchResults.noMatch && (
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs p-8 flex flex-col items-center gap-3 text-center">
            <span className="material-symbols-outlined text-slate-300 text-[48px]">search_off</span>
            <p className="text-sm font-semibold text-slate-700">No matching Indian Standard found</p>
            <p className="text-xs text-slate-500 max-w-sm">{searchResults.message || 'Try a preset query: LED street light, safety helmet, portland cement, PVC cable, or safety shoes.'}</p>
          </div>
        )}

        {!loading && searchResults && searchResults.recommendations && searchResults.recommendations.length > 0 ? (
          <div className="space-y-4">
            <SectionHeader
              microLabel="Search Results"
              title={`Matched BIS Specifications (${searchResults.recommendations.length})`}
              subtitle={`Query: "${searchResults.query || query}"`}
              actions={
                <button
                  onClick={() => navigate('/recommendations')}
                  className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Full Compliance Report</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.recommendations.map((rec, idx) => (
                <StatCard
                  key={rec.id || idx}
                  title={rec.isNumber || rec.is_number}
                  value={`${rec.relevanceScore || 90}%`}
                  unit="match"
                  badge={rec.status || "CURRENT"}
                  badgeColor="bg-emerald-50 text-emerald-800 border border-emerald-200"
                  description={rec.title}
                  footerText={rec.category || "Bureau of Indian Standards"}
                  onClick={() => navigate(`/standards/${rec.id || 'IS-10322'}`)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Default Featured Standards Grid */
          <div className="space-y-4">
            <SectionHeader
              microLabel="Active Catalog"
              title="Frequently Audited Standards"
              subtitle="Common specifications queried across civil, electrical, and infrastructure tenders."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCorpus.map((item, idx) => (
                <StatCard
                  key={idx}
                  title={item.code}
                  value={item.score}
                  badge={item.badge}
                  badgeColor={item.badgeColor}
                  description={item.description}
                  footerText={item.division}
                  onClick={() => {
                    setQuery(item.title);
                    handleSearch(item.title);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
