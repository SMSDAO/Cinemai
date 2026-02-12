import { CinemaService } from './cinema.service';
import { ProductionStatus } from '@prisma/client';

// Mock Prisma
const mockPrisma = {
  production: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  asset: {
    findMany: jest.fn(),
  },
  timelineEvent: {
    create: jest.fn(),
  },
};

describe('CinemaService', () => {
  let cinemaService: CinemaService;

  beforeEach(() => {
    jest.clearAllMocks();
    cinemaService = new CinemaService(mockPrisma as any);
  });

  describe('createProduction', () => {
    it('should create a new production', async () => {
      const userId = 'user_123';
      const data = {
        title: 'My Production',
        script: 'Once upon a time...',
        photoUrl: 'https://example.com/photo.jpg',
      };

      mockPrisma.production.create.mockResolvedValue({
        id: 'prod_123',
        userId,
        title: data.title,
        script: data.script,
        photoUrl: data.photoUrl,
        status: ProductionStatus.PENDING,
        style: 'cinematic',
        outputUrl: null,
        duration: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await cinemaService.createProduction(userId, data);

      expect(result).toBeDefined();
      expect(result.id).toBe('prod_123');
      expect(result.title).toBe(data.title);
      expect(mockPrisma.production.create).toHaveBeenCalledWith({
        data: {
          userId,
          title: data.title,
          script: data.script,
          photoUrl: data.photoUrl,
          style: 'cinematic',
          status: ProductionStatus.PENDING,
        },
      });
    });
  });

  describe('getProduction', () => {
    it('should get production with assets', async () => {
      const productionId = 'prod_123';

      mockPrisma.production.findUnique.mockResolvedValue({
        id: productionId,
        title: 'Test Production',
        assets: [
          { id: 'asset_1', type: 'VIDEO' },
          { id: 'asset_2', type: 'AUDIO' },
        ],
      });

      const result = await cinemaService.getProduction(productionId);

      expect(result).toBeDefined();
      expect(result.assets).toHaveLength(2);
      expect(mockPrisma.production.findUnique).toHaveBeenCalledWith({
        where: { id: productionId },
        include: { assets: true },
      });
    });
  });

  describe('runProduction', () => {
    it('should update status to PROCESSING', async () => {
      const productionId = 'prod_123';

      mockPrisma.production.update.mockResolvedValue({
        id: productionId,
        status: ProductionStatus.PROCESSING,
      });

      await cinemaService.runProduction(productionId);

      expect(mockPrisma.production.update).toHaveBeenCalledWith({
        where: { id: productionId },
        data: { status: ProductionStatus.PROCESSING },
      });
    });
  });
});
