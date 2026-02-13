import { SyncService } from './sync.service';

// Mock Prisma
const mockPrisma = {
  streamSession: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  production: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  short: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  timelineEvent: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  socialPost: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

describe('SyncService', () => {
  let syncService: SyncService;

  beforeEach(() => {
    jest.clearAllMocks();
    syncService = new SyncService(mockPrisma as any);
  });

  describe('initSession', () => {
    it('should create a new sync session if none exists', async () => {
      const mockSession = {
        id: 'session_id',
        userId: 'user_id',
        lastSyncAt: new Date(),
        metadata: { device: 'mobile' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.streamSession.findFirst.mockResolvedValue(null);
      mockPrisma.streamSession.create.mockResolvedValue(mockSession);

      const result = await syncService.initSession('user_id', { device: 'mobile' });

      expect(result).toBeDefined();
      expect(result.userId).toBe('user_id');
      expect(mockPrisma.streamSession.create).toHaveBeenCalledWith({
        data: {
          userId: 'user_id',
          metadata: { device: 'mobile' },
        },
      });
    });

    it('should update existing sync session', async () => {
      const existingSession = {
        id: 'session_id',
        userId: 'user_id',
        lastSyncAt: new Date(Date.now() - 60000),
        metadata: { device: 'web' },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedSession = {
        ...existingSession,
        lastSyncAt: new Date(),
        metadata: { device: 'mobile' },
      };

      mockPrisma.streamSession.findFirst.mockResolvedValue(existingSession);
      mockPrisma.streamSession.update.mockResolvedValue(updatedSession);

      const result = await syncService.initSession('user_id', { device: 'mobile' });

      expect(result).toBeDefined();
      expect(mockPrisma.streamSession.update).toHaveBeenCalled();
    });
  });

  describe('getUpdates', () => {
    it('should get updates since last sync', async () => {
      const mockSession = {
        id: 'session_id',
        userId: 'user_id',
        lastSyncAt: new Date(Date.now() - 3600000),
      };

      const mockProductions = [
        { id: 'prod1', title: 'Prod 1', status: 'COMPLETED', updatedAt: new Date() },
      ];
      const mockShorts = [
        { id: 'short1', title: 'Short 1', status: 'COMPLETED', updatedAt: new Date() },
      ];
      const mockEvents = [{ id: 'event1', eventType: 'PRODUCTION_CREATED', createdAt: new Date() }];
      const mockPosts = [{ id: 'post1', platform: 'TIKTOK', createdAt: new Date() }];

      mockPrisma.streamSession.findFirst.mockResolvedValue(mockSession);
      mockPrisma.production.findMany.mockResolvedValue(mockProductions);
      mockPrisma.short.findMany.mockResolvedValue(mockShorts);
      mockPrisma.timelineEvent.findMany.mockResolvedValue(mockEvents);
      mockPrisma.socialPost.findMany.mockResolvedValue(mockPosts);
      mockPrisma.streamSession.update.mockResolvedValue(mockSession);

      const result = await syncService.getUpdates('user_id');

      expect(result).toBeDefined();
      expect(result.productions).toBeDefined();
      expect(result.shorts).toBeDefined();
      expect(result.timelineEvents).toBeDefined();
      expect(result.socialPosts).toBeDefined();
      expect(result.syncedAt).toBeDefined();
    });
  });

  describe('poll', () => {
    it('should check for changes since last sync', async () => {
      const mockSession = {
        id: 'session_id',
        userId: 'user_id',
        lastSyncAt: new Date(Date.now() - 60000),
      };

      mockPrisma.streamSession.findFirst.mockResolvedValue(mockSession);
      mockPrisma.production.count.mockResolvedValue(2);
      mockPrisma.short.count.mockResolvedValue(1);
      mockPrisma.timelineEvent.count.mockResolvedValue(3);

      const result = await syncService.poll('user_id');

      expect(result).toBeDefined();
      expect(result.hasChanges).toBe(true);
      expect(result.changes.productions).toBe(2);
      expect(result.changes.shorts).toBe(1);
      expect(result.changes.events).toBe(3);
    });

    it('should return no changes when no session exists', async () => {
      mockPrisma.streamSession.findFirst.mockResolvedValue(null);

      const result = await syncService.poll('user_id');

      expect(result).toBeDefined();
      expect(result.hasChanges).toBe(false);
      expect(result.message).toContain('No active session');
    });
  });

  describe('getStatus', () => {
    it('should get sync status', async () => {
      const mockSession = {
        id: 'session_id',
        userId: 'user_id',
        lastSyncAt: new Date(),
        metadata: { device: 'mobile' },
      };

      mockPrisma.streamSession.findFirst.mockResolvedValue(mockSession);

      const result = await syncService.getStatus('user_id');

      expect(result).toBeDefined();
      expect(result.active).toBe(true);
      expect(result.sessionId).toBe('session_id');
    });

    it('should return inactive when no session exists', async () => {
      mockPrisma.streamSession.findFirst.mockResolvedValue(null);

      const result = await syncService.getStatus('user_id');

      expect(result).toBeDefined();
      expect(result.active).toBe(false);
    });
  });
});
