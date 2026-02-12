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
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    return this.timelineService.getUserTimeline(userId, parsedLimit, parsedOffset);
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
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    return this.timelineService.getFollowingTimeline(userId, parsedLimit, parsedOffset);
  }

  /**
   * Get global timeline
   * GET /timeline/global
   */
  @Get('global')
  async getGlobalTimeline(@Query('limit') limit?: string, @Query('offset') offset?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;
    return this.timelineService.getGlobalTimeline(parsedLimit, parsedOffset);
  }
}
