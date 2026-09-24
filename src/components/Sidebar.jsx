import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Sidebar({ isOpen, onClose, onLogout }) {
  const { t } = useLanguage();

  const navSections = [
    {
      group: t('nav.overview', 'Overview'),
      items: [
        { path: '/dashboard', label: t('nav.dashboard', 'Dashboard'), icon: 'dashboard' }
      ]
    },
    {
      group: t('nav.intelligence', 'Intelligence'),
      items: [
        { path: '/search', label: t('nav.standards_search', 'Standards Search'), icon: 'manage_search' },
        { path: '/recommendations', label: t('nav.recommendations', 'Recommendations'), icon: 'auto_awesome' },
        { path: '/tender-analysis', label: t('nav.tender_review', 'Tender Review'), icon: 'fact_check' }
      ]
    },
    {
      group: t('nav.compliance', 'Compliance'),
      items: [
        { path: '/compliance', label: t('nav.qco_orders', 'QCO Orders'), icon: 'policy' },
        { path: '/standards', label: t('nav.standards_library', 'Standards Library'), icon: 'library_books' }
      ]
    },
    {
      group: t('nav.details_access', 'Details & Access'),
      items: [
        { path: '/standards/is-10322-p5-s3', label: t('nav.standard_detail', 'Standard Detail View'), icon: 'description' },
        { path: '/history', label: t('nav.audit_history', 'Audit History'), icon: 'history' },
        { path: '/profile', label: t('nav.officer_profile', 'Officer Profile'), icon: 'person' },
        { isAction: true, label: t('nav.sign_out', 'Sign Out / Gateway'), icon: 'logout' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Fixed Left Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full w-[260px] bg-white z-50 flex flex-col border-r border-slate-200 shadow-2xs transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white shadow-xs shrink-0 font-bold text-xs">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight leading-none text-sm">
                  ISense AI
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              </div>
              <span className="text-[11px] text-slate-500 truncate mt-1 tracking-normal font-medium">
                Indian Standards Intel
              </span>
            </div>
          </div>
          {/* Mobile close button */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Live Status Pill with Tricolor Flag Accent */}
        <div className="px-4 py-2 border-b border-slate-200/70 bg-gradient-to-r from-orange-50/70 via-white to-emerald-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center space-x-0.5">
                <span className="w-1.5 h-3 rounded-xs bg-[#F97316]" />
                <span className="w-1.5 h-3 rounded-xs bg-slate-300" />
                <span className="w-1.5 h-3 rounded-xs bg-[#15803D]" />
              </div>
              <span className="text-[11px] text-slate-900 font-bold tracking-wider">
                {t('status.online', 'AI ONLINE')}
              </span>
            </div>
            <span className="font-code-sm text-primary font-semibold bg-orange-100/70 border border-orange-200/60 px-2 py-0.5 rounded text-[10px]">
              v2025.2
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-2.5 pb-1 text-[11px] text-slate-400 tracking-wider uppercase font-semibold">
                {section.group}
              </div>
              {section.items.map((item) =>
                item.isAction ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (onClose) onClose();
                      if (onLogout) onLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 text-left cursor-pointer group"
                  >
                    <span className="material-symbols-outlined text-[17px] text-slate-400 group-hover:text-rose-600">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose && onClose()}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-medium ${
                        isActive
                          ? 'bg-orange-50/90 text-primary border-l-4 border-primary font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`material-symbols-outlined text-[17px] ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                )
              )}
            </div>
          ))}
        </nav>

        {/* Bottom Sync Status Card */}
        <div className="p-3 border-t border-slate-200/80">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs">
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800">
                {t('status.sync', 'BIS Gazette Sync')}
              </span>
              <span className="font-code-sm text-slate-400 text-[11px]">
                {t('status.synced', 'Synced 12m ago')}
              </span>
            </div>
            <span className="material-symbols-outlined text-primary text-[18px]">
              sync
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
