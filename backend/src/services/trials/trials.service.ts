import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrialStatus } from '@prisma/client';

@Injectable()
export class TrialsService {
  private readonly logger = new Logger(TrialsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Create initial trial for new user (1 video every 3 days)
   */
  async createTrialForUser(userId: string): Promise<any> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 3); // 3 days from now

    const trial = await this.prisma.trial.create({
      data: {
        userId,
        videosRemaining: 1,
        status: TrialStatus.ACTIVE,
        expiresAt,
      },
    });

    this.logger.log(`Created trial for user ${userId}, expires ${expiresAt.toISOString()}`);
    return trial;
  }

  /**
   * Get active trial for user
   */
  async getActiveTrial(userId: string): Promise<any> {
    return this.prisma.trial.findFirst({
      where: {
        userId,
        status: TrialStatus.ACTIVE,
        expiresAt: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Check if user can create production/short
   */
  async canCreateContent(userId: string): Promise<{
    allowed: boolean;
    reason?: string;
    tripsRemaining?: number;
    trialVideosRemaining?: number;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionType: true, tripsRemaining: true },
    });

    if (!user) {
      return { allowed: false, reason: 'User not found' };
    }

    // Pro users have unlimited access
    if (user.subscriptionType === 'PRO') {
      return { allowed: true };
    }

    // Check for available trips
    if (user.tripsRemaining > 0) {
      return { 
        allowed: true, 
        tripsRemaining: user.tripsRemaining 
      };
    }

    // Check for active trial
    const trial = await this.getActiveTrial(userId);
    if (trial && trial.videosRemaining > 0) {
      return { 
        allowed: true, 
        trialVideosRemaining: trial.videosRemaining 
      };
    }

    return {
      allowed: false,
      reason: 'No credits available. Purchase trips, upgrade to Pro, or complete quests to earn videos.',
    };
  }

  /**
   * Consume trial video (with atomic decrement to prevent race conditions)
   */
  async consumeTrialVideo(userId: string): Promise<void> {
    const now = new Date();

    // Atomically decrement videosRemaining for an active, non-expired trial
    const decrementResult = await this.prisma.trial.updateMany({
      where: {
        userId,
        status: TrialStatus.ACTIVE,
        expiresAt: {
          gte: now,
        },
        videosRemaining: {
          gt: 0,
        },
      },
      data: {
        videosRemaining: {
          decrement: 1,
        },
      },
    });

    // If nothing was updated, either there is no active trial or no remaining videos
    if (decrementResult.count === 0) {
      const activeTrial = await this.getActiveTrial(userId);

      if (!activeTrial) {
        throw new Error('No active trial found');
      }

      // Active trial exists but doesn't have available videos to consume
      throw new Error('No videos remaining in trial');
    }

    // Mark trial as consumed when it reaches 0 remaining videos
    await this.prisma.trial.updateMany({
      where: {
        userId,
        status: TrialStatus.ACTIVE,
        expiresAt: {
          gte: now,
        },
        videosRemaining: 0,
      },
      data: {
        status: TrialStatus.CONSUMED,
      },
    });

    // Fetch the latest trial state for logging purposes
    const updatedTrial = await this.getActiveTrial(userId);

    this.logger.log(
      `Consumed trial video for user ${userId}. Remaining: ${
        updatedTrial ? updatedTrial.videosRemaining : 'unknown'
      }`,
    );
  }

  /**
   * Renew trial (called automatically every 3 days)
   */
  async renewTrialsForUser(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionType: true },
    });

    // Only renew for free users
    if (user?.subscriptionType !== 'FREE') {
      return null;
    }

    // Check if user has an expired trial
    const expiredTrial = await this.prisma.trial.findFirst({
      where: {
        userId,
        status: { in: [TrialStatus.CONSUMED, TrialStatus.EXPIRED] },
        expiresAt: {
          lt: new Date(),
        },
      },
      orderBy: {
        expiresAt: 'desc',
      },
    });

    // Create new trial if last one expired
    if (expiredTrial) {
      return this.createTrialForUser(userId);
    }

    return null;
  }

  /**
   * Expire old trials (cron job)
   */
  async expireOldTrials(): Promise<number> {
    const result = await this.prisma.trial.updateMany({
      where: {
        status: TrialStatus.ACTIVE,
        expiresAt: {
          lt: new Date(),
        },
      },
      data: {
        status: TrialStatus.EXPIRED,
      },
    });

    this.logger.log(`Expired ${result.count} trials`);
    return result.count;
  }

  /**
   * Get trial statistics for user
   */
  async getTrialStats(userId: string): Promise<any> {
    const activeTrial = await this.getActiveTrial(userId);
    const totalTrialsUsed = await this.prisma.trial.count({
      where: {
        userId,
        status: {
          in: [TrialStatus.CONSUMED, TrialStatus.EXPIRED],
        },
      },
    });

    return {
      hasActiveTrial: !!activeTrial,
      videosRemaining: activeTrial?.videosRemaining || 0,
      expiresAt: activeTrial?.expiresAt,
      totalTrialsUsed,
    };
  }
}
