import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import SectionHeader from '../components/SectionHeader';
import { getStandardById } from '../services/standardsService';

export default function StandardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [standard, setStandard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await getStandardById(id);
        if (res && res.data) {
          setStandard(res.data);
        }
      } catch (err) {
        console.error("Error loading standard details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[350px]">
        <div className="flex items-center gap-2 font-code-sm text-slate-400 text-xs">
          <span className="w-4 h-4 border-2 border-orange-100 border-t-primary rounded-full animate-spin" />
          <span>Loading standard record...</span>
        </div>
      </div>
    );
  }

  if (!standard) {
    return (
      <div className="p-10 text-center space-y-3">
        <h2 className="text-base font-bold text-slate-900">Standard record not found</h2>
        <Link to="/standards" className="px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-[#C2410C] text-xs font-bold inline-block shadow-xs">
          Back to Standards Library
        </Link>
      </div>
    );
  }

  const isNum = standard.is_number || standard.isNumber || 'IS 10322';
  const bisUrl = standard.source_url || standard.sourceUrl;
  const certText = typeof standard.certification === 'string' 
    ? standard.certification 
    : standard.certificationRaw || standard.certification?.statusText || "Mandatory Quality Control Order (QCO)";

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-primary text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span>Back to Library</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              Record ID: {standard.id}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {isNum}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            {standard.title}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          {bisUrl && (
            <a
              href={bisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <span className="material-symbols-outlined text-[15px] text-slate-400">open_in_new</span>
              <span>BIS Official Portal</span>
            </a>
          )}
          <button
            onClick={() => navigate(`/compliance?is=${encodeURIComponent(isNum)}`)}
            className="px-3.5 py-1.5 rounded-lg bg-primary text-white hover:bg-[#C2410C] text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[15px]">policy</span>
            <span>Verify QCO Order</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-6">
        {/* Overview Bento Card */}
        <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-code-sm font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-xs">
              {isNum}
            </span>
            <StatusBadge status={standard.status || "Current"} />
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span>{certText}</span>
            </span>
          </div>

          {/* 4-Up Attribute Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Technical Division
              </span>
              <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                {standard.division || "Division ETD 13"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {standard.department || "Electrotechnical Bureau"}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Product Category
              </span>
              <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                {standard.category || "Illumination & Lighting"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Public Infrastructure
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Conformity Scheme
              </span>
              <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                Scheme-I Mandatory (ISI)
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Compulsory certification
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Gazette Year
              </span>
              <span className="font-code-sm font-bold text-slate-900 mt-1 block text-xs">
                {standard.publicationDate || standard.year || "2012 (Reaffirmed)"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Active Legal Enforcement
              </span>
            </div>
          </div>
        </div>

        {/* Scope and Technical Objectives */}
        <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2">
          <SectionHeader
            microLabel="Scope"
            title="Technical Scope & Regulatory Application"
          />
          <p className="font-body-sm text-slate-600 leading-relaxed text-xs">
            {standard.scope || standard.description || "Covers constructional, electrical, mechanical, photometric, and endurance safety specifications for equipment designed for public and municipal infrastructure procurement."}
          </p>
        </div>

        {/* Parameters & Clauses Table */}
        {standard.parameters && standard.parameters.length > 0 && (
          <div className="rounded-xl bg-white border border-slate-200/90 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <SectionHeader
                microLabel="Clauses"
                title="Mandatory Specification Clauses & Test Methods"
                subtitle="Auditable technical specifications required during tender evaluation."
                className="pb-0"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/70">
                    <th className="py-2.5 px-4">Clause / ID</th>
                    <th className="py-2.5 px-4">Parameter Name</th>
                    <th className="py-2.5 px-4">Specified Requirement</th>
                    <th className="py-2.5 px-4">Verification Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {standard.parameters.map((param, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-4 font-code-sm font-bold text-slate-800">
                        {param.clause || `Cl. ${idx + 1}.2`}
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-slate-900">
                        {param.name || param.key}
                      </td>
                      <td className="py-2.5 px-4 font-code-sm text-slate-700">
                        {param.value || param.requirement}
                      </td>
                      <td className="py-2.5 px-4 text-slate-500">
                        {param.testMethod || "Laboratory Certified"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Allied Standards */}
        {standard.relatedStandards && standard.relatedStandards.length > 0 && (
          <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-2">
            <SectionHeader
              microLabel="Related Codes"
              title="Allied &amp; Cross-Referenced Indian Standards"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {standard.relatedStandards.map((item, idx) => (
                <span
                  key={idx}
                  className="font-code-sm bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold border border-slate-200"
                >
                  {typeof item === 'string' ? item : item.code || item.isNumber}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
