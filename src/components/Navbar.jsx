import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown } from 'lucide-react';

export default function Navbar({ userProfile }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const userName = userProfile?.name || "Keshav Sharma";

  const navItems = [
    { path: '/dashboard', label: 'Home' },
    { path: '/standards', label: 'Standards' },
    { path: '/search', label: 'Recommendations' },
    { path: '/tender-analysis', label: 'Tender Analysis' },
    { path: '/compliance', label: 'Compliance' },
    { path: '/history', label: 'Analysis History' },
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHeaderSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/standards?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 font-sans shadow-2xs">
      <div className="w-[94%] max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <NavLink to="/dashboard" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded bg-[#102A43] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
            IS
          </div>
          <div>
            <span className="font-extrabold text-[#102A43] text-base tracking-tight leading-none block group-hover:text-[#0F766E] transition-colors">
              ISense AI
            </span>
            <span className="text-[11px] text-[#64748B] font-medium leading-none block mt-1">
              Indian Standards Intelligence
            </span>
          </div>
        </NavLink>

        {/* Search & Actions */}
        <div className="flex items-center gap-4 relative" ref={menuRef}>
          {/* Header Search Form */}
          <form onSubmit={handleHeaderSearch} className="relative hidden md:block w-56 lg:w-64">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search IS number or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs text-[#102A43] bg-[#F8FAFC] rounded border border-[#E2E8F0] focus:bg-white focus:border-[#0F766E] outline-none transition-all"
            />
          </form>

          {/* User Profile Badge - Shows User's Actual Name */}
          <button
            onClick={() => {
              setProfileDropdownOpen(!profileDropdownOpen);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded hover:bg-[#F8FAFC] transition-colors text-left outline-none border border-transparent hover:border-[#E2E8F0]"
          >
            <div className="w-7 h-7 rounded bg-[#F0FDFA] text-[#0F766E] flex items-center justify-center border border-[#CCFBF1]">
              <User className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-[#102A43] hidden sm:inline-block">
              {userName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          </button>

          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-12 top-12 w-56 bg-white rounded border border-[#E2E8F0] shadow-md py-1 z-50 text-xs">
              <div className="px-4 py-2 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                <div className="font-bold text-[#102A43]">{userName}</div>
                <div className="text-[11px] text-[#64748B] truncate">{userProfile?.email || "officer.procurement@gov.in"}</div>
              </div>

              <NavLink
                to="/profile"
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-[#334155] hover:bg-[#F0FDFA] hover:text-[#0F766E] font-medium"
              >
                Profile Settings
              </NavLink>
              <NavLink
                to="/history"
                onClick={() => setProfileDropdownOpen(false)}
                className="block px-4 py-2 text-[#334155] hover:bg-[#F0FDFA] hover:text-[#0F766E] font-medium"
              >
                Analysis History
              </NavLink>
            </div>
          )}

          {/* Main Navigation Menu Toggle Button */}
          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setProfileDropdownOpen(false);
            }}
            className="p-2 rounded text-[#102A43] hover:bg-[#F0FDFA] border border-[#E2E8F0] flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Navigation Menu"
          >
            {menuOpen ? <X className="w-4 h-4 text-[#0F766E]" /> : <Menu className="w-4 h-4" />}
            <span className="hidden lg:inline-block">Navigation</span>
          </button>

          {/* Dropdown Navigation Menu Modal */}
          {menuOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded border border-[#E2E8F0] shadow-lg p-2 z-50 text-xs space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-bold text-[#0F766E] uppercase tracking-wider border-b border-[#E2E8F0] mb-1">
                Navigation
              </div>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-[#0F766E] bg-[#F0FDFA] font-bold border-l-2 border-[#0F766E]'
                        : 'text-[#334155] hover:text-[#102A43] hover:bg-[#F8FAFC]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
