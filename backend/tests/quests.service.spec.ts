import { Test, TestingModule } from '@nestjs/testing';
import { QuestsService } from '../src/services/quests/quests.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { QuestType, QuestStatus } from '@prisma/client';

describe('QuestsService', () => {
  let service: QuestsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    quest: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      createMany: jest.fn(),
      count: jest.fn(),
    },
    userQuest: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      count: jest.fn(),
    },
    user: {
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<QuestsService>(QuestsService);
    prisma = module.get<PrismaService>(PrismaService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAvailableQuests', () => {
    it('should return quests with user status', async () => {
      const mockQuests = [
        {
          id: 'quest-1',
          type: QuestType.TWITTER_FOLLOW,
          title: 'Follow us',
          description: 'Follow on Twitter',
          rewardVideos: 1,
          requiredAction: 'Follow @CinemAi',
          isActive: true,
          userQuests: [
            {
              status: QuestStatus.COMPLETED,
              completedAt: new Date(),
              rewardClaimed: true,
            },
          ],
        },
        {
          id: 'quest-2',
          type: QuestType.TWITTER_LIKE,
          title: 'Like tweet',
          description: 'Like our tweet',
          rewardVideos: 1,
          requiredAction: 'Like tweet',
          isActive: true,
          userQuests: [],
        },
      ];

      mockPrismaService.quest.findMany.mockResolvedValue(mockQuests);

      const result = await service.getAvailableQuests('user-123');

      expect(result).toHaveLength(2);
      expect(result[0].status).toBe(QuestStatus.COMPLETED);
      expect(result[1].status).toBe(QuestStatus.AVAILABLE);
    });
  });

  describe('startQuest', () => {
    it('should create new quest progress with quest relation', async () => {
      const mockQuest = {
        id: 'quest-1',
        type: QuestType.TWITTER_FOLLOW,
        isActive: true,
      };

      const mockUserQuest = {
        id: 'user-quest-1',
        userId: 'user-123',
        questId: 'quest-1',
        status: QuestStatus.IN_PROGRESS,
        quest: mockQuest,
      };

      mockPrismaService.quest.findUnique.mockResolvedValue(mockQuest);
      mockPrismaService.userQuest.findUnique.mockResolvedValue(null);
      mockPrismaService.userQuest.create.mockResolvedValue(mockUserQuest);

      const result = await service.startQuest('user-123', 'quest-1');

      expect(result).toEqual(mockUserQuest);
      expect(result.quest).toBeDefined();
      expect(mockPrismaService.userQuest.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          questId: 'quest-1',
          status: QuestStatus.IN_PROGRESS,
        },
        include: { quest: true },
      });
    });

    it('should return existing quest with quest relation', async () => {
      const mockQuest = {
        id: 'quest-1',
        type: QuestType.TWITTER_FOLLOW,
        isActive: true,
      };

      const existingUserQuest = {
        id: 'user-quest-1',
        userId: 'user-123',
        questId: 'quest-1',
        status: QuestStatus.IN_PROGRESS,
        quest: mockQuest,
      };

      mockPrismaService.quest.findUnique.mockResolvedValue(mockQuest);
      mockPrismaService.userQuest.findUnique.mockResolvedValue(existingUserQuest);

      const result = await service.startQuest('user-123', 'quest-1');

      expect(result).toEqual(existingUserQuest);
      expect(result.quest).toBeDefined();
    });

    it('should throw error if quest already completed', async () => {
      mockPrismaService.quest.findUnique.mockResolvedValue({ isActive: true });
      mockPrismaService.userQuest.findUnique.mockResolvedValue({
        status: QuestStatus.COMPLETED,
      });

      await expect(service.startQuest('user-123', 'quest-1')).rejects.toThrow(
        'Quest already completed'
      );
    });
  });

  describe('completeQuest - Transaction & Race Conditions', () => {
    const mockQuest = {
      id: 'quest-1',
      type: QuestType.TWITTER_FOLLOW,
      rewardVideos: 1,
    };

    const mockUserQuest = {
      id: 'user-quest-1',
      userId: 'user-123',
      questId: 'quest-1',
      status: QuestStatus.IN_PROGRESS,
      quest: mockQuest,
    };

    it('should complete quest and award videos atomically', async () => {
      mockPrismaService.userQuest.findUnique.mockResolvedValue(mockUserQuest);

      // Mock transaction callback
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        const tx = {
          userQuest: {
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
          user: {
            update: jest.fn().mockResolvedValue({}),
          },
        };
        return callback(tx);
      });

      const result = await service.completeQuest('user-123', 'quest-1', {
        handle: '@test',
      });

      expect(result.success).toBe(true);
      expect(result.videosAwarded).toBe(1);
      expect(mockPrismaService.$transaction).toHaveBeenCalled();
    });

    it('should prevent double-reward on concurrent completion', async () => {
      mockPrismaService.userQuest.findUnique.mockResolvedValue(mockUserQuest);

      // Mock transaction that returns count: 0 (already completed)
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        const tx = {
          userQuest: {
            updateMany: jest.fn().mockResolvedValue({ count: 0 }),
          },
          user: {
            update: jest.fn(),
          },
        };
        await callback(tx);
      });

      await expect(
        service.completeQuest('user-123', 'quest-1', { handle: '@test' })
      ).rejects.toThrow('Quest already completed or reward already claimed');
    });

    it('should rollback if user update fails', async () => {
      mockPrismaService.userQuest.findUnique.mockResolvedValue(mockUserQuest);

      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        const tx = {
          userQuest: {
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
          user: {
            update: jest.fn().mockRejectedValue(new Error('DB error')),
          },
        };
        return callback(tx);
      });

      await expect(
        service.completeQuest('user-123', 'quest-1', { handle: '@test' })
      ).rejects.toThrow();
    });
  });

  describe('Quest Verification - Production Guards', () => {
    beforeEach(() => {
      // Reset env vars
      delete process.env.TWITTER_API_KEY;
      delete process.env.FARCASTER_API_KEY;
    });

    it('should throw error in production without Twitter API key', async () => {
      process.env.NODE_ENV = 'production';

      await expect(
        service.verifyTwitterFollow('user-123', 'quest-1', '@test')
      ).rejects.toThrow('Quest verification not available in production mode');
    });

    it('should allow stub verification in development', async () => {
      process.env.NODE_ENV = 'development';

      const result = await service.verifyTwitterFollow(
        'user-123',
        'quest-1',
        '@test'
      );

      expect(result).toBe(true);
    });

    it('should throw error in production without Farcaster API key', async () => {
      process.env.NODE_ENV = 'production';

      await expect(
        service.verifyFarcasterFollow('user-123', 'quest-1', 'fid-123')
      ).rejects.toThrow('Quest verification not available in production mode');
    });

    it('should allow stub with API key in production', async () => {
      process.env.NODE_ENV = 'production';
      process.env.TWITTER_API_KEY = 'test-key';

      const result = await service.verifyTwitterFollow(
        'user-123',
        'quest-1',
        '@test'
      );

      expect(result).toBe(true);
    });
  });

  describe('getUserQuestStats', () => {
    it('should calculate total videos earned', async () => {
      const mockCompletedQuests = [
        { quest: { rewardVideos: 1 } },
        { quest: { rewardVideos: 2 } },
        { quest: { rewardVideos: 1 } },
      ];

      mockPrismaService.userQuest.count.mockResolvedValue(3);
      mockPrismaService.userQuest.findMany.mockResolvedValue(
        mockCompletedQuests
      );

      const result = await service.getUserQuestStats('user-123');

      expect(result.completedQuests).toBe(3);
      expect(result.totalVideosEarned).toBe(4);
    });
  });

  describe('seedQuests', () => {
    it('should create 6 default quests', async () => {
      mockPrismaService.quest.count.mockResolvedValue(0);
      mockPrismaService.quest.createMany.mockResolvedValue({ count: 6 });

      await service.seedQuests();

      expect(mockPrismaService.quest.createMany).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({ type: QuestType.TWITTER_FOLLOW }),
          expect.objectContaining({ type: QuestType.TWITTER_LIKE }),
          expect.objectContaining({ type: QuestType.TWITTER_REPOST }),
          expect.objectContaining({ type: QuestType.FARCASTER_FOLLOW }),
          expect.objectContaining({ type: QuestType.FARCASTER_LIKE }),
          expect.objectContaining({ type: QuestType.FARCASTER_RECAST }),
        ]),
      });
    });

    it('should skip seeding if quests already exist', async () => {
      mockPrismaService.quest.count.mockResolvedValue(5);

      await service.seedQuests();

      expect(mockPrismaService.quest.createMany).not.toHaveBeenCalled();
    });
  });
});
