import { Controller, Get, Req } from '@nestjs/common';
import { DashboardService } from '../../services/dashboard/dashboard.service';

/**
 * Dashboard API Controller
 * REST endpoints for user dashboard data
 *
 * Endpoints:
 * - GET /dashboard - Complete dashboard data
 * - GET /dashboard/analytics - Analytics summary
 */
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Get complete dashboard data
   * GET /dashboard
   */
  @Get()
  async getDashboard(@Req() req: any) {
    const userId = req.user?.id;
    return this.dashboardService.getDashboard(userId);
  }

  /**
   * Get analytics summary
   * GET /dashboard/analytics
   */
  @Get('analytics')
  async getAnalytics(@Req() req: any) {
    const userId = req.user?.id;
    return this.dashboardService.getAnalytics(userId);
  }
}
