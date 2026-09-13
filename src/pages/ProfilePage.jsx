import React, { useState, useEffect } from 'react';

export default function ProfilePage({ userProfile, onSaveProfile, setToast }) {
  const [formData, setFormData] = useState({
    name: "Keshav Sharma",
    designation: "Senior Procurement Officer",
    department: "Public Infrastructure & Engineering Procurement",
    organization: "Municipal Infrastructure Development Authority",
    email: "officer.procurement@gov.in",
    phone: "+91 98765 43210"
  });

  useEffect(() => {
    if (userProfile) {
      setFormData(userProfile);
    }
  }, [userProfile]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile(formData);
    }
    if (setToast) {
      setToast({ message: "User profile updated successfully.", type: "success" });
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      setFormData(userProfile);
    }
  };

  return (
    <div className="space-y-8 font-sans text-[#102A43]">
      <div className="border-b border-[#E2E8F0] pb-4 space-y-1">
        <h1 className="text-2xl font-bold text-[#102A43]">
          User Profile
        </h1>
        <p className="text-xs text-[#64748B]">
          Manage account information and user preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#102A43] block">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded text-[#102A43] focus:border-[#102A43] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43] block">
              Designation / Role
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => handleChange('designation', e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded text-[#102A43] focus:border-[#102A43] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43] block">
              Department
            </label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded text-[#102A43] focus:border-[#102A43] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43] block">
              Organisation / Company
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => handleChange('organization', e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded text-[#102A43] focus:border-[#102A43] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43] block">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded text-[#102A43] focus:border-[#102A43] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#102A43] block">
              Contact Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full p-2.5 bg-white border border-[#E2E8F0] rounded text-[#102A43] focus:border-[#102A43] outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3 text-xs">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-white border border-[#E2E8F0] text-[#102A43] hover:bg-[#F8FAFC] font-semibold rounded transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-5 py-2 bg-[#102A43] hover:bg-[#1E3A8A] text-white font-semibold rounded transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
