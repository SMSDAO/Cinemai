import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { S3Client } from '../../utils/s3-client/s3-client';

/**
 * User Service
 * Handles user profile management
 * - Profile CRUD operations
 * - User preferences
 * - Avatar management
 */
@Injectable()
export class UserService {
  private s3Client: S3Client;

  constructor(private prisma: PrismaService) {
    this.s3Client = new S3Client();
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId: string): Promise<any> {
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
        role: true,
        stats: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    data: { name?: string; handle?: string; bio?: string; avatarUrl?: string },
  ): Promise<any> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        handle: true,
        bio: true,
        avatarUrl: true,
        subscriptionType: true,
        tripsRemaining: true,
      },
    });

    return user;
  }

  /**
   * Delete user account
   */
  async deleteAccount(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user.id,
      theme: 'dark',
      notifications: true,
    };
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: string, preferences: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user.id,
      ...preferences,
    };
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(userId: string, file: Buffer): Promise<string> {
    const avatarUrl = await this.s3Client.uploadAvatar(userId, file, 'image/jpeg');

    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
    });

    return avatarUrl;
  }

  /**
   * Get user stats
   */
  async getUserStats(userId: string): Promise<any> {
    const [productionCount, shortCount, followersCount, followingCount] = await Promise.all([
      this.prisma.production.count({ where: { userId } }),
      this.prisma.short.count({ where: { userId } }),
      this.prisma.follow.count({ where: { followingId: userId } }),
      this.prisma.follow.count({ where: { followerId: userId } }),
    ]);

    const stats = {
      productions: productionCount,
      shorts: shortCount,
      followers: followersCount,
      following: followingCount,
    };

    // Update user stats in database
    await this.prisma.user.update({
      where: { id: userId },
      data: { stats },
    });

    return stats;
  }
}
