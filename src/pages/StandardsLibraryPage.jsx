import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { getStandardsList } from '../services/standardsService';

export default function StandardsLibraryPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [standards, setStandards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    'All',
    'Lighting',
    'Safety/PPE',
    'Cement/Construction',
    'Electrical Cables'
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getStandardsList({
          search,
          category: selectedCategory
        });
        if (res && res.data) {
          setStandards(res.data);
        }
      } catch (err) {
        console.error("Failed to load standards catalogue:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, selectedCategory]);

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              12,486 Standards
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              Bureau of Indian Standards Repository
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Indian Standards Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Browse and query official BIS specifications, quality control orders, and gazette amendments.
          </p>
        </div>

        <button
          onClick={() => navigate('/search')}
          className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-sm self-start md:self-auto shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">search</span>
          <span>Requirement Search</span>
        </button>
      </div>

      <div className="px-6 pb-10 space-y-4">
        {/* Search & Category Filter Controls */}
        <div className="rounded-xl bg-white p-4 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="relative">
            <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Filter by IS code, title or product keyword (e.g. IS 10322, helmet, cement, cable)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white rounded-lg outline-none text-xs text-slate-900"
            />
          </div>

          {/* Division Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 text-xs">
            <span className="text-slate-400 font-medium mr-1">
              Divisions:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary font-semibold shadow-xs'
                    : 'bg-slate-100 hover:bg-orange-50 hover:text-primary hover:border-primary/40 text-slate-700 border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Standards Table */}
        <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
          {loading ? (
            <div className="p-10 text-center">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="font-code-sm text-slate-400 text-xs">Loading standards catalog...</p>
            </div>
          ) : standards.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/70">
                    <th className="py-2.5 px-4">Standard Code</th>
                    <th className="py-2.5 px-4">Specification Title &amp; Scope</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {standards.map((s, idx) => (
                    <tr key={s.id || idx} className="hover:bg-orange-50/20 transition-colors group">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-code-sm font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                          {s.is_number || s.isNumber}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          to={`/standards/${s.id}`}
                          className="font-semibold text-slate-900 group-hover:text-primary transition-colors block leading-snug"
                        >
                          {s.title}
                        </Link>
                        <span className="text-slate-500 line-clamp-1 mt-0.5 text-[11px]">
                          {s.scope || "Bureau of Indian Standards Specification"}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-600 font-code-sm text-xs">
                        {s.product || s.productCategory || "General"}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <StatusBadge status={s.status || "CURRENT"} />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <Link
                          to={`/standards/${s.id}`}
                          className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 hover:bg-orange-50 hover:text-primary hover:border-primary/40 transition-colors text-xs font-medium inline-flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <span className="material-symbols-outlined text-[13px] text-slate-400">chevron_right</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center space-y-1">
              <p className="font-semibold text-slate-800 text-sm">No standards match the selected criteria</p>
              <p className="text-xs text-slate-500">Try clearing the search text or switching divisions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
