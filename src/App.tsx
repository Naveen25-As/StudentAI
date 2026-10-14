import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { PredictResultPage } from './pages/PredictResultPage';
import { PredictionReportPage } from './pages/PredictionReportPage';
import { PredictionHistoryPage } from './pages/PredictionHistoryPage';
import { AcademicAnalyticsPage } from './pages/AcademicAnalyticsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ProfileSettingsPage } from './pages/ProfileSettingsPage';
import { AdminPortalPage } from './pages/AdminPortalPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Authentication */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Application Shell */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<OverviewDashboard />} />
            <Route path="/overview" element={<Navigate to="/dashboard" replace />} />
            <Route path="/predict" element={<PredictResultPage />} />
            <Route path="/report/:id" element={<PredictionReportPage />} />
            <Route path="/report" element={<PredictionReportPage />} />
            <Route path="/history" element={<PredictionHistoryPage />} />
            <Route path="/analytics" element={<AcademicAnalyticsPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/settings" element={<ProfileSettingsPage />} />
            <Route path="/admin" element={<AdminPortalPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
