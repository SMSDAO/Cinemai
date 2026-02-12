import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductionStatus } from '@prisma/client';

/**
 * Cinema Service
 * Handles cinema production workflows
 * - Production creation
 * - Scene planning
 * - Video generation orchestration
 */
@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new cinema production
   */
  async createProduction(
    userId: string,
    data: {
      title: string;
      script: string;
      photoUrl: string;
      style?: string;
    },
  ): Promise<any> {
    const production = await this.prisma.production.create({
      data: {
        userId,
        title: data.title,
        script: data.script,
        photoUrl: data.photoUrl,
        style: data.style || 'cinematic',
        status: ProductionStatus.PENDING,
      },
    });

    return production;
  }

  /**
   * Start production processing
   */
  async runProduction(productionId: string): Promise<void> {
    await this.prisma.production.update({
      where: { id: productionId },
      data: { status: ProductionStatus.PROCESSING },
    });

    // TODO: Queue cinema.ingest job
    // This will trigger the cinema pipeline:
    // 1. Ingest
    // 2. Script Understanding
    // 3. Scene Planning
    // 4. Visual Generation
    // 5. Audio Generation
    // 6. Assembly
    // 7. Rendering
    // 8. Delivery
  }

  /**
   * Get production by ID
   */
  async getProduction(productionId: string): Promise<any> {
    const production = await this.prisma.production.findUnique({
      where: { id: productionId },
      include: {
        assets: true,
      },
    });

    if (!production) {
      throw new Error('Production not found');
    }

    return production;
  }

  /**
   * List user's productions
   */
  async listProductions(userId: string, page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;

    const [productions, total] = await Promise.all([
      this.prisma.production.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.production.count({ where: { userId } }),
    ]);

    return {
      productions,
      total,
      page,
      limit,
    };
  }

  /**
   * Update production
   */
  async updateProduction(productionId: string, data: Partial<{ title: string; script: string; style: string }>): Promise<any> {
    const production = await this.prisma.production.update({
      where: { id: productionId },
      data,
    });

    return production;
  }

  /**
   * Delete production
   */
  async deleteProduction(productionId: string): Promise<void> {
    await this.prisma.production.delete({
      where: { id: productionId },
    });
    // TODO: Delete assets from S3
  }

  /**
   * Update production status
   */
  async updateStatus(productionId: string, status: string, outputUrl?: string): Promise<void> {
    const updateData: { status: ProductionStatus; outputUrl?: string } = {
      status: status as ProductionStatus,
    };
    if (outputUrl) {
      updateData.outputUrl = outputUrl;
    }

    await this.prisma.production.update({
      where: { id: productionId },
      data: updateData,
    });
  }

  /**
   * Get production assets
   */
  async getAssets(productionId: string): Promise<any[]> {
    const assets = await this.prisma.asset.findMany({
      where: { productionId },
      orderBy: { createdAt: 'asc' },
    });

    return assets;
  }
}
