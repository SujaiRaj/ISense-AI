import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ userProfile, onOpenSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const userName = userProfile?.name || t('officer.title', "Procurement Officer");
  const userDesignation = userProfile?.designation || t('officer.dept', "Directorate of Supplies & Disposal");

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path.startsWith('/search')) return t('nav.standards_search', 'Standards Search');
    if (path.startsWith('/recommendations')) return t('nav.recommendations', 'Recommendations');
    if (path.startsWith('/tender-analysis')) return t('nav.tender_review', 'Tender Review');
    if (path.startsWith('/compliance')) return t('comp.tag', 'QCO Compliance');
    if (path.startsWith('/standards/')) return t('nav.standard_detail', 'Specification Detail');
    if (path.startsWith('/standards')) return t('nav.standards_library', 'Standards Library');
    if (path.startsWith('/history')) return t('nav.audit_history', 'Audit History');
    if (path.startsWith('/profile')) return t('nav.officer_profile', 'Officer Profile');
    if (path.startsWith('/about')) return 'About Platform';
    return t('nav.overview', 'Overview');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 bg-white/95 backdrop-blur-xs border-b border-slate-200 z-40 flex items-center justify-between px-4 sm:px-6">
      {/* Left Breadcrumb & Standardized Badge */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
          aria-label="Open Sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 min-w-0">
          <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <Link to="/dashboard" className="text-slate-700 font-medium hover:text-primary transition-colors shrink-0">
            {t('gov.portal', 'Portal')}
          </Link>
          <span className="material-symbols-outlined text-[13px] shrink-0 text-slate-300">chevron_right</span>
          <span className="truncate text-slate-900 font-semibold">
            {getBreadcrumb()}
          </span>
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-orange-50 text-primary text-[11px] font-semibold border border-orange-200/70">
          <span className="material-symbols-outlined text-[14px] text-primary">gavel</span>
          <span>{t('gov.standardized', 'Govt. of India Standardized')}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center w-52 lg:w-72 px-2.5 py-1.5 rounded-lg bg-surface border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 focus-within:bg-white transition-all shadow-2xs">
          <span className="material-symbols-outlined text-slate-400 text-[16px] mr-2">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search.placeholder', 'Search IS number or item...')}
            className="w-full bg-transparent border-none outline-none font-body-sm text-xs text-slate-900 placeholder:text-slate-400"
          />
          <kbd className="font-code-sm text-[10px] px-1 py-0.5 rounded bg-white border border-slate-200 text-slate-400 shrink-0">
            ⌘K
          </kbd>
        </form>

        {/* Language Toggle (Hindi / English) */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer bg-slate-50 border-slate-200 hover:border-primary text-slate-700 hover:text-primary shadow-2xs"
          title={language === 'en' ? 'हिन्दी में बदलें (Switch to Hindi)' : 'Switch to English'}
          id="language-toggle-btn"
        >
          <span className="material-symbols-outlined text-[15px] text-primary">translate</span>
          <span className="font-medium">{language === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>

        {/* Theme Toggle (Light / Dark Mode) */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/80 shadow-2xs"
          title={isDark ? t('theme.toggle_light', 'Switch to Light Mode') : t('theme.toggle_dark', 'Switch to Dark Mode')}
          aria-label="Toggle Theme"
          id="theme-toggle-btn"
        >
          <span className="material-symbols-outlined text-[19px] text-amber-500">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <div className="flex items-center gap-0.5">
          <button 
            type="button"
            className="relative p-1.5 rounded-md text-slate-400 hover:text-primary hover:bg-orange-50/50 transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[19px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
          </button>
        </div>

        <div className="h-5 w-px bg-slate-200 hidden sm:block" />

        <Link 
          to="/profile" 
          className="flex items-center gap-2 pl-1 hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center shrink-0 font-bold text-xs ring-2 ring-orange-200">
            <span>{userName ? userName.charAt(0).toUpperCase() : 'O'}</span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-semibold text-slate-900 leading-tight text-xs">
              {userName}
            </span>
            <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
              {userDesignation}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
