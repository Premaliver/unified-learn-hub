import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If no role yet, show loading (role is being fetched)
  if (!userProfile?.role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Check role-based access if roles are specified
  if (allowedRoles && !allowedRoles.includes(userProfile.role)) {
    // Redirect to appropriate dashboard based on user's actual role
    const roleRoutes = {
      institution: '/dashboard',
      teacher: '/faculty-dashboard',
      student: '/student-dashboard',
      government: '/dashboard' // Default to institution dashboard for government
    };

    const redirectPath = roleRoutes[userProfile.role as keyof typeof roleRoutes] || '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // If user is authenticated and role is correct, render children
  return <>{children}</>;
};

export default ProtectedRoute;
