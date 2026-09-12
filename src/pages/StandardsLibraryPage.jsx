import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ComplianceBadge from '../components/ComplianceBadge';
import { getStandardsList } from '../services/standardsService';

export default function StandardsLibraryPage() {
  const [standards, setStandards] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = ["All", "Electrical", "Construction", "Safety", "Electronics", "Mechanical"];
  const statuses = ["All", "CURRENT", "SUPERSEDED"];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getStandardsList({ search, category, status });
        if (res && res.data) {
          setStandards(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [search, category, status]);

  return (
    <div className="space-y-5 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 leading-tight mb-1">
          Standards Library
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Browse, filter, and inspect Bureau of Indian Standards indexed for procurement specification matching.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search IS number, title, or product keyword..."
            className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 bg-slate-50 rounded border border-slate-200 focus:bg-white focus:border-blue-700 outline-none transition-colors"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Category:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-800 outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <span>Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-800 outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Standards Table Catalog */}
      <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs font-medium text-slate-500">
            Loading Standards Catalogue...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200 text-[11px] uppercase tracking-wide">
                <tr>
                  <th className="py-3 px-4 font-medium">IS Number</th>
                  <th className="py-3 px-4 font-medium">Standard Title</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Edition</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Certification</th>
                  <th className="py-3 px-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {standards.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                      {std.isNumber}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 max-w-[300px]">
                      {std.title}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      {std.category}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-700">
                      {std.publicationYear}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={std.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <ComplianceBadge 
                        type={std.certification?.isMandatory ? "REQUIRED" : "RECOMMENDED"} 
                        label={std.certification?.isMandatory ? "Mandatory QCO" : "Applicable"}
                      />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/standards/${std.id}`)}
                        className="inline-flex items-center gap-0.5 text-xs text-blue-700 hover:underline font-medium"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-normal">
          <span>Standards Displayed: {standards.length}</span>
          <span>BIS Index Status: Active</span>
        </div>
      </div>
    </div>
  );
}

