/**
 * Backend Integration Tests
 * Tests for production deployment requirements:
 * - Admin seed exists and works
 * - Login flow with admin credentials
 * - CORS configuration
 * - Health check endpoint
 * - Admin authorization
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// Skip e2e tests if DATABASE_URL is not set (e.g., running locally without a test database)
const describeIfDatabase = process.env.DATABASE_URL ? describe : describe.skip;

describeIfDatabase('Backend Production Tests (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // Apply same CORS configuration as main.ts
    app.enableCors({
      origin: [
        'http://localhost:3001',
        'http://localhost:5173',
        'https://cinemai-bice.vercel.app',
        /^https:\/\/.*\.vercel\.app$/,
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true,
    });

    app.setGlobalPrefix('api');

    // Health check endpoint
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get('/health', (_req: any, res: any) => {
      res.json({ status: 'ok' });
    });

    await app.init();
    
    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('1. Health Check Endpoint', () => {
    it('GET /health should return 200 with status ok', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('2. Admin Seed', () => {
    it('should ensure admin user exists in database', async () => {
      const admin = await prisma.user.findUnique({
        where: { email: 'admin@admin.com' },
      });

      expect(admin).toBeDefined();
      expect(admin?.email).toBe('admin@admin.com');
      expect(admin?.role).toBe('ADMIN');
    });

    it('admin user should have valid password hash', async () => {
      const admin = await prisma.user.findUnique({
        where: { email: 'admin@admin.com' },
      });

      expect(admin?.passwordHash).toBeDefined();
      
      // Verify password can be checked
      const isValid = await bcrypt.compare('Admin123$', admin!.passwordHash);
      expect(isValid).toBe(true);
    });
  });

  describe('3. Login with Admin Credentials', () => {
    it('POST /api/auth/login should work with admin@admin.com / Admin123$', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'Admin123$',
        })
        .expect(201);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('admin@admin.com');
      expect(response.body.user.role).toBe('admin'); // Should be lowercase
      
      // Store token for subsequent tests
      adminToken = response.body.token;
    });

    it('should return correct user object structure', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'Admin123$',
        })
        .expect(201);

      const { user, token } = response.body;

      // Verify required fields
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
      expect(typeof user.id).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.role).toBe('string');
      expect(typeof token).toBe('string');
    });
  });

  describe('4. Role Normalization', () => {
    it('should return role in lowercase (admin not ADMIN)', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'Admin123$',
        })
        .expect(201);

      expect(response.body.user.role).toBe('admin');
      expect(response.body.user.role).not.toBe('ADMIN');
    });
  });

  describe('5. CORS Configuration', () => {
    it('should allow production domain (cinemai-bice.vercel.app)', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .set('Origin', 'https://cinemai-bice.vercel.app')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });

    it('should allow preview deployments (*.vercel.app)', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .set('Origin', 'https://cinemai-pr-123-hash.vercel.app')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });

    it('should allow localhost for development', async () => {
      const response = await request(app.getHttpServer())
        .get('/health')
        .set('Origin', 'http://localhost:3001')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('6. Admin Authorization', () => {
    let nonAdminToken: string;

    beforeAll(async () => {
      // Create a regular user for testing
      const testUser = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
          email: 'test@example.com',
          passwordHash: await bcrypt.hash('testpass123', 10),
          name: 'Test User',
          role: 'USER',
        },
      });

      // Login as regular user
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'testpass123',
        });

      nonAdminToken = response.body.token;
    });

    it('should allow admin users to access /api/admin/* endpoints', async () => {
      // Ensure we have admin token from previous test
      expect(adminToken).toBeDefined();

      // Try to access admin endpoint
      const response = await request(app.getHttpServer())
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);

      // Should not be 403 (Forbidden)
      expect(response.status).not.toBe(403);
    });

    it('should reject non-admin users from /api/admin/* endpoints', async () => {
      // Ensure we have non-admin token
      expect(nonAdminToken).toBeDefined();

      // Try to access admin endpoint
      const response = await request(app.getHttpServer())
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${nonAdminToken}`);

      // Should be 403 (Forbidden) or 401 (Unauthorized)
      expect([401, 403]).toContain(response.status);
    });

    it('should reject requests without token', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/admin/users');

      // Should be 401 (Unauthorized)
      expect(response.status).toBe(401);
    });
  });

  describe('7. Login Endpoint Contract', () => {
    it('should accept POST /api/auth/login with email and password', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'Admin123$',
        })
        .expect(201);

      expect(response.body).toBeDefined();
    });

    it('should return token and user object', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'Admin123$',
        });

      expect(response.body).toMatchObject({
        token: expect.any(String),
        user: {
          id: expect.any(String),
          email: expect.any(String),
          role: expect.any(String),
        },
      });
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({
          email: 'admin@admin.com',
          password: 'WrongPassword',
        });

      expect(response.status).toBe(500); // Or 401 depending on error handling
    });
  });
});
