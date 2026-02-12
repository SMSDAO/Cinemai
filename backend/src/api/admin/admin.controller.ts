import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { AdminService } from '../../services/admin/admin.service';

/**
 * Admin Controller
 * Handles admin panel functionality
 * - Admin authentication
 * - User management
 * - System configuration
 * - Analytics and reporting
 *
 * Access: /admin/*
 * Auth required: Admin role
 */
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * Admin dashboard
   * GET /admin
   */
  @Get()
  async getDashboard(): Promise<any> {
    const data = await this.adminService.getDashboard();
    return {
      success: true,
      data,
    };
  }

  /**
   * Get all users
   * GET /admin/users
   */
  @Get('users')
  async getUsers(@Query('page') page?: string, @Query('limit') limit?: string): Promise<any> {
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    const data = await this.adminService.getUsers(parsedPage, parsedLimit);
    return {
      success: true,
      data,
    };
  }

  /**
   * Get specific user
   * GET /admin/users/:id
   */
  @Get('users/:id')
  async getUser(@Param('id') userId: string): Promise<any> {
    const data = await this.adminService.getUser(userId);
    return {
      success: true,
      data,
    };
  }

  /**
   * Update user
   * PUT /admin/users/:id
   */
  @Put('users/:id')
  async updateUser(@Param('id') userId: string, @Body() updateData: any): Promise<any> {
    const data = await this.adminService.updateUser(userId, updateData);
    return {
      success: true,
      data,
    };
  }

  /**
   * Delete user
   * DELETE /admin/users/:id
   */
  @Delete('users/:id')
  async deleteUser(@Param('id') userId: string): Promise<any> {
    await this.adminService.deleteUser(userId);
    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  /**
   * Get system settings
   * GET /admin/settings
   */
  @Get('settings')
  async getSettings(): Promise<any> {
    // TODO: Implement settings retrieval
    return {
      success: true,
      data: {
        appName: 'CinemAi Neo',
        version: '1.0.0',
        maintenance: false,
      },
    };
  }

  /**
   * Update system settings
   * PUT /admin/settings
   */
  @Put('settings')
  async updateSettings(@Body() settings: any): Promise<any> {
    // TODO: Implement settings update
    return {
      success: true,
      data: settings,
    };
  }

  /**
   * Get analytics
   * GET /admin/analytics
   */
  @Get('analytics')
  async getAnalytics(): Promise<any> {
    const data = await this.adminService.getAnalytics();
    return {
      success: true,
      data,
    };
  }

  /**
   * Get system health
   * GET /admin/health
   */
  @Get('health')
  async getSystemHealth(): Promise<any> {
    const data = await this.adminService.getSystemHealth();
    return {
      success: true,
      data,
    };
  }
}
