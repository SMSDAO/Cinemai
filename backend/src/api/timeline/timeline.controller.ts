import { Controller, Get, Query, Req } from '@nestjs/common';
import { TimelineService } from '../../services/timeline/timeline.service';

/**
 * Timeline API Controller
 * REST endpoints for timeline and activity feeds
 *
 * Endpoints:
 * - GET /timeline/me - User's own timeline
 * - GET /timeline/following - Activity from followed users
 * - GET /timeline/global - Global feed
 */
@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  /**
   * Get current user's timeline
   * GET /timeline/me
   */
  @Get('me')
  async getUserTimeline(
    @Req() req: any,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const userId = req.user?.id;
    const DEFAULT_LIMIT = 20;
    const MAX_LIMIT = 100;
    const DEFAULT_OFFSET = 0;

    const rawLimit = limit !== undefined ? Number.parseInt(limit, 10) : NaN;
    const rawOffset = offset !== undefined ? Number.parseInt(offset, 10) : NaN;

    const safeLimit =
      Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;
    const safeOffset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : DEFAULT_OFFSET;

    return this.timelineService.getUserTimeline(userId, safeLimit, safeOffset);
  }

  /**
   * Get timeline from followed users
   * GET /timeline/following
   */
  @Get('following')
  async getFollowingTimeline(
    @Req() req: any,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const userId = req.user?.id;
    const DEFAULT_LIMIT = 20;
    const MAX_LIMIT = 100;
    const DEFAULT_OFFSET = 0;

    const rawLimit = limit !== undefined ? Number.parseInt(limit, 10) : NaN;
    const rawOffset = offset !== undefined ? Number.parseInt(offset, 10) : NaN;

    const safeLimit =
      Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;
    const safeOffset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : DEFAULT_OFFSET;

    return this.timelineService.getFollowingTimeline(userId, safeLimit, safeOffset);
  }

  /**
   * Get global timeline
   * GET /timeline/global
   */
  @Get('global')
  async getGlobalTimeline(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const DEFAULT_LIMIT = 20;
    const MAX_LIMIT = 100;
    const DEFAULT_OFFSET = 0;

    const rawLimit = limit !== undefined ? Number.parseInt(limit, 10) : NaN;
    const rawOffset = offset !== undefined ? Number.parseInt(offset, 10) : NaN;

    const safeLimit =
      Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;
    const safeOffset = Number.isFinite(rawOffset) && rawOffset >= 0 ? rawOffset : DEFAULT_OFFSET;

    return this.timelineService.getGlobalTimeline(safeLimit, safeOffset);
  }
}
