import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError('');

    if (!username.trim()) {
      if (language === 'hi') {
        setError('कृपया अपना आधिकारिक नाम या ईमेल दर्ज करें।');
      } else if (language === 'ta') {
        setError('தயவுசெய்து உங்கள் அதிகாரப்பூர்வ பெயர் அல்லது மின்னஞ்சலை உள்ளிடவும்.');
      } else {
        setError('Please enter your name or official username.');
      }
      return;
    }

    if (!password.trim()) {
      if (language === 'hi') {
        setError('कृपया अपना पासवर्ड दर्ज करें।');
      } else if (language === 'ta') {
        setError('தயவுசெய்து உங்கள் கடவுச்சொல்லை உள்ளிடவும்.');
      } else {
        setError('Please enter your password.');
      }
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (onLogin) {
        onLogin({ username: username.trim() });
      } else {
        localStorage.setItem('isense_logged_in', 'true');
      }
      setIsSubmitting(false);
      navigate('/dashboard', { replace: true });
    }, 300);
  };

  const handleQuickDemo = () => {
    setUsername('Sujai Raj');
    setPassword('isense2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F4] flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Govt Bar with Language & Theme Toggles */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between text-xs text-slate-500 py-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="font-semibold text-slate-700">
            {t('gov.banner', 'Government of India • National Standards Intelligence')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-code-sm">
            <span>{t('status.bis_compliant', 'BIS Act 2016 Compliant')}</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{t('status.portal_active', 'Portal Active')}</span>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Language Selector: EN | हिन्दी | தமிழ் */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                language === 'en'
                  ? 'bg-primary text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-primary'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                language === 'hi'
                  ? 'bg-primary text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-primary'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ta')}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer font-medium ${
                language === 'ta'
                  ? 'bg-primary text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-primary'
              }`}
              title="தமிழ் (Tamil)"
            >
              தமிழ்
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-1 rounded-md text-slate-500 hover:text-primary bg-white border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            title={isDark ? t('theme.toggle_light', 'Switch to Light Mode') : t('theme.toggle_dark', 'Switch to Dark Mode')}
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-[17px] text-amber-500">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </header>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-7 sm:p-9 space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[#C2410C] text-white shadow-xs mb-1">
              <span className="material-symbols-outlined text-[26px]">verified</span>
            </div>
            
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  ISense AI
                </h1>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {t('login.sub', 'Indian Standards & QCO Procurement Portal')}
              </p>
            </div>

            {/* Tricolor Accent Stripe */}
            <div className="flex items-center justify-center gap-0.5 pt-1">
              <div className="h-0.5 w-6 bg-[#F97316] rounded-full" />
              <div className="h-0.5 w-6 bg-slate-300 rounded-full" />
              <div className="h-0.5 w-6 bg-[#15803D] rounded-full" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] shrink-0 text-rose-600">error</span>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
                {t('login.username_label', 'Username / Official Name')}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
                  person
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('login.username_placeholder', 'e.g. Sujai Raj or officer@gov.in')}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider">
                  {t('login.password_label', 'Password / Passcode')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-slate-400 hover:text-primary transition-colors cursor-pointer"
                >
                  {showPassword 
                    ? (language === 'hi' ? 'छिपाएँ' : language === 'ta' ? 'மறைக்க' : 'Hide') 
                    : (language === 'hi' ? 'दिखाएँ' : language === 'ta' ? 'காட்டுக' : 'Show')}
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined text-slate-400 text-[18px] absolute left-3 top-1/2 -translate-y-1/2">
                  lock
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.password_placeholder', 'Enter your passcode')}
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all font-medium font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Demo Pre-fill Hint */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
              <span className="font-code-sm">{t('login.demo_hint', 'Demo: Sujai Raj / isense2026')}</span>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-primary hover:underline font-semibold cursor-pointer"
              >
                {t('login.auto_fill', 'Auto Fill')}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-primary text-white hover:bg-[#C2410C] font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('login.signing_in', 'Signing In...')}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>{t('login.submit_btn', 'Sign In to Portal')}</span>
                </>
              )}
            </button>
          </form>

          {/* Institutional SSO Badge */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              {t('login.sso_note', 'Single Sign-On enabled for NIC, GeM & Central Procurement Officers')}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto text-center text-[11px] text-slate-400 py-2">
        © {new Date().getFullYear()} ISense AI • {t('login.copyright', 'Bureau of Indian Standards Intelligence')}
      </footer>
    </div>
  );
}

