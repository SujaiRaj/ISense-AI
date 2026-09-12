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
  User
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/search', label: 'Standards Search', icon: Search },
    { path: '/tender-analysis', label: 'Tender Review', icon: FileText },
    { path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { path: '/standards', label: 'Standards Library', icon: BookOpen },
    { path: '/compliance', label: 'Compliance', icon: ShieldCheck },
    { path: '/history', label: 'Analysis History', icon: History }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container - Option A: Light enterprise navigation panel */}
      <aside className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-white text-slate-700 flex flex-col justify-between border-r border-slate-200 transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Header & Logo */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white font-semibold text-sm tracking-wide shadow-2xs">
                IS
              </div>
              <div>
                <h1 className="font-semibold text-slate-900 text-base leading-none">
                  ISense AI
                </h1>
                <span className="text-xs text-slate-500 font-normal block mt-1">
                  Indian Standards Intelligence
                </span>
              </div>
            </div>
            {/* Close button on mobile */}
            <button 
              onClick={onClose}
              className="lg:hidden p-1.5 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 sm:p-3 space-y-0.5">
            <div className="px-3 pt-2 pb-1.5 text-xs font-medium text-slate-500">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-100/90 text-blue-900 font-semibold border-l-3 border-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Settings & User Profile */}
        <div className="p-3 border-t border-slate-200 space-y-1">
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-100 text-blue-900 font-semibold border-l-3 border-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Profile & Account</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-slate-100 text-blue-900 font-semibold border-l-3 border-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`
            }
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </NavLink>

          {/* User Profile Card */}
          <NavLink
            to="/profile"
            onClick={onClose}
            className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-md border border-slate-200/80 flex items-center justify-between transition-colors block mt-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                PO
              </div>
              <div className="truncate">
                <p className="text-xs font-medium text-slate-900 truncate">Keshav Sharma</p>
                <p className="text-xs text-slate-500 truncate">Procurement Officer</p>
              </div>
            </div>
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          </NavLink>
        </div>
      </aside>
    </>
  );
}

