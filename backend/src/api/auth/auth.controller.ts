import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Auth API Controller
 * REST endpoints for authentication
 *
 * Endpoints:
 * - POST /auth/signup
 * - POST /auth/login
 * - POST /auth/refresh
 * - POST /auth/logout
 * - POST /auth/change-password
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Sign up a new user
   * POST /auth/signup
   */
  @Post('signup')
  async signup(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.signup(body.email, body.password, body.name);
  }

  /**
   * Login existing user
   * POST /auth/login
   */
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  /**
   * Change password
   * POST /auth/change-password
   */
  @Post('change-password')
  async changePassword(
    @Body() body: { userId: string; currentPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(body.userId, body.currentPassword, body.newPassword);
  }

  /**
   * Refresh JWT token
   * POST /auth/refresh
   */
  @Post('refresh')
  async refresh(@Body() body: { token: string }) {
    return this.authService.refresh(body.token);
  }

  /**
   * Logout user
   * POST /auth/logout
   */
  @Post('logout')
  async logout(@Req() req: any) {
    const userId = req.user?.id;
    await this.authService.logout(userId);
    return { message: 'Logged out successfully' };
  }
}
