// Database integration with Supabase
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

// Re-export types from Supabase
export type User = Tables<'profiles'> & {
  role?: Tables<'user_roles'>['role'];
};

export type Institution = Tables<'institutions'>;
export type Scheme = Tables<'schemes'>;
export type Student = Tables<'students'>;
export type Teacher = Tables<'teachers'>;
export type NIRFRanking = Tables<'nirf_rankings'>;
export type Activity = Tables<'activities'>;
export type SchemeBeneficiary = Tables<'scheme_beneficiaries'>;

// Database functions using Supabase

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('schemes').select('count').limit(1);
    if (error) throw error;
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
    return false;
  }
};

// User functions
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (roleError) throw roleError;

    return {
      ...profile,
      role: roleData?.role
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (profileError) throw profileError;

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', id)
      .single();

    if (roleError) throw roleError;

    return {
      ...profile,
      role: roleData?.role
    };
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
};

// Institution functions
export const getInstitutions = async (): Promise<Institution[]> => {
  try {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting institutions:', error);
    return [];
  }
};

export const getInstitutionById = async (id: string): Promise<Institution | null> => {
  try {
    const { data, error } = await supabase
      .from('institutions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting institution by ID:', error);
    return null;
  }
};

export const createInstitution = async (institution: TablesInsert<'institutions'>): Promise<Institution | null> => {
  try {
    const { data, error } = await supabase
      .from('institutions')
      .insert(institution)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating institution:', error);
    return null;
  }
};

export const updateInstitution = async (id: string, updates: TablesUpdate<'institutions'>): Promise<Institution | null> => {
  try {
    const { data, error } = await supabase
      .from('institutions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating institution:', error);
    return null;
  }
};

// Scheme functions
export const getSchemes = async (): Promise<Scheme[]> => {
  try {
    const { data, error } = await supabase
      .from('schemes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting schemes:', error);
    return [];
  }
};

export const getSchemeById = async (id: string): Promise<Scheme | null> => {
  try {
    const { data, error } = await supabase
      .from('schemes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting scheme by ID:', error);
    return null;
  }
};

// Student functions
export const getStudents = async (): Promise<Student[]> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting students:', error);
    return [];
  }
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting student by ID:', error);
    return null;
  }
};

// Teacher functions
export const getTeachers = async (): Promise<Teacher[]> => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting teachers:', error);
    return [];
  }
};

export const getTeacherById = async (id: string): Promise<Teacher | null> => {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting teacher by ID:', error);
    return null;
  }
};

// NIRF Rankings functions
export const getNIRFRankings = async (institutionId?: string): Promise<NIRFRanking[]> => {
  try {
    let query = supabase
      .from('nirf_rankings')
      .select('*')
      .order('year', { ascending: false });

    if (institutionId) {
      query = query.eq('institution_id', institutionId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting NIRF rankings:', error);
    return [];
  }
};

// Activities functions
export const getActivities = async (institutionId?: string): Promise<Activity[]> => {
  try {
    let query = supabase
      .from('activities')
      .select('*')
      .order('created_at', { ascending: false });

    if (institutionId) {
      query = query.eq('institution_id', institutionId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting activities:', error);
    return [];
  }
};

// Scheme Beneficiaries functions
export const getSchemeBeneficiaries = async (schemeId?: string): Promise<SchemeBeneficiary[]> => {
  try {
    let query = supabase
      .from('scheme_beneficiaries')
      .select('*')
      .order('created_at', { ascending: false });

    if (schemeId) {
      query = query.eq('scheme_id', schemeId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting scheme beneficiaries:', error);
    return [];
  }
};

// Legacy mock functions for backward compatibility (to be removed)
export const mockDb = {
  users: [],
  institutions: [],
  schemes: [],
  init: () => {}
};

export const query = async (text: string, params?: unknown[]) => {
  console.warn('Legacy query function called - should be replaced with Supabase functions');
  return { rows: [], rowCount: 0 };
};
