/**
 * User Model
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  subscriptionType: 'free' | 'pro';
  tripsRemaining: number;
  passwordHash: string;
  isFirstLogin: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

/**
 * User create input
 */
export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

/**
 * User update input
 */
export interface UpdateUserInput {
  name?: string;
  avatarUrl?: string;
}

/**
 * Password change input
 */
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

/**
 * Admin user for seeding
 */
export const ADMIN_USER = {
  email: 'admin@admin.com',
  password: 'admin123',
  name: 'System Administrator',
  role: 'admin' as const,
};
