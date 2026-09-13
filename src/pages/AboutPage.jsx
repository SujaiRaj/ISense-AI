import React from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-14 font-sans text-[#102A43]">
      
      {/* 1. Hero Section */}
      <section className="bg-[#102A43] text-white rounded-xl p-8 sm:p-12 space-y-4 shadow-sm relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F766E]/30 text-teal-300 border border-[#0F766E]/50 rounded-full text-xs font-semibold">
          <span>Platform Overview</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          ISense AI — Indian Standards Intelligence
        </h1>

        <p className="text-base text-slate-300 max-w-3xl leading-relaxed font-normal">
          Assisting government procurement officers, public sector undertakings, and municipal bodies in mapping technical requirements directly to Bureau of Indian Standards (BIS) specifications and Quality Control Orders.
        </p>
      </section>

      {/* 2. How It Works Workflow Section */}
      <section className="space-y-6">
        <div className="border-b border-[#E2E8F0] pb-3">
          <h2 className="text-xl font-bold text-[#102A43]">
            How It Works
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            End-to-end intelligence workflow for procurement specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider block">Step 1</span>
            <h3 className="font-bold text-[#102A43] text-sm">Requirement Input</h3>
            <p className="text-[#475569] leading-relaxed">
              Procurement officer enters plain-text product specifications or tender parameters.
            </p>
          </div>

          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider block">Step 2</span>
            <h3 className="font-bold text-[#102A43] text-sm">AI Analysis</h3>
            <p className="text-[#475569] leading-relaxed">
              Extracts structured parameters including application context, ratings, and operating environment.
            </p>
          </div>

          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider block">Step 3</span>
            <h3 className="font-bold text-[#102A43] text-sm">Standards Selection</h3>
            <p className="text-[#475569] leading-relaxed">
              Shortlists and ranks candidate Indian Standards from the authoritative BIS knowledge base.
            </p>
          </div>

          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] space-y-2">
            <span className="text-[11px] font-bold text-[#0F766E] uppercase tracking-wider block">Step 4</span>
            <h3 className="font-bold text-[#0F766E] uppercase tracking-wider block">Compliance Check</h3>
            <p className="text-[#475569] leading-relaxed">
              Verifies mandatory Quality Control Orders (QCOs) and compulsory registration requirements.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Core Capabilities Section */}
      <section className="space-y-6">
        <div className="border-b border-[#E2E8F0] pb-3">
          <h2 className="text-xl font-bold text-[#102A43]">
            Core Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3">
            <div className="w-9 h-9 rounded bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center border border-[#CCFBF1]">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#102A43]">Standard Recommendation</h3>
            <p className="text-[#475569] leading-relaxed">
              Generates context-aware matches connecting tender requirements to official Bureau of Indian Standards codes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3">
            <div className="w-9 h-9 rounded bg-[#F1F5F9] text-[#102A43] flex items-center justify-center border border-[#E2E8F0]">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#102A43]">Document Analysis</h3>
            <p className="text-[#475569] leading-relaxed">
              Scans draft procurement tenders to flag missing technical clauses, omitted safety standards, or outdated IS references.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E2E8F0] space-y-3">
            <div className="w-9 h-9 rounded bg-[#FEF3C7] text-[#D97706] flex items-center justify-center border border-[#FDE68A]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#102A43]">Mandatory Compliance</h3>
            <p className="text-[#475569] leading-relaxed">
              Provides direct references to central ministry gazette notifications and compulsory ISI mark regulations.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Intelligence & Vision Section */}
      <section className="bg-white p-8 rounded-lg border border-[#E2E8F0] space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#102A43]">Intelligence Layer & Data Integrity</h2>
          <p className="text-xs text-[#475569] leading-relaxed">
            All recommendations generated by ISense AI are grounded strictly against candidate records from our authoritative BIS MVP dataset (`bis_mvp_standards.json`), ensuring zero hallucinated standard numbers or fabricated gazette orders.
          </p>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link to="/search" className="brand-btn-primary">
            <span>Start Analysis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/standards" className="text-[#102A43] font-bold hover:underline">
            Browse Indian Standards Catalogue →
          </Link>
        </div>
      </section>

    </div>
  );
}
