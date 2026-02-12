import { ShortsService } from './shorts.service';
import { ShortStatus, VideoFormat } from '@prisma/client';

// Mock Prisma
const mockPrisma = {
  short: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  shortVariant: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('ShortsService', () => {
  let shortsService: ShortsService;

  beforeEach(() => {
    jest.clearAllMocks();
    shortsService = new ShortsService(mockPrisma as any);
  });

  describe('createShort', () => {
    it('should create a new short', async () => {
      const userId = 'user_123';
      const data = {
        title: 'My Short',
        idea: 'A funny video about cats',
        format: '9:16',
      };

      mockPrisma.short.create.mockResolvedValue({
        id: 'short_123',
        userId,
        title: data.title,
        idea: data.idea,
        format: VideoFormat.PORTRAIT,
        status: ShortStatus.PENDING,
        selectedHook: null,
        outputUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await shortsService.createShort(userId, data);

      expect(result).toBeDefined();
      expect(result.id).toBe('short_123');
      expect(result.format).toBe(VideoFormat.PORTRAIT);
    });
  });

  describe('createVariants', () => {
    it('should create multiple variants', async () => {
      const shortId = 'short_123';
      const selectedHook = 'Test hook';

      mockPrisma.short.update.mockResolvedValue({
        id: shortId,
        status: ShortStatus.GENERATING_VARIANTS,
      });

      mockPrisma.shortVariant.create
        .mockResolvedValueOnce({ id: 'var_1', variantNumber: 1, captionStyle: 'bold' })
        .mockResolvedValueOnce({ id: 'var_2', variantNumber: 2, captionStyle: 'minimal' })
        .mockResolvedValueOnce({ id: 'var_3', variantNumber: 3, captionStyle: 'animated' });

      const result = await shortsService.createVariants(shortId, selectedHook);

      expect(result).toHaveLength(3);
      expect(mockPrisma.shortVariant.create).toHaveBeenCalledTimes(3);
      expect(mockPrisma.short.update).toHaveBeenCalledWith({
        where: { id: shortId },
        data: {
          selectedHook,
          status: ShortStatus.GENERATING_VARIANTS,
        },
      });
    });
  });
});
