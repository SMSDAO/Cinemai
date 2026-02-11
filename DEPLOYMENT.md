# Vercel Deployment Guide

## Overview

This repository is configured for Vercel deployment. The current configuration deploys a static landing page at the root URL.

## What's Deployed

- **Landing Page**: The `public/index.html` file is served at the root URL (`/`)
- **Static Assets**: All files in the `public/` directory are served as static assets

## Deployment Steps

### 1. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import this GitHub repository
4. Vercel will automatically detect the configuration from `vercel.json`

### 2. Configure Environment Variables

If deploying the backend API, set the following environment variables in Vercel:

- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to `production`

### 3. Deploy

- Push to the `main` branch to trigger automatic deployment
- Or manually deploy from the Vercel dashboard

## Current Configuration

The `vercel.json` file is configured to:
- Serve static files from the `public/` directory
- Set security headers
- Handle 404 errors gracefully

## Backend API Deployment

**Note**: The backend NestJS API is not currently configured for Vercel deployment because:
- NestJS requires a long-running server process
- Vercel serverless functions have time limits (10s for Hobby, 60s for Pro)
- Database connections need careful management in serverless

### Recommended Backend Deployment Options

1. **Railway**: Best for NestJS with PostgreSQL
2. **Render**: Good for containerized deployments
3. **AWS ECS/EKS**: For production-grade deployments
4. **DigitalOcean App Platform**: Simple and cost-effective

### Alternative: Vercel + Serverless Backend

To deploy the backend on Vercel, you would need to:
1. Convert to serverless functions in `api/` directory
2. Use connection pooling for database (e.g., Prisma with connection limits)
3. Implement proper cleanup in serverless context
4. Update the `vercel.json` configuration

## CI/CD Pipeline

GitHub Actions runs automatically on every push and pull request:
- Linting (ESLint + Prettier)
- Type checking (TypeScript)
- Tests (Jest)
- Build verification

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install --legacy-peer-deps
npm start
```

## Troubleshooting

### 404 Errors
- Ensure `public/index.html` exists
- Check `vercel.json` routes configuration
- Verify build completed successfully

### Build Failures
- Check that all dependencies are installed
- Ensure `package-lock.json` is committed
- Review build logs in Vercel dashboard

## Support

For issues specific to this deployment, check:
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- Repository issues and pull requests
