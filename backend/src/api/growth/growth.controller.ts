import { Controller, Post, Get, Body, Param, Req, Query } from '@nestjs/common';
import { GrowthService } from '../../services/growth/growth.service';

/**
 * Growth API Controller
 * REST endpoints for social media automation
 * 
 * Endpoints:
 * - POST /social/posts
 * - GET /social/posts
 * - GET /analytics/shorts
 * - GET /analytics/productions
 */
@Controller()
export class GrowthController {
  constructor(private readonly growthService: GrowthService) {}

  /**
   * Publish content to social platforms
   * POST /social/posts
   */
  @Post('social/posts')
  async publishPost(
    @Req() req: any,
    @Body() body: {
      contentId: string;
      contentType: 'production' | 'short';
      platforms: string[];
      caption?: string;
      scheduledAt?: string;
    },
  ) {
    const userId = req.user?.id;
    return this.growthService.publishPost(userId, {
      ...body,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
    });
  }

  /**
   * List user's social posts
   * GET /social/posts
   */
  @Get('social/posts')
  async listPosts(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user?.id;
    return this.growthService.listPosts(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  /**
   * Get post analytics
   * GET /social/posts/:id/analytics
   */
  @Get('social/posts/:id/analytics')
  async getPostAnalytics(@Param('id') postId: string) {
    return this.growthService.getPostAnalytics(postId);
  }

  /**
   * Get analytics for shorts
   * GET /analytics/shorts
   */
  @Get('analytics/shorts')
  async getShortsAnalytics(@Req() req: any, @Query('timeRange') timeRange?: string) {
    const userId = req.user?.id;
    return this.growthService.getShortsAnalytics(userId, timeRange);
  }

  /**
   * Get analytics for productions
   * GET /analytics/productions
   */
  @Get('analytics/productions')
  async getProductionsAnalytics(@Req() req: any, @Query('timeRange') timeRange?: string) {
    const userId = req.user?.id;
    return this.growthService.getProductionsAnalytics(userId, timeRange);
  }

  /**
   * Get AI-powered insights
   * GET /analytics/insights
   */
  @Get('analytics/insights')
  async getInsights(@Req() req: any) {
    const userId = req.user?.id;
    return this.growthService.getInsights(userId);
  }

  /**
   * Sync metrics from social platforms
   * POST /social/metrics/sync
   */
  @Post('social/metrics/sync')
  async syncMetrics(@Req() req: any) {
    const userId = req.user?.id;
    await this.growthService.syncMetrics(userId);
    return { message: 'Metrics sync started' };
  }
}
