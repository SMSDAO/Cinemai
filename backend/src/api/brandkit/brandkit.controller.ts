import { Controller, Post, Put, Get, Delete, Body, Param, Req } from '@nestjs/common';
import { BrandkitService } from '../../services/brandkit/brandkit.service';

/**
 * Brand Kit API Controller
 * REST endpoints for brand asset management
 * 
 * Endpoints:
 * - POST /brandkit
 * - PUT /brandkit/:id
 * - GET /brandkit
 * - GET /brandkit/:id
 * - DELETE /brandkit/:id
 */
@Controller('brandkit')
export class BrandkitController {
  constructor(private readonly brandkitService: BrandkitService) {}

  /**
   * Create a brand kit
   * POST /brandkit
   */
  @Post()
  async createBrandKit(
    @Req() req: any,
    @Body() body: {
      name: string;
      logoUrl?: string;
      primaryColor?: string;
      secondaryColor?: string;
      fontFamily?: string;
    },
  ) {
    const userId = req.user?.id;
    return this.brandkitService.createBrandKit(userId, body);
  }

  /**
   * Update brand kit
   * PUT /brandkit/:id
   */
  @Put(':id')
  async updateBrandKit(
    @Param('id') brandKitId: string,
    @Body() body: {
      name?: string;
      logoUrl?: string;
      primaryColor?: string;
      secondaryColor?: string;
      fontFamily?: string;
    },
  ) {
    return this.brandkitService.updateBrandKit(brandKitId, body);
  }

  /**
   * Get brand kit by ID
   * GET /brandkit/:id
   */
  @Get(':id')
  async getBrandKit(@Param('id') brandKitId: string) {
    return this.brandkitService.getBrandKit(brandKitId);
  }

  /**
   * List user's brand kits
   * GET /brandkit
   */
  @Get()
  async listBrandKits(@Req() req: any) {
    const userId = req.user?.id;
    return this.brandkitService.listBrandKits(userId);
  }

  /**
   * Delete brand kit
   * DELETE /brandkit/:id
   */
  @Delete(':id')
  async deleteBrandKit(@Param('id') brandKitId: string) {
    await this.brandkitService.deleteBrandKit(brandKitId);
    return { message: 'Brand kit deleted' };
  }
}
