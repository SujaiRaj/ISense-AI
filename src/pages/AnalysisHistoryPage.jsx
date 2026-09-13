import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, FileText } from 'lucide-react';
import { MOCK_HISTORY } from '../data/mockRecommendations';

export default function AnalysisHistoryPage({ setGlobalResults }) {
  const navigate = useNavigate();

  const handleOpenHistoryItem = (item) => {
    if (setGlobalResults && item.resultData) {
      setGlobalResults(item.resultData);
      navigate('/recommendations');
    }
  };

  return (
    <div className="space-y-8 font-sans text-[#102A43]">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <h1 className="text-2xl font-bold text-[#102A43]">
          Specification Review History
        </h1>
        <p className="text-xs text-[#64748B]">
          Activity history of previous procurement requirement searches and tender document reviews.
        </p>
      </div>

      {/* History Activity List Table */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden text-xs shadow-2xs">
        <div className="px-6 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <span className="font-bold text-[#102A43] uppercase tracking-wider text-[11px]">
            Activity Log ({MOCK_HISTORY.length} Reviews)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-5">Analysis Type</th>
                <th className="py-3 px-5">Requirement Query</th>
                <th className="py-3 px-5">Standards Found</th>
                <th className="py-3 px-5">Match Score</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {MOCK_HISTORY.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold bg-[#F0FDFA] text-[#0F766E] border border-[#CCFBF1]">
                      <Search className="w-3 h-3 text-[#0F766E]" />
                      <span>Standard Search</span>
                    </span>
                  </td>
                  <td className="py-4 px-5 font-medium text-[#102A43] max-w-sm truncate">
                    "{item.query}"
                  </td>
                  <td className="py-4 px-5 text-[#475569] whitespace-nowrap">
                    {item.standardsCount} Standards
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap font-bold text-[#0F766E]">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {item.highestMatch}% Match
                    </span>
                  </td>
                  <td className="py-4 px-5 text-[#64748B] whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenHistoryItem(item)}
                      className="font-bold text-[#102A43] hover:text-[#0F766E] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Report</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
