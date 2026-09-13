import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Building, Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B1F33] text-white flex items-center justify-center p-4 relative font-sans">
      <div className="max-w-md w-full bg-white text-[#17212B] p-8 rounded-[4px] shadow-xl border border-[#12304A] space-y-6">
        {/* Logo & Branding Header */}
        <div className="text-center">
          <div className="w-12 h-12 bg-[#2F6F73] text-white rounded-[4px] flex items-center justify-center font-mono font-bold text-lg mx-auto mb-3 tracking-wider border border-[#28536F]">
            IS
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#0B1F33] font-mono">
            ISense AI <span className="text-xs bg-[#12304A] text-teal-300 px-1.5 py-0.5 rounded font-normal">GOV</span>
          </h1>
          <p className="text-xs text-[#61707D] font-mono font-semibold block mt-0.5 uppercase tracking-wider">
            Indian Standards Intelligence System
          </p>
          <p className="text-xs text-[#17212B] mt-2 font-normal leading-relaxed">
            Authorized portal for government procurement officers, technical authorities, and PSU specification reviews.
          </p>
        </div>

        {/* Standard Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block font-bold text-[#0B1F33] mb-1 uppercase tracking-wider text-[11px]">
              Official Procurement Email
            </label>
            <input
              type="email"
              defaultValue="officer.procurement@gov.in"
              className="w-full px-3 py-2 bg-[#F4F6F8] border border-[#E3E8ED] rounded-[3px] text-xs text-[#0B1F33] outline-none focus:border-[#12304A] focus:bg-white font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-[#0B1F33] mb-1 uppercase tracking-wider text-[11px]">
              Government SSO Passcode
            </label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3 py-2 bg-[#F4F6F8] border border-[#E3E8ED] rounded-[3px] text-xs text-[#0B1F33] outline-none focus:border-[#12304A] focus:bg-white font-bold"
            />
          </div>

          <button
            type="submit"
            className="inst-btn-primary w-full py-2.5 font-mono text-xs uppercase tracking-wider"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Authenticate & Sign In</span>
          </button>
        </form>

        <div className="pt-3 border-t border-[#E3E8ED] text-[10px] font-mono text-[#61707D] text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          <span>Bureau of Indian Standards Technical Repository v2.4.1</span>
        </div>
      </div>
    </div>
  );
}
