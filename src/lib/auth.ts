// Authentication with Supabase
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@/lib/db';
import {v7 as uuid} from 'uuid'

// Remove duplicate getCurrentUser function - use the one from db.ts

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  message: string;
}

// OTP functionality using Supabase
export const sendOTP = async (email: string, shouldCreateUser: boolean = false): Promise<AuthResult> => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser, // Create user if registering
      }
    });

    if (error) throw error;

    return {
      success: true,
      message: 'OTP sent successfully'
    };
  } catch (error: any) {
    console.error('Error sending OTP:', error);
    return {
      success: false,
      message: error.message || 'Failed to send OTP'
    };
  }
};

export const verifyOTP = async (email: string, otp: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });

    if (error) throw error;

    return {
      success: true,
      user: data.user as any,
      message: 'OTP verified successfully'
    };
  } catch (error: any) {
    console.error('Error verifying OTP:', error);
    return {
      success: false,
      message: error.message || 'Invalid OTP'
    };
  }
};

// Complete registration after OTP verification
export const completeRegistration = async (
  userId: string,
  email: string,
  role: 'institution' | 'student' | 'teacher' | 'government',
  fullName: string,
  nationalId: string
): Promise<AuthResult> => {
  try {
    // Get existing profile (created by trigger)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profileError) throw profileError;

    // Update profile with full name if needed
    if (profile && !profile.full_name && fullName) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', userId);

      if (updateError) throw updateError;
    }

    // Create role-specific record with upsert to handle duplicates
    if (role === 'institution') {
      const { error: institutionError } = await supabase
        .from('institutions')
        .upsert({
          user_id: userId,
          name: fullName,
          aishe_code: nationalId
        }, {
          onConflict: 'user_id'
        });

      if (institutionError) throw institutionError;
    } else if (role === 'student') {
      const { error: studentError } = await supabase
        .from('students')
        .upsert({
          user_id: userId,
          aadhar_id: nationalId
        }, {
          onConflict: 'user_id'
        });

      if (studentError) throw studentError;
    } else if (role === 'teacher') {
      const { error: teacherError } = await supabase
        .from('teachers')
        .upsert({
          user_id: userId,
          apar_id: nationalId
        }, {
          onConflict: 'user_id'
        });

      if (teacherError) throw teacherError;
    }

    return {
      success: true,
      user: profile ? {
        ...profile,
        role
      } : undefined,
      message: 'Registration completed successfully'
    };
  } catch (error: any) {
    console.error('Error completing registration:', error);
    return {
      success: false,
      message: error.message || 'Failed to complete registration'
    };
  }
};



// Register user with Supabase
export const registerUser = async (
  email: string,
  password: string,
  role: 'institution' | 'student' | 'teacher' | 'government',
  fullName: string,
  nationalId: string
): Promise<AuthResult> => {
  try {
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (!authData.user) {
      return { success: false, message: 'Failed to create user account' };
    }

    // Get existing profile (created by trigger)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    // Update profile with full name if needed
    if (profile && !profile.full_name && fullName) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', authData.user.id);

      if (updateError) throw updateError;
    }

    // Create user role with upsert to handle duplicates
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert({
        user_id: authData.user.id,
        role
      }, {
        onConflict: 'user_id'
      });

    if (roleError) throw roleError;

    // Create role-specific record with upsert to handle duplicates
    if (role === 'institution') {
      const { error: institutionError } = await supabase
        .from('institutions')
        .upsert({
          user_id: authData.user.id,
          name: fullName,
          aishe_code: nationalId
        }, {
          onConflict: 'user_id'
        });

      if (institutionError) throw institutionError;
    } else if (role === 'student') {
      const { error: studentError } = await supabase
        .from('students')
        .upsert({
          user_id: authData.user.id,
          aadhar_id: nationalId
        }, {
          onConflict: 'user_id'
        });

      if (studentError) throw studentError;
    } else if (role === 'teacher') {
      const { error: teacherError } = await supabase
        .from('teachers')
        .upsert({
          user_id: authData.user.id,
          apar_id: nationalId
        }, {
          onConflict: 'user_id'
        });

      if (teacherError) throw teacherError;
    }

    return {
      success: true,
      user: profile ? {
        ...profile,
        role
      } : undefined,
      message: 'User registered successfully'
    };
  } catch (error: any) {
    console.error('Error registering user:', error);
    return {
      success: false,
      message: error.message || 'Failed to register user'
    };
  }
};

// Login user with Supabase
export const loginUser = async (email: string, password: string): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Get user profile and role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (roleError) throw roleError;

    return {
      success: true,
      user: profile ? {
        ...profile,
        role: roleData?.role
      } : undefined,
      token: data.session?.access_token,
      message: 'Login successful'
    };
  } catch (error: any) {
    console.error('Error logging in:', error);
    return {
      success: false,
      message: error.message || 'Invalid email or password'
    };
  }
};

// Import getCurrentUser from db.ts instead of duplicating
export { getCurrentUser } from './db';

// Logout
export const logout = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
