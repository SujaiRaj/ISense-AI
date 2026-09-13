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
  ShieldCheck,
  BookOpen,
  TestTube
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import ComplianceBadge from '../components/ComplianceBadge';
import { getStandardById } from '../services/standardsService';

export default function StandardDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [standard, setStandard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

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
        <div className="flex items-center gap-2 text-xs font-mono text-[#61707D]">
          <div className="w-4 h-4 border-2 border-[#12304A] border-t-transparent rounded-full animate-spin" />
          <span>Loading Technical Standard Details...</span>
        </div>
      </div>
    );
  }

  if (!standard) return null;

  return (
    <div className="space-y-5 max-w-5xl mx-auto font-sans">
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inst-btn-secondary py-1.5 px-3 text-xs font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Previous View</span>
        </button>

        <span className="text-xs font-mono text-[#61707D]">
          IS Technical Reference Code: {standard.isNumber}
        </span>
      </div>

      {/* Main Technical Standard Header & Metadata Block */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono font-bold text-sm bg-[#12304A] text-white px-3 py-0.5 rounded-[3px] border border-[#28536F]">
            {standard.isNumber}
          </span>
          <StatusBadge status={standard.status} />
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-[3px] bg-[#F4F6F8] text-[#12304A] border border-[#E3E8ED]">
            Category: {standard.category}
          </span>
        </div>

        <h1 className="text-xl font-bold text-[#0B1F33] leading-snug">
          {standard.title}
        </h1>

        {/* Specification Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E3E8ED] text-xs font-mono">
          <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
            <div className="text-[10px] text-[#61707D] uppercase font-bold">Edition / Revision</div>
            <div className="font-bold text-[#0B1F33] mt-0.5">{standard.publicationYear} Edition</div>
          </div>
          <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
            <div className="text-[10px] text-[#61707D] uppercase font-bold">Product Domain</div>
            <div className="font-bold text-[#0B1F33] truncate mt-0.5">{standard.productCategory}</div>
          </div>
          <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
            <div className="text-[10px] text-[#61707D] uppercase font-bold">Technical Committee</div>
            <div className="font-bold text-[#0B1F33] mt-0.5">ETD 23 (Lamps & Lighting)</div>
          </div>
          <div className="bg-[#F4F6F8] p-2.5 rounded-[3px] border border-[#E3E8ED]">
            <div className="text-[10px] text-[#61707D] uppercase font-bold">Last Verified</div>
            <div className="font-bold text-[#0B1F33] mt-0.5">{standard.source?.lastVerified || "September 2026"}</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#E3E8ED] flex items-center gap-2 text-xs font-mono bg-white p-1 rounded-[4px] border shadow-2xs">
        {[
          { id: 'overview', label: 'Scope & Overview', icon: BookOpen },
          { id: 'requirements', label: 'Technical Parameters', icon: TestTube },
          { id: 'compliance', label: 'QCO & Compliance', icon: ShieldCheck },
          { id: 'references', label: 'Normative References', icon: Layers }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-[3px] font-bold transition-colors ${
                isActive 
                  ? 'bg-[#12304A] text-white' 
                  : 'text-[#61707D] hover:bg-[#F4F6F8] hover:text-[#0B1F33]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Scope & Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-3 shadow-2xs">
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#28536F]" />
              Scope & Specification Objective
            </h3>
            <p className="text-xs sm:text-sm text-[#17212B] leading-relaxed bg-[#F4F6F8] p-4 rounded-[3px] border border-[#E3E8ED]">
              {standard.scope}
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Technical Parameters */}
      {activeTab === 'requirements' && (
        <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-3 shadow-2xs">
          <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Prescribed Technical & Testing Requirements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {standard.keyRequirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-[3px] bg-[#F4F6F8] border border-[#E3E8ED] text-[#17212B]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: QCO & Compliance */}
      {activeTab === 'compliance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-3 shadow-2xs">
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Mandatory Quality Control Order (QCO)
            </h3>

            <div className="p-3.5 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-2 text-xs font-mono">
              <ComplianceBadge 
                type={standard.certification?.isMandatory ? "REQUIRED" : "RECOMMENDED"} 
                label={standard.certification?.statusText}
              />
              <div className="text-[#17212B] pt-2 space-y-1.5">
                <p><strong className="text-[#0B1F33]">BIS Certification Scheme:</strong> {standard.certification?.bisScheme || "Scheme-I (ISI Mark)"}</p>
                {standard.certification?.qcoName && (
                  <p><strong className="text-[#0B1F33]">Gazette Notification:</strong> {standard.certification.qcoName}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] flex flex-col justify-between space-y-3 shadow-2xs">
            <div>
              <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#28536F]" />
                Official Publication Access
              </h3>
              <p className="text-xs text-[#61707D] mt-2 leading-relaxed">
                Official Indian Standard specification publication record hosted on Bureau of Indian Standards (BIS) Manakonline Portal.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert("BIS Portal Link: Accessing official BIS Manakonline PDF repository.")}
              className="inst-btn-primary w-full py-2 text-xs font-mono"
            >
              <span>View Official Publication (BIS Portal)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Normative References */}
      {activeTab === 'references' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Related Standards */}
          <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-3 shadow-2xs">
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#28536F]" />
              Normative References ({standard.relatedStandards?.length || 0})
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {standard.relatedStandards && standard.relatedStandards.length > 0 ? (
                standard.relatedStandards.map((rel, idx) => (
                  <div key={idx} className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED]">
                    <div className="flex items-center justify-between font-bold text-[#0B1F33] mb-0.5">
                      <span>{rel.isNumber}</span>
                      <span className="text-[10px] bg-[#E3E8ED] text-[#12304A] px-1.5 py-0.5 rounded font-mono font-semibold">
                        {rel.relation}
                      </span>
                    </div>
                    <p className="text-[#61707D] truncate mt-1">{rel.title}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#61707D] italic">No related standards linked.</p>
              )}
            </div>
          </div>

          {/* Version History */}
          <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-3 shadow-2xs">
            <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4 text-[#28536F]" />
              Revision History
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {standard.versionHistory && standard.versionHistory.length > 0 ? (
                standard.versionHistory.map((ver, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded border border-[#E3E8ED] bg-[#F4F6F8]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B1F33]">
                        {ver.year} Edition
                      </span>
                      <StatusBadge status={ver.status} />
                    </div>
                    <span className="text-[#61707D] text-[11px]">{ver.notes}</span>
                  </div>
                ))
              ) : (
                <div className="p-2.5 bg-[#F4F6F8] rounded border border-[#E3E8ED] text-xs text-[#17212B]">
                  Current Version: <strong className="font-bold text-[#0B1F33]">{standard.publicationYear}</strong> (Active Standard)
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
