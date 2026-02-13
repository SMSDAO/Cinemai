import { TimelineService } from './timeline.service';
import { EventType } from '@prisma/client';

// Mock Prisma
const mockPrisma = {
  timelineEvent: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  follow: {
    findMany: jest.fn(),
  },
};

describe('TimelineService', () => {
  let timelineService: TimelineService;

  beforeEach(() => {
    jest.clearAllMocks();
    timelineService = new TimelineService(mockPrisma as any);
  });

  describe('createEvent', () => {
    it('should create a timeline event', async () => {
      const mockEvent = {
        id: 'event_id',
        userId: 'user_id',
        eventType: EventType.PRODUCTION_CREATED,
        contentId: 'prod_id',
        contentType: 'production',
        metadata: { title: 'Test Production' },
        createdAt: new Date(),
      };

      mockPrisma.timelineEvent.create.mockResolvedValue(mockEvent);

      const result = await timelineService.createEvent(
        'user_id',
        EventType.PRODUCTION_CREATED,
        'prod_id',
        'production',
        { title: 'Test Production' },
      );

      expect(result).toBeDefined();
      expect(result.eventType).toBe(EventType.PRODUCTION_CREATED);
      expect(mockPrisma.timelineEvent.create).toHaveBeenCalledWith({
        data: {
          userId: 'user_id',
          eventType: EventType.PRODUCTION_CREATED,
          contentId: 'prod_id',
          contentType: 'production',
          metadata: { title: 'Test Production' },
        },
      });
    });
  });

  describe('getUserTimeline', () => {
    it('should get user timeline events', async () => {
      const mockEvents = [
        {
          id: 'event1',
          userId: 'user_id',
          eventType: EventType.PRODUCTION_CREATED,
          createdAt: new Date(),
          user: { id: 'user_id', name: 'Test User', handle: 'testuser', avatarUrl: null },
        },
      ];

      mockPrisma.timelineEvent.findMany.mockResolvedValue(mockEvents);

      const result = await timelineService.getUserTimeline('user_id', 20, 0);

      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(mockPrisma.timelineEvent.findMany).toHaveBeenCalledWith({
        where: { userId: 'user_id' },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: 0,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              handle: true,
              avatarUrl: true,
            },
          },
        },
      });
    });
  });

  describe('getGlobalTimeline', () => {
    it('should get global timeline events', async () => {
      const mockEvents = [
        {
          id: 'event1',
          userId: 'user1',
          eventType: EventType.SHORT_CREATED,
          createdAt: new Date(),
          user: { id: 'user1', name: 'User 1', handle: 'user1', avatarUrl: null },
        },
      ];

      mockPrisma.timelineEvent.findMany.mockResolvedValue(mockEvents);

      const result = await timelineService.getGlobalTimeline(20, 0);

      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(mockPrisma.timelineEvent.findMany).toHaveBeenCalled();
    });
  });

  describe('getFollowingTimeline', () => {
    it('should get timeline from followed users', async () => {
      const mockFollowing = [{ followingId: 'user2' }, { followingId: 'user3' }];
      const mockEvents = [
        {
          id: 'event1',
          userId: 'user2',
          eventType: EventType.PRODUCTION_COMPLETED,
          createdAt: new Date(),
          user: { id: 'user2', name: 'User 2', handle: 'user2', avatarUrl: null },
        },
      ];

      mockPrisma.follow.findMany.mockResolvedValue(mockFollowing);
      mockPrisma.timelineEvent.findMany.mockResolvedValue(mockEvents);

      const result = await timelineService.getFollowingTimeline('user_id', 20, 0);

      expect(result).toBeDefined();
      expect(result.length).toBe(1);
      expect(mockPrisma.follow.findMany).toHaveBeenCalledWith({
        where: { followerId: 'user_id' },
        select: { followingId: true },
      });
      expect(mockPrisma.timelineEvent.findMany).toHaveBeenCalledWith({
        where: { userId: { in: ['user2', 'user3'] } },
        orderBy: { createdAt: 'desc' },
        take: 20,
        skip: 0,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              handle: true,
              avatarUrl: true,
            },
          },
        },
      });
    });
  });
});
