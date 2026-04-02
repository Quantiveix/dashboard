import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import SSOCallback from "@/pages/auth/SSOCallback";
import Overview from "@/pages/dashboard/Overview";
import FinancialAnalytics from "@/pages/dashboard/FinancialAnalytics";
import AIInsights from "@/pages/dashboard/AIInsights";
import Transactions from "@/pages/dashboard/Transactions";
import AddTransaction from "@/pages/dashboard/AddTransaction";
import SpendingCategories from "@/pages/dashboard/SpendingCategories";
import PredictiveForecasts from "@/pages/dashboard/PredictiveForecasts";
import ConnectedAccounts from "@/pages/dashboard/ConnectedAccounts";
import SystemMonitor from "@/pages/dashboard/SystemMonitor";
import ProfileSettings from "@/pages/dashboard/ProfileSettings";
import NotFound from "@/pages/NotFound";
import ScrollToTop from "@/components/layout/ScrollToTop";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {/* SSO Callback: MUST be unguarded so Clerk can process the OAuth token */}
      <Route path="/sso-callback" element={<SSOCallback />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="analytics" element={<FinancialAnalytics />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="add-transaction" element={<AddTransaction />} />
        <Route path="categories" element={<SpendingCategories />} />
        <Route path="forecasts" element={<PredictiveForecasts />} />
        <Route path="accounts" element={<ConnectedAccounts />} />
        <Route path="system" element={<SystemMonitor />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
