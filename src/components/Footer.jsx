import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#102A43] text-slate-300 border-t border-[#1E3A8A]/30 font-sans pt-12 pb-8 mt-16 text-xs">
      <div className="w-[94%] max-w-[1440px] mx-auto px-4 sm:px-6 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#243B53]">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#0F766E] text-white flex items-center justify-center font-bold text-xs">
                IS
              </div>
              <span className="font-bold text-white text-base tracking-tight block">ISense AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A modern Indian Standards Intelligence platform assisting government procurement officers, public sector undertakings, and engineering teams in identifying applicable Indian Standards, technical specifications, and Quality Control Orders.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><Link to="/dashboard" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/standards" className="hover:text-teal-400 transition-colors">Standards Catalogue</Link></li>
              <li><Link to="/search" className="hover:text-teal-400 transition-colors">AI Recommendation</Link></li>
              <li><Link to="/tender-analysis" className="hover:text-teal-400 transition-colors">Tender Analysis</Link></li>
              <li><Link to="/compliance" className="hover:text-teal-400 transition-colors">Mandatory Compliance</Link></li>
              <li><Link to="/history" className="hover:text-teal-400 transition-colors">Analysis History</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About ISense AI</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Official Disclaimer</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Procurement officials should verify technical parameters and Quality Control Orders against official Bureau of Indian Standards (BIS) gazette publications before finalizing tender documentation.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} ISense AI. Indian Standards Intelligence Platform.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <span>•</span>
            <Link to="/standards" className="hover:text-white transition-colors">BIS Catalogue</Link>
            <span>•</span>
            <Link to="/profile" className="hover:text-white transition-colors">Officer Profile</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
