import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  History, 
  FileText,
  AlertCircle,
  Layers,
  ShieldCheck
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ComplianceBadge from '../components/ComplianceBadge';
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <div className="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin" />
          Loading Standard Details...
        </div>
      </div>
    );
  }

  if (!standard) return null;

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-800 transition-colors bg-white px-3 py-1.5 rounded border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Results</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Standard Record ID: {standard.id}
        </span>
      </div>

      {/* Main Standard Header & Metadata Grid */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono font-semibold text-base text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
            {standard.isNumber}
          </span>
          <StatusBadge status={standard.status} />
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            Category: {standard.category}
          </span>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 leading-snug">
          {standard.title}
        </h1>

        {/* Specification Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Edition / Revision</div>
            <div className="font-medium text-slate-900">{standard.publicationYear} Edition</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Product Domain</div>
            <div className="font-medium text-slate-900 truncate">{standard.productCategory}</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Technical Committee</div>
            <div className="font-medium text-slate-900">ETD 23 (Lamps & Lighting)</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-medium">Last Verified</div>
            <div className="font-medium text-slate-900">{standard.source?.lastVerified || "August 2026"}</div>
          </div>
        </div>
      </div>

      {/* 1. Scope & Objective */}
      <div className="bg-white rounded-md p-5 border border-slate-200 space-y-2">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-slate-600" />
          Scope & Specification Objective
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50 p-3.5 rounded border border-slate-200/80">
          {standard.scope}
        </p>
      </div>

      {/* 2. Key Technical & Testing Requirements */}
      <div className="bg-white rounded-md p-5 border border-slate-200 space-y-3">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          Technical & Testing Requirements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {standard.keyRequirements.map((req, idx) => (
            <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-slate-50 border border-slate-200/80 text-slate-800 font-normal">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mandatory Certification & Source */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Certification Card */}
        <div className="bg-white rounded-md p-5 border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            Mandatory Certification & QCO Status
          </h3>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-2 text-xs">
            <ComplianceBadge 
              type={standard.certification?.isMandatory ? "REQUIRED" : "RECOMMENDED"} 
              label={standard.certification?.statusText}
            />
            <div className="text-slate-700 pt-1 font-normal space-y-1">
              <p><strong className="font-medium text-slate-900">BIS Scheme:</strong> {standard.certification?.bisScheme || "Scheme-I (ISI Mark)"}</p>
              {standard.certification?.qcoName && (
                <p><strong className="font-medium text-slate-900">Governing QCO:</strong> {standard.certification.qcoName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Source Link */}
        <div className="bg-white rounded-md p-5 border border-slate-200 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-slate-600" />
              Official Publication Link
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-normal">
              Official Indian Standard publication record hosted on Bureau of Indian Standards (BIS) Manakonline Portal.
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert("BIS Portal Link: Navigating to official BIS Manakonline PDF repository.")}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Official Publication (BIS Portal)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Related Standards & Version History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Related Standards */}
        <div className="bg-white rounded-md p-5 border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-600" />
            Related Standards ({standard.relatedStandards?.length || 0})
          </h3>

          <div className="space-y-2">
            {standard.relatedStandards && standard.relatedStandards.length > 0 ? (
              standard.relatedStandards.map((rel, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-mono font-semibold text-slate-900 mb-0.5">
                    <span>{rel.isNumber}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-sans font-medium">
                      {rel.relation}
                    </span>
                  </div>
                  <p className="text-slate-700 font-normal line-clamp-1">{rel.title}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No related standards linked.</p>
            )}
          </div>
        </div>

        {/* Version History */}
        <div className="bg-white rounded-md p-5 border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <History className="w-4 h-4 text-slate-600" />
            Version History
          </h3>

          <div className="space-y-2">
            {standard.versionHistory && standard.versionHistory.length > 0 ? (
              standard.versionHistory.map((ver, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold font-mono text-slate-900">
                      Edition {ver.year}
                    </span>
                    <StatusBadge status={ver.status} />
                  </div>
                  <span className="text-slate-600 font-normal text-[11px]">{ver.notes}</span>
                </div>
              ))
            ) : (
              <div className="p-2 bg-slate-50 rounded text-xs text-slate-700">
                Current Version: <strong className="font-semibold">{standard.publicationYear}</strong> (Active Standard)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

