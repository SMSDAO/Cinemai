import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PostStatus, SocialPlatform, ProductionStatus, ShortStatus } from '@prisma/client';

/**
 * Growth Service
 * Handles social media automation
 * - Multi-platform publishing
 * - Post scheduling
 * - Analytics aggregation
 */
@Injectable()
export class GrowthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Publish content to social platforms
   */
  async publishPost(
    userId: string,
    data: {
      contentId: string;
      contentType: 'production' | 'short';
      platforms: string[];
      caption?: string;
      scheduledAt?: Date;
    },
  ): Promise<any> {
    // TODO: Queue social.publish job for each platform
    return {
      id: 'social_post_id',
      userId,
      contentId: data.contentId,
      contentType: data.contentType,
      platforms: data.platforms,
      status: data.scheduledAt ? 'scheduled' : 'publishing',
      scheduledAt: data.scheduledAt,
    };
  }

  /**
   * List user's social posts
   */
  async listPosts(userId: string, page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.socialPost.findMany({
        where: {
          socialAccount: {
            userId,
          },
        },
        include: {
          socialAccount: {
            select: {
              platform: true,
              accountId: true,
            },
          },
          metrics: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.socialPost.count({
        where: {
          socialAccount: {
            userId,
          },
        },
      }),
    ]);

    return {
      posts,
      total,
      page,
      limit,
    };
  }

  /**
   * Get post analytics
   */
  async getPostAnalytics(postId: string): Promise<any> {
    const metrics = await this.prisma.socialMetrics.findUnique({
      where: { postId },
    });

    if (!metrics) {
      return {
        postId,
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        engagementRate: 0,
      };
    }

    return {
      postId: metrics.postId,
      views: metrics.views,
      likes: metrics.likes,
      shares: metrics.shares,
      comments: metrics.comments,
      engagementRate: metrics.engagement,
    };
  }

  /**
   * Get analytics for shorts
   */
  async getShortsAnalytics(userId: string, timeRange?: string): Promise<any> {
    const shorts = await this.prisma.short.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    });

    const shortIds = shorts.map(s => s.id);

    const postsWithMetrics = await this.prisma.socialPost.findMany({
      where: {
        contentId: { in: shortIds },
        contentType: 'short',
      },
      include: {
        metrics: true,
      },
    });

    const totalViews = postsWithMetrics.reduce((sum, post) => sum + (post.metrics?.views || 0), 0);
    const totalLikes = postsWithMetrics.reduce((sum, post) => sum + (post.metrics?.likes || 0), 0);
    const totalShares = postsWithMetrics.reduce(
      (sum, post) => sum + (post.metrics?.shares || 0),
      0,
    );
    const avgEngagement =
      postsWithMetrics.length > 0
        ? postsWithMetrics.reduce((sum, post) => sum + (post.metrics?.engagement || 0), 0) /
          postsWithMetrics.length
        : 0;

    const topPerformers = postsWithMetrics
      .filter(post => post.metrics)
      .sort((a, b) => (b.metrics?.views || 0) - (a.metrics?.views || 0))
      .slice(0, 5)
      .map(post => ({
        contentId: post.contentId,
        views: post.metrics?.views || 0,
        engagement: post.metrics?.engagement || 0,
      }));

    return {
      totalViews,
      totalLikes,
      totalShares,
      avgEngagementRate: avgEngagement,
      topPerformers,
    };
  }

  /**
   * Get analytics for productions
   */
  async getProductionsAnalytics(userId: string, timeRange?: string): Promise<any> {
    const productions = await this.prisma.production.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
      },
    });

    const productionIds = productions.map(p => p.id);

    const postsWithMetrics = await this.prisma.socialPost.findMany({
      where: {
        contentId: { in: productionIds },
        contentType: 'production',
      },
      include: {
        metrics: true,
      },
    });

    const totalViews = postsWithMetrics.reduce((sum, post) => sum + (post.metrics?.views || 0), 0);
    const totalLikes = postsWithMetrics.reduce((sum, post) => sum + (post.metrics?.likes || 0), 0);
    const totalShares = postsWithMetrics.reduce(
      (sum, post) => sum + (post.metrics?.shares || 0),
      0,
    );
    const avgEngagement =
      postsWithMetrics.length > 0
        ? postsWithMetrics.reduce((sum, post) => sum + (post.metrics?.engagement || 0), 0) /
          postsWithMetrics.length
        : 0;

    const topPerformers = postsWithMetrics
      .filter(post => post.metrics)
      .sort((a, b) => (b.metrics?.views || 0) - (a.metrics?.views || 0))
      .slice(0, 5)
      .map(post => ({
        contentId: post.contentId,
        views: post.metrics?.views || 0,
        engagement: post.metrics?.engagement || 0,
      }));

    return {
      totalViews,
      totalLikes,
      totalShares,
      avgEngagementRate: avgEngagement,
      topPerformers,
    };
  }

  /**
   * Get AI-powered insights
   */
  async getInsights(userId: string): Promise<any> {
    // TODO: Use Growth AI Agent for intelligent recommendations
    return {
      insights: [
        'Your 9:16 shorts perform 25% better than 1:1',
        'Best posting time: 7 PM EST',
        'Use more trending audio',
      ],
      recommendations: [],
    };
  }

  /**
   * Schedule a post
   */
  async schedulePost(postId: string, scheduledAt: Date): Promise<void> {
    // TODO: Update post with scheduled time and queue scheduled publish job
  }

  /**
   * Cancel scheduled post
   */
  async cancelScheduledPost(postId: string): Promise<void> {
    // TODO: Update post status and cancel scheduled job
  }

  /**
   * Sync metrics from social platforms
   */
  async syncMetrics(userId: string): Promise<void> {
    // TODO: Queue social.metrics job to fetch latest data from all platforms
  }
}
