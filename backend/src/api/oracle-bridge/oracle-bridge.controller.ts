import { Controller, Post, Get } from '@nestjs/common';
import { OracleSyncService } from '../../services/oracle-sync/oracle-sync.service';

/**
 * Oracle Bridge API Controller
 * REST endpoints for optional enterprise mirroring to Oracle database
 *
 * This is an optional integration. When configured, it mirrors production
 * data (users, productions, shorts, metrics) to an Oracle database for
 * enterprise reporting or external analytics consumers.
 *
 * Endpoints:
 * - POST /oracle/sync/full
 * - GET /oracle/sync/status
 */
@Controller('oracle')
export class OracleBridgeController {
  constructor(private readonly oracleSyncService: OracleSyncService) {}

  /**
   * Trigger full sync to Oracle
   * POST /oracle/sync/full
   */
  @Post('sync/full')
  async fullSync() {
    await this.oracleSyncService.fullSync();
    return { message: 'Full sync initiated' };
  }

  /**
   * Get sync status
   * GET /oracle/sync/status
   */
  @Get('sync/status')
  async getSyncStatus() {
    return this.oracleSyncService.getSyncStatus();
  }

  /**
   * Retry failed syncs
   * POST /oracle/sync/retry
   */
  @Post('sync/retry')
  async retryFailedSyncs() {
    await this.oracleSyncService.retryFailedSyncs();
    return { message: 'Retry initiated' };
  }
}
