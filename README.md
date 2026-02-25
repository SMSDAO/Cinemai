# CinemAi Neo

Welcome to **CinemAi Neo** - the next generation AI-powered cinema and content creation platform.

## 🌐 Live Demo

Visit our landing page at [https://cinemai-bice.vercel.app](https://cinemai-bice.vercel.app) to see CinemAi Neo in action.

### Landing Page Features

The landing page showcases:
- **🎬 Cinema**: Transform photos + scripts into cinematic videos with multi-scene production
- **🎞️ Shorts**: Generate engaging short-form content with AI-powered hooks and captions  
- **📈 Growth**: Publish, schedule, and analyze across all major social platforms

![CinemAi Neo Landing Page](./docs/assets/landing-page.png)

The page features our Neo Glow design system with:
- Dark gradient backgrounds (#05060A → #0A0C12)
- Cyan primary glow (#00F0FF)
- Magenta secondary glow (#FF2EF5)
- Responsive mobile-first layout

## 🏗️ Repository Structure

This is a standalone repository containing all services, applications, and infrastructure for the CinemAi Neo platform:

### 📦 Core Directories

- **`app-nextjs/`** - Next.js primary web application (AI agents, dashboard, campaigns)
- **`backend/`** - NestJS backend API with services, models, queues, and utilities
- **`mobile/`** - React Native mobile application for iOS and Android
- **`agents/`** - AI agents for cinema, shorts, and growth automation
- **`workers/`** - Background workers for processing queues and tasks
- **`infra/`** - Infrastructure as code (Docker, Kubernetes, Terraform)
- **`docs/`** - Architecture documentation, API specs, and guides
- **`scripts/`** - Utility scripts for bootstrapping, deployment, and maintenance
- **`config/`** - Environment-specific configuration files
- **`public/`** - Static landing page and web assets
- **`web/`** - Minimal legacy web implementation (optional, React + Vite)

## 🚀 Getting Started

```bash
# Bootstrap all services
./scripts/bootstrap.sh

# Run migrations
./scripts/migrate.sh

# Seed database
./scripts/seed.sh
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

The backend API runs on `http://localhost:3000/api`

### Mobile Development

```bash
cd mobile
npm install --legacy-peer-deps
npm start
```

## 🚢 Deployment

### Vercel (Web Frontend)

The `app-nextjs` web application is deployed to Vercel via the root `vercel.json`:

1. Connected to this GitHub repository
2. Automatic deployments on push to `main`
3. Configuration in root `vercel.json`
4. See [DEPLOYMENT.md](./DEPLOYMENT.md) and [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for details

### Backend Deployment

The NestJS backend is deployed separately (Railway, Render, Fly.io, or a dedicated Vercel project with root directory `backend/`). See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full guide.

## 📚 Documentation

See the [`docs/`](./docs/) directory for detailed documentation on:
- Architecture and system design
- API specifications
- Mobile app development
- Onboarding guides

## 🛠️ Development

### Prerequisites

- **Node.js 24.x or higher** (latest LTS, required for Vercel deployments)
- **npm 10.x or higher**
- **PostgreSQL 14+** (for backend database)
- **Git**

Each module has its own README with specific setup instructions:
- [Backend Documentation](./backend/README.md)
- [Mobile Documentation](./mobile/README.md)
- [AI Agents Documentation](./agents/README.md)

## ✅ CI/CD

GitHub Actions workflows automatically run on every push:
- **Backend CI**: Lint, format check, type check, tests, build
- **Mobile CI**: Lint, format check, type check, tests
- **Security**: CodeQL scanning

All workflows use **Node 24.x** and ensure code quality before deployment.

## 🚀 Vercel Deployment

The web frontend is automatically deployed to Vercel:

- **Production URL**: https://cinemai-nine.vercel.app
- **Auto-deployment**: Enabled on push to `main` branch
- **Node.js Runtime**: 24.x (configured in `vercel.json`)
- **Build Command**: `cd app-nextjs && npx prisma generate && npm run build`
- **Output Directory**: `app-nextjs/.next`

For detailed deployment instructions, see [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md).

## 📄 License

See [LICENSE](./LICENSE) for more information.