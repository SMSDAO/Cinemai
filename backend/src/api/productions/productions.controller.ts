import { Controller, Post, Get, Delete, Body, Param, Req, Query } from '@nestjs/common';
import { CinemaService } from '../../services/cinema/cinema.service';

/**
 * Productions API Controller
 * REST endpoints for cinema productions
 * 
 * Endpoints:
 * - POST /cinema/productions
 * - POST /cinema/productions/:id/run
 * - GET /cinema/productions/:id
 * - GET /cinema/productions
 * - DELETE /cinema/productions/:id
 */
@Controller('cinema/productions')
export class ProductionsController {
  constructor(private readonly cinemaService: CinemaService) {}

  /**
   * Create a new production
   * POST /cinema/productions
   */
  @Post()
  async createProduction(
    @Req() req: any,
    @Body() body: {
      title: string;
      script: string;
      photoUrl: string;
      style?: string;
    },
  ) {
    const userId = req.user?.id;
    return this.cinemaService.createProduction(userId, body);
  }

  /**
   * Start production processing
   * POST /cinema/productions/:id/run
   */
  @Post(':id/run')
  async runProduction(@Param('id') productionId: string) {
    await this.cinemaService.runProduction(productionId);
    return { message: 'Production queued for processing' };
  }

  /**
   * Get production by ID
   * GET /cinema/productions/:id
   */
  @Get(':id')
  async getProduction(@Param('id') productionId: string) {
    return this.cinemaService.getProduction(productionId);
  }

  /**
   * List user's productions
   * GET /cinema/productions
   */
  @Get()
  async listProductions(
    @Req() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req.user?.id;
    return this.cinemaService.listProductions(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  /**
   * Delete production
   * DELETE /cinema/productions/:id
   */
  @Delete(':id')
  async deleteProduction(@Param('id') productionId: string) {
    await this.cinemaService.deleteProduction(productionId);
    return { message: 'Production deleted' };
  }

  /**
   * Get production assets
   * GET /cinema/productions/:id/assets
   */
  @Get(':id/assets')
  async getAssets(@Param('id') productionId: string) {
    return this.cinemaService.getAssets(productionId);
  }
}
