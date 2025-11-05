import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, userProfile, loading } = useAuth();
  const router = useNavigate()

  useEffect(()=>{
    console.log('ProtectedRoute - user:', user);
    console.log('ProtectedRoute - userProfile:', userProfile);
    console.log('ProtectedRoute - loading:', loading);

    if (!loading && !user) {
      // User is not authenticated, redirect to /auth
      return router('/auth');
    }

    // Check role-based access if roles are specified
    if (userProfile && allowedRoles && !allowedRoles.includes(userProfile.role)) {
      // Redirect to appropriate dashboard based on user's actual role
      const roleRoutes = {
        institution: '/dashboard',
        teacher: '/faculty-dashboard',
        student: '/student-dashboard',
        government: '/dashboard' // Default to institution dashboard for government
      };

      const redirectPath = roleRoutes[userProfile.role as keyof typeof roleRoutes] || '/dashboard';
      return router(redirectPath);
    }

  
  }, [user, loading, allowedRoles]);

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




  // If user is authenticated and role is correct, render children
  return <>{children}</>;
};

export default ProtectedRoute;
