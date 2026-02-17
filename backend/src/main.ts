import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply rate limiting middleware globally
  app.use(new RateLimitMiddleware().use);

  // Enable CORS with production and preview domain support
  app.enableCors({
    origin: [
      'http://localhost:3001',                  // Local development
      'http://localhost:5173',                  // Vite dev server
      'https://cinemai-bice.vercel.app',        // Production domain
      /^https:\/\/.*\.vercel\.app$/,            // All Vercel preview deployments
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Health check endpoint (before global prefix)
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/health', (_req: any, res: any) => {
    res.json({ status: 'ok' });
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 CinemAi Neo Backend running on http://localhost:${port}`);
}

bootstrap();
