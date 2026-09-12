import React, { useState, useEffect } from 'react';
import { AlertTriangle, Search, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 leading-tight mb-1">
          Compliance & QCO Tracker
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal">
          Verify Quality Control Orders (QCOs), mandatory certification schemes, and active BIS amendments for public procurement.
        </p>
      </div>

      {/* Subtle Information Strip */}
      <div className="bg-amber-50/70 text-amber-950 px-4 py-2.5 rounded border border-amber-200 text-xs flex items-center gap-2 font-normal">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
        <span>Compliance information should be verified against the latest official Bureau of Indian Standards notifications and Quality Control Orders.</span>
      </div>

      {/* Category Filter Bar */}
      <div className="bg-white p-4 rounded-md border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-medium text-slate-700">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>Product Category Filter:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {productOptions.map((prod) => (
            <button
              key={prod}
              onClick={() => setSelectedProduct(prod)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                selectedProduct === prod
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {prod}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance Data Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px] bg-white rounded-md border border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
            Loading Compliance Records...
          </div>
        </div>
      ) : complianceData && (
        <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
              Governing Standards for "{selectedProduct}"
            </h3>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
              {complianceData.standardsFoundCount} Active Standards
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {complianceData.standards.map((item) => (
              <div key={item.id} className="p-4 space-y-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-semibold text-sm text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.isNumber}
                    </span>
                    <StatusBadge status={item.statusBadge} />
                    <ComplianceBadge type={item.certificationBadge} />
                  </div>

                  <div className="text-[11px] text-slate-500 font-normal">
                    Amendments: <strong className="text-slate-800 font-medium">{item.amendmentsCount} Active</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Governing QCO: <strong className="text-slate-800 font-medium">{item.qcoName}</strong> ({item.certificationScheme})
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded border border-slate-200/70 space-y-1.5">
                  <div className="text-[11px] font-medium text-slate-500">
                    Core Quality Requirements:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {item.requirementsSummary.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-700 bg-white p-1.5 rounded border border-slate-200 font-normal text-[11px]">
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

