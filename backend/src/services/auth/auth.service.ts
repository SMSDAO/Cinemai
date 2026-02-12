import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { signToken, verifyToken } from '../../utils/jwt/jwt.helper';
import { UserRole } from '@prisma/client';

/**
 * Auth Service
 * Handles authentication and authorization logic
 * - User signup/login
 * - JWT token management
 * - Session handling
 * - OAuth integration (Google, Apple)
 * - Admin authentication
 * - Password change functionality
 */
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Sign up a new user
   */
  async signup(
    email: string,
    password: string,
    name?: string,
  ): Promise<{ user: any; token: string }> {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in database
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: UserRole.USER,
        isFirstLogin: true,
        mustChangePassword: false,
      },
    });

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
        mustChangePassword: user.mustChangePassword,
      },
      token,
    };
  }

  /**
   * Login existing user
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ user: any; token: string; mustChangePassword: boolean }> {
    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login timestamp
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
      },
      token,
      mustChangePassword: user.mustChangePassword,
    };
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean }> {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        mustChangePassword: false,
        isFirstLogin: false,
      },
    });

    return {
      success: true,
    };
  }

  /**
   * Refresh JWT token
   */
  async refresh(token: string): Promise<{ token: string }> {
    // Verify token
    const payload = verifyToken(token);
    if (!payload) {
      throw new Error('Invalid token');
    }

    // Verify user still exists
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Generate new token
    const newToken = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token: newToken,
    };
  }

  /**
   * Logout user
   */
  async logout(userId: string): Promise<void> {
    // Note: JWT tokens are stateless, so logout is typically handled client-side
    // by removing the token. For enhanced security, implement a token blacklist
    // or use refresh tokens with revocation.
    // userId parameter kept for future token blacklist implementation
    void userId;
  }

  /**
   * Validate JWT token
   */
  async validateToken(token: string): Promise<any> {
    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    // Verify user still exists
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
  }

  /**
   * OAuth login (Google, Apple)
   */
  async oauthLogin(provider: string, accessToken: string): Promise<{ user: any; token: string }> {
    // TODO: Integrate with OAuth providers (Google, Apple)
    // This requires provider-specific SDKs and configuration
    void provider;
    void accessToken;
    throw new Error('OAuth integration not yet implemented');
  }

  /**
   * Check if user is admin
   */
  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    return user?.role === UserRole.ADMIN;
  }
}
