import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DemoBanner from './components/DemoBanner';
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

function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="bg-white rounded-md p-5 border border-slate-200">
        <h2 className="text-sm font-semibold text-slate-900 mb-1">System Configuration & BIS Data Source</h2>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          Configure API connection endpoints, local caching, and repository indexing preferences for ISense AI.
        </p>

        <div className="bg-slate-900 text-slate-200 p-4 rounded-md text-xs font-mono space-y-2">
          <div className="text-blue-400 font-semibold"># API Configuration Settings</div>
          <div>API_BASE_URL=http://localhost:8000/api</div>
          <div>REPOSITORY_INDEX_CACHE=active</div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          Bureau of Indian Standards Catalogue • Version 2.4.1
        </div>
      </div>
    </div>
  );
}

function MainLayout({ children, globalResults, setGlobalResults, toast, setToast }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/login') {
    return children;
  }

  const getPageTitle = (path) => {
    switch (path) {
      case '/':
      case '/dashboard': return { title: "Overview", subtitle: "Indian Standards Intelligence for procurement" };
      case '/search': return { title: "Standards Search", subtitle: "Find applicable Indian Standards from procurement requirements" };
      case '/recommendations': return { title: "Applicable Standards", subtitle: "Identified Indian Standards & compliance analysis" };
      case '/tender-analysis': return { title: "Tender Review", subtitle: "Review procurement specifications for standards and requirement gaps" };
      case '/standards': return { title: "Standards Library", subtitle: "Bureau of Indian Standards repository catalogue" };
      case '/compliance': return { title: "Compliance & QCO Tracker", subtitle: "Quality Control Orders & certification status" };
      case '/history': return { title: "Analysis History", subtitle: "Audit log of past searches and tender reviews" };
      case '/profile': return { title: "Profile & Account", subtitle: "Manage your officer information and account preferences" };
      case '/settings': return { title: "System Settings", subtitle: "API endpoints and repository configuration" };
      default:
        if (path.startsWith('/standards/')) return { title: "Standard Details", subtitle: "Scope, technical requirements, amendments & QCO status" };
        return { title: "ISense AI", subtitle: "Indian Standards Intelligence" };
    }
  };

  const { title, subtitle } = getPageTitle(location.pathname);


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Banner */}
      <DemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <Navbar 
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            title={title}
            subtitle={subtitle}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
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

  return (
    <BrowserRouter>
      <MainLayout 
        globalResults={globalResults} 
        setGlobalResults={setGlobalResults}
        toast={toast}
        setToast={setToast}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
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
          <Route path="/profile" element={<ProfilePage setToast={setToast} />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
