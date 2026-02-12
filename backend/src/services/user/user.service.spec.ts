import { UserService } from './user.service';
import { SubscriptionType, UserRole } from '@prisma/client';

// Mock Prisma
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  production: {
    count: jest.fn(),
  },
  short: {
    count: jest.fn(),
  },
  follow: {
    count: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserService(mockPrisma as any);
  });

  describe('getProfile', () => {
    it('should get user profile', async () => {
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
        avatarUrl: null,
        subscriptionType: SubscriptionType.FREE,
        tripsRemaining: 0,
        role: UserRole.USER,
        createdAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.getProfile('user_id');

      expect(result).toBeDefined();
      expect(result.id).toBe('user_id');
      expect(result.email).toBe('test@example.com');
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'user_id' },
        select: {
          id: true,
          email: true,
          name: true,
          handle: true,
          bio: true,
          avatarUrl: true,
          subscriptionType: true,
          tripsRemaining: true,
          role: true,
          stats: true,
          createdAt: true,
        },
      });
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const mockUpdatedUser = {
        id: 'user_id',
        email: 'test@example.com',
        name: 'Updated Name',
        avatarUrl: null,
        subscriptionType: SubscriptionType.FREE,
        tripsRemaining: 0,
      };

      mockPrisma.user.update.mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateProfile('user_id', { name: 'Updated Name' });

      expect(result).toBeDefined();
      expect(result.name).toBe('Updated Name');
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user_id' },
        data: { name: 'Updated Name' },
        select: {
          id: true,
          email: true,
          name: true,
          handle: true,
          bio: true,
          avatarUrl: true,
          subscriptionType: true,
          tripsRemaining: true,
        },
      });
    });
  });

  describe('deleteAccount', () => {
    it('should delete user account', async () => {
      mockPrisma.user.delete.mockResolvedValue({});

      await expect(userService.deleteAccount('user_id')).resolves.not.toThrow();
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: 'user_id' },
      });
    });
  });

  describe('getUserStats', () => {
    it('should get user stats', async () => {
      mockPrisma.production.count.mockResolvedValue(10);
      mockPrisma.short.count.mockResolvedValue(20);
      mockPrisma.follow.count.mockResolvedValueOnce(50).mockResolvedValueOnce(30);
      mockPrisma.user.update.mockResolvedValue({
        id: 'user_id',
        stats: {
          productions: 10,
          shorts: 20,
          followers: 50,
          following: 30,
        },
      });

      const result = await userService.getUserStats('user_id');

      expect(result).toBeDefined();
      expect(result.productions).toBe(10);
      expect(result.shorts).toBe(20);
      expect(result.followers).toBe(50);
      expect(result.following).toBe(30);
    });
  });
});
