import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, History } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { MOCK_RECOMMENDATION_DATA } from '../data/mockRecommendations';

export default function AnalysisHistoryPage({ setGlobalResults }) {
  const navigate = useNavigate();

  const historyItems = [
    {
      id: "hist-1",
      query: "90W outdoor LED street light for municipal roads",
      category: "Electrical",
      standardsFound: 5,
      highestRelevance: "96%",
      date: "12 Sep 2026",
      status: "COMPLETED"
    },
    {
      id: "hist-2",
      query: "Industrial safety helmet for construction site workers",
      category: "Safety / PPE",
      standardsFound: 4,
      highestRelevance: "97%",
      date: "11 Sep 2026",
      status: "COMPLETED"
    },
    {
      id: "hist-3",
      query: "Ordinary Portland Cement 53 Grade for structural works",
      category: "Civil & Construction",
      standardsFound: 6,
      highestRelevance: "95%",
      date: "09 Sep 2026",
      status: "COMPLETED"
    },
    {
      id: "hist-4",
      query: "PVC insulated heavy duty electrical power cables",
      category: "Electrical",
      standardsFound: 4,
      highestRelevance: "96%",
      date: "07 Sep 2026",
      status: "COMPLETED"
    },
    {
      id: "hist-5",
      query: "Safety footwear for industrial plant workers",
      category: "Safety / PPE",
      standardsFound: 3,
      highestRelevance: "97%",
      date: "04 Sep 2026",
      status: "COMPLETED"
    }
  ];

  const handleReview = (queryText) => {
    const data = MOCK_RECOMMENDATION_DATA[queryText] || MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"];
    if (setGlobalResults) setGlobalResults(data);
    navigate('/recommendations');
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#28536F] font-bold uppercase tracking-wider mb-1">
          <History className="w-4 h-4 text-[#12304A]" />
          <span>Department Procurement Audit Log</span>
        </div>
        <h2 className="text-lg font-bold text-[#0B1F33] leading-tight mb-1">
          Standards & Specification Analysis History
        </h2>
        <p className="text-xs text-[#61707D]">
          Audit log of past product specification analyses, tender document reviews, and Quality Control Order checks.
        </p>
      </div>

      {/* History Audit Log Table */}
      <div className="bg-white rounded-[4px] border border-[#E3E8ED] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="inst-table">
            <thead>
              <tr>
                <th>Procurement Query / Specification</th>
                <th>Category</th>
                <th>Matched IS Codes</th>
                <th>Max Relevance</th>
                <th>Date Logged</th>
                <th>Status</th>
                <th className="text-right font-mono">Action</th>
              </tr>
            </thead>
            <tbody>
              {historyItems.map((item) => (
                <tr key={item.id}>
                  <td className="font-bold text-[#0B1F33] max-w-[240px] truncate">
                    "{item.query}"
                  </td>
                  <td className="whitespace-nowrap text-[#61707D] font-mono text-xs">
                    {item.category}
                  </td>
                  <td className="whitespace-nowrap font-mono font-bold text-[#12304A]">
                    {item.standardsFound} Standards
                  </td>
                  <td className="whitespace-nowrap font-mono font-bold text-emerald-800">
                    {item.highestRelevance}
                  </td>
                  <td className="whitespace-nowrap text-[#61707D] font-mono text-xs">
                    {item.date}
                  </td>
                  <td className="whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <button
                      onClick={() => handleReview(item.query)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#12304A] hover:text-[#0B1F33]"
                    >
                      <span>Review Report</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-[#F4F6F8] border-t border-[#E3E8ED] flex items-center justify-between text-xs font-mono text-[#61707D]">
          <span>Logged Audit Entries: 5 Records</span>
          <span>Audit Log Integrity: Certified & Preserved</span>
        </div>
      </div>
    </div>
  );
}
