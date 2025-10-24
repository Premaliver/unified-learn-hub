import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import Analytics from "./pages/Analytics";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to handle root route redirection based on user role
const RootRedirect = () => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to appropriate dashboard based on role
  const roleRoutes = {
    institution: '/dashboard',
    teacher: '/faculty-dashboard',
    student: '/student-dashboard',
    government: '/government-dashboard'
  };

  const redirectPath = roleRoutes[userProfile?.role as keyof typeof roleRoutes] || '/dashboard';
  return <Navigate to={redirectPath} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/auth" element={<Auth />} />

            {/* Institution Dashboard - Only for institution role */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['institution']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Student Dashboard - Only for student role */}
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Faculty Dashboard - Only for teacher role */}
            <Route
              path="/faculty-dashboard"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />

            {/* Government Dashboard - Only for government role */}
            <Route
              path="/government-dashboard"
              element={
                <ProtectedRoute allowedRoles={['government']}>
                  <GovernmentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Shared Routes - Accessible by all authenticated users */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoute>
                  <Students />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
