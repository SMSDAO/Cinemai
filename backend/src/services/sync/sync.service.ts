import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Sync Service
 * Handles near-real-time sync using polling/metadata updates
 * - Session management
 * - Delta updates
 * - Sync status
 */
@Injectable()
export class SyncService {
  constructor(private prisma: PrismaService) {}

  /**
   * Initialize or update a sync session
   */
  async initSession(userId: string, metadata?: any): Promise<any> {
    // Check if session exists
    const existingSession = await this.prisma.streamSession.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (existingSession) {
      // Update existing session
      return this.prisma.streamSession.update({
        where: { id: existingSession.id },
        data: {
          lastSyncAt: new Date(),
          metadata,
        },
      });
    }

    // Create new session
    return this.prisma.streamSession.create({
      data: {
        userId,
        metadata,
      },
    });
  }

  /**
   * Get updates since last sync
   */
  async getUpdates(userId: string, since?: Date): Promise<any> {
    // Get last sync session
    const session = await this.prisma.streamSession.findFirst({
      where: { userId },
      orderBy: { lastSyncAt: 'desc' },
    });

    const sinceDate = since || session?.lastSyncAt || new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Get all updates since last sync
    const [productions, shorts, timelineEvents, socialPosts] = await Promise.all([
      this.prisma.production.findMany({
        where: {
          userId,
          updatedAt: { gt: sinceDate },
        },
        orderBy: { updatedAt: 'desc' },
        take: 50,
      }),
      this.prisma.short.findMany({
        where: {
          userId,
          updatedAt: { gt: sinceDate },
        },
        orderBy: { updatedAt: 'desc' },
        take: 50,
      }),
      this.prisma.timelineEvent.findMany({
        where: {
          userId,
          createdAt: { gt: sinceDate },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      this.prisma.socialPost.findMany({
        where: {
          socialAccount: { userId },
          createdAt: { gt: sinceDate },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ]);

    // Update sync timestamp
    if (session) {
      await this.prisma.streamSession.update({
        where: { id: session.id },
        data: { lastSyncAt: new Date() },
      });
    }

    return {
      productions,
      shorts,
      timelineEvents,
      socialPosts,
      syncedAt: new Date(),
      hasMore: productions.length === 50 || shorts.length === 50,
    };
  }

  /**
   * Poll for changes
   */
  async poll(userId: string): Promise<any> {
    const session = await this.prisma.streamSession.findFirst({
      where: { userId },
      orderBy: { lastSyncAt: 'desc' },
    });

    if (!session) {
      return {
        hasChanges: false,
        message: 'No active session. Initialize sync first.',
      };
    }

    // Check for changes since last sync
    const sinceDate = session.lastSyncAt;
    const [productionChanges, shortChanges, eventChanges] = await Promise.all([
      this.prisma.production.count({
        where: {
          userId,
          updatedAt: { gt: sinceDate },
        },
      }),
      this.prisma.short.count({
        where: {
          userId,
          updatedAt: { gt: sinceDate },
        },
      }),
      this.prisma.timelineEvent.count({
        where: {
          userId,
          createdAt: { gt: sinceDate },
        },
      }),
    ]);

    const hasChanges = productionChanges > 0 || shortChanges > 0 || eventChanges > 0;

    return {
      hasChanges,
      changes: {
        productions: productionChanges,
        shorts: shortChanges,
        events: eventChanges,
      },
      lastSyncAt: session.lastSyncAt,
    };
  }

  /**
   * Get sync status
   */
  async getStatus(userId: string): Promise<any> {
    const session = await this.prisma.streamSession.findFirst({
      where: { userId },
      orderBy: { lastSyncAt: 'desc' },
    });

    if (!session) {
      return {
        active: false,
        message: 'No active sync session',
      };
    }

    return {
      active: true,
      sessionId: session.id,
      lastSyncAt: session.lastSyncAt,
      metadata: session.metadata,
    };
  }
}
