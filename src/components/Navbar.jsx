import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, CheckCircle, User, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar({ onMenuToggle, title = "Overview", subtitle }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-base sm:text-lg font-semibold text-slate-900 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-slate-500 hidden sm:block mt-0.5 font-normal">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right: Quick Search, Notifications, User Badge */}
        <div className="flex items-center gap-3">
          {/* Global Search Input */}
          <div className="relative hidden md:block w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search IS numbers, titles..."
              className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-800 bg-slate-50 rounded-md border border-slate-200 focus:bg-white focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-all font-normal"
            />
          </div>

          {/* Notifications Icon & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-slate-200 p-3.5 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-900">Notifications & QCO Alerts</h4>
                  <span className="text-xs bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded font-medium border border-blue-200">1 New</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200/80 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-slate-800">QCO Update Active</p>
                      <p className="text-xs text-slate-500 font-normal">IS 10322 Road and Street Lighting QCO notification current.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative pl-2 border-l border-slate-200">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 rounded-md hover:bg-slate-100 transition-colors text-left outline-none"
              aria-label="User Profile Menu"
            >
              <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-semibold">
                PO
              </div>
              <span className="text-xs font-medium text-slate-700 hidden xl:inline-block">
                Procurement Officer
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-slate-200 py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/50">
                  <div className="font-semibold text-slate-900">Keshav Sharma</div>
                  <div className="text-[11px] text-slate-500 font-normal truncate">officer@organisation.gov.in</div>
                </div>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-500" />
                  <span>Account Settings</span>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/login');
                  }}
                  className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 font-medium flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
