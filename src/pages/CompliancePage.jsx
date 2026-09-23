import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import AnnouncementBanner from '../components/AnnouncementBanner';
import { getStandardsList } from '../services/standardsService';

export default function CompliancePage() {
  const [searchParams] = useSearchParams();
  const queryStdId = searchParams.get('id');
  const queryIsNum = searchParams.get('is') || searchParams.get('search');
  const navigate = useNavigate();

  const [standards, setStandards] = useState([]);
  const [selectedStandardId, setSelectedStandardId] = useState('');
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStandardsData() {
      setLoading(true);
      try {
        const res = await getStandardsList();
        if (res && res.data) {
          setStandards(res.data);

          let target = null;
          if (queryStdId) {
            target = res.data.find(s => s.id?.toLowerCase() === queryStdId.toLowerCase());
          }
          if (!target && queryIsNum) {
            const cleanQuery = queryIsNum.toLowerCase().replace(/[^a-z0-9]/g, '');
            target = res.data.find(s => {
              const cleanIs = (s.is_number || s.isNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
              return cleanIs.includes(cleanQuery) || cleanQuery.includes(cleanIs);
            });
          }

          if (target) {
            setSelectedStandardId(target.id);
            setSelectedStandard(target);
          } else if (res.data.length > 0) {
            setSelectedStandardId(res.data[0].id);
            setSelectedStandard(res.data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load standards for compliance check:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStandardsData();
  }, [queryStdId, queryIsNum]);

  const handleSelectStandard = (stdId) => {
    const std = standards.find(s => s.id === stdId);
    if (std) {
      setSelectedStandardId(std.id);
      setSelectedStandard(std);
    }
  };

  const certText = typeof selectedStandard?.certification === 'string'
    ? selectedStandard.certification
    : selectedStandard?.certificationRaw || selectedStandard?.certification?.statusText || 'Mandatory Quality Control Order (QCO)';

  const isMandatory = certText.toLowerCase().includes('compulsory') ||
                      certText.toLowerCase().includes('mandatory') ||
                      certText.toLowerCase().includes('qco') ||
                      certText.toLowerCase().includes('scheme-i');

  const filteredOptions = standards.filter(s => {
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    const isNum = (s.is_number || s.isNumber || '').toLowerCase();
    const title = (s.title || '').toLowerCase();
    return isNum.includes(q) || title.includes(q);
  });

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-primary border border-orange-200/80 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              QCO Verification
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              Gazette Orders Active
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Quality Control Order (QCO) Verification
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Verify whether products require compulsory BIS certification marks under central Ministry Quality Control Orders.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-400">print</span>
            <span>Print Compliance Note</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-6">
        {/* Standard Selector Bar */}
        <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <label className="text-xs font-semibold text-slate-700 block">
            Select Indian Standard for Regulatory Mandate Check:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 relative">
              <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                type="text"
                placeholder="Filter by IS number or product name..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white outline-none text-xs text-slate-900"
              />
            </div>
            <div className="md:col-span-4">
              <select
                value={selectedStandardId}
                onChange={(e) => handleSelectStandard(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-surface border border-slate-200 focus:border-primary outline-none font-code-sm text-xs text-slate-900 font-medium cursor-pointer"
              >
                {filteredOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.is_number || s.isNumber} — {s.title?.slice(0, 35)}...
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Standard Compliance Report */}
        {selectedStandard && (
          <div className="space-y-6">
            {/* Primary Panel */}
            <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-code-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs">
                      {selectedStandard.is_number || selectedStandard.isNumber}
                    </span>
                    {isMandatory ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>Mandatory Certification Enforced</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                        <span>Voluntary Adoption Recommended</span>
                      </span>
                    )}
                    <span className="font-code-sm text-slate-400 text-xs">
                      {selectedStandard.division || "BIS Technical Directorate"}
                    </span>
                  </div>

                  <h2 className="font-headline-sm font-bold text-slate-900 text-base">
                    {selectedStandard.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(`/standards/${selectedStandard.id}`)}
                  className="px-3.5 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] text-xs font-semibold inline-flex items-center gap-1 transition-all cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
                >
                  <span>Full Standard Spec</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>

              {/* 4-Up Micro-label Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Statutory Mandate
                  </span>
                  <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                    {isMandatory ? "Section 16, BIS Act 2016" : "Voluntary Standard"}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    {isMandatory ? "Legally enforceable" : "Standard guidance"}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Governing Ministry
                  </span>
                  <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                    DPIIT / Commerce Ministry
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Central Quality Order
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Conformity Scheme
                  </span>
                  <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                    Scheme-I (ISI Mark)
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Mandatory Standard Mark
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Enforcement Status
                  </span>
                  <span className="font-code-sm font-bold text-emerald-700 mt-1 block text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    In Full Force (2025)
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Non-compliance penal
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Matrix */}
            <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <SectionHeader
                microLabel="Procurement Verification Checklist"
                title="Tender Evaluation Checkpoints"
                subtitle="Verification items required during technical bid evaluation."
              />

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-900 block">
                      Valid BIS Standard Mark License (CM/L Number)
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      Bidder must submit a valid BIS License granted under Scheme-I of BIS Conformity Assessment Regulations.
                    </p>
                  </div>
                  <span className="font-code-sm font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 text-[11px]">
                    Mandatory
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-900 block">
                      Accredited Laboratory Test Certification
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      NABL or BIS recognized laboratory test reports demonstrating full clause compliance within past 180 days.
                    </p>
                  </div>
                  <span className="font-code-sm font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 text-[11px]">
                    Mandatory
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50/70 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-900 block">
                      GeM Golden Parameter Alignment
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      Offered specifications must match primary GeM category attributes and warranty conditions.
                    </p>
                  </div>
                  <span className="font-code-sm font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 shrink-0 text-[11px]">
                    GeM Rule
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gazette Notice Banner */}
        <AnnouncementBanner
          title="Central Quality Control Order Enforcement (Q1 2025)"
          badgeText="Statutory Rule"
          description="Failure to procure BIS-certified products where a mandatory QCO is enacted violates Section 16 of the BIS Act 2016 and General Financial Rules (GFR)."
          actionText="Browse QCO Gazette Library"
          actionTo="/standards"
        />
      </div>
    </div>
  );
}
