import { DashboardService } from './dashboard.service';

// Mock Prisma
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
  },
  production: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  short: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  follow: {
    count: jest.fn(),
  },
  timelineEvent: {
    findMany: jest.fn(),
  },
  socialPost: {
    count: jest.fn(),
  },
  socialAccount: {
    findMany: jest.fn(),
  },
};

describe('DashboardService', () => {
  let dashboardService: DashboardService;

  beforeEach(() => {
    jest.clearAllMocks();
    dashboardService = new DashboardService(mockPrisma as any);
  });

  describe('getDashboard', () => {
    it('should get comprehensive dashboard data', async () => {
      const mockUser = {
        id: 'user_id',
        email: 'test@example.com',
        name: 'Test User',
        handle: 'testuser',
        bio: 'Test bio',
        avatarUrl: null,
        subscriptionType: 'FREE',
        tripsRemaining: 0,
        stats: null,
      };

      const mockProductions = [
        {
          id: 'prod1',
          title: 'Prod 1',
          status: 'COMPLETED',
          outputUrl: 'url1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockShorts = [
        {
          id: 'short1',
          title: 'Short 1',
          status: 'COMPLETED',
          outputUrl: 'url2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const mockActivity = [
        {
          id: 'event1',
          eventType: 'PRODUCTION_CREATED',
          contentId: 'prod1',
          contentType: 'production',
          metadata: null,
          createdAt: new Date(),
        },
      ];

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.production.findMany.mockResolvedValue(mockProductions);
      mockPrisma.short.findMany.mockResolvedValue(mockShorts);
      mockPrisma.production.count.mockResolvedValue(1);
      mockPrisma.short.count.mockResolvedValue(1);
      mockPrisma.follow.count.mockResolvedValueOnce(5).mockResolvedValueOnce(10);
      mockPrisma.socialPost.count.mockResolvedValue(3);
      mockPrisma.timelineEvent.findMany.mockResolvedValue(mockActivity);

      const result = await dashboardService.getDashboard('user_id');

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.productions).toBeDefined();
      expect(result.shorts).toBeDefined();
      expect(result.stats).toBeDefined();
      expect(result.recentActivity).toBeDefined();
      expect(result.stats.totalProductions).toBe(1);
      expect(result.stats.totalShorts).toBe(1);
      expect(result.stats.followers).toBe(5);
      expect(result.stats.following).toBe(10);
    });
  });

  describe('getAnalytics', () => {
    it('should get analytics summary', async () => {
      const mockSocialAccounts = [
        {
          id: 'account1',
          platform: 'TIKTOK',
          posts: [
            {
              id: 'post1',
              platform: 'TIKTOK',
              publishedAt: new Date(),
              metrics: {
                views: 1000,
                likes: 100,
                shares: 10,
                comments: 5,
                engagement: 0.115,
              },
            },
          ],
        },
      ];

      mockPrisma.socialAccount.findMany.mockResolvedValue(mockSocialAccounts);
      mockPrisma.socialPost.count.mockResolvedValue(1);

      const result = await dashboardService.getAnalytics('user_id');

      expect(result).toBeDefined();
      expect(result.publishedPosts).toBe(1);
      expect(result.totalViews).toBe(1000);
      expect(result.totalLikes).toBe(100);
      expect(result.totalShares).toBe(10);
      expect(result.totalComments).toBe(5);
      expect(result.platforms).toBeDefined();
      expect(result.platforms.length).toBe(1);
    });
  });
});
