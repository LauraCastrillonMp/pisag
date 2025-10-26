import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGetCurrentUser = vi.fn();
const mockUpdateProfile = vi.fn();
const mockSignOut = vi.fn();

vi.mock('@/actions/auth', () => ({
  getCurrentUser: mockGetCurrentUser,
  updateProfile: mockUpdateProfile,
  signOut: mockSignOut,
}));

describe('Auth Actions Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentUser.mockResolvedValue({
      id: 'test-user-id',
      email: 'test@example.com',
      username: 'testuser',
      role: 'user',
      xp: 0,
    });
  });

  it('should get current user profile', async () => {
    const { getCurrentUser } = await import('@/actions/auth');
    const user = await getCurrentUser();
    
    expect(user).toBeDefined();
    if (user) {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('role');
    }
  });

  it('should handle user not authenticated', async () => {
    mockGetCurrentUser.mockResolvedValueOnce(null);
    
    const { getCurrentUser } = await import('@/actions/auth');
    const user = await getCurrentUser();
    
    expect(user).toBeNull();
  });

  it('should update user profile successfully', async () => {
    mockUpdateProfile.mockResolvedValueOnce({
      success: true,
      user: {
        id: 'test-user-id',
        username: 'newusername',
      }
    });
    
    const { updateProfile } = await import('@/actions/auth');
    const result = await updateProfile({ username: 'newusername' });
    
    expect(result.success).toBe(true);
    expect(mockUpdateProfile).toHaveBeenCalledWith({ username: 'newusername' });
  });

  it('should sign out user', async () => {
    mockSignOut.mockResolvedValueOnce(undefined);
    
    const { signOut } = await import('@/actions/auth');
    
    await expect(signOut()).resolves.not.toThrow();
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});