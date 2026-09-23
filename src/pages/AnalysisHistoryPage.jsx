import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_HISTORY } from '../data/mockRecommendations';

export default function AnalysisHistoryPage({ setGlobalResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyItems, setHistoryItems] = useState(MOCK_HISTORY);
  const navigate = useNavigate();

  const filteredItems = historyItems.filter(item => {
    if (!searchTerm.trim()) return true;
    return item.query.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenHistoryItem = (item) => {
    if (setGlobalResults && item.resultData) {
      setGlobalResults(item.resultData);
      navigate('/recommendations');
    }
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
  };

  const handleRestoreHistory = () => {
    setHistoryItems(MOCK_HISTORY);
    setSearchTerm('');
  };

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200/70 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Session Log
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              {historyItems.length} Records
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Specification Review History
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Previous procurement requirement searches and tender document audits.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {historyItems.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-medium transition-colors cursor-pointer"
            >
              Clear Log
            </button>
          )}
          <button
            onClick={() => navigate('/search')}
            className="px-3.5 py-1.5 rounded-lg bg-primary text-white hover:bg-[#C2410C] text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Search</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-4">
        {/* Filter Input */}
        <div className="rounded-xl bg-white p-4 border border-slate-200/90 shadow-2xs flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Search previous reviews by keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white"
            />
          </div>
          <span className="text-xs text-slate-400 font-code-sm hidden sm:inline-block">
            Showing {filteredItems.length} of {historyItems.length} reviews
          </span>
        </div>

        {/* History Table or Realistic Empty State */}
        <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
          {filteredItems.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/70">
                    <th className="py-2.5 px-4">Audit Type</th>
                    <th className="py-2.5 px-4">Requirement / Document Name</th>
                    <th className="py-2.5 px-4">Standards Mapped</th>
                    <th className="py-2.5 px-4">Match Score</th>
                    <th className="py-2.5 px-4">Date</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-code-sm text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                          Standard Search
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900 max-w-sm truncate">
                        "{item.query}"
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap font-code-sm">
                        {item.standardsCount} Standards
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-code-sm font-semibold text-[11px]">
                          {item.highestMatch}% Match
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-code-sm text-slate-400">
                        {item.date}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleOpenHistoryItem(item)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:bg-orange-50 hover:text-primary hover:border-orange-200 transition-colors text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>Re-open</span>
                          <span className="material-symbols-outlined text-[13px] text-slate-400">arrow_forward</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Genuine Realistic Empty State */
            <div className="p-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                <span className="material-symbols-outlined text-[20px]">history_toggle_off</span>
              </div>
              <div className="max-w-sm mx-auto space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {historyItems.length === 0 ? "No review history" : "No matching review sessions"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {historyItems.length === 0
                    ? "You have cleared your audit log. Run a new search to populate history."
                    : `No previous sessions match "${searchTerm}". Check the query or reset the filter.`}
                </p>
              </div>

              <div className="pt-1 flex items-center justify-center gap-2">
                {historyItems.length === 0 ? (
                  <button
                    onClick={handleRestoreHistory}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    Restore Demo Log
                  </button>
                ) : (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
                <button
                  onClick={() => navigate('/search')}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-white hover:bg-[#C2410C] text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Start New Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
