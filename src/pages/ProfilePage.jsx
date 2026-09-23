import React, { useState } from 'react';

export default function ProfilePage({ userProfile, onSaveProfile, setToast }) {
  const [formData, setFormData] = useState(() => ({
    name: userProfile?.name || "Rajesh Verma",
    designation: userProfile?.designation || "Directorate of Supplies & Disposal",
    department: userProfile?.department || "Public Infrastructure & Engineering Procurement",
    organization: userProfile?.organization || "Central Public Procurement Portal",
    email: userProfile?.email || "officer.procurement@gov.in",
    phone: userProfile?.phone || "+91 98765 43210"
  }));

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile(formData);
    }
    if (setToast) {
      setToast({ message: "Officer profile updated successfully.", type: "success" });
    }
  };

  return (
    <div className="w-full">
      {/* Top Command Ribbon */}
      <div className="px-gutter pt-space-lg pb-space-sm flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Officer Credential Verified
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-code-sm">
              <span className="material-symbols-outlined text-[13px]">badge</span>
              NIC Single Sign-On Active
            </span>
          </div>
          <h1 className="font-headline-lg text-on-background tracking-tight">
            Officer Profile &amp; Audit Credentials
          </h1>
          <p className="font-body-md text-outline mt-0.5 max-w-3xl">
            Procurement authority credentials used on gazette audit signatures and tender review reports.
          </p>
        </div>
      </div>

      <div className="px-gutter pb-space-xl space-y-space-lg max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="rounded-2xl bg-surface-container-lowest p-space-lg border border-outline-variant/30 shadow-sm space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-outline-variant/30">
              <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-bold text-2xl shadow-sm">
                <span className="material-symbols-outlined text-[32px]">person</span>
              </div>
              <div>
                <h3 className="font-headline-md text-on-surface">{formData.name}</h3>
                <p className="font-body-sm text-outline">{formData.designation}</p>
                <span className="inline-flex items-center gap-1 font-code-sm text-primary bg-surface-container px-2 py-0.5 rounded mt-1">
                  {formData.organization}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-label-sm uppercase tracking-wider text-outline font-semibold block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary-container outline-none font-body-sm text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm uppercase tracking-wider text-outline font-semibold block">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleChange('designation', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary-container outline-none font-body-sm text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm uppercase tracking-wider text-outline font-semibold block">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary-container outline-none font-body-sm text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm uppercase tracking-wider text-outline font-semibold block">
                  Organization
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary-container outline-none font-body-sm text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm uppercase tracking-wider text-outline font-semibold block">
                  Official Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary-container outline-none font-code-sm text-on-surface"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm uppercase tracking-wider text-outline font-semibold block">
                  Official Contact Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/60 focus:border-primary-container outline-none font-code-sm text-on-surface"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="btn-primary text-xs cursor-pointer px-5 py-2.5"
              >
                <span className="material-symbols-outlined text-[16px]">save</span>
                <span>Save Credentials</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
