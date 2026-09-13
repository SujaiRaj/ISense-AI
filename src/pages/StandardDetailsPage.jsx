import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
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
      <div className="flex items-center justify-center min-h-[300px] text-xs text-[#64748B]">
        Loading standard details...
      </div>
    );
  }

  if (!standard) return null;

  const isNum = standard.is_number || standard.isNumber;
  const bisUrl = standard.source_url || standard.sourceUrl;
  const certText = typeof standard.certification === 'string' 
    ? standard.certification 
    : standard.certificationRaw || standard.certification?.statusText || "BIS Standard Certification";

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans text-[#0B1F33]">
      {/* Navigation */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-[#64748B] hover:text-[#0B1F33] inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalogue</span>
        </button>

        <span className="text-xs font-mono text-[#64748B]">
          Standard ID: {standard.id}
        </span>
      </div>

      {/* Main Standard Title Block */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#E2E8F0] space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-mono font-bold text-sm bg-[#F1F5F9] text-[#0B1F33] px-3 py-1 rounded border border-[#E2E8F0]">
            {isNum}
          </span>
          <StatusBadge status={standard.status || "Current"} />
          <span className="text-xs font-semibold text-[#475569]">
            Category: {standard.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1F33] leading-snug">
          {standard.title}
        </h1>

        <p className="text-xs text-[#64748B]">
          Product: <strong className="text-[#0B1F33]">{standard.product || standard.productCategory}</strong> • Version: <strong className="text-[#0B1F33]">{standard.latest_version || standard.publicationYear || "2024"}</strong>
        </p>
      </div>

      {/* Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column: Overview, Technical Requirements & Allied Standards */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Scope & Overview */}
          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 shadow-2xs">
            <h2 className="text-sm font-bold text-[#0B1F33] uppercase tracking-wider">
              Overview & Scope
            </h2>
            <p className="text-sm text-[#334155] leading-relaxed">
              {standard.scope || standard.explanation}
            </p>
          </div>

          {/* Key Requirements / Prescribed Standards */}
          {standard.keyRequirements && standard.keyRequirements.length > 0 && (
            <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 shadow-2xs">
              <h2 className="text-sm font-bold text-[#0B1F33] uppercase tracking-wider">
                Technical Specifications & Benchmarks
              </h2>
              <ul className="space-y-2 text-xs text-[#334155]">
                {standard.keyRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related / Allied Standards */}
          {standard.related_standards && standard.related_standards.length > 0 && (
            <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 shadow-2xs">
              <h2 className="text-sm font-bold text-[#0B1F33] uppercase tracking-wider">
                Referred Indian Standards
              </h2>
              <div className="space-y-2 text-xs">
                {standard.related_standards.map((rel, idx) => (
                  <div key={idx} className="p-3 bg-[#F8FAFC] rounded border border-[#E2E8F0]">
                    <span className="font-mono font-bold text-[#0B1F33] block mb-0.5">
                      {rel.is_number || rel.isNumber}
                    </span>
                    <span className="text-[#475569]">{rel.title || rel.relationship}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Certification, QCO & Source Links */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Certification Card */}
          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 shadow-2xs">
            <h2 className="text-xs font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Compliance</span>
            </h2>
            <p className="text-xs text-[#334155] leading-relaxed">
              {certText}
            </p>
            {standard.source_notes && (
              <div className="pt-2 border-t border-[#E2E8F0] text-[11px] text-[#64748B]">
                <strong>Source Reference:</strong> {standard.source_notes}
              </div>
            )}
          </div>

          {/* Official Source Link Card */}
          {bisUrl && (
            <div className="bg-[#F8FAFC] p-6 rounded-lg border border-[#E2E8F0] space-y-3">
              <h3 className="text-xs font-bold text-[#0B1F33] uppercase tracking-wider">
                Official Government Publication
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Access official gazette document or product manual on Bureau of Indian Standards portal.
              </p>
              <a
                href={bisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2.5 bg-[#0B1F33] hover:bg-[#1E3A8A] text-white text-xs font-semibold rounded inline-flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Official BIS Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
