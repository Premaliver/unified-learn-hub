import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { getCurrentUser } from '../lib/auth';

interface AuthContextType {
  user: any;
  userProfile: any;
  loading: boolean;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Logout function
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem('supabaseSession');
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Load saved session and profile on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // First check if we have a valid Supabase session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (session && !error) {
          setUser(session.user);
          localStorage.setItem('supabaseSession', JSON.stringify(session));

          // Load user profile with role
          const profile = await getCurrentUser();
          setUserProfile(profile);

          // Persist role for quick access on refresh
          if (profile?.role) {
            localStorage.setItem('userRole', profile.role);
          }
        } else {
          // Check if we have cached role for immediate UI rendering
          const cachedRole = localStorage.getItem('userRole');
          if (cachedRole) {
            setUserProfile({ role: cachedRole });
          }

          // No valid session, clear everything
          setUser(null);
          if (!cachedRole) {
            setUserProfile(null);
          }
          localStorage.removeItem('supabaseSession');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUser(null);
        setUserProfile(null);
        localStorage.removeItem('supabaseSession');
        localStorage.removeItem('userRole');
      } finally {
        // Always set loading to false
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Listen for Supabase auth changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);

      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
        localStorage.setItem('supabaseSession', JSON.stringify(session));

        // Load user profile with role
        const profile = await getCurrentUser();
        setUserProfile(profile);

        // Persist role for quick access
        if (profile?.role) {
          localStorage.setItem('userRole', profile.role);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setUserProfile(null);
        localStorage.removeItem('supabaseSession');
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
