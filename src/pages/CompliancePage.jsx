import React, { useState, useEffect } from 'react';
import { AlertTriangle, Search, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ComplianceBadge from '../components/ComplianceBadge';
import { checkProductCompliance } from '../services/complianceService';

export default function CompliancePage() {
  const [selectedProduct, setSelectedProduct] = useState("LED Street Light");
  const [complianceData, setComplianceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const productOptions = [
    "LED Street Light",
    "Safety Helmet",
    "Portland Cement",
    "PVC Cable",
    "Safety Shoes"
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await checkProductCompliance(selectedProduct);
        if (res && res.success) {
          setComplianceData(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedProduct]);

  return (
    <div className="space-y-5 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-mono text-[#28536F] font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Quality Control Orders (QCO) Gazette Registry</span>
        </div>
        <h2 className="text-lg font-bold text-[#0B1F33] leading-tight mb-1">
          Quality Control Orders & Mandatory Certification Tracker
        </h2>
        <p className="text-xs text-[#61707D]">
          Verify Quality Control Orders (QCOs), mandatory certification schemes, and active BIS amendments for public procurement compliance.
        </p>
      </div>

      {/* Information Strip */}
      <div className="bg-[#F4F6F8] text-[#0B1F33] px-4 py-2.5 rounded-[4px] border border-[#E3E8ED] text-xs font-mono flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>Gazette Notification Rule: All products covered under mandatory QCOs must carry the Standard Mark (ISI Mark) under a valid BIS license.</span>
      </div>

      {/* Category Filter Bar */}
      <div className="bg-white p-4 rounded-[4px] border border-[#E3E8ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-[#0B1F33]">
          <Search className="w-3.5 h-3.5 text-[#28536F]" />
          <span>PRODUCT CATEGORY REGISTRY:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {productOptions.map((prod) => (
            <button
              key={prod}
              onClick={() => setSelectedProduct(prod)}
              className={`px-3 py-1 rounded-[3px] text-xs font-bold transition-colors ${
                selectedProduct === prod
                  ? 'bg-[#12304A] text-white'
                  : 'bg-[#F4F6F8] text-[#12304A] hover:bg-[#E3E8ED] border border-[#E3E8ED]'
              }`}
            >
              {prod}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance Data Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px] bg-white rounded-[4px] border border-[#E3E8ED]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#61707D] font-semibold">
            <div className="w-4 h-4 border-2 border-[#12304A] border-t-transparent rounded-full animate-spin" />
            <span>Loading QCO Gazette Compliance Records...</span>
          </div>
        </div>
      ) : complianceData && (
        <div className="bg-white rounded-[4px] border border-[#E3E8ED] overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-[#E3E8ED] flex items-center justify-between font-mono bg-[#F4F6F8]">
            <h3 className="text-xs font-bold text-[#0B1F33] uppercase tracking-wider">
              Enforced Gazette Standards for "{selectedProduct}"
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-[3px] bg-emerald-50 text-emerald-950 border border-emerald-300">
              {complianceData.standardsFoundCount} Active QCO Mandates
            </span>
          </div>

          <div className="divide-y divide-[#E3E8ED]">
            {complianceData.standards.map((item) => (
              <div key={item.id} className="p-4 space-y-3 hover:bg-[#F4F6F8]/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-xs text-white bg-[#12304A] px-2.5 py-0.5 rounded-[3px] border border-[#28536F]">
                      {item.isNumber}
                    </span>
                    <StatusBadge status={item.statusBadge} />
                    <ComplianceBadge type={item.certificationBadge} />
                  </div>

                  <div className="text-[11px] font-mono text-[#61707D]">
                    Gazette Amendments: <strong className="text-[#0B1F33] font-bold">{item.amendmentsCount} Active</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#0B1F33] text-sm font-mono">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono text-[#61707D] mt-0.5">
                    Governing QCO Gazette: <strong className="text-[#0B1F33] font-bold">{item.qcoName}</strong> ({item.certificationScheme})
                  </p>
                </div>

                <div className="bg-[#F4F6F8] p-3 rounded-[3px] border border-[#E3E8ED] space-y-1.5">
                  <div className="text-[10px] font-mono font-bold text-[#61707D] uppercase">
                    Mandatory Quality & Testing Specifications:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    {item.requirementsSummary.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[#17212B] bg-white p-2 rounded-[3px] border border-[#E3E8ED] text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
