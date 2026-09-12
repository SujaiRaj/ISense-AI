import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 relative">
      <div className="max-w-md w-full bg-white text-slate-900 p-8 rounded-md shadow-xl border border-slate-200 space-y-6">
        {/* Logo & Branding Header */}
        <div className="text-center">
          <div className="w-10 h-10 bg-slate-900 rounded-md flex items-center justify-center text-white font-semibold text-lg mx-auto mb-3 tracking-wide">
            IS
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            ISense AI
          </h1>
          <p className="text-xs text-slate-500 font-medium block mt-0.5">
            Indian Standards Intelligence
          </p>
          <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
            Standards intelligence platform for procurement officers and technical authorities.
          </p>
        </div>

        {/* Standard Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Official Procurement Email</label>
            <input
              type="email"
              defaultValue="officer@procurement.gov.in"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none focus:border-blue-700 transition-colors font-normal"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Security Passcode</label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 outline-none focus:border-blue-700 transition-colors font-normal"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-medium text-xs transition-colors"
          >
            Sign In to Portal
          </button>
        </form>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1 font-normal">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Bureau of Indian Standards Intelligence System</span>
        </div>
      </div>
    </div>
  );
}

