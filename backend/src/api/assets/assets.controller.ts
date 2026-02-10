import { Controller, Get, Param } from '@nestjs/common';
import { CinemaService } from '../../services/cinema/cinema.service';

/**
 * Assets API Controller
 * REST endpoints for production assets
 *
 * Endpoints:
 * - GET /assets/productions/:id
 */
@Controller('assets')
export class AssetsController {
  constructor(private readonly cinemaService: CinemaService) {}

  /**
   * Get assets for a production
   * GET /assets/productions/:id
   */
  @Get('productions/:id')
  async getProductionAssets(@Param('id') productionId: string) {
    return this.cinemaService.getAssets(productionId);
  }
}
