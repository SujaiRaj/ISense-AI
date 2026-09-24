import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import SectionHeader from '../components/SectionHeader';
import { MOCK_RECOMMENDATION_DATA } from '../data/mockRecommendations';
import { useLanguage } from '../context/LanguageContext';

export default function RecommendationResultsPage({ globalResults }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Fallback to default demo dataset if none selected yet
  const activeData = globalResults || MOCK_RECOMMENDATION_DATA["90W outdoor LED street light for municipal roads"] || {
    query: "90W outdoor LED street light for municipal roads",
    categoryIdentified: "Lighting & Illumination",
    extractedRequirements: [
      { key: "Wattage", value: "90W" },
      { key: "Environment", value: "Outdoor Roadway" },
      { key: "Ingress", value: "IP66" },
      { key: "Surge Protection", value: "10kV" }
    ],
    recommendations: []
  };

  const {
    query = "90W outdoor LED street light for municipal roads",
    categoryIdentified = "Lighting & Illumination",
    extractedRequirements = [],
    recommendations = [],
    message
  } = activeData;

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <button
              onClick={() => navigate('/search')}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
              <span>{t('rec.back_search', 'New Search')}</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              {t('rec.conformity_report', 'BIS Standard Conformity Report')}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t('rec.title', 'Specification Match Report')}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            {t('rec.subtitle', 'Candidate Indian Standards matched to procurement parameters and verified against active QCO mandates.')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-400">print</span>
            <span>{t('rec.print_btn', 'Print Report')}</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-10">
        {/* Asymmetrical 2-Column Layout: Left Parameter Inspector + Right Match Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Rail: Query & Parameter Inspector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl bg-white p-5 border border-slate-200/90 shadow-2xs space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  {t('rec.eval_req', 'Evaluated Requirement')}
                </span>
                <blockquote className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-medium text-xs leading-relaxed">
                  "{query}"
                </blockquote>
              </div>

              {categoryIdentified && (
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    {t('rec.prod_cat', 'Product Category')}
                  </span>
                  <span className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
                    {categoryIdentified}
                  </span>
                </div>
              )}

              {extractedRequirements.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    {t('rec.extracted_params', 'Extracted Parameters')} ({extractedRequirements.length})
                  </span>
                  <div className="space-y-1.5">
                    {extractedRequirements.map((req, idx) => (
                      <div
                        key={idx}
                        className="py-1.5 px-2.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-500 font-medium">
                          {req.key || req.label}
                        </span>
                        <span className="font-code-sm font-semibold text-slate-800">
                          {req.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Regulatory Notice Snippet */}
            <div className="rounded-xl bg-orange-50/80 p-4 border border-orange-200/80 text-xs space-y-1">
              <span className="font-bold text-primary block">
                {t('rec.rule_title', 'Statutory Procurement Rule')}
              </span>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                {t('rec.rule_desc', 'Under Section 16 of the BIS Act, items listed with mandatory QCOs cannot be manufactured, imported, or procured on GeM without a valid BIS standard mark.')}
              </p>
            </div>
          </div>

          {/* Right Stream: Ranked Recommendations (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <SectionHeader
              microLabel={t('rec.ranked_specs', 'Ranked Specifications')}
              title={`${t('rec.candidate_stds', 'Candidate Indian Standards')} (${recommendations.length})`}
              subtitle={t('rec.ordered_by', 'Ordered by technical parameter correspondence.')}
              actions={
                <span className="text-xs text-slate-400 font-code-sm">
                  Active BIS Gazette
                </span>
              }
            />

            {message && (
              <div className="p-3.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
                {message}
              </div>
            )}

            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, idx) => (
                  <RecommendationCard key={rec.id || idx} recommendation={rec} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-8 border border-slate-200 text-center space-y-3">
                <p className="text-xs text-slate-500">No matching Indian Standards found for this requirement.</p>
                <Link to="/search" className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] text-xs font-bold inline-block shadow-sm">
                  Try another requirement
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
