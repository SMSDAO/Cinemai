import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Dashboard Service
 * Aggregates user data for dashboard views
 * - User projects and content
 * - Statistics and metrics
 * - Recent activity
 */
@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get comprehensive dashboard data for a user
   */
  async getDashboard(userId: string): Promise<any> {
    const [user, productions, shorts, stats, recentActivity] = await Promise.all([
      this.getUserInfo(userId),
      this.getRecentProductions(userId),
      this.getRecentShorts(userId),
      this.getUserStats(userId),
      this.getRecentActivity(userId),
    ]);

    return {
      user,
      productions,
      shorts,
      stats,
      recentActivity,
    };
  }

  /**
   * Get user information
   */
  private async getUserInfo(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        handle: true,
        bio: true,
        avatarUrl: true,
        subscriptionType: true,
        tripsRemaining: true,
        stats: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Get user's recent productions
   */
  private async getRecentProductions(userId: string, limit: number = 5): Promise<any[]> {
    return this.prisma.production.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        status: true,
        outputUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Get user's recent shorts
   */
  private async getRecentShorts(userId: string, limit: number = 5): Promise<any[]> {
    return this.prisma.short.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        status: true,
        outputUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Get user statistics
   */
  private async getUserStats(userId: string): Promise<any> {
    const [
      productionCount,
      shortCount,
      followersCount,
      followingCount,
      completedProductions,
      completedShorts,
      publishedPosts,
    ] = await Promise.all([
      this.prisma.production.count({ where: { userId } }),
      this.prisma.short.count({ where: { userId } }),
      this.prisma.follow.count({ where: { followingId: userId } }),
      this.prisma.follow.count({ where: { followerId: userId } }),
      this.prisma.production.count({ where: { userId, status: 'COMPLETED' } }),
      this.prisma.short.count({ where: { userId, status: 'COMPLETED' } }),
      this.prisma.socialPost.count({
        where: {
          socialAccount: { userId },
          status: 'PUBLISHED',
        },
      }),
    ]);

    return {
      totalProductions: productionCount,
      totalShorts: shortCount,
      followers: followersCount,
      following: followingCount,
      completedProductions,
      completedShorts,
      publishedPosts,
    };
  }

  /**
   * Get recent activity from timeline
   */
  private async getRecentActivity(userId: string, limit: number = 10): Promise<any[]> {
    return this.prisma.timelineEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        eventType: true,
        contentId: true,
        contentType: true,
        metadata: true,
        createdAt: true,
      },
    });
  }

  /**
   * Get analytics summary
   */
  async getAnalytics(userId: string): Promise<any> {
    const [socialAccounts, socialPosts] = await Promise.all([
      this.prisma.socialAccount.findMany({
        where: { userId },
        select: {
          id: true,
          platform: true,
          posts: {
            where: { status: 'PUBLISHED' },
            select: {
              id: true,
              platform: true,
              publishedAt: true,
              metrics: {
                select: {
                  views: true,
                  likes: true,
                  shares: true,
                  comments: true,
                  engagement: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.socialPost.count({
        where: {
          socialAccount: { userId },
          status: 'PUBLISHED',
        },
      }),
    ]);

    // Aggregate metrics
    let totalViews = 0;
    let totalLikes = 0;
    let totalShares = 0;
    let totalComments = 0;

    socialAccounts.forEach(account => {
      account.posts.forEach(post => {
        if (post.metrics) {
          totalViews += post.metrics.views;
          totalLikes += post.metrics.likes;
          totalShares += post.metrics.shares;
          totalComments += post.metrics.comments;
        }
      });
    });

    return {
      publishedPosts: socialPosts,
      totalViews,
      totalLikes,
      totalShares,
      totalComments,
      platforms: socialAccounts.map(a => ({
        platform: a.platform,
        posts: a.posts.length,
      })),
    };
  }
}
