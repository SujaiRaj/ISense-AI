import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
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
  name: "Procurement Officer",
  designation: "Directorate of Supplies & Disposal",
  department: "Public Infrastructure & Engineering Procurement",
  organization: "Central Public Procurement Portal",
  email: "officer.procurement@gov.in",
  phone: "+91 98765 43210"
};

function formatDisplayName(raw) {
  if (!raw || typeof raw !== 'string') return "Procurement Officer";
  const trimmed = raw.trim();
  if (!trimmed) return "Procurement Officer";

  // If email format, extract part before @
  let base = trimmed.includes('@') ? trimmed.split('@')[0] : trimmed;

  // Replace dots, underscores, hyphens with spaces
  base = base.replace(/[._-]+/g, ' ').trim();

  // Capitalize each word properly
  const formatted = base
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  return formatted || "Procurement Officer";
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function MainLayout({ children, toast, setToast, userProfile, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface antialiased">
      {/* Institutional Fixed Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={onLogout} />

      {/* Institutional Fixed Top Bar */}
      <Navbar userProfile={userProfile} onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Main Workspace Frame */}
      <div className="lg:pl-[260px] pt-16 min-h-screen flex flex-col">
        <main className="flex-1 w-full">
          {children}
        </main>
      </div>

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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isense_logged_in') === 'true';
  });
  
  // Shared source of truth for Officer Profile
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('isense_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === "Rajesh Verma") {
          parsed.name = "Procurement Officer";
        }
        return parsed;
      }
      return INITIAL_PROFILE;
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

  const handleLogin = (userCreds) => {
    setIsAuthenticated(true);
    localStorage.setItem('isense_logged_in', 'true');
    const rawUsername = userCreds?.username || '';
    const displayName = formatDisplayName(rawUsername);

    setUserProfile(prev => {
      const updated = {
        ...prev,
        name: displayName,
        email: rawUsername.includes('@') ? rawUsername : `${rawUsername.replace(/\s+/g, '.').toLowerCase()}@gov.in`
      };
      try {
        localStorage.setItem('isense_user_profile', JSON.stringify(updated));
      } catch (e) {
        console.warn("Failed to persist profile to localStorage", e);
      }
      return updated;
    });

    setToast({ message: `Welcome, ${displayName}!`, type: "success" });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isense_logged_in');
    localStorage.removeItem('isense_user_profile');
    setUserProfile(INITIAL_PROFILE);
    setToast({ message: "Signed out of session.", type: "info" });
  };

  return (
    <BrowserRouter>
      <MainLayout 
        toast={toast}
        setToast={setToast}
        userProfile={userProfile}
        onLogout={handleLogout}
      >
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated 
                ? <Navigate to="/dashboard" replace /> 
                : <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardPage 
                  setGlobalResults={setGlobalResults} 
                  setToast={setToast} 
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SearchPage 
                  setGlobalResults={setGlobalResults} 
                  setToast={setToast} 
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recommendations" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <RecommendationResultsPage globalResults={globalResults} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/standards" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StandardsLibraryPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/standards/:id" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <StandardDetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tender-analysis" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <TenderAnalysisPage setToast={setToast} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/compliance" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CompliancePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AnalysisHistoryPage setGlobalResults={setGlobalResults} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AboutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage 
                  userProfile={userProfile}
                  onSaveProfile={handleUpdateProfile}
                  setToast={setToast} 
                />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
