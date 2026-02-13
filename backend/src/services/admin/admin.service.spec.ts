import { AdminService } from './admin.service';

// Mock Prisma
const mockPrisma = {
  user: {
    count: jest.fn(),
    findMany: jest.fn(),
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
  subscription: {
    count: jest.fn(),
  },
  payment: {
    aggregate: jest.fn(),
    findMany: jest.fn(),
  },
  $queryRaw: jest.fn(),
};

describe('AdminService', () => {
  let adminService: AdminService;

  beforeEach(() => {
    jest.clearAllMocks();
    adminService = new AdminService(mockPrisma as any);
  });

  describe('getDashboard', () => {
    it('should get admin dashboard data', async () => {
      mockPrisma.user.count.mockResolvedValue(100);
      mockPrisma.production.count.mockResolvedValue(250);
      mockPrisma.short.count.mockResolvedValue(500);
      mockPrisma.subscription.count.mockResolvedValue(25);

      const result = await adminService.getDashboard();

      expect(result).toBeDefined();
      expect(result.totalUsers).toBe(100);
      expect(result.totalProductions).toBe(250);
      expect(result.totalShorts).toBe(500);
      expect(result.activeSubscriptions).toBe(25);
      expect(result.systemHealth).toBe('healthy');
    });
  });

  describe('getUsers', () => {
    it('should get users with pagination', async () => {
      const mockUsers = [
        {
          id: 'user1',
          email: 'user1@example.com',
          name: 'User 1',
          handle: 'user1',
          role: 'USER',
          subscriptionType: 'FREE',
          tripsRemaining: 0,
          createdAt: new Date(),
          lastLoginAt: null,
        },
        {
          id: 'user2',
          email: 'user2@example.com',
          name: 'User 2',
          handle: 'user2',
          role: 'USER',
          subscriptionType: 'PRO',
          tripsRemaining: 5,
          createdAt: new Date(),
          lastLoginAt: new Date(),
        },
      ];

      mockPrisma.user.findMany.mockResolvedValue(mockUsers);
      mockPrisma.user.count.mockResolvedValue(50);

      const result = await adminService.getUsers(1, 20);

      expect(result).toBeDefined();
      expect(result.users.length).toBe(2);
      expect(result.total).toBe(50);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(3);
    });
  });

  describe('getUser', () => {
    it('should get specific user details', async () => {
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
        productions: [{ id: 'prod1', title: 'Prod 1', status: 'COMPLETED', createdAt: new Date() }],
        shorts: [{ id: 'short1', title: 'Short 1', status: 'COMPLETED', createdAt: new Date() }],
        subscriptions: [],
        trips: [],
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await adminService.getUser('user_id');

      expect(result).toBeDefined();
      expect(result.id).toBe('user_id');
      expect(result.productions).toBeDefined();
      expect(result.shorts).toBeDefined();
    });

    it('should throw error if user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(adminService.getUser('invalid_id')).rejects.toThrow('User not found');
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        name: 'Updated Name',
        handle: 'testuser',
        role: 'USER',
        subscriptionType: 'PRO',
        tripsRemaining: 10,
      };

      mockPrisma.user.update.mockResolvedValue(mockUser);

      const result = await adminService.updateUser('user_id', {
        name: 'Updated Name',
        subscriptionType: 'PRO',
      });

      expect(result).toBeDefined();
      expect(result.name).toBe('Updated Name');
      expect(result.subscriptionType).toBe('PRO');
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      mockPrisma.user.delete.mockResolvedValue({});

      await expect(adminService.deleteUser('user_id')).resolves.not.toThrow();
      expect(mockPrisma.user.delete).toHaveBeenCalledWith({
        where: { id: 'user_id' },
      });
    });
  });

  describe('getAnalytics', () => {
    it('should get analytics data', async () => {
      const mockRecentPayments = [
        {
          id: 'payment1',
          amount: 100,
          status: 'SUCCEEDED',
          createdAt: new Date(),
          user: { id: 'user1', email: 'user1@example.com', name: 'User 1' },
        },
      ];

      mockPrisma.user.count.mockResolvedValueOnce(10).mockResolvedValueOnce(50);
      mockPrisma.payment.aggregate.mockResolvedValue({ _sum: { amount: 5000 } });
      mockPrisma.production.count.mockResolvedValue(30);
      mockPrisma.short.count.mockResolvedValue(60);
      mockPrisma.payment.findMany.mockResolvedValue(mockRecentPayments);

      const result = await adminService.getAnalytics();

      expect(result).toBeDefined();
      expect(result.dailyActiveUsers).toBe(10);
      expect(result.monthlyActiveUsers).toBe(50);
      expect(result.totalRevenue).toBe(5000);
      expect(result.productionsCreated).toBe(30);
      expect(result.shortsCreated).toBe(60);
      expect(result.recentPayments.length).toBe(1);
    });
  });

  describe('getSystemHealth', () => {
    it('should return healthy status when database is connected', async () => {
      mockPrisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

      const result = await adminService.getSystemHealth();

      expect(result).toBeDefined();
      expect(result.status).toBe('healthy');
      expect(result.database).toBe('connected');
      expect(result.queues).toBeDefined();
    });

    it('should return unhealthy status on database error', async () => {
      mockPrisma.$queryRaw.mockRejectedValue(new Error('Connection failed'));

      const result = await adminService.getSystemHealth();

      expect(result).toBeDefined();
      expect(result.status).toBe('unhealthy');
      expect(result.database).toBe('disconnected');
      expect(result.error).toBe('Connection failed');
    });
  });
});
