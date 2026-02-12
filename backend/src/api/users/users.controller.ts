import { Controller, Get, Put, Delete, Body, Req } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

/**
 * Users API Controller
 * REST endpoints for user management
 *
 * Endpoints:
 * - GET /users/me
 * - PUT /users/me
 * - DELETE /users/me
 */
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get current user profile
   * GET /users/me
   */
  @Get('me')
  async getProfile(@Req() req: any) {
    const userId = req.user?.id;
    return this.userService.getProfile(userId);
  }

  /**
   * Update current user profile
   * PUT /users/me
   */
  @Put('me')
  async updateProfile(@Req() req: any, @Body() body: { name?: string; handle?: string; bio?: string; avatarUrl?: string }) {
    const userId = req.user?.id;
    return this.userService.updateProfile(userId, body);
  }

  /**
   * Get user stats
   * GET /users/me/stats
   */
  @Get('me/stats')
  async getUserStats(@Req() req: any) {
    const userId = req.user?.id;
    return this.userService.getUserStats(userId);
  }

  /**
   * Delete current user account
   * DELETE /users/me
   */
  @Delete('me')
  async deleteAccount(@Req() req: any) {
    const userId = req.user?.id;
    await this.userService.deleteAccount(userId);
    return { message: 'Account deleted successfully' };
  }
}
