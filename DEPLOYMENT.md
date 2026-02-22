# CinemAi Deployment Guide

## Overview

This repository contains three deployable components:
1. **Web App** (`app-nextjs`, Next.js) → Deploys to Vercel (primary)
2. **Backend API** (NestJS) → Deploys to Vercel (primary) or Railway/Render/Fly.io
3. **Mobile App** (React Native + Expo) → Deploys to app stores

> **Note**: The `web/` folder contains a minimal legacy Vite/React implementation and is optional.

---

## 🌐 Web App Deployment (Vercel)

### Quick Start

The CinemAi Neo web app (`app-nextjs`) is configured for automatic deployment to Vercel.

**📖 Complete Guide:** See [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed instructions.

### Essential Information

**What's Deployed:**
- Full Next.js web application (`app-nextjs/`)
- AI agent dashboard, scripts, videos, campaigns, and settings pages
- Neo Glow UI with dark theme
- Responsive mobile-first design

**Requirements:**
- Vercel account connected to GitHub
- Backend API running and accessible
- Environment variable `NEXT_PUBLIC_API_URL` configured

**Quick Setup:**

1. **Connect to Vercel**
   - Import repository from GitHub
   - Vercel auto-detects configuration

2. **Set Environment Variables**
   - Production: `NEXT_PUBLIC_API_URL=https://cinemai-bice.vercel.app/api`
   - Preview: `NEXT_PUBLIC_API_URL=https://cinemai-bice.vercel.app/api`
   - Development: `NEXT_PUBLIC_API_URL=http://localhost:3000`

3. **Deploy**
   - Push to `main` branch for production
   - Create PR for preview deployments

### Current Configuration

**File:** `vercel.json`

- **Build Command:** `cd app-nextjs && npx prisma generate && npm run build`
- **Output Directory:** `app-nextjs/.next`
- **Framework:** Next.js
- **Security Headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

---

## 🔧 Backend API Deployment

### Primary: Vercel

The backend NestJS API is deployed to Vercel using serverless functions. See [MASTER_PIPELINE_DEPLOYMENT_GUIDE.md](./MASTER_PIPELINE_DEPLOYMENT_GUIDE.md) for the complete deployment procedure.

### Alternative Platforms

If a long-running server process is required (e.g., for persistent queue workers):

1. **Railway** ⭐ Recommended alternative
   - Easy NestJS deployment
   - Built-in PostgreSQL
   - Automatic HTTPS
   - Simple environment variables

2. **Render**
   - Docker support
   - Free tier available
   - Good for PostgreSQL

3. **Fly.io**
   - Global deployment
   - Containerized apps
   - PostgreSQL support

### Backend Requirements

**Environment Variables:**
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=production
```

**CORS Configuration:**

Backend must allow these origins (already configured):
- `https://cinemai-bice.vercel.app` (production)
- `https://*.vercel.app` (preview deployments)
- `http://localhost:3001` (development)
- `http://localhost:5173` (Vite dev)

**File:** `backend/src/main.ts` (lines 7-16)

**📖 Backend Setup:** See [`SETUP.md`](./SETUP.md) and [`MASTER_PIPELINE_DEPLOYMENT_GUIDE.md`](./MASTER_PIPELINE_DEPLOYMENT_GUIDE.md) for the complete backend configuration guide.

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
