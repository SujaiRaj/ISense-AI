import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Search, FileText, ShieldCheck, ChevronRight } from 'lucide-react';
import SearchInput from '../components/SearchInput';
import { getRecommendations } from '../services/recommendationService';

export default function DashboardPage({ setGlobalResults, setToast }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await getRecommendations(q);
      if (res && res.data) {
        setGlobalResults(res.data);
        if (setToast) {
          setToast({
            message: `${res.data.recommendations?.length || 3} relevant Indian Standards identified.`,
            type: "success"
          });
        }
        navigate('/recommendations');
      }
    } catch (err) {
      console.error(err);
      if (setToast) {
        setToast({
          message: "We couldn't analyze this requirement right now. Please try again.",
          type: "error"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToAnalysis = () => {
    const el = document.getElementById('analysis-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 font-sans text-[#102A43]">
      
      {/* 1. Clean Human-Designed Website Hero Section */}
      <section className="bg-[#102A43] text-white rounded-xl p-8 sm:p-12 shadow-sm space-y-6">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Indian Standards Procurement Intelligence
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Map procurement requirements directly to Bureau of Indian Standards (BIS) specifications, extract technical parameters, and verify mandatory Quality Control Orders.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={scrollToAnalysis}
              className="px-6 py-3 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold rounded transition-colors inline-flex items-center gap-2"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <Link
              to="/standards"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold rounded transition-colors inline-flex items-center gap-2"
            >
              <span>Browse Standards</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Central Analysis Workspace */}
      <section id="analysis-section" className="space-y-4 scroll-mt-20">
        <div>
          <h2 className="text-2xl font-bold text-[#102A43]">
            Find Applicable Indian Standards
          </h2>
          <p className="text-xs text-[#475569] mt-0.5">
            Describe your product, service or procurement requirement and identify the relevant Indian Standards.
          </p>
        </div>

        <SearchInput
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          onSelectPreset={(presetQuery) => {
            setQuery(presetQuery);
            handleSearch(presetQuery);
          }}
          loading={loading}
        />
      </section>

      {/* 3. Product Feature Blocks */}
      <section className="space-y-6 pt-4 border-t border-[#E2E8F0]">
        <div>
          <h2 className="text-xl font-bold text-[#102A43]">
            Core Capabilities
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Designed for engineers, buyers, and public sector procurement professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 hover:border-[#0F766E] transition-all shadow-2xs">
            <div className="w-10 h-10 rounded bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center border border-[#CCFBF1]">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">
              Standard Recommendation
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Translates natural language specifications into candidate Bureau of Indian Standards documents based on technical parameters and application context.
            </p>
            <Link to="/search" className="text-xs font-bold text-[#0F766E] hover:underline inline-flex items-center gap-1 pt-1">
              <span>Start Standard Search</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 hover:border-[#102A43] transition-all shadow-2xs">
            <div className="w-10 h-10 rounded bg-[#F1F5F9] text-[#102A43] flex items-center justify-center border border-[#E2E8F0]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">
              Tender Specification Analysis
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Audits draft tender specification documents against official standards to identify missing mandatory clauses or omitted quality requirements.
            </p>
            <Link to="/tender-analysis" className="text-xs font-bold text-[#102A43] hover:underline inline-flex items-center gap-1 pt-1">
              <span>Review Tender Document</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3 hover:border-[#D97706] transition-all shadow-2xs">
            <div className="w-10 h-10 rounded bg-[#FEF3C7] text-[#D97706] flex items-center justify-center border border-[#FDE68A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#102A43]">
              Compliance Verification
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Verifies mandatory Quality Control Orders (QCOs) and compulsory registration schemes enforced across central government ministries.
            </p>
            <Link to="/compliance" className="text-xs font-bold text-[#D97706] hover:underline inline-flex items-center gap-1 pt-1">
              <span>Check Mandatory QCOs</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Catalogue Banner */}
      <section className="bg-[#102A43] text-white rounded-lg p-8 space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 max-w-2xl">
          <h3 className="text-lg font-bold text-white">
            Explore the Indian Standards Library
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Search and browse curated specifications across Lighting, Safety, Civil Construction, Electrical Cables, and Municipal Infrastructure.
          </p>
        </div>

        <Link
          to="/standards"
          className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold rounded inline-flex items-center gap-2 transition-colors shrink-0"
        >
          <span>Open Catalogue</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
