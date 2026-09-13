import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/search', label: 'Standards Search' },
    { path: '/tender-analysis', label: 'Tender Review' },
    { path: '/recommendations', label: 'Recommendations Report' },
    { path: '/standards', label: 'Standards Library' },
    { path: '/compliance', label: 'Mandatory Compliance' },
    { path: '/history', label: 'Analysis History' }
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

      {/* Sidebar Container */}
      <aside className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-[#0B1F33] text-slate-300 flex flex-col justify-between border-r border-[#12304A] transition-transform duration-200 ease-in-out shrink-0 font-sans ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Header */}
          <div className="p-5 border-b border-[#12304A] flex items-center justify-between bg-[#0B1F33]">
            <div>
              <h1 className="font-bold text-white text-base tracking-tight leading-tight">
                ISense AI
              </h1>
              <span className="text-xs text-slate-400 font-normal block leading-tight mt-0.5">
                Indian Standards Intelligence
              </span>
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
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pt-2 pb-2 text-xs uppercase tracking-wider text-slate-400 font-bold">
              Navigation
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#12304A] text-white border-l-4 border-[#2F6F73] shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-[#12304A]/60'
                  }`
                }
              >
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#12304A] space-y-2 bg-[#091929]">
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#12304A] text-white border-l-2 border-[#2F6F73]'
                  : 'text-slate-300 hover:text-white hover:bg-[#12304A]/50'
              }`
            }
          >
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `block px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#12304A] text-white border-l-2 border-[#2F6F73]'
                  : 'text-slate-300 hover:text-white hover:bg-[#12304A]/50'
              }`
            }
          >
            <span>Settings</span>
          </NavLink>

          {/* User Profile Card */}
          <NavLink
            to="/profile"
            onClick={onClose}
            className="p-3 bg-[#12304A]/80 hover:bg-[#12304A] rounded-md border border-[#28536F]/40 flex items-center justify-between transition-colors block mt-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded bg-[#28536F] text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                PO
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">Keshav Sharma</p>
                <p className="text-xs text-slate-300 truncate">Senior Procurement Officer</p>
              </div>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

