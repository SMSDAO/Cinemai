import { Controller, Post, Get, Delete, Body, Param, Req, Query } from '@nestjs/common';
import { ShortsService } from '../../services/shorts/shorts.service';

/**
 * Shorts API Controller
 * REST endpoints for short-form videos
 *
 * Endpoints:
 * - POST /shorts
 * - POST /shorts/:id/hooks
 * - POST /shorts/:id/variants
 * - GET /shorts/:id
 * - GET /shorts
 * - DELETE /shorts/:id
 */
@Controller('shorts')
export class ShortsController {
  constructor(private readonly shortsService: ShortsService) {}

  /**
   * Create a new short
   * POST /shorts
   */
  @Post()
  async createShort(
    @Req() req: any,
    @Body()
    body: {
      title: string;
      idea: string;
      format?: string;
    },
  ) {
    const userId = req.user?.id;
    return this.shortsService.createShort(userId, body);
  }

  /**
   * Generate hooks for a short
   * POST /shorts/:id/hooks
   */
  @Post(':id/hooks')
  async generateHooks(@Param('id') shortId: string) {
    return this.shortsService.generateHooks(shortId);
  }

  /**
   * Create variants for a short
   * POST /shorts/:id/variants
   */
  @Post(':id/variants')
  async createVariants(@Param('id') shortId: string, @Body() body: { selectedHook: string }) {
    return this.shortsService.createVariants(shortId, body.selectedHook);
  }

  /**
   * Get short by ID
   * GET /shorts/:id
   */
  @Get(':id')
  async getShort(@Param('id') shortId: string) {
    return this.shortsService.getShort(shortId);
  }

  /**
   * List user's shorts
   * GET /shorts
   */
  @Get()
  async listShorts(@Req() req: any, @Query('page') page?: string, @Query('limit') limit?: string) {
    const userId = req.user?.id;
    return this.shortsService.listShorts(
      userId,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  /**
   * Get short variants
   * GET /shorts/:id/variants
   */
  @Get(':id/variants')
  async getVariants(@Param('id') shortId: string) {
    return this.shortsService.getVariants(shortId);
  }

  /**
   * Delete short
   * DELETE /shorts/:id
   */
  @Delete(':id')
  async deleteShort(@Param('id') shortId: string) {
    await this.shortsService.deleteShort(shortId);
    return { message: 'Short deleted' };
  }
}
