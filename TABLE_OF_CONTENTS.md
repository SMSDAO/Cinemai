# CinemAi Neo - Complete Documentation Index

**The Master Guide to CinemAi Neo Development & Architecture**

---

## 📚 Table of Contents

### 🎯 [Quick Start](#quick-start)
### 🏗️ [Architecture](#architecture)
### 💻 [Development](#development)
### 📱 [Mobile App](#mobile-app)
### 🔧 [Backend](#backend)
### 🤖 [AI Agents](#ai-agents)
### ⚙️ [Workers](#workers)
### 🚀 [Infrastructure](#infrastructure)
### 📖 [API Reference](#api-reference)
### 👤 [Admin Panel](#admin-panel)
### 🧪 [Testing](#testing)
### 📝 [Contributing](#contributing)

---

## Quick Start

### Getting Started (5 min)
- **[Getting Started Guide](docs/onboarding/getting-started.md)** - Your first steps with CinemAi Neo
  - Prerequisites & installation
  - Bootstrap the project
  - Environment setup
  - Running development servers

### Essential Reading
1. **[ARCHITECTURE.md](ARCHITECTURE.md)** - The single source of truth (734 lines)
2. **[README.md](README.md)** - Project overview and quick links
3. **[Scaffolding Complete](SCAFFOLDING_COMPLETE.md)** - Implementation status

---

## Architecture

### Core Architecture Documents
- **[ARCHITECTURE.md](ARCHITECTURE.md)** ⭐ **THE ENGINEERING BIBLE**
  - Product overview (Cinema, Shorts, Growth)
  - System architecture & microservices
  - Pipelines (Cinema, Shorts, Growth)
  - AI agents specifications
  - Database schema (12 tables)
  - Folder structure
  - UI/UX system (Neo Glow)
  - Security & deployment

- **[Architecture Overview](docs/architecture/overview.md)**
  - High-level system design
  - Data flow diagrams
  - Technology stack
  - Deployment architecture

- **[Deployment Guide](docs/architecture/deployment.md)**
  - Multi-environment deployment (Dev, Staging, Production)
  - Docker deployment
  - Kubernetes deployment
  - Terraform infrastructure
  - CI/CD pipelines
  - Monitoring & troubleshooting

### Concept & Specifications
- **[CONCEPT.md](CONCEPT.md)** - Original vision and concept
- **[SPECS_ARCHITECTURE.md](SPECS_ARCHITECTURE.md)** - Detailed specifications
- **[MOVIE_BUILD_SPECS.md](MOVIE_BUILD_SPECS.md)** - Movie production specifications

---

## Development

### Scaffolding Status
- **[SCAFFOLDING_COMPLETE.md](SCAFFOLDING_COMPLETE.md)** - Complete implementation summary
  - Repository statistics (31,353 files, 18,964 code files)
  - Component breakdown
  - Key features delivered
  - Quality & compliance
  - Next steps

- **[BACKEND_SCAFFOLDING_COMPLETE.md](BACKEND_SCAFFOLDING_COMPLETE.md)** - Backend details
  - 9 services, 10 controllers, 12 models
  - 11 queue processors
  - 9 utilities
  - Implementation summary

- **[MOBILE_SCAFFOLDING_COMPLETE.md](MOBILE_SCAFFOLDING_COMPLETE.md)** - Mobile details
  - 8 screens, 7 Neo Glow components
  - Complete navigation
  - 5 hooks, 3 contexts, 7 API services

- **[AGENTS_SCAFFOLDING_COMPLETE.md](AGENTS_SCAFFOLDING_COMPLETE.md)** - AI Agents details
  - 16 agents (7 Cinema, 4 Shorts, 2 Growth, 3 orchestrators)
  - Shared utilities
  - Pipeline implementation

### Admin Implementation
- **[ADMIN_IMPLEMENTATION_SUMMARY.md](ADMIN_IMPLEMENTATION_SUMMARY.md)** - Admin panel complete guide
  - 18 files created/modified
  - Admin panel features
  - Password change flow
  - Setup & usage
  - Security features

---

## Mobile App

### Setup & Configuration
- **[Mobile Setup Guide](docs/mobile/setup.md)**
  - React Native installation
  - iOS & Android setup
  - Development environment
  - Running the app

- **[MOBILE_STRUCTURE.md](MOBILE_STRUCTURE.md)** - Complete mobile structure
  - Directory layout
  - Screen organization
  - Component architecture
  - Navigation setup

### Design System
- **[Design Tokens](docs/mobile/design-tokens.md)**
  - Neo Glow color system
  - Typography tokens
  - Spacing system
  - Component tokens
  - Usage examples

- **[UI Design Tokens](.github/ui-design-tokens.md)**
  - Complete token specifications
  - Dark backgrounds (#05060A, #0A0C12)
  - Glow colors (cyan #00F0FF, magenta #FF2EF5, purple #6B4CFF)
  - 4-point spacing grid
  - WCAG AA compliance

### Screens (8 Total)
1. **HomeScreen** - Dashboard with stats & quick actions
2. **CinemaSimpleScreen** - Quick photo + script upload
3. **CinemaProScreen** - Advanced controls & style selection
4. **ShortsScreen** - Hook generation & variant management
5. **GrowthScreen** - Social publishing & analytics
6. **BrandKitScreen** - Logo, colors, fonts management
7. **BillingScreen** - Trip packages & Pro subscription
8. **AccountScreen** - Profile & settings
9. **AdminScreen** - Admin dashboard (admin only)
10. **ChangePasswordScreen** - Password management

### Components (7 Neo Glow Components)
1. **NeoGlowButton** - Primary/secondary buttons with glow effect
2. **NeoGlowCard** - Cards with customizable glow borders
3. **UploadBox** - File upload interface
4. **StylePicker** - Cinematic style selector
5. **Timeline** - Production progress indicator
6. **CaptionPreview** - Caption styling preview
7. **AnalyticsCharts** - Performance metrics visualization

### Navigation
- **AppNavigator** - Root navigation container
- **TabNavigator** - Bottom tab navigation (5 tabs)
- **CinemaNavigator** - Cinema stack navigation
- Type-safe navigation with TypeScript

### Hooks & Context
- **useAuth** - Authentication management
- **useProductions** - Cinema productions CRUD
- **useShorts** - Shorts management
- **useAnalytics** - Analytics data
- **useBrandKit** - Brand kit operations
- **AuthContext** - Authentication state
- **ThemeContext** - Neo Glow theme
- **AppContext** - Global app state

### API Services
- **api.ts** - Axios client with interceptors
- **auth.service.ts** - Authentication
- **cinema.service.ts** - Productions
- **shorts.service.ts** - Shorts
- **growth.service.ts** - Social media
- **billing.service.ts** - Payments
- **brandkit.service.ts** - Brand kits

---

## Backend

### Services (9 Microservices)
1. **AUTH Service** - Authentication & JWT
   - Location: `backend/src/services/auth/auth.service.ts`
   - Endpoints: signup, login, refresh, logout, changePassword

2. **USER Service** - User profile management
   - Location: `backend/src/services/user/user.service.ts`
   - Features: Profile CRUD, preferences, avatar

3. **BILLING Service** - Payments & subscriptions
   - Location: `backend/src/services/billing/billing.service.ts`
   - Integration: Stripe ($1 trips, $49/mo Pro)

4. **CINEMA Service** - Cinema production workflows
   - Location: `backend/src/services/cinema/cinema.service.ts`
   - Pipeline: Ingest → Understand → Plan → Generate → Assemble → Render

5. **SHORTS Service** - Short-form video generation
   - Location: `backend/src/services/shorts/shorts.service.ts`
   - Pipeline: Hooks → Variants → Captions → Render

6. **GROWTH Service** - Social media automation
   - Location: `backend/src/services/growth/growth.service.ts`
   - Platforms: TikTok, Instagram, YouTube, X

7. **BRAND KIT Service** - Brand asset management
   - Location: `backend/src/services/brandkit/brandkit.service.ts`
   - Features: Logo, colors, fonts, templates

8. **SOCIAL Service** - Social account OAuth
   - Location: `backend/src/services/social/social.service.ts`
   - OAuth integration for all platforms

9. **ORACLE SYNC Service** - Oracle DB synchronization
   - Location: `backend/src/services/oracle-sync/oracle-sync.service.ts`
   - Bidirectional sync with legacy system

### API Controllers (10 Controllers)
- `backend/src/api/auth/` - Authentication endpoints
- `backend/src/api/users/` - User management
- `backend/src/api/billing/` - Payment processing
- `backend/src/api/productions/` - Cinema productions
- `backend/src/api/assets/` - Asset management
- `backend/src/api/shorts/` - Shorts generation
- `backend/src/api/growth/` - Social automation
- `backend/src/api/brandkit/` - Brand kit management
- `backend/src/api/social/` - Social account linking
- `backend/src/api/oracle-bridge/` - Oracle sync
- `backend/src/api/admin/` - Admin panel (NEW)

### Data Models (12 Models)
- `backend/src/models/user/` - User accounts
- `backend/src/models/production/` - Cinema productions
- `backend/src/models/asset/` - Production assets
- `backend/src/models/short/` - Short videos
- `backend/src/models/short-variant/` - A/B test variants
- `backend/src/models/social-account/` - Social connections
- `backend/src/models/social-post/` - Published posts
- `backend/src/models/social-metrics/` - Performance data
- `backend/src/models/brand-kit/` - Brand assets
- `backend/src/models/trips/` - Trip purchases
- `backend/src/models/payments/` - Payment records
- `backend/src/models/subscriptions/` - Pro subscriptions

### Queue Processors (11 Processors)
**Cinema Pipeline:**
- `backend/src/queues/cinema.ingest/` - Photo & script processing
- `backend/src/queues/cinema.plan/` - Scene planning
- `backend/src/queues/cinema.generate/` - Video generation
- `backend/src/queues/cinema.render/` - Final rendering

**Shorts Pipeline:**
- `backend/src/queues/shorts.hooks/` - Hook generation
- `backend/src/queues/shorts.variants/` - Variant creation
- `backend/src/queues/shorts.render/` - Shorts rendering

**Growth Pipeline:**
- `backend/src/queues/social.schedule/` - Post scheduling
- `backend/src/queues/social.publish/` - Multi-platform publishing
- `backend/src/queues/social.metrics/` - Metrics collection

### Utilities (9 Utilities)
- `backend/src/utils/logger/` - Logging utility
- `backend/src/utils/s3-client/` - S3/R2 storage client
- `backend/src/utils/stripe-client/` - Payment processing
- `backend/src/utils/oracle-client/` - Oracle DB client
- `backend/src/utils/social-clients/tiktok.client.ts` - TikTok API
- `backend/src/utils/social-clients/instagram.client.ts` - Instagram API
- `backend/src/utils/social-clients/youtube.client.ts` - YouTube API
- `backend/src/utils/social-clients/x.client.ts` - X (Twitter) API
- `backend/src/utils/file-parser/` - File parsing utility

### Middleware & Guards
- `backend/src/middleware/auth.middleware.ts` - JWT authentication
- `backend/src/guards/jwt-auth.guard.ts` - Auth guard
- `backend/src/guards/roles.guard.ts` - Role-based access
- `backend/src/interceptors/logging.interceptor.ts` - Request logging
- `backend/src/interceptors/transform.interceptor.ts` - Response transformation

---

## AI Agents

### Cinema Agents (7 Agents)
1. **Ingest Agent** (`agents/cinema/ingest.agent.ts`)
   - Photo analysis & script parsing
   - Image metadata extraction
   - Script text preprocessing

2. **Script Understanding Agent** (`agents/cinema/script-understanding.agent.ts`)
   - NLP analysis
   - Scene detection
   - Character identification
   - Mood & tone analysis

3. **Scene Planner Agent** (`agents/cinema/scene-planner.agent.ts`)
   - Shot planning with cinematography rules
   - Pacing & timing
   - Camera angles & movements
   - Transition effects

4. **Visual Generator Agent** (`agents/cinema/visual-generator.agent.ts`)
   - AI video generation (Runway, Pika)
   - Style application
   - Shot-by-shot rendering
   - Quality control

5. **Audio Agent** (`agents/cinema/audio.agent.ts`)
   - TTS voiceover synthesis (ElevenLabs, OpenAI)
   - Music selection & generation
   - Audio timing & sync
   - Sound effects

6. **Assembly Agent** (`agents/cinema/assembly.agent.ts`)
   - Video editing & transitions
   - Audio mixing
   - Color grading
   - Effects application

7. **Render Agent** (`agents/cinema/render.agent.ts`)
   - Video encoding (FFmpeg)
   - Compression optimization
   - Format conversion
   - Quality validation

### Shorts Agents (4 Agents)
1. **Hook Generator Agent** (`agents/shorts/hook-generator.agent.ts`)
   - Viral hook generation (5-10 variants)
   - Platform-specific optimization
   - A/B testing recommendations

2. **Variant Planner Agent** (`agents/shorts/variant-planner.agent.ts`)
   - A/B test planning
   - Style variations
   - Caption differences

3. **Caption Engine Agent** (`agents/shorts/caption-engine.agent.ts`)
   - Word-level timing
   - Caption styling (fonts, colors, animations)
   - Multi-language support

4. **Shorts Render Agent** (`agents/shorts/shorts-render.agent.ts`)
   - Multi-format rendering (9:16, 1:1, 16:9)
   - Platform-specific encoding
   - Caption overlay
   - Thumbnail generation

### Growth Agents (2 Agents)
1. **Growth Optimizer Agent** (`agents/growth/growth-optimizer.agent.ts`)
   - Optimal posting times
   - Hashtag strategies
   - Platform-specific recommendations
   - Content optimization

2. **Analytics Agent** (`agents/growth/analytics.agent.ts`)
   - Performance analysis
   - Pattern recognition
   - Actionable insights
   - Recommendations

### Shared Utilities
- **Base Agent** (`agents/shared/base-agent.ts`) - Abstract base class
- **Types** (`agents/shared/types.ts`) - Shared TypeScript types
- **Validation** (`agents/shared/validation.ts`) - Input/output validation
- **Prompt Templates** (`agents/shared/prompt-templates.ts`) - Reusable prompts

---

## Workers

### Background Workers (7 Workers)
All workers use Bull queues with Redis for job processing.

**Cinema Workers:**
- `workers/cinema-ingest.worker.ts` - Ingest pipeline
- `workers/cinema-plan.worker.ts` - Scene planning
- `workers/cinema-generate.worker.ts` - Video generation
- `workers/cinema-render.worker.ts` - Final rendering

**Shorts Workers:**
- `workers/shorts-render.worker.ts` - Shorts rendering

**Growth Workers:**
- `workers/social-publish.worker.ts` - Multi-platform publishing
- `workers/social-metrics.worker.ts` - Metrics collection

---

## Infrastructure

### Docker
**Configuration Files:**
- `infra/docker/Dockerfile.backend` - Backend service
- `infra/docker/Dockerfile.workers` - Background workers
- `infra/docker/Dockerfile.agents` - AI agents
- `infra/docker/docker-compose.yml` - Full stack
- `infra/docker/docker-compose.dev.yml` - Development
- `infra/docker/docker-compose.prod.yml` - Production
- `infra/docker/.dockerignore` - Excluded files

**Usage:**
```bash
# Development
cd infra/docker
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes
**Manifests:**
- `infra/k8s/namespace.yaml` - Namespace definition
- `infra/k8s/deployments/` - Deployment configs (backend, workers, agents, postgres, redis)
- `infra/k8s/services/` - Service definitions
- `infra/k8s/configmaps/` - Configuration maps
- `infra/k8s/secrets/` - Secret management
- `infra/k8s/ingress/` - Ingress routing
- `infra/k8s/persistent-volumes/` - Persistent storage

**Deployment:**
```bash
kubectl apply -f infra/k8s/
```

### Terraform
**Infrastructure as Code:**
- `infra/terraform/main.tf` - Main configuration
- `infra/terraform/variables.tf` - Variable definitions
- `infra/terraform/outputs.tf` - Output values
- `infra/terraform/provider.tf` - Cloud provider config

**Modules:**
- `infra/terraform/modules/database/` - PostgreSQL RDS
- `infra/terraform/modules/cache/` - Redis ElastiCache
- `infra/terraform/modules/storage/` - S3/R2 buckets
- `infra/terraform/modules/compute/` - Kubernetes cluster
- `infra/terraform/modules/networking/` - VPC & subnets

**Environments:**
- `infra/terraform/environments/dev/` - Development
- `infra/terraform/environments/staging/` - Staging
- `infra/terraform/environments/production/` - Production

**Usage:**
```bash
cd infra/terraform
terraform init
terraform plan -var-file=environments/production/terraform.tfvars
terraform apply -var-file=environments/production/terraform.tfvars
```

### CI/CD Pipelines
**GitHub Actions Workflows:**
- `.github/workflows/backend-ci.yml` - Backend CI (lint, test, build)
- `.github/workflows/mobile-ci.yml` - Mobile CI (iOS & Android)
- `.github/workflows/test.yml` - Full test suite
- `.github/workflows/lint.yml` - Code linting
- `.github/workflows/deploy-staging.yml` - Staging deployment
- `.github/workflows/deploy-production.yml` - Production deployment

**Triggers:**
- Push to `main` → Production deployment
- Push to `develop` → Staging deployment
- Pull requests → CI checks (lint, test, build)

---

## API Reference

### Complete API Documentation
- **[API Reference](docs/api/reference.md)** - Complete endpoint documentation
  - Base URLs (dev, staging, production)
  - Authentication (JWT tokens)
  - All 29+ endpoints with request/response examples
  - Error codes & handling
  - Rate limits
  - Webhooks

- **[API Testing Guide](docs/api/testing.md)** - Testing strategies
  - Testing tools (Postman, Jest, Artillery)
  - Test scenarios
  - Automated tests
  - Load testing
  - Security testing

### Endpoint Categories

**Authentication** (5 endpoints)
- POST /auth/signup
- POST /auth/login
- POST /auth/change-password
- POST /auth/refresh
- POST /auth/logout

**Users** (3 endpoints)
- GET /users/me
- PUT /users/me
- DELETE /users/me

**Billing** (3 endpoints)
- POST /billing/trips/purchase
- POST /billing/subscriptions/create
- GET /billing/payments/history

**Productions (Cinema)** (4 endpoints)
- POST /productions
- POST /productions/:id/run
- GET /productions/:id
- GET /productions

**Assets** (1 endpoint)
- GET /assets

**Shorts** (4 endpoints)
- POST /shorts
- POST /shorts/:id/hooks
- POST /shorts/:id/variants
- GET /shorts/:id

**Social (Growth)** (3 endpoints)
- POST /social/posts
- GET /social/posts
- GET /analytics/shorts

**Brand Kit** (3 endpoints)
- POST /brandkit
- PUT /brandkit/:id
- GET /brandkit

**Oracle Bridge** (1 endpoint)
- POST /oracle-bridge/sync

---

## Admin Panel

### Admin Documentation
- **[Admin Panel Guide](docs/admin/admin-panel.md)** - Complete admin guide
  - Default credentials (admin@admin.com / admin123)
  - Access URL (http://localhost:3000/admin)
  - All 8 admin endpoints
  - Password change flow
  - Setup instructions
  - Security features

- **[Admin Implementation Summary](ADMIN_IMPLEMENTATION_SUMMARY.md)** - Implementation details
  - 18 files created/modified
  - Admin panel features
  - Password change flow
  - Mobile admin interface
  - Setup & usage

### Admin Features

**Dashboard** (GET /admin)
- Total users, productions, shorts, subscriptions
- System health status

**User Management**
- GET /admin/users - List all users
- GET /admin/users/:id - Get specific user
- PUT /admin/users/:id - Update user
- DELETE /admin/users/:id - Delete user

**System Configuration**
- GET /admin/settings - Get settings
- PUT /admin/settings - Update settings

**Analytics**
- GET /admin/analytics - Analytics data

**Password Management**
- POST /auth/change-password
- Forced password change on first login
- Minimum 8 character requirement

---

## Testing

### Testing Guides
- **[Testing Guide](docs/admin/testing-guide.md)** - Complete testing instructions
  - Running backend tests (`npm test`)
  - Running mobile tests (`npm test`)
  - Test structure & conventions
  - Coverage goals (>80%)
  - Test checklist

### Test Infrastructure

**Backend Tests**
- Location: `backend/src/**/*.spec.ts`
- Framework: Jest
- Configuration: `backend/jest.config.js`
- **Current Status: 7/7 tests passing ✅**

**Mobile Tests**
- Location: `mobile/src/**/*.test.tsx`
- Framework: Jest + ts-jest
- Configuration: `mobile/jest.config.js`
- **Current Status: 3/3 tests passing ✅**

**Test Coverage**
- Backend: Auth service, User service
- Mobile: NeoGlowButton component
- **Total: 10/10 tests passing ✅**

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Mobile tests
cd mobile
npm test

# With coverage
npm run test:cov
```

---

## Contributing

### Development Workflow
1. **Clone repository**
   ```bash
   git clone https://github.com/SMSDAO/Cinemai.git
   cd Cinemai
   ```

2. **Bootstrap project**
   ```bash
   ./scripts/bootstrap.sh
   ```

3. **Set up environment**
   ```bash
   cp config/secrets.example.json config/secrets.json
   # Edit config/secrets.json with your credentials
   ```

4. **Run migrations**
   ```bash
   ./scripts/migrate.sh
   ```

5. **Seed data**
   ```bash
   ./scripts/seed.sh
   ```

6. **Start development**
   ```bash
   # Backend
   cd backend && npm run dev

   # Mobile (in new terminal)
   cd mobile && npm start
   ```

### Code Style
- TypeScript strict mode
- ESLint + Prettier
- Naming conventions: `*.service.ts`, `*.controller.ts`, `*.agent.ts`, `*.worker.ts`
- Use Neo Glow design tokens (never hard-code colors/spacing)
- Follow ARCHITECTURE.md specifications

### Git Workflow
- Feature branches from `develop`
- Pull requests with reviews
- CI/CD automation
- Semantic versioning

---

## Configuration

### Config Files
- `config/default.json` - Default configuration
- `config/development.json` - Development settings
- `config/staging.json` - Staging settings
- `config/production.json` - Production settings
- `config/secrets.example.json` - Secret template

### Environment Variables
See `config/secrets.example.json` for required environment variables.

---

## Scripts

### Automation Scripts
- `scripts/bootstrap.sh` - Install all dependencies
- `scripts/migrate.sh` - Run database migrations
- `scripts/seed.sh` - Seed database (includes admin user)
- `scripts/deploy.sh` - Deploy to environment
- `scripts/sync-oracle.sh` - Sync with Oracle DB

---

## Additional Resources

### GitHub Configuration
- `.github/copilot-instructions.md` - GitHub Copilot instructions
- `.github/ui-design-tokens.md` - Complete UI token specifications

### Database
- `backend/prisma/schema.prisma` - Prisma schema (12 models)

### README Files
- Root `README.md` - Project overview
- `backend/README.md` - Backend guide
- `mobile/README.md` - Mobile app guide
- `agents/README.md` - AI agents guide
- `workers/README.md` - Workers guide
- `infra/README.md` - Infrastructure guide
- `docs/README.md` - Documentation index

---

## Quick Reference

### URLs
- **Development Backend**: http://localhost:3000
- **Development API**: http://localhost:3000/api
- **Admin Panel**: http://localhost:3000/admin

### Default Credentials
- **Admin Email**: admin@admin.com
- **Admin Password**: admin123 (must change on first login)

### Key Directories
- `/backend` - NestJS backend (9 services, 10 controllers)
- `/mobile` - React Native app (8 screens, 7 components)
- `/agents` - AI agents (16 agents)
- `/workers` - Background workers (7 workers)
- `/infra` - Infrastructure configs (Docker, K8s, Terraform)
- `/docs` - Documentation
- `/scripts` - Automation scripts
- `/config` - Configuration files

### Repository Stats
- **Total Files**: 31,353
- **Code Files**: 18,964 TypeScript/JavaScript
- **Lines of Code**: ~25,000+
- **Services**: 9 microservices
- **API Endpoints**: 29+
- **AI Agents**: 16 specialized agents
- **Test Coverage**: 10/10 tests passing ✅

---

## Support

### Getting Help
- Review relevant documentation sections above
- Check `docs/onboarding/getting-started.md`
- Review API documentation in `docs/api/reference.md`
- Submit GitHub issues with detailed descriptions

### Documentation Updates
This is a living document. If you find missing information or errors:
1. Submit a pull request with corrections
2. Open an issue describing the problem
3. Contact the team

---

**Last Updated**: 2026-02-09  
**Version**: 1.0.0  
**Status**: Complete ✅

---

*Copyright © 2026 CinemAi Neo. All rights reserved.*
