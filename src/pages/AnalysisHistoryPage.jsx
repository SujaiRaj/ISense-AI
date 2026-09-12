import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
      date: "10 Sep 2026",
      status: "Completed"
    },
    {
      id: "hist-2",
      query: "Industrial safety helmet for construction workers",
      category: "Safety / PPE",
      standardsFound: 4,
      highestRelevance: "97%",
      date: "09 Sep 2026",
      status: "Completed"
    },
    {
      id: "hist-3",
      query: "Ordinary Portland cement 43 grade for building construction",
      category: "Construction",
      standardsFound: 6,
      highestRelevance: "95%",
      date: "06 Sep 2026",
      status: "Completed"
    },
    {
      id: "hist-4",
      query: "PVC insulated electrical cable heavy duty",
      category: "Electrical",
      standardsFound: 4,
      highestRelevance: "96%",
      date: "04 Sep 2026",
      status: "Completed"
    },
    {
      id: "hist-5",
      query: "Safety shoes for industrial workers",
      category: "Safety / PPE",
      standardsFound: 3,
      highestRelevance: "97%",
      date: "01 Sep 2026",
      status: "Completed"
    }
  ];

  const handleReview = (queryText) => {
    const data = MOCK_RECOMMENDATION_DATA[queryText] || MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"];
    if (setGlobalResults) setGlobalResults(data);
    navigate('/recommendations');
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 leading-tight mb-1">
          Analysis History
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Audit log of past requirement searches, tender reviews, and compliance checks.
        </p>
      </div>

      {/* History Audit Log Table */}
      <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200 uppercase tracking-wide text-[11px]">
              <tr>
                <th className="py-3 px-4 font-medium">Procurement Query / Specification</th>
                <th className="py-3 px-4 font-medium">Category</th>
                <th className="py-3 px-4 font-medium">Standards</th>
                <th className="py-3 px-4 font-medium">Top Match</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900 max-w-[260px] truncate">
                    "{item.query}"
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                    {item.category}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                    {item.standardsFound} Standards
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-700">
                    {item.highestRelevance}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                    {item.date}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleReview(item.query)}
                      className="inline-flex items-center gap-0.5 text-xs text-blue-700 hover:underline font-medium"
                    >
                      <span>Review</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-normal">
          <span>Logged Audits: 5 Records</span>
          <span>Audit Log Retention: Active</span>
        </div>
      </div>
    </div>
  );
}

