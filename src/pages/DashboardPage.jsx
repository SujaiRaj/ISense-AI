import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  ExternalLink,
  FileSpreadsheet,
  Upload,
  Layers,
  Database,
  Building,
  CheckCircle2
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ComplianceBadge from '../components/ComplianceBadge';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [quickQuery, setQuickQuery] = useState("");

  const handleQuickSearch = (e) => {
    e?.preventDefault();
    if (!quickQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(quickQuery)}`);
  };

  // Institutional Metrics Summary
  const metrics = [
    { label: "STANDARDS INDEXED", value: "14,290", detail: "BIS Catalogue Registry", badge: "Live Sync" },
    { label: "RECOMMENDATIONS GENERATED", value: "3,842", detail: "Procurement Reviews", badge: "+12 Today" },
    { label: "TENDER DOCS PROCESSED", value: "1,120", detail: "Specification Analyses", badge: "PDF/DOCX" },
    { label: "MANDATORY QCO ORDERS", value: "485", detail: "Gazette Notifications", badge: "Enforced" },
    { label: "SAVED STANDARDS", value: "24", detail: "Department Library", badge: "Active" }
  ];

  // Recent Analyses Data
  const recentAnalyses = [
    {
      id: "1",
      query: "90W outdoor LED street light for municipal roads",
      category: "Electrical",
      standardsFound: 5,
      highestMatch: "96%",
      status: "COMPLETED",
      qcoStatus: "MANDATORY QCO",
      date: "12 Sep 2026"
    },
    {
      id: "2",
      query: "Industrial safety helmet for construction site workers",
      category: "Safety / PPE",
      standardsFound: 4,
      highestMatch: "97%",
      status: "COMPLETED",
      qcoStatus: "MANDATORY QCO",
      date: "11 Sep 2026"
    },
    {
      id: "3",
      query: "Ordinary Portland Cement 53 Grade for structural works",
      category: "Civil & Construction",
      standardsFound: 6,
      highestMatch: "95%",
      status: "COMPLETED",
      qcoStatus: "BIS CERTIFIED",
      date: "09 Sep 2026"
    },
    {
      id: "4",
      query: "PVC insulated heavy duty electrical power cables",
      category: "Electrical",
      standardsFound: 4,
      highestMatch: "96%",
      status: "COMPLETED",
      qcoStatus: "MANDATORY QCO",
      date: "07 Sep 2026"
    }
  ];

  // Frequently Referenced Standards
  const frequentStandards = [
    { isNumber: "IS 10322 (Part 5/Sec 3): 2024", title: "Luminaires for Road and Street Lighting", category: "Electrical", status: "CURRENT", qco: "MANDATORY" },
    { isNumber: "IS 2925: 1984", title: "Industrial Safety Helmets Specification", category: "Safety / PPE", status: "CURRENT", qco: "MANDATORY" },
    { isNumber: "IS 12269: 2013", title: "Ordinary Portland Cement 53 Grade", category: "Civil & Construction", status: "CURRENT", qco: "REQUIRED" },
    { isNumber: "IS 1554 (Part 1): 1988", title: "PVC Insulated Heavy Duty Electric Cables", category: "Electrical", status: "CURRENT", qco: "MANDATORY" },
    { isNumber: "IS 15298 (Part 2): 2016", title: "Personal Protective Equipment — Safety Footwear", category: "Safety / PPE", status: "CURRENT", qco: "MANDATORY" }
  ];

  return (
    <div className="space-y-5">
      {/* 1. Prominent "New Standards Analysis" Workspace Banner */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E3E8ED] mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#28536F] font-bold uppercase tracking-wider mb-1">
              <Building className="w-4 h-4" />
              <span>Government Procurement Intelligence Platform</span>
            </div>
            <h2 className="text-lg font-bold text-[#0B1F33]">
              New Technical Specification & Standards Analysis
            </h2>
            <p className="text-xs text-[#61707D] font-normal mt-0.5">
              Enter product specifications or upload tender documents to identify governing Bureau of Indian Standards (BIS) and mandatory Quality Control Orders (QCO).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/tender-analysis')}
              className="inst-btn-secondary py-2 px-3 text-xs font-mono"
            >
              <Upload className="w-3.5 h-3.5 text-[#28536F]" />
              <span>Upload Tender Document</span>
            </button>
            <button
              onClick={() => navigate('/search')}
              className="inst-btn-primary py-2 px-3 text-xs font-mono"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Open Search Workspace</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={quickQuery}
              onChange={(e) => setQuickQuery(e.target.value)}
              placeholder="Enter product description or technical specification (e.g. 90W outdoor LED street light, 53 grade cement)..."
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#17212B] bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] focus:bg-white focus:border-[#12304A] focus:ring-1 focus:ring-[#12304A] outline-none font-mono"
            />
          </div>
          <button
            type="submit"
            className="inst-btn-primary py-2.5 px-5 font-mono text-xs"
          >
            <span>Analyze Specification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Sample Queries */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-[#61707D] font-mono">
          <span className="font-semibold text-[#0B1F33]">Sample Officer Searches:</span>
          {[
            { label: "90W Municipal LED Streetlight", q: "90W outdoor LED street light for municipal roads" },
            { label: "Industrial Safety Helmet", q: "Industrial safety helmet for construction site workers" },
            { label: "OPC 53 Grade Cement", q: "Ordinary Portland Cement 53 Grade for structural works" },
            { label: "Heavy Duty PVC Cable", q: "PVC insulated heavy duty electrical cables" }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuickQuery(item.q);
                navigate(`/search?q=${encodeURIComponent(item.q)}`);
              }}
              className="text-[#12304A] hover:text-[#0B1F33] hover:underline bg-[#F4F6F8] px-2 py-0.5 rounded-[3px] border border-[#E3E8ED]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Procurement Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white rounded-[4px] p-3.5 border border-[#E3E8ED] shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#61707D] mb-1">
              <span>{m.label}</span>
              <span className="text-[9px] bg-[#F4F6F8] text-[#12304A] px-1 py-0.2 rounded border border-[#E3E8ED]">{m.badge}</span>
            </div>
            <div className="text-xl font-bold font-mono text-[#0B1F33] tracking-tight">{m.value}</div>
            <div className="text-[11px] text-[#61707D] mt-0.5">{m.detail}</div>
          </div>
        ))}
      </div>

      {/* 3. Core Procurement Workflows */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#28536F]" />
          Procurement Intelligence Core Workflows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Action 1 */}
          <div className="p-4 rounded-[4px] border border-[#E3E8ED] bg-[#F4F6F8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-[#0B1F33] mb-1">
                <Search className="w-4 h-4 text-[#12304A]" />
                <span>Intelligent Standards Search</span>
              </div>
              <p className="text-xs text-[#61707D] leading-relaxed mb-3">
                Identify governing Indian Standards and technical compliance clauses for procurement specifications.
              </p>
            </div>
            <button
              onClick={() => navigate('/search')}
              className="inst-btn-secondary w-full py-1.5 text-xs font-mono"
            >
              <span>Open Search Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 2 */}
          <div className="p-4 rounded-[4px] border border-[#E3E8ED] bg-[#F4F6F8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-[#0B1F33] mb-1">
                <FileSpreadsheet className="w-4 h-4 text-[#12304A]" />
                <span>Tender Document Review</span>
              </div>
              <p className="text-xs text-[#61707D] leading-relaxed mb-3">
                Upload tender specs or RFPs to extract mandatory technical requirements and compliance gaps.
              </p>
            </div>
            <button
              onClick={() => navigate('/tender-analysis')}
              className="inst-btn-secondary w-full py-1.5 text-xs font-mono"
            >
              <span>Upload Tender Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action 3 */}
          <div className="p-4 rounded-[4px] border border-[#E3E8ED] bg-[#F4F6F8] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-[#0B1F33] mb-1">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>QCO & Gazette Order Tracker</span>
              </div>
              <p className="text-xs text-[#61707D] leading-relaxed mb-3">
                Monitor mandatory Quality Control Orders and Gazette notifications enforced by government ministries.
              </p>
            </div>
            <button
              onClick={() => navigate('/compliance')}
              className="inst-btn-secondary w-full py-1.5 text-xs font-mono"
            >
              <span>View Gazette QCO Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Split Grid: Recent Procurement Analyses Table & Frequently Referenced Standards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Recent Procurement Analyses Table */}
        <div className="lg:col-span-7 bg-white rounded-[4px] border border-[#E3E8ED] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3E8ED]">
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
              Recent Procurement Analyses Log
            </h3>
            <button 
              onClick={() => navigate('/history')}
              className="text-xs text-[#12304A] hover:underline font-mono font-semibold"
            >
              View Full Audit History →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="inst-table">
              <thead>
                <tr>
                  <th>Procurement Query</th>
                  <th>Category</th>
                  <th>IS Code Matches</th>
                  <th>QCO Status</th>
                  <th className="text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentAnalyses.map((row) => (
                  <tr key={row.id}>
                    <td className="font-semibold text-[#0B1F33] max-w-[180px] truncate">
                      {row.query}
                    </td>
                    <td className="text-[#61707D] font-mono text-xs">
                      {row.category}
                    </td>
                    <td className="font-mono font-bold text-[#12304A]">
                      {row.standardsFound} Standards
                    </td>
                    <td>
                      <ComplianceBadge type="REQUIRED" label={row.qcoStatus} />
                    </td>
                    <td className="text-right text-[#61707D] font-mono text-xs">
                      {row.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Frequently Referenced Standards */}
        <div className="lg:col-span-5 bg-white rounded-[4px] border border-[#E3E8ED] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3E8ED]">
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider">
              Frequently Referenced Standards
            </h3>
            <button 
              onClick={() => navigate('/standards')}
              className="text-xs text-[#12304A] hover:underline font-mono font-semibold"
            >
              Browse Catalogue →
            </button>
          </div>

          <div className="space-y-2">
            {frequentStandards.map((std, idx) => (
              <div 
                key={idx}
                onClick={() => navigate('/standards')}
                className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] hover:border-[#28536F] transition-all cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-mono font-bold text-xs text-[#0B1F33] truncate">
                    {std.isNumber}
                  </div>
                  <div className="text-xs text-[#61707D] truncate mt-0.5">
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
