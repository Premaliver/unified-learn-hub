import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getCurrentUser,
  getInstitutions,
  getSchemes,
  getStudents,
  getTeachers,
  getNIRFRankings,
  getActivities,
  getSchemeBeneficiaries,
  createInstitution,
  updateInstitution
} from './db';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
        order: vi.fn(() => ({
          data: [],
          error: null,
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
    })),
  },
}));

describe('Database Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockAuth = mockSupabase.supabase.auth;
      const mockFrom = mockSupabase.supabase.from;

      // Mock getUser
      mockAuth.getUser.mockResolvedValue({
        data: { user: { id: 'user-id' } },
        error: null,
      });

      // Mock profile fetch
      mockFrom.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: { id: 'user-id', email: 'test@example.com' },
              error: null,
            }),
          })),
        })),
      });

      // Mock role fetch
      mockFrom.mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: { role: 'student' },
              error: null,
            }),
          })),
        })),
      });

      const user = await getCurrentUser();

      expect(user).toBeDefined();
      expect(user?.id).toBe('user-id');
      expect(user?.role).toBe('student');
    });

    it('should return null when no user is logged in', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      const user = await getCurrentUser();

      expect(user).toBeNull();
    });
  });

  describe('getInstitutions', () => {
    it('should get institutions successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockInstitutions = [
        { id: '1', name: 'Test University', aishe_code: 'AISHE001' },
        { id: '2', name: 'Another University', aishe_code: 'AISHE002' },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockInstitutions,
          error: null,
        }),
      });

      const institutions = await getInstitutions();

      expect(institutions).toEqual(mockInstitutions);
    });

    it('should handle error when fetching institutions', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getInstitutions()).rejects.toThrow('Database error');
    });
  });

  describe('getSchemes', () => {
    it('should get schemes successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockSchemes = [
        { id: '1', name: 'PM-USHA', description: 'Test scheme' },
        { id: '2', name: 'RUSA', description: 'Another scheme' },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockSchemes,
          error: null,
        }),
      });

      const schemes = await getSchemes();

      expect(schemes).toEqual(mockSchemes);
    });

    it('should handle error when fetching schemes', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getSchemes()).rejects.toThrow('Database error');
    });
  });

  describe('getStudents', () => {
    it('should get students successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockStudents = [
        { id: '1', user_id: 'user1', aadhar_id: 'AADHAR001' },
        { id: '2', user_id: 'user2', aadhar_id: 'AADHAR002' },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockStudents,
          error: null,
        }),
      });

      const students = await getStudents();

      expect(students).toEqual(mockStudents);
    });

    it('should handle error when fetching students', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getStudents()).rejects.toThrow('Database error');
    });
  });

  describe('getTeachers', () => {
    it('should get teachers successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockTeachers = [
        { id: '1', user_id: 'user1', apar_id: 'APAR001' },
        { id: '2', user_id: 'user2', apar_id: 'APAR002' },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockTeachers,
          error: null,
        }),
      });

      const teachers = await getTeachers();

      expect(teachers).toEqual(mockTeachers);
    });

    it('should handle error when fetching teachers', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getTeachers()).rejects.toThrow('Database error');
    });
  });

  describe('getNIRFRankings', () => {
    it('should get NIRF rankings successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockRankings = [
        { id: '1', institution_id: 'inst1', year: 2024, overall_rank: 50 },
        { id: '2', institution_id: 'inst2', year: 2024, overall_rank: 45 },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockRankings,
          error: null,
        }),
      });

      const rankings = await getNIRFRankings();

      expect(rankings).toEqual(mockRankings);
    });

    it('should handle error when fetching NIRF rankings', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getNIRFRankings()).rejects.toThrow('Database error');
    });
  });

  describe('getActivities', () => {
    it('should get activities successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockActivities = [
        { id: '1', title: 'Test Activity', description: 'Activity description' },
        { id: '2', title: 'Another Activity', description: 'Another description' },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockActivities,
          error: null,
        }),
      });

      const activities = await getActivities();

      expect(activities).toEqual(mockActivities);
    });

    it('should handle error when fetching activities', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getActivities()).rejects.toThrow('Database error');
    });
  });

  describe('getSchemeBeneficiaries', () => {
    it('should get scheme beneficiaries successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const mockBeneficiaries = [
        { id: '1', student_id: 'student1', scheme_id: 'scheme1' },
        { id: '2', institution_id: 'inst1', scheme_id: 'scheme2' },
      ];

      mockFrom.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: mockBeneficiaries,
          error: null,
        }),
      });

      const beneficiaries = await getSchemeBeneficiaries();

      expect(beneficiaries).toEqual(mockBeneficiaries);
    });

    it('should handle error when fetching scheme beneficiaries', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        select: vi.fn().mockResolvedValue({
          data: null,
          error: { message: 'Database error' },
        }),
      });

      await expect(getSchemeBeneficiaries()).rejects.toThrow('Database error');
    });
  });

  describe('createInstitution', () => {
    it('should create institution successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const institutionData = {
        user_id: 'user-id',
        aishe_code: 'AISHE001',
        name: 'Test University',
        type: 'University',
        location: 'Delhi',
        state: 'Delhi',
        established_year: 1950,
        website: 'https://test.edu',
        total_students: 1000,
        total_faculty: 50,
      };

      const mockCreatedInstitution = { id: 'new-id', ...institutionData };

      mockFrom.mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: mockCreatedInstitution,
              error: null,
            }),
          })),
        })),
      });

      const result = await createInstitution(institutionData);

      expect(result).toEqual(mockCreatedInstitution);
    });

    it('should handle error when creating institution', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: { message: 'Database error' },
            }),
          })),
        })),
      });

      await expect(createInstitution({
        user_id: 'user-id',
        aishe_code: 'AISHE001',
        name: 'Test University',
      })).rejects.toThrow('Database error');
    });
  });

  describe('updateInstitution', () => {
    it('should update institution successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockFrom = mockSupabase.supabase.from;

      const updateData = {
        name: 'Updated University',
        total_students: 1200,
      };

      const mockUpdatedInstitution = {
        id: 'inst-id',
        name: 'Updated University',
        total_students: 1200,
      };

      mockFrom.mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({
                data: mockUpdatedInstitution,
                error: null,
              }),
            })),
          })),
        })),
      });

      const result = await updateInstitution('inst-id', updateData);

      expect(result).toEqual(mockUpdatedInstitution);
    });

    it('should handle error when updating institution', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.from.mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({
                data: null,
                error: { message: 'Database error' },
              }),
            })),
          })),
        })),
      });

      await expect(updateInstitution('inst-id', { name: 'New Name' })).rejects.toThrow('Database error');
    });
  });
});
