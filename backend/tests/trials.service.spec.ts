import { Test, TestingModule } from '@nestjs/testing';
import { TrialsService } from '../src/services/trials/trials.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { TrialStatus } from '@prisma/client';

describe('TrialsService', () => {
  let service: TrialsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    trial: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
      count: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrialsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TrialsService>(TrialsService);
    prisma = module.get<PrismaService>(PrismaService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('createTrialForUser', () => {
    it('should create a trial with 1 video and 3-day expiration', async () => {
      const userId = 'user-123';
      const mockTrial = {
        id: 'trial-123',
        userId,
        videosRemaining: 1,
        status: TrialStatus.ACTIVE,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.trial.create.mockResolvedValue(mockTrial);

      const result = await service.createTrialForUser(userId);

      expect(result).toEqual(mockTrial);
      expect(mockPrismaService.trial.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId,
          videosRemaining: 1,
          status: TrialStatus.ACTIVE,
        }),
      });
    });
  });

  describe('canCreateContent', () => {
    it('should allow Pro users without checking trials', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-123',
        subscriptionType: 'PRO',
        tripsRemaining: 0,
      });

      const result = await service.canCreateContent('user-123');

      expect(result.allowed).toBe(true);
      expect(mockPrismaService.trial.findFirst).not.toHaveBeenCalled();
    });

    it('should allow users with available trips', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-123',
        subscriptionType: 'FREE',
        tripsRemaining: 5,
      });

      const result = await service.canCreateContent('user-123');

      expect(result.allowed).toBe(true);
      expect(result.tripsRemaining).toBe(5);
    });

    it('should allow users with active trial', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-123',
        subscriptionType: 'FREE',
        tripsRemaining: 0,
      });

      mockPrismaService.trial.findFirst.mockResolvedValue({
        id: 'trial-123',
        userId: 'user-123',
        videosRemaining: 1,
        status: TrialStatus.ACTIVE,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      });

      const result = await service.canCreateContent('user-123');

      expect(result.allowed).toBe(true);
      expect(result.trialVideosRemaining).toBe(1);
    });

    it('should deny users without credits', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'user-123',
        subscriptionType: 'FREE',
        tripsRemaining: 0,
      });

      mockPrismaService.trial.findFirst.mockResolvedValue(null);

      const result = await service.canCreateContent('user-123');

      expect(result.allowed).toBe(false);
      expect(result.reason).toContain('No credits available');
    });
  });

  describe('consumeTrialVideo - Race Condition Prevention', () => {
    it('should atomically decrement videosRemaining', async () => {
      const userId = 'user-123';
      
      // Mock successful decrement
      mockPrismaService.trial.updateMany.mockResolvedValueOnce({ count: 1 });
      mockPrismaService.trial.updateMany.mockResolvedValueOnce({ count: 0 }); // No trials at 0
      mockPrismaService.trial.findFirst.mockResolvedValue({
        id: 'trial-123',
        videosRemaining: 0,
        status: TrialStatus.CONSUMED,
      });

      await service.consumeTrialVideo(userId);

      // Verify atomic updateMany with where clause
      expect(mockPrismaService.trial.updateMany).toHaveBeenCalledWith({
        where: {
          userId,
          status: TrialStatus.ACTIVE,
          expiresAt: expect.any(Object),
          videosRemaining: { gt: 0 },
        },
        data: {
          videosRemaining: { decrement: 1 },
        },
      });
    });

    it('should throw error when no active trial exists', async () => {
      mockPrismaService.trial.updateMany.mockResolvedValue({ count: 0 });
      mockPrismaService.trial.findFirst.mockResolvedValue(null);

      await expect(service.consumeTrialVideo('user-123')).rejects.toThrow(
        'No active trial found'
      );
    });

    it('should throw error when no videos remaining', async () => {
      mockPrismaService.trial.updateMany.mockResolvedValue({ count: 0 });
      mockPrismaService.trial.findFirst.mockResolvedValue({
        id: 'trial-123',
        videosRemaining: 0,
        status: TrialStatus.ACTIVE,
      });

      await expect(service.consumeTrialVideo('user-123')).rejects.toThrow(
        'No videos remaining in trial'
      );
    });

    it('should handle concurrent requests correctly', async () => {
      // Simulate race: second request gets count: 0 (first already consumed)
      mockPrismaService.trial.updateMany
        .mockResolvedValueOnce({ count: 1 }) // First request succeeds
        .mockResolvedValueOnce({ count: 0 }); // Second request fails (no rows updated)

      mockPrismaService.trial.findFirst.mockResolvedValue({
        id: 'trial-123',
        videosRemaining: 0,
        status: TrialStatus.CONSUMED,
      });

      // First request should succeed
      await service.consumeTrialVideo('user-123');

      // Second concurrent request should fail
      mockPrismaService.trial.updateMany.mockResolvedValueOnce({ count: 0 });
      await expect(service.consumeTrialVideo('user-123')).rejects.toThrow();
    });
  });

  describe('getTrialStats', () => {
    it('should count only consumed/expired trials as used', async () => {
      mockPrismaService.trial.findFirst.mockResolvedValue(null);
      mockPrismaService.trial.count.mockResolvedValue(3);

      const result = await service.getTrialStats('user-123');

      expect(result.totalTrialsUsed).toBe(3);
      expect(mockPrismaService.trial.count).toHaveBeenCalledWith({
        where: {
          userId: 'user-123',
          status: {
            in: [TrialStatus.CONSUMED, TrialStatus.EXPIRED],
          },
        },
      });
    });
  });

  describe('expireOldTrials', () => {
    it('should mark expired active trials as EXPIRED', async () => {
      mockPrismaService.trial.updateMany.mockResolvedValue({ count: 5 });

      const result = await service.expireOldTrials();

      expect(result).toBe(5);
      expect(mockPrismaService.trial.updateMany).toHaveBeenCalledWith({
        where: {
          status: TrialStatus.ACTIVE,
          expiresAt: { lt: expect.any(Date) },
        },
        data: {
          status: TrialStatus.EXPIRED,
        },
      });
    });
  });
});
