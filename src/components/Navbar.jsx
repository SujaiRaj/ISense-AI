import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, CheckCircle, User, Settings, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';

export default function Navbar({ onMenuToggle, title = "Overview", subtitle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-[#E3E8ED] sticky top-0 z-30 px-4 sm:px-6 py-2.5 shadow-2xs">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 rounded text-slate-700 hover:bg-[#F4F6F8] transition-colors border border-slate-200"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span>BIS Intelligence Portal</span>
              <span>/</span>
              <span className="text-[#2F6F73] font-semibold">{title}</span>
            </div>
            <h1 className="text-sm sm:text-base font-semibold text-[#0B1F33] leading-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: Quick Search, Repository Status, User Badge */}
        <div className="flex items-center gap-3">
          {/* Global Search Input */}
          <div className="relative hidden md:block w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search IS standards code (e.g. IS 10322)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs text-[#17212B] bg-[#F4F6F8] rounded border border-[#E3E8ED] focus:bg-white focus:border-[#12304A] focus:ring-1 focus:ring-[#12304A] outline-none transition-all font-mono"
            />
          </div>

          {/* System Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded text-[11px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>QCO Verified</span>
          </div>

          {/* Notifications Icon & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-1.5 rounded text-slate-600 hover:text-[#0B1F33] hover:bg-[#F4F6F8] transition-colors relative border border-slate-200"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-teal-600 rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded shadow-md border border-[#E3E8ED] p-3.5 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E8ED]">
                  <h4 className="text-xs font-semibold text-[#0B1F33]">Notifications & QCO Gazette Alerts</h4>
                  <span className="text-[10px] font-mono bg-[#12304A] text-white px-1.5 py-0.5 rounded">1 Active</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-[#F4F6F8] rounded border border-[#E3E8ED] flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-[#0B1F33]">QCO Mandate Active</p>
                      <p className="text-[11px] text-[#61707D] font-normal">IS 10322 (Part 5/Sec 3): 2012 Quality Control Order enforcement in effect.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative pl-2 border-l border-[#E3E8ED]">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 rounded hover:bg-[#F4F6F8] transition-colors text-left outline-none"
              aria-label="User Profile Menu"
            >
              <div className="w-7 h-7 rounded bg-[#0B1F33] text-white flex items-center justify-center text-xs font-bold font-mono">
                PO
              </div>
              <span className="text-xs font-semibold text-[#17212B] hidden xl:inline-block">
                Officer K. Sharma
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden xl:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-md border border-[#E3E8ED] py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-[#E3E8ED] bg-[#F4F6F8]">
                  <div className="font-semibold text-[#0B1F33]">Keshav Sharma</div>
                  <div className="text-[11px] text-[#61707D] font-mono truncate">officer.procurement@gov.in</div>
                </div>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-[#17212B] hover:bg-[#F4F6F8] hover:text-[#0B1F33] font-medium flex items-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Officer Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-[#17212B] hover:bg-[#F4F6F8] hover:text-[#0B1F33] font-medium flex items-center gap-2 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>System Settings</span>
                </button>

                <div className="border-t border-[#E3E8ED] my-1" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/login');
                  }}
                  className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 font-medium flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
