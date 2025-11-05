import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { getCurrentUser } from '../lib/auth';

interface AuthContextType {
  user: any;
  userProfile: any;
  loading: boolean;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  setUser: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // ✅ First get the current session safely
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          setUser(session.user);

          // Fetch profile only if user exists
          const profile = await getCurrentUser();
<<<<<<< HEAD
          setUserProfile(profile);
        } else {
          setUser(null);
          setUserProfile(null);
=======
          
          if (profile) {
            setUserProfile(profile);
            // Persist role for quick access on refresh
            if (profile.role) {
              localStorage.setItem('userRole', profile.role);
            }
          }
        } else {
          // No valid session, clear everything
          setUser(null);
          setUserProfile(null);
          localStorage.removeItem('supabaseSession');
          localStorage.removeItem('userRole');
>>>>>>> c6775f1a534af44d0cb78a1cb5c3e710ef9841f0
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user.id && _event === 'SIGNED_IN') {
        setUser(session.user);
        console.log('Auth state changed, fetching user profile.', session.user);
        setLoading(false);

        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (roleError) {
          console.warn('Role not found for user, this may cause loading issues:', roleError);
          // Don't throw error, return profile without role to prevent infinite loading
        }
        console.log(roleData)
        setUserProfile({
          ...session.user,
          role: roleData?.role
        });
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
