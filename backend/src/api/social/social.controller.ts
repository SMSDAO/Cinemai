import { Controller, Post, Get, Delete, Body, Param, Req, Query } from '@nestjs/common';
import { SocialService } from '../../services/social/social.service';

/**
 * Social API Controller
 * REST endpoints for social account management
 * 
 * Endpoints:
 * - POST /social/accounts
 * - GET /social/accounts
 * - DELETE /social/accounts/:id
 * - GET /social/auth/:platform
 */
@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  /**
   * Connect a social account
   * POST /social/accounts
   */
  @Post('accounts')
  async connectAccount(
    @Req() req: any,
    @Body() body: {
      platform: 'tiktok' | 'instagram' | 'youtube' | 'x';
      accessToken: string;
      refreshToken?: string;
      accountName: string;
    },
  ) {
    const userId = req.user?.id;
    return this.socialService.connectAccount(userId, body);
  }

  /**
   * List connected accounts
   * GET /social/accounts
   */
  @Get('accounts')
  async listAccounts(@Req() req: any) {
    const userId = req.user?.id;
    return this.socialService.listAccounts(userId);
  }

  /**
   * Disconnect a social account
   * DELETE /social/accounts/:id
   */
  @Delete('accounts/:id')
  async disconnectAccount(@Param('id') accountId: string) {
    await this.socialService.disconnectAccount(accountId);
    return { message: 'Account disconnected' };
  }

  /**
   * Get OAuth authorization URL
   * GET /social/auth/:platform
   */
  @Get('auth/:platform')
  async getAuthUrl(@Param('platform') platform: string, @Query('redirect_uri') redirectUri: string) {
    const authUrl = await this.socialService.getAuthUrl(platform, redirectUri);
    return { authUrl };
  }

  /**
   * Handle OAuth callback
   * POST /social/auth/:platform/callback
   */
  @Post('auth/:platform/callback')
  async handleOAuthCallback(@Param('platform') platform: string, @Body() body: { code: string }) {
    return this.socialService.handleOAuthCallback(platform, body.code);
  }
}
