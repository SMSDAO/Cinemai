import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestType, QuestStatus } from '@prisma/client';

@Injectable()
export class QuestsService {
  private readonly logger = new Logger(QuestsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Get available quests for user
   */
  async getAvailableQuests(userId: string): Promise<any[]> {
    const quests = await this.prisma.quest.findMany({
      where: { isActive: true },
      include: {
        userQuests: {
          where: { userId },
        },
      },
    });

    return quests.map((quest) => ({
      id: quest.id,
      type: quest.type,
      title: quest.title,
      description: quest.description,
      rewardVideos: quest.rewardVideos,
      status: quest.userQuests[0]?.status || QuestStatus.AVAILABLE,
      completedAt: quest.userQuests[0]?.completedAt,
      rewardClaimed: quest.userQuests[0]?.rewardClaimed || false,
    }));
  }

  /**
   * Start a quest for user
   */
  async startQuest(userId: string, questId: string): Promise<any> {
    const quest = await this.prisma.quest.findUnique({
      where: { id: questId },
    });

    if (!quest || !quest.isActive) {
      throw new Error('Quest not found or inactive');
    }

    const existingUserQuest = await this.prisma.userQuest.findUnique({
      where: {
        userId_questId: { userId, questId },
      },
      include: {
        quest: true,
      },
    });

    if (existingUserQuest) {
      if (existingUserQuest.status === QuestStatus.COMPLETED) {
        throw new Error('Quest already completed');
      }
      return existingUserQuest;
    }

    const userQuest = await this.prisma.userQuest.create({
      data: {
        userId,
        questId,
        status: QuestStatus.IN_PROGRESS,
      },
      include: {
        quest: true,
      },
    });

    this.logger.log(`User ${userId} started quest ${questId}`);
    return userQuest;
  }

  /**
   * Verify Twitter follow quest
   */
  async verifyTwitterFollow(userId: string, questId: string, twitterHandle: string): Promise<boolean> {
    // Production guard: Prevent reward claims without real verification
    if (process.env.NODE_ENV === 'production' && !process.env.TWITTER_API_KEY) {
      this.logger.error('Twitter verification not configured for production');
      throw new Error('Quest verification not available in production mode');
    }
    
    this.logger.log(`Verifying Twitter follow for user ${userId}: @${twitterHandle}`);
    
    // TODO: Implement actual Twitter API verification
    // const twitterClient = new TwitterClient(process.env.TWITTER_API_KEY);
    // const isFollowing = await twitterClient.checkFollowing(userId, twitterHandle);
    
    // Development/staging stub - logs warning
    if (!process.env.TWITTER_API_KEY) {
      this.logger.warn(`STUB: Twitter follow verification bypassed for @${twitterHandle}`);
    }
    
    return !!twitterHandle;
  }

  /**
   * Verify Twitter like quest
   */
  async verifyTwitterLike(userId: string, questId: string, tweetId: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'production' && !process.env.TWITTER_API_KEY) {
      this.logger.error('Twitter verification not configured for production');
      throw new Error('Quest verification not available in production mode');
    }
    
    this.logger.log(`Verifying Twitter like for user ${userId}: tweet ${tweetId}`);
    
    // TODO: Implement actual Twitter API verification
    if (!process.env.TWITTER_API_KEY) {
      this.logger.warn(`STUB: Twitter like verification bypassed for tweet ${tweetId}`);
    }
    
    return !!tweetId;
  }

  /**
   * Verify Twitter repost quest
   */
  async verifyTwitterRepost(userId: string, questId: string, tweetId: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'production' && !process.env.TWITTER_API_KEY) {
      this.logger.error('Twitter verification not configured for production');
      throw new Error('Quest verification not available in production mode');
    }
    
    this.logger.log(`Verifying Twitter repost for user ${userId}: tweet ${tweetId}`);
    
    // TODO: Implement actual Twitter API verification
    if (!process.env.TWITTER_API_KEY) {
      this.logger.warn(`STUB: Twitter repost verification bypassed for tweet ${tweetId}`);
    }
    
    return !!tweetId;
  }

  /**
   * Verify Farcaster follow quest
   */
  async verifyFarcasterFollow(userId: string, questId: string, fid: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'production' && !process.env.FARCASTER_API_KEY) {
      this.logger.error('Farcaster verification not configured for production');
      throw new Error('Quest verification not available in production mode');
    }
    
    this.logger.log(`Verifying Farcaster follow for user ${userId}: fid ${fid}`);
    
    // TODO: Implement actual Farcaster API verification
    if (!process.env.FARCASTER_API_KEY) {
      this.logger.warn(`STUB: Farcaster follow verification bypassed for fid ${fid}`);
    }
    
    return !!fid;
  }

  /**
   * Verify Farcaster like quest
   */
  async verifyFarcasterLike(userId: string, questId: string, castHash: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'production' && !process.env.FARCASTER_API_KEY) {
      this.logger.error('Farcaster verification not configured for production');
      throw new Error('Quest verification not available in production mode');
    }
    
    this.logger.log(`Verifying Farcaster like for user ${userId}: cast ${castHash}`);
    
    // TODO: Implement actual Farcaster API verification
    if (!process.env.FARCASTER_API_KEY) {
      this.logger.warn(`STUB: Farcaster like verification bypassed for cast ${castHash}`);
    }
    
    return !!castHash;
  }

  /**
   * Verify Farcaster recast quest
   */
  async verifyFarcasterRecast(userId: string, questId: string, castHash: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'production' && !process.env.FARCASTER_API_KEY) {
      this.logger.error('Farcaster verification not configured for production');
      throw new Error('Quest verification not available in production mode');
    }
    
    this.logger.log(`Verifying Farcaster recast for user ${userId}: cast ${castHash}`);
    
    // TODO: Implement actual Farcaster API verification
    if (!process.env.FARCASTER_API_KEY) {
      this.logger.warn(`STUB: Farcaster recast verification bypassed for cast ${castHash}`);
    }
    
    return !!castHash;
  }

  /**
   * Complete a quest and claim reward
   */
  async completeQuest(
    userId: string,
    questId: string,
    verificationData: any
  ): Promise<{ success: boolean; videosAwarded: number }> {
    const userQuest = await this.prisma.userQuest.findUnique({
      where: {
        userId_questId: { userId, questId },
      },
      include: {
        quest: true,
      },
    });

    if (!userQuest) {
      throw new Error('Quest not started');
    }

    if (userQuest.status === QuestStatus.COMPLETED) {
      throw new Error('Quest already completed');
    }

    const quest = userQuest.quest;
    let verified = false;

    // Verify based on quest type
    switch (quest.type) {
      case QuestType.TWITTER_FOLLOW:
        verified = await this.verifyTwitterFollow(userId, questId, verificationData.handle);
        break;
      case QuestType.TWITTER_LIKE:
        verified = await this.verifyTwitterLike(userId, questId, verificationData.tweetId);
        break;
      case QuestType.TWITTER_REPOST:
        verified = await this.verifyTwitterRepost(userId, questId, verificationData.tweetId);
        break;
      case QuestType.FARCASTER_FOLLOW:
        verified = await this.verifyFarcasterFollow(userId, questId, verificationData.fid);
        break;
      case QuestType.FARCASTER_LIKE:
        verified = await this.verifyFarcasterLike(userId, questId, verificationData.castHash);
        break;
      case QuestType.FARCASTER_RECAST:
        verified = await this.verifyFarcasterRecast(userId, questId, verificationData.castHash);
        break;
    }

    if (!verified) {
      throw new Error('Quest verification failed');
    }

    // Complete the quest and award videos atomically
    const result = await this.prisma.$transaction(async (tx) => {
      // Only complete the quest if it is not already completed and reward not yet claimed
      const questUpdateResult = await tx.userQuest.updateMany({
        where: {
          id: userQuest.id,
          status: {
            not: QuestStatus.COMPLETED,
          },
          rewardClaimed: false,
        },
        data: {
          status: QuestStatus.COMPLETED,
          completedAt: new Date(),
          rewardClaimed: true,
          verificationData,
        },
      });

      if (questUpdateResult.count === 0) {
        // Another request may have already completed this quest and claimed the reward
        throw new Error('Quest already completed or reward already claimed');
      }

      // Award videos to user
      await tx.user.update({
        where: { id: userId },
        data: {
          tripsRemaining: {
            increment: quest.rewardVideos,
          },
        },
      });

      return { videosAwarded: quest.rewardVideos };
    });

    this.logger.log(`User ${userId} completed quest ${questId}, awarded ${quest.rewardVideos} videos`);

    return {
      success: true,
      videosAwarded: result.videosAwarded,
    };
  }

  /**
   * Get user quest statistics
   */
  async getUserQuestStats(userId: string): Promise<any> {
    const completedCount = await this.prisma.userQuest.count({
      where: {
        userId,
        status: QuestStatus.COMPLETED,
      },
    });

    const totalVideosEarned = await this.prisma.userQuest.findMany({
      where: {
        userId,
        status: QuestStatus.COMPLETED,
      },
      include: {
        quest: true,
      },
    }).then((quests) => 
      quests.reduce((sum, uq) => sum + uq.quest.rewardVideos, 0)
    );

    return {
      completedQuests: completedCount,
      totalVideosEarned,
    };
  }

  /**
   * Seed initial quests (admin only)
   */
  async seedQuests(): Promise<void> {
    const existingQuests = await this.prisma.quest.count();
    if (existingQuests > 0) {
      this.logger.log('Quests already seeded');
      return;
    }

    const quests = [
      {
        type: QuestType.TWITTER_FOLLOW,
        title: 'Follow us on Twitter',
        description: 'Follow @CinemAiNeo on Twitter to earn 1 free video',
        rewardVideos: 1,
        requiredAction: 'Follow @CinemAiNeo',
      },
      {
        type: QuestType.TWITTER_LIKE,
        title: 'Like our Tweet',
        description: 'Like our pinned tweet to earn 1 free video',
        rewardVideos: 1,
        requiredAction: 'Like the pinned tweet',
      },
      {
        type: QuestType.TWITTER_REPOST,
        title: 'Repost our Tweet',
        description: 'Repost our announcement to earn 2 free videos',
        rewardVideos: 2,
        requiredAction: 'Repost the announcement',
      },
      {
        type: QuestType.FARCASTER_FOLLOW,
        title: 'Follow us on Farcaster',
        description: 'Follow our Farcaster channel to earn 1 free video',
        rewardVideos: 1,
        requiredAction: 'Follow our channel',
      },
      {
        type: QuestType.FARCASTER_LIKE,
        title: 'Like our Cast',
        description: 'Like our featured cast to earn 1 free video',
        rewardVideos: 1,
        requiredAction: 'Like the featured cast',
      },
      {
        type: QuestType.FARCASTER_RECAST,
        title: 'Recast our Cast',
        description: 'Recast our announcement to earn 2 free videos',
        rewardVideos: 2,
        requiredAction: 'Recast the announcement',
      },
    ];

    await this.prisma.quest.createMany({
      data: quests,
    });

    this.logger.log(`Seeded ${quests.length} quests`);
  }
}
