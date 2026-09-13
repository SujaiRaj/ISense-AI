import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, BookOpen, Database } from 'lucide-react';
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
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#28536F] font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-[#12304A]" />
          <span>Bureau of Indian Standards Catalogue Index</span>
        </div>
        <h2 className="text-lg font-bold text-[#0B1F33] leading-tight mb-1">
          Technical Standards Library Repository
        </h2>
        <p className="text-xs text-[#61707D]">
          Browse, filter, and inspect Bureau of Indian Standards indexed for procurement specification matching and mandatory compliance.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white p-4 rounded-[4px] border border-[#E3E8ED] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search IS number, title, or product keyword (e.g. IS 10322)..."
            className="w-full pl-8 pr-3 py-1.5 text-xs text-[#17212B] bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] focus:bg-white focus:border-[#12304A] focus:ring-1 focus:ring-[#12304A] outline-none font-mono"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 text-[#61707D] font-semibold">
            <Filter className="w-3.5 h-3.5 text-[#28536F]" />
            <span>CATEGORY:</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-[#F4F6F8] border border-[#E3E8ED] rounded-[3px] px-2 py-1 text-xs font-bold text-[#0B1F33] outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-[#61707D] font-semibold">
            <span>STATUS:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#F4F6F8] border border-[#E3E8ED] rounded-[3px] px-2 py-1 text-xs font-bold text-[#0B1F33] outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Standards Table Catalog */}
      <div className="bg-white rounded-[4px] border border-[#E3E8ED] overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-8 text-center text-xs font-mono font-bold text-[#61707D]">
            Loading Standards Catalogue Repository...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="inst-table">
              <thead>
                <tr>
                  <th>IS Code Number</th>
                  <th>Standard Title</th>
                  <th>Domain Category</th>
                  <th>Edition Year</th>
                  <th>Status</th>
                  <th>Certification</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {standards.map((std) => (
                  <tr key={std.id}>
                    <td className="font-mono font-bold text-[#0B1F33] whitespace-nowrap">
                      {std.isNumber}
                    </td>
                    <td className="font-semibold text-[#17212B] max-w-[280px]">
                      {std.title}
                    </td>
                    <td className="whitespace-nowrap font-mono text-xs text-[#61707D]">
                      {std.category}
                    </td>
                    <td className="whitespace-nowrap font-mono text-xs text-[#0B1F33]">
                      {std.publicationYear}
                    </td>
                    <td className="whitespace-nowrap">
                      <StatusBadge status={std.status} />
                    </td>
                    <td className="whitespace-nowrap">
                      <ComplianceBadge 
                        type={std.certification?.isMandatory ? "REQUIRED" : "RECOMMENDED"} 
                        label={std.certification?.isMandatory ? "Mandatory QCO" : "Applicable"}
                      />
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/standards/${std.id}`)}
                        className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#12304A] hover:text-[#0B1F33]"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-3 bg-[#F4F6F8] border-t border-[#E3E8ED] flex items-center justify-between text-xs font-mono text-[#61707D]">
          <span>Standards Records Displayed: {standards.length}</span>
          <span>BIS Index Status: Active (14,290 Records)</span>
        </div>
      </div>
    </div>
  );
}
