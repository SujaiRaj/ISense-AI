import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getStandardsList } from '../services/standardsService';

export default function StandardsLibraryPage() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
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
          category: selectedCategory,
          status: selectedStatus
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
  }, [search, selectedCategory, selectedStatus]);

  return (
    <div className="space-y-8 font-sans text-[#0F172A]">
      {/* Page Header */}
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Indian Standards Catalogue
        </h1>
        <p className="text-xs text-[#64748B]">
          Search and browse official Bureau of Indian Standards (BIS) specifications.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
        <div className="sm:col-span-6 relative">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search IS number, title or product keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-white border border-[#E2E8F0] rounded focus:border-[#0F172A] outline-none text-[#0F172A]"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-[#E2E8F0] rounded focus:border-[#0F172A] outline-none text-[#0F172A]"
          >
            <option value="All">All Categories</option>
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full py-2 px-3 bg-white border border-[#E2E8F0] rounded focus:border-[#0F172A] outline-none text-[#0F172A]"
          >
            <option value="All">All Statuses</option>
            <option value="Current">Current / Active</option>
            <option value="Superseded">Superseded</option>
          </select>
        </div>
      </div>

      {/* Clean Full-Width Data Table (no text truncation!) */}
      <div className="border border-[#E2E8F0] rounded bg-white overflow-hidden text-xs">
        {loading ? (
          <div className="p-10 text-center text-[#64748B]">
            Loading standards catalogue...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4 w-[22%]">IS Number</th>
                  <th className="py-3 px-4 w-[42%]">Standard Title</th>
                  <th className="py-3 px-4 w-[16%]">Category</th>
                  <th className="py-3 px-4 w-[10%]">Year</th>
                  <th className="py-3 px-4 w-[10%] text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {standards.map((std) => (
                  <tr key={std.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0F172A] align-top whitespace-normal break-words">
                      {std.is_number || std.isNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#0F172A] align-top leading-normal whitespace-normal break-words">
                      {std.title}
                    </td>
                    <td className="py-3.5 px-4 text-[#475569] align-top whitespace-normal">
                      {std.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#475569] align-top whitespace-nowrap">
                      {std.latest_version || std.publicationYear || '2024'}
                    </td>
                    <td className="py-3.5 px-4 text-right align-top whitespace-nowrap">
                      <Link
                        to={`/standards/${std.id}`}
                        className="font-semibold text-[#0F172A] hover:underline"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
                {standards.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 px-4 text-center text-[#64748B]">
                      No standards found matching your filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
