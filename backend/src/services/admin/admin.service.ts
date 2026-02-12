import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Admin Service
 * Handles admin operations
 * - User management
 * - System health overview
 * - Analytics
 */
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get admin dashboard data
   */
  async getDashboard(): Promise<any> {
    const [totalUsers, totalProductions, totalShorts, activeSubscriptions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.production.count(),
      this.prisma.short.count(),
      this.prisma.subscription.count({ where: { status: 'ACTIVE' } }),
    ]);

    return {
      totalUsers,
      totalProductions,
      totalShorts,
      activeSubscriptions,
      systemHealth: 'healthy',
    };
  }

  /**
   * Get all users with pagination
   */
  async getUsers(page: number = 1, limit: number = 20): Promise<any> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          handle: true,
          role: true,
          subscriptionType: true,
          tripsRemaining: true,
          createdAt: true,
          lastLoginAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get specific user details
   */
  async getUser(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        productions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        shorts: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        trips: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(userId: string, data: any): Promise<any> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        handle: true,
        role: true,
        subscriptionType: true,
        tripsRemaining: true,
      },
    });

    return user;
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  /**
   * Get analytics data
   */
  async getAnalytics(): Promise<any> {
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      dailyActiveUsers,
      monthlyActiveUsers,
      totalRevenue,
      productionsCreated,
      shortsCreated,
      recentPayments,
    ] = await Promise.all([
      this.prisma.user.count({
        where: {
          lastLoginAt: { gte: dayAgo },
        },
      }),
      this.prisma.user.count({
        where: {
          lastLoginAt: { gte: monthAgo },
        },
      }),
      this.prisma.payment.aggregate({
        where: { status: 'SUCCEEDED' },
        _sum: { amount: true },
      }),
      this.prisma.production.count({
        where: {
          createdAt: { gte: monthAgo },
        },
      }),
      this.prisma.short.count({
        where: {
          createdAt: { gte: monthAgo },
        },
      }),
      this.prisma.payment.findMany({
        where: { status: 'SUCCEEDED' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      }),
    ]);

    return {
      dailyActiveUsers,
      monthlyActiveUsers,
      totalRevenue: totalRevenue._sum.amount || 0,
      productionsCreated,
      shortsCreated,
      recentPayments,
    };
  }

  /**
   * Get system health
   */
  async getSystemHealth(): Promise<any> {
    try {
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;

      // Get queue status (stub for now)
      const queueStatus = {
        cinema: 'healthy',
        shorts: 'healthy',
        growth: 'healthy',
      };

      return {
        status: 'healthy',
        database: 'connected',
        queues: queueStatus,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
      };
    }
  }
}
