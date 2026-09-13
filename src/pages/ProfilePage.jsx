import React, { useState } from 'react';
import { 
  User, 
  Building, 
  ShieldCheck, 
  Edit3, 
  CheckCircle2, 
  Lock, 
  Sliders, 
  Clock, 
  FileText, 
  Search, 
  CheckSquare,
  Bookmark,
  X
} from 'lucide-react';

const DEFAULT_PROFILE = {
  fullName: "Keshav Sharma",
  designation: "Senior Procurement Officer",
  employeeId: "PO-10482",
  department: "Central Public Procurement Cell",
  organization: "Government Procurement Authority",
  officialEmail: "officer.procurement@gov.in",
  contactNumber: "+91 98765 43210",
  officeLocation: "New Delhi, India"
};

const DEFAULT_PREFERENCES = {
  language: "English",
  emailNotifications: "Enabled",
  defaultCategory: "All Categories",
  analysisHistory: "Enabled"
};

export default function ProfilePage({ setToast }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('isense_officer_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('isense_account_preferences');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleEditChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editForm);
    try {
      localStorage.setItem('isense_officer_profile', JSON.stringify(editForm));
    } catch (err) {
      console.error(err);
    }
    setIsEditing(false);
    setFeedbackMsg("Officer profile information updated.");
    if (setToast) {
      setToast({ message: "Officer profile information updated.", type: "success" });
    }
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  const handleCancelEdit = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const handlePreferenceChange = (key, val) => {
    const updated = { ...preferences, [key]: val };
    setPreferences(updated);
    try {
      localStorage.setItem('isense_account_preferences', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    if (setToast) {
      setToast({ message: "Preferences updated.", type: "success" });
    }
  };

  const recentActivities = [
    {
      id: "act-1",
      query: "90W outdoor LED street light for municipal roads",
      type: "Standards Search",
      date: "Today, 14:22"
    },
    {
      id: "act-2",
      query: "Industrial safety helmet for construction workers",
      type: "Tender Review",
      date: "Yesterday, 11:05"
    },
    {
      id: "act-3",
      query: "Ordinary Portland cement 53 grade for structural works",
      type: "Standards Search",
      date: "09 Sep 2026"
    },
    {
      id: "act-4",
      query: "PVC insulated heavy duty electrical cable",
      type: "Compliance Check",
      date: "07 Sep 2026"
    }
  ];

  return (
    <div className="space-y-5 max-w-5xl mx-auto font-sans">
      {/* Header Banner & Officer Card */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[4px] bg-[#0B1F33] text-white flex items-center justify-center text-lg font-bold font-mono border border-[#12304A] shrink-0">
              PO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0B1F33] leading-tight">
                  {profile.fullName}
                </h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-950 border border-emerald-300 px-2 py-0.5 rounded uppercase">
                  Verified Officer
                </span>
              </div>
              <p className="text-xs font-mono font-semibold text-[#12304A] mt-0.5">
                {profile.designation} • {profile.department}
              </p>
              <p className="text-xs text-[#61707D] font-mono">
                {profile.organization}
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => {
                setEditForm(profile);
                setIsEditing(true);
              }}
              className="inst-btn-primary py-2 px-4 text-xs font-mono self-start sm:self-center shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Feedback Message Banner */}
        {feedbackMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
            <button onClick={() => setFeedbackMsg("")} className="text-emerald-700 hover:text-emerald-950">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 1. Officer Information Section */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8ED]">
          <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#12304A]" />
            Officer Personnel Record
          </h3>
          <span className="text-xs font-mono text-[#61707D]">
            Employee Record ID: <strong className="text-[#0B1F33]">{profile.employeeId}</strong>
          </span>
        </div>

        {!isEditing ? (
          /* View Mode: Clean 2-column Information Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-1">
              <div className="text-[10px] text-[#61707D] uppercase font-bold">Full Officer Name</div>
              <div className="font-bold text-[#0B1F33]">{profile.fullName}</div>
            </div>

            <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-1">
              <div className="text-[10px] text-[#61707D] uppercase font-bold">Designation</div>
              <div className="font-bold text-[#0B1F33]">{profile.designation}</div>
            </div>

            <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#61707D] uppercase font-bold">Employee ID</span>
                <span className="text-[9px] bg-[#E3E8ED] text-[#12304A] px-1.5 py-0.2 rounded font-bold">
                  READ ONLY
                </span>
              </div>
              <div className="font-bold text-[#0B1F33]">{profile.employeeId}</div>
            </div>

            <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-1">
              <div className="text-[10px] text-[#61707D] uppercase font-bold">Department</div>
              <div className="font-bold text-[#0B1F33]">{profile.department}</div>
            </div>

            <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-1">
              <div className="text-[10px] text-[#61707D] uppercase font-bold">Organization</div>
              <div className="font-bold text-[#0B1F33]">{profile.organization}</div>
            </div>

            <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#61707D] uppercase font-bold">Official Email</span>
                <span className="text-[9px] bg-[#E3E8ED] text-[#12304A] px-1.5 py-0.2 rounded font-bold">
                  VERIFIED
                </span>
              </div>
              <div className="font-bold text-[#0B1F33]">{profile.officialEmail}</div>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#0B1F33] font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => handleEditChange('fullName', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F4F6F8] border border-[#E3E8ED] rounded text-[#0B1F33] font-bold outline-none focus:border-[#12304A]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#0B1F33] font-bold mb-1">Designation</label>
                <input
                  type="text"
                  value={editForm.designation}
                  onChange={(e) => handleEditChange('designation', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F4F6F8] border border-[#E3E8ED] rounded text-[#0B1F33] font-bold outline-none focus:border-[#12304A]"
                />
              </div>

              <div>
                <label className="block text-[#61707D] font-bold mb-1">Department</label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => handleEditChange('department', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F4F6F8] border border-[#E3E8ED] rounded text-[#0B1F33] font-bold outline-none focus:border-[#12304A]"
                />
              </div>

              <div>
                <label className="block text-[#61707D] font-bold mb-1">Organization</label>
                <input
                  type="text"
                  value={editForm.organization}
                  onChange={(e) => handleEditChange('organization', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F4F6F8] border border-[#E3E8ED] rounded text-[#0B1F33] font-bold outline-none focus:border-[#12304A]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E3E8ED]">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inst-btn-secondary py-1.5 px-3 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inst-btn-primary py-1.5 px-4 text-xs"
              >
                Save Profile Record
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. Account Preferences Section */}
      <div className="bg-white rounded-[4px] p-5 border border-[#E3E8ED] space-y-4 shadow-2xs">
        <div className="pb-3 border-b border-[#E3E8ED]">
          <h3 className="text-xs font-mono font-bold text-[#0B1F33] uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#12304A]" />
            System Configuration Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#0B1F33]">Interface Language</div>
              <div className="text-[10px] text-[#61707D]">System portal language</div>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="bg-white border border-[#E3E8ED] rounded px-2.5 py-1 text-[#0B1F33] font-bold outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>

          <div className="p-3 bg-[#F4F6F8] rounded-[3px] border border-[#E3E8ED] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#0B1F33]">QCO Alert Notifications</div>
              <div className="text-[10px] text-[#61707D]">Gazette update notifications</div>
            </div>
            <select
              value={preferences.emailNotifications}
              onChange={(e) => handlePreferenceChange('emailNotifications', e.target.value)}
              className="bg-white border border-[#E3E8ED] rounded px-2.5 py-1 text-[#0B1F33] font-bold outline-none"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
