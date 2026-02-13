import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShortStatus, VideoFormat, EventType } from '@prisma/client';

/**
 * Shorts Service
 * Handles short-form video generation
 * - Shorts creation
 * - Hook generation
 * - Variant management
 */
@Injectable()
export class ShortsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new short
   */
  async createShort(
    userId: string,
    data: {
      title: string;
      idea: string;
      format?: string;
    },
  ): Promise<any> {
    const formatMapping: Record<string, VideoFormat> = {
      '9:16': VideoFormat.PORTRAIT,
      '1:1': VideoFormat.SQUARE,
      '16:9': VideoFormat.LANDSCAPE,
    };

    // Use transaction to ensure short and timeline event are created atomically
    return await this.prisma.$transaction(async tx => {
      const short = await tx.short.create({
        data: {
          userId,
          title: data.title,
          idea: data.idea,
          format: formatMapping[data.format || '9:16'] || VideoFormat.PORTRAIT,
          status: ShortStatus.PENDING,
        },
      });

      await tx.timelineEvent.create({
        data: {
          userId,
          eventType: EventType.SHORT_CREATED,
          contentId: short.id,
          contentType: 'short',
          metadata: {
            title: short.title,
            format: short.format,
          },
        },
      });

      return short;
    });
  }

  /**
   * Generate hooks for a short
   */
  async generateHooks(shortId: string): Promise<any[]> {
    await this.prisma.short.update({
      where: { id: shortId },
      data: { status: ShortStatus.GENERATING_HOOKS },
    });

    // TODO: Queue shorts.hooks job - AI will generate 5-10 hook variants
    return [
      { id: 'hook_1', text: 'Hook variant 1', score: 0.9 },
      { id: 'hook_2', text: 'Hook variant 2', score: 0.85 },
      { id: 'hook_3', text: 'Hook variant 3', score: 0.8 },
    ];
  }

  /**
   * Select a hook and create variants
   */
  async createVariants(shortId: string, selectedHook: string): Promise<any[]> {
    await this.prisma.short.update({
      where: { id: shortId },
      data: {
        selectedHook,
        status: ShortStatus.GENERATING_VARIANTS,
      },
    });

    const captionStyles = ['bold', 'minimal', 'animated'];
    const variants = await Promise.all(
      captionStyles.map((style, index) =>
        this.prisma.shortVariant.create({
          data: {
            shortId,
            variantNumber: index + 1,
            captionStyle: style,
          },
        }),
      ),
    );

    // TODO: Queue shorts.variants job - Create multiple variants for A/B testing

    return variants;
  }

  /**
   * Get short by ID
   */
  async getShort(shortId: string): Promise<any> {
    const short = await this.prisma.short.findUnique({
      where: { id: shortId },
      include: {
        variants: true,
      },
    });

    if (!short) {
      throw new Error('Short not found');
    }

    return short;
  }

  /**
   * List user's shorts
   */
  async listShorts(userId: string, page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;

    const [shorts, total] = await Promise.all([
      this.prisma.short.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.short.count({ where: { userId } }),
    ]);

    return {
      shorts,
      total,
      page,
      limit,
    };
  }

  /**
   * Get short variants
   */
  async getVariants(shortId: string): Promise<any[]> {
    const variants = await this.prisma.shortVariant.findMany({
      where: { shortId },
      orderBy: { variantNumber: 'asc' },
    });

    return variants;
  }

  /**
   * Delete short
   */
  async deleteShort(shortId: string): Promise<void> {
    await this.prisma.short.delete({
      where: { id: shortId },
    });
    // TODO: Delete assets from S3
  }

  /**
   * Update short status
   */
  async updateStatus(shortId: string, status: string, outputUrl?: string): Promise<void> {
    const updateData: { status: ShortStatus; outputUrl?: string } = {
      status: status as ShortStatus,
    };
    if (outputUrl) {
      updateData.outputUrl = outputUrl;
    }

    // Use transaction to ensure status update and timeline event are atomic
    if (status === ShortStatus.COMPLETED) {
      await this.prisma.$transaction(async tx => {
        const short = await tx.short.update({
          where: { id: shortId },
          data: updateData,
        });

        await tx.timelineEvent.create({
          data: {
            userId: short.userId,
            eventType: EventType.SHORT_COMPLETED,
            contentId: short.id,
            contentType: 'short',
            metadata: {
              title: short.title,
              outputUrl: short.outputUrl,
            },
          },
        });
      });
    } else {
      await this.prisma.short.update({
        where: { id: shortId },
        data: updateData,
      });
    }
  }
}
