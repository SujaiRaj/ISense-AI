import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0B1F33] text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white text-[#17212B] p-8 sm:p-10 rounded-lg shadow-xl border border-[#12304A] space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F33]">
            ISense AI
          </h1>
          <p className="text-xs text-[#61707D] font-semibold uppercase tracking-wider">
            Indian Standards Procurement Intelligence
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#0B1F33] mb-1.5 uppercase tracking-wider">
              Official Email
            </label>
            <input
              type="email"
              defaultValue="officer.procurement@gov.in"
              className="w-full px-3.5 py-2.5 bg-[#F4F6F8] border border-[#E3E8ED] rounded text-xs text-[#0B1F33] outline-none focus:border-[#12304A] focus:bg-white font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#0B1F33] mb-1.5 uppercase tracking-wider">
              SSO Passcode
            </label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full px-3.5 py-2.5 bg-[#F4F6F8] border border-[#E3E8ED] rounded text-xs text-[#0B1F33] outline-none focus:border-[#12304A] focus:bg-white font-medium"
            />
          </div>

          <button
            type="submit"
            className="inst-btn-primary w-full py-3 text-xs font-semibold uppercase tracking-wider"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
}

