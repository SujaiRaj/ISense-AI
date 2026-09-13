import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  History, 
  Settings, 
  X,
  Building2,
  User,
  Award
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { path: '/search', label: 'Standards Recommendation', icon: Search },
    { path: '/tender-analysis', label: 'Tender & Specification Review', icon: FileText },
    { path: '/recommendations', label: 'Analysis Results Report', icon: Sparkles },
    { path: '/standards', label: 'Standards Library Catalogue', icon: BookOpen },
    { path: '/compliance', label: 'Quality Control Orders (QCO)', icon: ShieldCheck },
    { path: '/history', label: 'Analysis Audit History', icon: History }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-[#0B1F33]/70 z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container - Institutional Deep Navy Navigation Shell */}
      <aside className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-[#0B1F33] text-slate-300 flex flex-col justify-between border-r border-[#12304A] transition-transform duration-200 ease-in-out shrink-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Header & Logo */}
          <div className="p-4 border-b border-[#12304A] flex items-center justify-between bg-[#0B1F33]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#2F6F73] text-white rounded flex items-center justify-center font-mono font-bold text-sm tracking-wider border border-[#28536F]">
                IS
              </div>
              <div>
                <h1 className="font-semibold text-white text-sm tracking-tight leading-tight flex items-center gap-1.5">
                  ISense AI
                  <span className="text-[10px] font-mono font-normal px-1 py-0.2 bg-[#12304A] text-teal-300 border border-[#28536F]/50 rounded">GOV</span>
                </h1>
                <span className="text-[11px] text-slate-400 font-normal block leading-tight mt-0.5">
                  Indian Standards Intelligence
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded hover:bg-[#12304A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="px-3 pt-2 pb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Procurement Intelligence
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#12304A] text-white font-semibold border-l-3 border-[#2F6F73] shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-[#12304A]/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-200" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Settings & User Officer Profile */}
        <div className="p-3 border-t border-[#12304A] space-y-1 bg-[#091929]">
          <div className="px-3 pt-1 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
            System & Account
          </div>
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#12304A] text-white font-semibold border-l-2 border-[#2F6F73]'
                  : 'text-slate-300 hover:text-white hover:bg-[#12304A]/50'
              }`
            }
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Officer Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#12304A] text-white font-semibold border-l-2 border-[#2F6F73]'
                  : 'text-slate-300 hover:text-white hover:bg-[#12304A]/50'
              }`
            }
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>System Settings</span>
          </NavLink>

          {/* User Profile Card */}
          <NavLink
            to="/profile"
            onClick={onClose}
            className="p-2.5 bg-[#12304A]/80 hover:bg-[#12304A] rounded border border-[#28536F]/40 flex items-center justify-between transition-colors block mt-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded bg-[#28536F] text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                PO
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">Keshav Sharma</p>
                <p className="text-[11px] text-slate-300 truncate">Senior Procurement Officer</p>
              </div>
            </div>
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          </NavLink>
        </div>
      </aside>
    </>
  );
}
