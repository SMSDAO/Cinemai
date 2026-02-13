import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { SyncService } from '../../services/sync/sync.service';

/**
 * Sync API Controller
 * REST endpoints for sync operations
 *
 * Endpoints:
 * - POST /sync/init - Initialize sync session
 * - GET /sync/updates - Get updates since last sync
 * - GET /sync/poll - Poll for changes
 * - GET /sync/status - Get sync status
 */
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  /**
   * Initialize sync session
   * POST /sync/init
   */
  @Post('init')
  async initSession(@Req() req: any, @Body() body: { metadata?: any }) {
    const userId = req.user?.id;
    return this.syncService.initSession(userId, body.metadata);
  }

  /**
   * Get updates since last sync
   * GET /sync/updates
   */
  @Get('updates')
  async getUpdates(@Req() req: any, @Query('since') since?: string) {
    const userId = req.user?.id;
    const sinceDate = since ? new Date(since) : undefined;
    return this.syncService.getUpdates(userId, sinceDate);
  }

  /**
   * Poll for changes
   * GET /sync/poll
   */
  @Get('poll')
  async poll(@Req() req: any) {
    const userId = req.user?.id;
    return this.syncService.poll(userId);
  }

  /**
   * Get sync status
   * GET /sync/status
   */
  @Get('status')
  async getStatus(@Req() req: any) {
    const userId = req.user?.id;
    return this.syncService.getStatus(userId);
  }
}
