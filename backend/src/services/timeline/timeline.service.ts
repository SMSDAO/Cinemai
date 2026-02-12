import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EventType } from '@prisma/client';

/**
 * Timeline Service
 * Handles timeline events and activity feeds
 * - Create timeline events
 * - Fetch user activity feed
 * - Fetch global feed
 */
@Injectable()
export class TimelineService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a timeline event
   */
  async createEvent(
    userId: string,
    eventType: EventType,
    contentId?: string,
    contentType?: string,
    metadata?: any,
  ): Promise<any> {
    const event = await this.prisma.timelineEvent.create({
      data: {
        userId,
        eventType,
        contentId,
        contentType,
        metadata,
      },
    });

    return event;
  }

  /**
   * Get user timeline events
   */
  async getUserTimeline(userId: string, limit: number = 20, offset: number = 0): Promise<any[]> {
    const events = await this.prisma.timelineEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
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

    return events;
  }

  /**
   * Get global timeline feed
   */
  async getGlobalTimeline(limit: number = 20, offset: number = 0): Promise<any[]> {
    const events = await this.prisma.timelineEvent.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
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

    return events;
  }

  /**
   * Get following timeline (activity from users you follow)
   */
  async getFollowingTimeline(userId: string, limit: number = 20, offset: number = 0): Promise<any[]> {
    // Get list of users being followed
    const following = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);

    // Get events from followed users
    const events = await this.prisma.timelineEvent.findMany({
      where: {
        userId: { in: followingIds },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
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

    return events;
  }
}
