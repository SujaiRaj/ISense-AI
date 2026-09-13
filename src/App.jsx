import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import RecommendationResultsPage from './pages/RecommendationResultsPage';
import StandardDetailsPage from './pages/StandardDetailsPage';
import TenderAnalysisPage from './pages/TenderAnalysisPage';
import CompliancePage from './pages/CompliancePage';
import StandardsLibraryPage from './pages/StandardsLibraryPage';
import AnalysisHistoryPage from './pages/AnalysisHistoryPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

const INITIAL_PROFILE = {
  name: "Keshav Sharma",
  designation: "Senior Procurement Officer",
  department: "Public Infrastructure & Engineering Procurement",
  organization: "Municipal Infrastructure Development Authority",
  email: "officer.procurement@gov.in",
  phone: "+91 98765 43210"
};

function MainLayout({ children, toast, setToast, userProfile, setUserProfile }) {
  const location = useLocation();

  if (location.pathname === '/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] flex flex-col font-sans text-[#102A43]">
      {/* Brand Header */}
      <Navbar userProfile={userProfile} />

      {/* Main Workspace - 94% Desktop Width */}
      <main className="flex-1 w-[94%] max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {children}
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Global Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  const [globalResults, setGlobalResults] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Shared source of truth for Officer Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('isense_user_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    try {
      localStorage.setItem('isense_user_profile', JSON.stringify(updatedProfile));
    } catch (e) {
      console.warn("Failed to persist profile to localStorage", e);
    }
  };

  return (
    <BrowserRouter>
      <MainLayout 
        toast={toast}
        setToast={setToast}
        userProfile={userProfile}
        setUserProfile={handleUpdateProfile}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <DashboardPage 
                setGlobalResults={setGlobalResults} 
                setToast={setToast} 
              />
            } 
          />
          <Route 
            path="/search" 
            element={
              <SearchPage 
                setGlobalResults={setGlobalResults} 
                setToast={setToast} 
              />
            } 
          />
          <Route 
            path="/recommendations" 
            element={<RecommendationResultsPage globalResults={globalResults} />} 
          />
          <Route path="/standards" element={<StandardsLibraryPage />} />
          <Route path="/standards/:id" element={<StandardDetailsPage />} />
          <Route 
            path="/tender-analysis" 
            element={<TenderAnalysisPage setToast={setToast} />} 
          />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route 
            path="/history" 
            element={<AnalysisHistoryPage setGlobalResults={setGlobalResults} />} 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route 
            path="/profile" 
            element={
              <ProfilePage 
                userProfile={userProfile}
                onSaveProfile={handleUpdateProfile}
                setToast={setToast} 
              />
            } 
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
