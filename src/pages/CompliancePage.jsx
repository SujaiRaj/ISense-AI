import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getStandardsList } from '../services/standardsService';

export default function CompliancePage() {
  const [searchParams] = useSearchParams();
  const queryStdId = searchParams.get('id');
  const queryIsNum = searchParams.get('is') || searchParams.get('search');

  const [standards, setStandards] = useState([]);
  const [selectedStandardId, setSelectedStandardId] = useState('');
  const [selectedStandard, setSelectedStandard] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

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

  const handleCheckCompliance = (stdId) => {
    const targetId = stdId || selectedStandardId;
    setChecking(true);
    setTimeout(() => {
      const std = standards.find(s => s.id === targetId);
      if (std) {
        setSelectedStandardId(std.id);
        setSelectedStandard(std);
      }
      setChecking(false);
    }, 300);
  };

  const filteredOptions = standards.filter(s => {
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    const isNum = (s.is_number || s.isNumber || '').toLowerCase();
    const title = (s.title || '').toLowerCase();
    const product = (s.product || s.productCategory || '').toLowerCase();
    return isNum.includes(q) || title.includes(q) || product.includes(q);
  });

  const certText = typeof selectedStandard?.certification === 'string'
    ? selectedStandard.certification
    : selectedStandard?.certificationRaw || selectedStandard?.certification?.statusText || '';
  
  const isMandatory = certText.toLowerCase().includes('compulsory') || 
                      certText.toLowerCase().includes('mandatory') || 
                      certText.toLowerCase().includes('qco') || 
                      certText.toLowerCase().includes('scheme-i') ||
                      certText.toLowerCase().includes('quality control');

  const isNotVerified = !certText || certText.toLowerCase().includes('not specified') || certText.toLowerCase().includes('none');

  return (
    <div className="space-y-8 font-sans text-[#0F172A]">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <h1 className="text-2xl font-bold text-[#0F172A]">
          Mandatory Compliance Check
        </h1>
        <p className="text-xs text-[#64748B]">
          Check applicable QCOs and mandatory BIS certification requirements for recommended standards.
        </p>
      </div>

      {/* Select Standard Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-4 relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter standard by IS number or product..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-[#E2E8F0] rounded focus:border-[#0F172A] outline-none text-[#0F172A]"
            />
          </div>

          <div className="sm:col-span-5">
            <select
              value={selectedStandardId}
              onChange={(e) => {
                setSelectedStandardId(e.target.value);
                handleCheckCompliance(e.target.value);
              }}
              className="w-full py-2 px-3 bg-white border border-[#E2E8F0] rounded focus:border-[#0F172A] outline-none text-[#0F172A] font-mono"
            >
              {filteredOptions.map(std => (
                <option key={std.id} value={std.id}>
                  {std.is_number || std.isNumber} — {std.product || std.productCategory}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              onClick={() => handleCheckCompliance()}
              disabled={checking}
              className="w-full h-9 bg-[#0F172A] hover:bg-[#1E3A8A] text-white rounded text-xs font-semibold transition-colors flex items-center justify-center disabled:opacity-50"
            >
              {checking ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Checking...</span>
                </span>
              ) : (
                <span>Check Compliance</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Results */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#64748B]">
          Loading compliance data...
        </div>
      ) : selectedStandard ? (
        <div className="space-y-6 pt-2">
          
          <div className="border border-[#E2E8F0] bg-white rounded p-6 space-y-6 text-xs">
            
            {/* Overview */}
            <div className="border-b border-[#E2E8F0] pb-4 space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#0F172A]">
                  {selectedStandard.is_number || selectedStandard.isNumber}
                </span>
                <span className="text-xs text-[#64748B]">
                  Status: <strong>{selectedStandard.status || "Current"}</strong>
                </span>
              </div>

              <h2 className="text-base font-bold text-[#0F172A]">
                {selectedStandard.title}
              </h2>
              <p className="text-[#64748B]">
                Product: <strong className="text-[#0F172A]">{selectedStandard.product || selectedStandard.productCategory}</strong>
              </p>
            </div>

            {/* Compliance Status Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
              <div className="space-y-1">
                <span className="font-bold text-[#0F172A] block uppercase tracking-wider text-[11px]">
                  Compliance Status
                </span>
                <p className="text-[#334155]">
                  {isNotVerified 
                    ? "Not verified in the current MVP dataset" 
                    : isMandatory 
                    ? "Mandatory Certification Required (Quality Control Order Enforced)" 
                    : "Certified under Bureau of Indian Standards Scheme"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#0F172A] block uppercase tracking-wider text-[11px]">
                  Certification & QCO Framework
                </span>
                <p className="text-[#334155]">
                  {!isNotVerified ? certText : "Compliance details not specified in current dataset."}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#0F172A] block uppercase tracking-wider text-[11px]">
                  Government Order / Source
                </span>
                <p className="text-[#334155]">
                  {selectedStandard.source_notes || selectedStandard.source || "Bureau of Indian Standards"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#0F172A] block uppercase tracking-wider text-[11px]">
                  Effective Edition / Version
                </span>
                <p className="text-[#334155]">
                  {selectedStandard.latest_version || selectedStandard.publicationYear || "2024"} Edition
                </p>
              </div>
            </div>

            {/* Action URL */}
            {selectedStandard.source_url && (
              <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
                <a
                  href={selectedStandard.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white font-semibold rounded text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <span>View Official Source</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>

          {/* Empty / Not Verified Footnote Notice */}
          {isNotVerified && (
            <div className="p-4 bg-[#F8FAFC] rounded border border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
              <p className="font-semibold text-[#0F172A]">Notice:</p>
              <p>Compliance information is not available for this standard in the current MVP knowledge base.</p>
              <p className="italic">Future versions will expand coverage across additional standards and government orders.</p>
            </div>
          )}

        </div>
      ) : null}
    </div>
  );
}
