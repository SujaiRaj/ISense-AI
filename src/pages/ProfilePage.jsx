import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  MapPin, 
  Phone, 
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
  designation: "Procurement Officer",
  employeeId: "PO-10482",
  department: "Central Procurement",
  organization: "Government Procurement Department",
  officialEmail: "officer@organisation.gov.in",
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
    setFeedbackMsg("Profile information updated.");
    if (setToast) {
      setToast({ message: "Profile information updated.", type: "success" });
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
      query: "Ordinary Portland cement 43 grade for building construction",
      type: "Standards Search",
      date: "06 Sep 2026"
    },
    {
      id: "act-4",
      query: "PVC insulated electrical cable heavy duty",
      type: "Compliance Check",
      date: "04 Sep 2026"
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header Banner & Officer Card */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-semibold border border-slate-700 shrink-0 shadow-2xs">
              PO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-900 leading-tight">
                  {profile.fullName}
                </h2>
                <span className="text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded">
                  Active Officer
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {profile.designation} • {profile.department}
              </p>
              <p className="text-xs text-slate-500 font-normal">
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
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded transition-colors self-start sm:self-center shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Feedback Message Banner */}
        {feedbackMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs flex items-center justify-between font-normal">
            <div className="flex items-center gap-2">
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
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-600" />
            Officer Information
          </h3>
          <span className="text-[11px] text-slate-400 font-normal">
            Employee Record ID: <strong className="text-slate-700 font-mono font-medium">{profile.employeeId}</strong>
          </span>
        </div>

        {!isEditing ? (
          /* View Mode: Clean 2-column Information Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Full Name</div>
              <div className="font-medium text-slate-900 text-sm">{profile.fullName}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Designation</div>
              <div className="font-medium text-slate-900 text-sm">{profile.designation}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Employee ID</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" /> Read-Only
                </span>
              </div>
              <div className="font-mono font-semibold text-slate-900">{profile.employeeId}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Department</div>
              <div className="font-medium text-slate-900">{profile.department}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Organization</div>
              <div className="font-medium text-slate-900">{profile.organization}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Official Email</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" /> Read-Only
                </span>
              </div>
              <div className="font-mono text-slate-900 font-medium">{profile.officialEmail}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Contact Number</div>
              <div className="font-medium text-slate-900">{profile.contactNumber}</div>
            </div>

            <div className="p-3 bg-slate-50 rounded border border-slate-200/80 space-y-1">
              <div className="text-[11px] text-slate-500 font-medium">Office Location</div>
              <div className="font-medium text-slate-900">{profile.officeLocation}</div>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => handleEditChange('fullName', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-900 font-medium outline-none focus:border-blue-700 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Designation</label>
                <input
                  type="text"
                  value={editForm.designation}
                  onChange={(e) => handleEditChange('designation', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-900 font-medium outline-none focus:border-blue-700 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1 flex items-center justify-between">
                  <span>Employee ID</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Read-Only)</span>
                </label>
                <input
                  type="text"
                  value={editForm.employeeId}
                  disabled
                  className="w-full px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Department</label>
                <input
                  type="text"
                  value={editForm.department}
                  onChange={(e) => handleEditChange('department', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-900 font-medium outline-none focus:border-blue-700 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Organization</label>
                <input
                  type="text"
                  value={editForm.organization}
                  onChange={(e) => handleEditChange('organization', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-900 font-medium outline-none focus:border-blue-700 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1 flex items-center justify-between">
                  <span>Official Email</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Read-Only)</span>
                </label>
                <input
                  type="email"
                  value={editForm.officialEmail}
                  disabled
                  className="w-full px-3 py-1.5 bg-slate-100 border border-slate-200 rounded text-slate-500 font-mono cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Contact Number</label>
                <input
                  type="text"
                  value={editForm.contactNumber}
                  onChange={(e) => handleEditChange('contactNumber', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-900 font-medium outline-none focus:border-blue-700 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Office Location</label>
                <input
                  type="text"
                  value={editForm.officeLocation}
                  onChange={(e) => handleEditChange('officeLocation', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-slate-900 font-medium outline-none focus:border-blue-700 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded border border-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 2. Account Preferences Section */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="pb-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-600" />
            Account Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">Language</div>
              <div className="text-[11px] text-slate-500 font-normal">System interface language</div>
            </div>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium outline-none"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">Email Notifications</div>
              <div className="text-[11px] text-slate-500 font-normal">BIS QCO update notifications</div>
            </div>
            <select
              value={preferences.emailNotifications}
              onChange={(e) => handlePreferenceChange('emailNotifications', e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium outline-none"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">Default Standards Category</div>
              <div className="text-[11px] text-slate-500 font-normal">Primary search filter scope</div>
            </div>
            <select
              value={preferences.defaultCategory}
              onChange={(e) => handlePreferenceChange('defaultCategory', e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium outline-none"
            >
              <option value="All Categories">All Categories</option>
              <option value="Electrical">Electrical</option>
              <option value="Construction">Construction</option>
              <option value="Safety">Safety</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200/80 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-800">Analysis History</div>
              <div className="text-[11px] text-slate-500 font-normal">Store search audit logs</div>
            </div>
            <select
              value={preferences.analysisHistory}
              onChange={(e) => handlePreferenceChange('analysisHistory', e.target.value)}
              className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-medium outline-none"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Activity Summary Section */}
      <div className="bg-white rounded-md p-5 sm:p-6 border border-slate-200 space-y-4">
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            Activity Summary
          </h3>
          <span className="text-[11px] text-slate-500 font-normal">Period: Year to Date (2026)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3.5 rounded border border-slate-200/80 flex items-center gap-3">
            <div className="p-2 bg-white rounded border border-slate-200 text-slate-700">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900 leading-none">24</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Standards Searches</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded border border-slate-200/80 flex items-center gap-3">
            <div className="p-2 bg-white rounded border border-slate-200 text-slate-700">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900 leading-none">8</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Tender Reviews</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded border border-slate-200/80 flex items-center gap-3">
            <div className="p-2 bg-white rounded border border-slate-200 text-slate-700">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900 leading-none">12</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Compliance Checks</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded border border-slate-200/80 flex items-center gap-3">
            <div className="p-2 bg-white rounded border border-slate-200 text-slate-700">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-semibold text-slate-900 leading-none">6</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">Saved Standards</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Activity Section */}
      <div className="bg-white rounded-md border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-600" />
            Recent Activity
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200 text-[11px] uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 font-medium">Activity / Query</th>
                <th className="py-3 px-4 font-medium">Type</th>
                <th className="py-3 px-4 text-right font-medium">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {recentActivities.map((act) => (
                <tr key={act.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 text-slate-900 font-medium">
                    "{act.query}"
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-medium">
                      {act.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    {act.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Security & Account Status Section */}
      <div className="bg-white rounded-md p-5 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            Security & Account Status
          </h3>
          <span className="text-[11px] font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded">
            Account Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200/80">
            <span className="text-slate-500 font-medium">Last Active Session:</span>
            <div className="font-medium text-slate-800 mt-0.5">Today (10 Sep 2026)</div>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200/80">
            <span className="text-slate-500 font-medium">Authentication Authority:</span>
            <div className="font-medium text-slate-800 mt-0.5">Government Single Sign-On (SSO)</div>
          </div>
          <div className="p-2.5 bg-slate-50 rounded border border-slate-200/80">
            <span className="text-slate-500 font-medium">Access Clearance Level:</span>
            <div className="font-medium text-slate-800 mt-0.5">Level-2 Procurement Officer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
