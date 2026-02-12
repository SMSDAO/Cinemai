import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Mock Prisma
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthService(mockPrisma as any);
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const name = 'Test User';

      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({
        id: 'user_123',
        email,
        name,
        passwordHash: 'hashed_password',
        role: UserRole.USER,
        isFirstLogin: true,
        mustChangePassword: false,
        avatarUrl: null,
        subscriptionType: 'FREE',
        tripsRemaining: 0,
        lastLoginAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await authService.signup(email, password, name);

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(email);
      expect(result.user.name).toBe(name);
      expect(result.token).toBeDefined();
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });

    it('should throw error if user already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'existing_user',
        email: 'test@example.com',
      });

      await expect(authService.signup('test@example.com', 'password123')).rejects.toThrow(
        'User already exists',
      );
    });
  });

  describe('login', () => {
    it('should login existing user', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = await bcrypt.hash(password, 10);

      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user_123',
        email,
        passwordHash: hashedPassword,
        role: UserRole.USER,
        isFirstLogin: false,
        mustChangePassword: false,
        name: 'Test User',
      });

      mockPrisma.user.update.mockResolvedValue({});

      const result = await authService.login(email, password);

      expect(result).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(email);
      expect(result.token).toBeDefined();
      expect(result.mustChangePassword).toBe(false);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user_123' },
        data: { lastLoginAt: expect.any(Date) },
      });
    });

    it('should throw error for invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.login('test@example.com', 'wrong_password')).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('changePassword', () => {
    it('should change user password', async () => {
      const userId = 'user_123';
      const currentPassword = 'old_password';
      const newPassword = 'new_password';
      const hashedPassword = await bcrypt.hash(currentPassword, 10);

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        passwordHash: hashedPassword,
      });

      mockPrisma.user.update.mockResolvedValue({});

      const result = await authService.changePassword(userId, currentPassword, newPassword);

      expect(result.success).toBe(true);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          passwordHash: expect.any(String),
          mustChangePassword: false,
          isFirstLogin: false,
        },
      });
    });
  });

  describe('refresh', () => {
    it('should refresh token', async () => {
      const userId = 'user_123';
      const email = 'test@example.com';

      // Create a valid token first
      const validToken = require('../../utils/jwt/jwt.helper').signToken({
        userId,
        email,
        role: UserRole.USER,
      });

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        email,
        role: UserRole.USER,
      });

      const result = await authService.refresh(validToken);

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
    });
  });

  describe('validateToken', () => {
    it('should validate token and return user', async () => {
      const userId = 'user_123';
      const email = 'test@example.com';

      // Create a valid token
      const validToken = require('../../utils/jwt/jwt.helper').signToken({
        userId,
        email,
        role: UserRole.USER,
      });

      mockPrisma.user.findUnique.mockResolvedValue({
        id: userId,
        email,
        role: UserRole.USER,
        name: 'Test User',
      });

      const result = await authService.validateToken(validToken);

      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
      expect(result.email).toBe(email);
    });

    it('should return null for invalid token', async () => {
      const result = await authService.validateToken('invalid_token');

      expect(result).toBeNull();
    });
  });

  describe('isAdmin', () => {
    it('should return true for admin user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'admin_123',
        role: UserRole.ADMIN,
      });

      const result = await authService.isAdmin('admin_123');

      expect(result).toBe(true);
    });

    it('should return false for non-admin user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user_123',
        role: UserRole.USER,
      });

      const result = await authService.isAdmin('user_123');

      expect(result).toBe(false);
    });
  });
});
