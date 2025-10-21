import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, loginUser, sendOTP, verifyOTP, getCurrentUser, logout } from './auth';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signInWithOtp: vi.fn(),
      verifyOtp: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

// Mock the db module to avoid circular dependency
vi.mock('./db', () => ({
  getCurrentUser: vi.fn(),
}));

describe('Authentication Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockAuth = mockSupabase.supabase.auth;
      const mockFrom = mockSupabase.supabase.from;

      // Mock successful auth signup
      mockAuth.signUp.mockResolvedValue({
        data: { user: { id: 'user-id' } },
        error: null,
      });

      // Mock profile creation
      mockFrom.mockReturnValue({
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({
              data: { id: 'user-id', email: 'test@example.com' },
              error: null,
            }),
          })),
        })),
      });

      // Mock role creation
      mockFrom.mockReturnValue({
        insert: vi.fn(() => ({
          data: null,
          error: null,
        })),
      });

      const result = await registerUser('test@example.com', 'password', 'student', 'Test User', 'TEST001');

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.message).toBe('User registered successfully');
    });

    it('should handle registration failure', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.signUp.mockResolvedValue({
        data: null,
        error: { message: 'Email already exists' },
      });

      const result = await registerUser('test@example.com', 'password', 'student', 'Test User', 'TEST001');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email already exists');
    });
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      const mockAuth = mockSupabase.supabase.auth;
      const mockFrom = mockSupabase.supabase.from;

      // Mock successful login
      mockAuth.signInWithPassword.mockResolvedValue({
        data: {
          user: { id: 'user-id' },
          session: { access_token: 'token' }
        },
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

      const result = await loginUser('test@example.com', 'password');

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.token).toBe('token');
      expect(result.message).toBe('Login successful');
    });

    it('should handle login failure', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' },
      });

      const result = await loginUser('test@example.com', 'wrongpassword');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid credentials');
    });
  });

  describe('sendOTP', () => {
    it('should send OTP successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.signInWithOtp.mockResolvedValue({
        data: null,
        error: null,
      });

      const result = await sendOTP('test@example.com');

      expect(result.success).toBe(true);
      expect(result.message).toBe('OTP sent successfully');
    });

    it('should handle OTP send failure', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.signInWithOtp.mockResolvedValue({
        data: null,
        error: { message: 'Invalid email' },
      });

      const result = await sendOTP('invalid-email');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid email');
    });
  });

  describe('verifyOTP', () => {
    it('should verify OTP successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.verifyOtp.mockResolvedValue({
        data: { user: { id: 'user-id' } },
        error: null,
      });

      const result = await verifyOTP('test@example.com', '123456');

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.message).toBe('OTP verified successfully');
    });

    it('should handle OTP verification failure', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.verifyOtp.mockResolvedValue({
        data: null,
        error: { message: 'Invalid OTP' },
      });

      const result = await verifyOTP('test@example.com', 'wrongotp');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid OTP');
    });
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

  describe('logout', () => {
    it('should logout successfully', async () => {
      const mockSupabase = await import('@/integrations/supabase/client');
      mockSupabase.supabase.auth.signOut.mockResolvedValue({
        error: null,
      });

      // Should not throw
      await expect(logout()).resolves.toBeUndefined();
    });
  });
});
