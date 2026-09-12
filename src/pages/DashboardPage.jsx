import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState("");

  const handleQuickSearch = (e) => {
    e?.preventDefault();
    if (!quickQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(quickQuery)}`);
  };

  // Compact metrics summary
  const metrics = [
    { label: "Standards Indexed", value: "1,250", detail: "BIS Catalogue Index" },
    { label: "Analyses Completed", value: "347", detail: "Procurement Reviews" },
    { label: "Active QCO Categories", value: "86", detail: "Mandatory Certifications" },
    { label: "Pending Reviews", value: "4", detail: "Specifications Flagged" }
  ];

  // Recent Analyses Data
  const recentAnalyses = [
    {
      id: "1",
      query: "90W outdoor LED street light for municipal roads",
      category: "Electrical",
      standardsFound: 5,
      highestMatch: "96%",
      status: "Completed",
      date: "10 Sep 2026"
    },
    {
      id: "2",
      query: "Industrial safety helmet for construction site workers",
      category: "Safety / PPE",
      standardsFound: 4,
      highestMatch: "97%",
      status: "Completed",
      date: "09 Sep 2026"
    },
    {
      id: "3",
      query: "Ordinary Portland Cement 43 Grade for structural works",
      category: "Construction",
      standardsFound: 6,
      highestMatch: "95%",
      status: "Completed",
      date: "06 Sep 2026"
    },
    {
      id: "4",
      query: "PVC insulated heavy duty electrical cables",
      category: "Electrical",
      standardsFound: 4,
      highestMatch: "96%",
      status: "Completed",
      date: "04 Sep 2026"
    }
  ];

  // Frequently Accessed Standards
  const frequentStandards = [
    { isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Luminaires for Road and Street Lighting", category: "Electrical", status: "CURRENT", year: "2024" },
    { isNumber: "IS 2925: 1984", title: "Industrial Safety Helmets Specification", category: "Safety / PPE", status: "CURRENT", year: "1984" },
    { isNumber: "IS 8112: 2013", title: "Ordinary Portland Cement 43 Grade", category: "Construction", status: "CURRENT", year: "2013" },
    { isNumber: "IS 1554 (Part 1): 1988", title: "PVC Insulated Electric Cables (Heavy Duty)", category: "Electrical", status: "CURRENT", year: "1988" },
    { isNumber: "IS 15298 (Part 2): 2016", title: "Personal Protective Equipment — Safety Footwear", category: "Safety / PPE", status: "CURRENT", year: "2016" }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Top Search Workspace Box */}
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h2 className="text-base font-semibold text-slate-900 mb-1">
          Find applicable standards for a procurement requirement
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-3 font-normal">
          Enter product, technical parameters or specification text to identify governing Indian Standards.
        </p>

        <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            type="text"
            value={quickQuery}
            onChange={(e) => setQuickQuery(e.target.value)}
            placeholder="e.g. 90W outdoor LED street light for municipal roads..."
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm text-slate-800 bg-slate-50 rounded-md border border-slate-300 focus:bg-white focus:border-blue-700 outline-none font-normal"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search Standards</span>
          </button>
        </form>

        {/* Inline Example Searches */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-normal">
          <span className="font-medium text-slate-500">Recent searches:</span>
          {[
            "90W outdoor LED street light",
            "Safety helmet IS 2925",
            "Portland cement 43 grade",
            "PVC electrical cable"
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => navigate(`/search`)}
              className="text-slate-600 hover:text-blue-700 hover:underline font-normal"
            >
              {item}{idx < 3 ? " •" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white rounded-md p-4 border border-slate-200">
            <div className="text-xs font-medium text-slate-500 mb-1">{m.label}</div>
            <div className="text-xl font-semibold text-slate-900 tracking-tight">{m.value}</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">{m.detail}</div>
          </div>
        ))}
      </div>

      {/* 3. Start an Analysis (Compact Section) */}
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h3 className="text-xs font-semibold text-slate-900 tracking-wide mb-3">
          Start an Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Action 1 */}
          <div className="p-3.5 rounded-md border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-slate-900 mb-1">
                <Search className="w-4 h-4 text-slate-600" />
                <span>Standards Search</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 font-normal">
                Find standards applicable to a product or procurement requirement.
              </p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium rounded text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <span>Open Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2 */}
          <div className="p-3.5 rounded-md border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-slate-900 mb-1">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Tender Review</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 font-normal">
                Review an existing tender specification for standards and requirement gaps.
              </p>
            </div>
            <button
              onClick={() => navigate('/tender-analysis')}
              className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium rounded text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <span>Upload Specification</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3 */}
          <div className="p-3.5 rounded-md border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-slate-900 mb-1">
                <ShieldCheck className="w-4 h-4 text-slate-600" />
                <span>Compliance Check</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 font-normal">
                Check applicable certification and regulatory Quality Control Orders.
              </p>
            </div>
            <button
              onClick={() => navigate('/compliance')}
              className="w-full py-1.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium rounded text-xs flex items-center justify-center gap-1 transition-colors"
            >
              <span>View QCO Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Split: Recent Procurement Analyses & Frequently Accessed Standards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Procurement Analyses Table */}
        <div className="lg:col-span-7 bg-white rounded-md border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="text-xs font-semibold text-slate-900 tracking-wide">
                Recent Procurement Analyses
              </h3>
              <button 
                onClick={() => navigate('/history')}
                className="text-xs text-blue-700 hover:underline font-medium"
              >
                View History →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="text-slate-500 font-medium border-b border-slate-200 text-xs">
                    <th className="pb-2">Procurement Query</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Standards</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAnalyses.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 font-normal text-slate-800 max-w-[200px] truncate">
                        {row.query}
                      </td>
                      <td className="py-2.5 text-slate-600 font-normal">
                        {row.category}
                      </td>
                      <td className="py-2.5 font-medium text-slate-900">
                        {row.standardsFound} found
                      </td>
                      <td className="py-2.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="py-2.5 text-right text-slate-500 font-mono text-xs">
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Frequently Accessed Standards */}
        <div className="lg:col-span-5 bg-white rounded-md border border-slate-200 p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-900 tracking-wide">
              Frequently Accessed Standards
            </h3>
            <button 
              onClick={() => navigate('/standards')}
              className="text-xs text-blue-700 hover:underline font-medium"
            >
              Browse All →
            </button>
          </div>

          <div className="space-y-2">
            {frequentStandards.map((std, idx) => (
              <div 
                key={idx}
                onClick={() => navigate('/standards')}
                className="p-2.5 bg-slate-50 rounded border border-slate-200/80 hover:border-slate-300 transition-colors cursor-pointer flex items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-mono font-semibold text-slate-900 truncate">
                    {std.isNumber}
                  </div>
                  <div className="text-xs text-slate-600 truncate mt-0.5 font-normal">
                    {std.title}
                  </div>
                </div>
                <StatusBadge status={std.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

