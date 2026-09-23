import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import WorkflowCard from '../components/WorkflowCard';
import ActivityFeedItem from '../components/ActivityFeedItem';
import AnnouncementBanner from '../components/AnnouncementBanner';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Top Header Command Ribbon */}
      <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              BIS Catalog v2025.2
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-code-sm">
              Updated Today 08:30 IST
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Procurement Standards &amp; QCO Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            BIS specification mapping, active QCO enforcement status, and tender compliance checks.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px] text-slate-400">download</span>
            <span>Export Audit</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/tender-analysis')}
            className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-[#C2410C] text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Tender Review</span>
          </button>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-6">
        {/* Asymmetrical Bento Stat Grid (Featured Wide Metric + 2 Secondary) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <StatCard
              icon="library_books"
              title="Active Standards Catalog"
              value="12,486"
              unit="codes"
              badge="+12.4% YoY"
              trendIcon="trending_up"
              badgeColor="bg-orange-100/80 text-primary border border-orange-200/60 font-bold"
              description="Specifications indexed across 14 BIS technical divisions, covering all active Gazette notifications through Q1 2025."
              footerText="Divisions CED, ETD, MTD, TXD"
              onClick={() => navigate('/standards')}
              className="h-full flex flex-col justify-between"
            />
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon="auto_awesome"
              title="Specifications Matched"
              value="3,842"
              unit="queries"
              badge="+18.2%"
              trendIcon="trending_up"
              badgeColor="bg-amber-100 text-amber-800 border border-amber-200/80 font-bold"
              description="Automated specification crosswalks generated for municipal and central procurement requisitions."
              footerText="Avg latency: 1.4s"
              onClick={() => navigate('/search')}
            />
            <StatCard
              icon="fact_check"
              title="Tenders Audited"
              value="1,264"
              unit="BOQs"
              badge="98.6% match"
              badgeColor="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold"
              description="Public RFPs vetted with clause mapping against mandatory Quality Control Orders."
              footerText="Zero critical discrepancies"
              onClick={() => navigate('/tender-analysis')}
            />
          </div>
        </div>

        {/* Quick Tools Grid (4-up with pastel icon badges matching reference) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                Direct Auditor Workflows
              </span>
            </div>
            <span className="text-xs text-slate-400 font-code-sm">
              Press ⌘1 to ⌘4 for rapid launch
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <WorkflowCard
              to="/search"
              icon="manage_search"
              title="Find a Standard"
              description="Search Indian Standards using AI natural language requirement matching & code crosswalks."
              actionText="Query Corpus"
              iconBg="bg-orange-100 text-primary border-orange-200"
            />
            <WorkflowCard
              to="/tender-analysis"
              icon="fact_check"
              title="Analyze Tender"
              description="Upload procurement RFP or BOQ to identify missing mandatory specifications."
              actionText="Ingest Document"
              iconBg="bg-slate-100 text-secondary border-slate-200"
            />
            <WorkflowCard
              to="/compliance"
              icon="policy"
              title="Check Compliance"
              description="Verify mandatory BIS certification rules & active gazette Quality Control Orders (QCOs)."
              actionText="Verify Order"
              iconBg="bg-amber-100 text-amber-800 border-amber-200"
            />
            <WorkflowCard
              to="/standards"
              icon="library_books"
              title="Browse Library"
              description="Explore 12,000+ indexed standards with revision logs, withdrawn notices & draft revisions."
              actionText="Access Repository"
              iconBg="bg-emerald-100 text-emerald-800 border-emerald-200"
            />
          </div>
        </div>

        {/* Analytics Center (Split Grid with Asymmetrical Rhythm & Denser Rows) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left: Category Distribution (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  National Distribution
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5">
                  Standards by Product Category
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[11px]">
                  Relative Share
                </span>
              </div>
            </div>

            {/* Donut Chart (Navy, Orange, Amber, Slate, Gold) & Precision Horizontal Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4">
              <div className="sm:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#F4F1EA" strokeWidth="12" />
                    {/* Electrical: 27.4% -> Deep Sovereign Navy (#0F172A) */}
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#0F172A" strokeDasharray="65.4 238.8" strokeDashoffset="0" strokeWidth="12" />
                    {/* Civil: 23.1% -> Warm Saffron Primary (#E05A1B) */}
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#E05A1B" strokeDasharray="55.1 238.8" strokeDashoffset="-65.4" strokeWidth="12" />
                    {/* Mechanical: 14.8% -> Warm Golden Amber (#F59E0B) */}
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#F59E0B" strokeDasharray="35.3 238.8" strokeDashoffset="-120.5" strokeWidth="12" />
                    {/* PPE: 13.1% -> Slate 700 (#334155) */}
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#334155" strokeDasharray="31.3 238.8" strokeDashoffset="-155.8" strokeWidth="12" />
                    {/* IT/Telecom: 11.4% -> Orange 400 (#FB923C) */}
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#FB923C" strokeDasharray="27.2 238.8" strokeDashoffset="-187.1" strokeWidth="12" />
                    {/* Chem/Textiles: 10.2% -> Stone 400 (#A8A29E) */}
                    <circle cx="50" cy="50" fill="transparent" r="38" stroke="#A8A29E" strokeDasharray="24.5 238.8" strokeDashoffset="-214.3" strokeWidth="12" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-base font-bold text-slate-900 leading-none">
                      12,486
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Total Codes</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 mt-2 font-code-sm flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px] text-primary">donut_large</span>
                  <span>Calibrated to Gazette 2025</span>
                </span>
              </div>

              {/* Multi-Color Data Rows */}
              <div className="sm:col-span-7 space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between items-center text-slate-700 mb-1">
                    <span className="font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0F172A]" />
                      Electrical Equipment &amp; Cables
                    </span>
                    <span className="font-code-sm text-slate-900 font-semibold tabular-nums">
                      3,420 <span className="text-slate-400 font-normal">(27.4%)</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#0F172A] rounded-full" style={{ width: '27.4%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-slate-700 mb-1">
                    <span className="font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      Civil Engineering &amp; Construction
                    </span>
                    <span className="font-code-sm text-slate-900 font-semibold tabular-nums">
                      2,890 <span className="text-slate-400 font-normal">(23.1%)</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '23.1%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-slate-700 mb-1">
                    <span className="font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Mechanical &amp; Metallurgy
                    </span>
                    <span className="font-code-sm text-slate-900 font-semibold tabular-nums">
                      1,850 <span className="text-slate-400 font-normal">(14.8%)</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '14.8%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-slate-700 mb-1">
                    <span className="font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                      Personal Protective Equipment (PPE)
                    </span>
                    <span className="font-code-sm text-slate-900 font-semibold tabular-nums">
                      1,640 <span className="text-slate-400 font-normal">(13.1%)</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-slate-700 rounded-full" style={{ width: '13.1%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-3 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                <span>Compulsory Registration Scheme (CRS) tracks 88 of these categories</span>
              </span>
              <Link to="/standards" className="text-primary font-bold hover:underline">
                View Taxonomy
              </Link>
            </div>
          </div>

          {/* Right: Recent Activity (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Continuous Audit Trail
                  </span>
                  <h2 className="text-base font-bold text-slate-900 mt-0.5">
                    Recent AI Activity
                  </h2>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
              </div>

              {/* Feed Items Stack */}
              <div className="space-y-2 mt-3">
                <ActivityFeedItem
                  icon="auto_awesome"
                  title="Specification match generated"
                  subtitle="LED Street Light (IS 10322)"
                  timestamp="2m ago"
                  chipText="Match 94%"
                  chipType="info"
                  metaText="GeM #2026-9812"
                  onClick={() => navigate('/recommendations')}
                />

                <ActivityFeedItem
                  icon="fact_check"
                  title="Tender document reviewed"
                  subtitle="TN-PWD-2026-0184 (48 requirements)"
                  timestamp="18m ago"
                  chipText="3 gaps detected"
                  chipType="error"
                  chipIcon="warning"
                  metaText="IS 1489 missing"
                  onClick={() => navigate('/tender-analysis')}
                />

                <ActivityFeedItem
                  icon="update"
                  title="Standard status updated"
                  subtitle="IS 302: Part 1 (Electrical Appliances)"
                  timestamp="1h ago"
                  chipText="Amendment 2 published"
                  chipType="neutral"
                  metaText="Gazette S.O. 412(E)"
                  onClick={() => navigate('/standards')}
                />

                <ActivityFeedItem
                  icon="verified"
                  title="QCO compliance confirmed"
                  subtitle="Industrial Safety Helmets (IS 2925)"
                  timestamp="2h ago"
                  chipText="Mandatory Certification Verified"
                  chipType="success"
                  metaText="DPIIT Order 2024"
                  onClick={() => navigate('/compliance')}
                />
              </div>
            </div>

            <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px]">
                Showing latest 4 events
              </span>
              <Link
                to="/history"
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Audit Log</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Gazette Notice */}
        <AnnouncementBanner
          icon="gavel"
          title="BIS Gazette QCO Notification 2025/Q1 In Force"
          badgeText="Immediate Effect"
          description="17 mechanical fasteners, polymer conduits, and medical diagnostic items are now legally governed under mandatory Indian Standards conformity for public procurement."
          actionText="Review Impacted Items"
          actionTo="/compliance"
        />
      </div>
    </div>
  );
}
