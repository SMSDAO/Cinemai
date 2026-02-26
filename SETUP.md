# CinemAi Neo - Local Development Setup Guide

This guide covers how to set up and run the CinemAi Neo backend and mobile app locally for development.

## Prerequisites

- **Node.js** 24.x or higher and npm 10.x or higher
- **PostgreSQL** 14+ (for backend database)
- **Git**

Optional:
- **Docker** (for running PostgreSQL in a container)
- **Stripe CLI** (for testing webhooks locally)
- **AWS CLI** or **Cloudflare Wrangler** (for S3/R2 storage)

## Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm ci
```

### 2. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cinemai_dev?schema=public"

# JWT Authentication
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Stripe (optional - mocks are used if not provided)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."

# Storage (optional - mocks are used if not provided)
STORAGE_PROVIDER="aws"  # or "r2" or "mock"
S3_BUCKET="cinemai-assets"
S3_REGION="us-east-1"
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."

# For Cloudflare R2:
# R2_ACCOUNT_ID="..."
# R2_ACCESS_KEY_ID="..."
# R2_SECRET_ACCESS_KEY="..."
```

### 3. Database Setup

If using Docker for PostgreSQL:

```bash
docker run --name cinemai-postgres \
  -e POSTGRES_USER=cinemai \
  -e POSTGRES_PASSWORD=cinemai \
  -e POSTGRES_DB=cinemai_dev \
  -p 5432:5432 \
  -d postgres:14
```

### 4. Run Migrations

```bash
cd backend
npm run prisma:generate
npm run migrate:dev
```

### 5. Run Backend Development Server

```bash
cd backend
npm run dev
```

The backend API will be available at `http://localhost:3000/api`

### 6. Run Backend Tests

```bash
cd backend
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:cov      # Run tests with coverage
```

**Current Test Status:** ✅ 23 tests passing

### 7. Type Checking and Linting

```bash
cd backend
npm run type-check    # TypeScript type checking
npm run lint          # ESLint
npm run format        # Prettier formatting
npm run format:check  # Check formatting without writing
```

### 8. Build for Production

```bash
cd backend
npm run build
npm start
```

## Mobile App Setup

### 1. Install Dependencies

```bash
cd mobile
npm ci --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to React Native peer dependency constraints.

### 2. Environment Variables

Create a `.env` file in the `mobile/` directory:

```env
API_BASE_URL="http://localhost:3000/api"
```

For iOS simulator, use:
```env
API_BASE_URL="http://localhost:3000/api"
```

For Android emulator, use:
```env
API_BASE_URL="http://10.0.2.2:3000/api"
```

For physical device, use your computer's IP:
```env
API_BASE_URL="http://192.168.1.100:3000/api"
```

### 3. Run Mobile App

```bash
cd mobile
npm start  # Start Metro bundler
```

Then in a separate terminal:

```bash
# For iOS (requires macOS)
npm run ios

# For Android
npm run android
```

### 4. Run Mobile Tests

```bash
cd mobile
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

**Current Test Status:** ✅ 4 tests passing

### 5. Type Checking and Linting

```bash
cd mobile
npm run type-check    # TypeScript type checking
npm run lint          # ESLint
npm run format        # Prettier formatting
npm run format:check  # Check formatting without writing
```

## Full Test Suite

To run all tests across the entire repository:

```bash
# Backend tests
cd backend && npm test

# Mobile tests
cd mobile && npm test
```

**Total Test Count:** ✅ 27 tests passing (23 backend + 4 mobile)

## Services Implemented

All backend services are fully integrated with Prisma:

### ✅ Auth Service
- User signup with password hashing (bcrypt)
- Login with JWT token generation
- Password change functionality
- Token validation and refresh
- Admin role checking

### ✅ User Service
- Get/update user profile
- User preferences management
- Avatar upload (S3/R2 integration)
- Account deletion

### ✅ Billing Service
- Trip purchases via Stripe
- Pro subscription management
- Payment history
- Trip balance tracking and consumption
- Webhook handling (placeholder)

### ✅ Cinema Service
- Production creation and management
- Asset management
- Status tracking
- Run production (queue integration placeholder)

### ✅ Shorts Service
- Short creation with format selection
- Hook generation (AI integration placeholder)
- Variant creation for A/B testing
- Status tracking

### ✅ Social Service
- Social account connection
- Platform OAuth (placeholders for TikTok, Instagram, YouTube, X)
- Account management

### ✅ Growth Service
- Post listing and analytics
- Shorts analytics aggregation
- Productions analytics aggregation
- Publish/schedule (queue integration placeholder)

## Utilities Implemented

### JWT Helper
- Token signing with configurable expiration
- Token verification and validation
- Located in `backend/src/utils/jwt/jwt.helper.ts`

### Stripe Client
- Payment intent creation
- Subscription management
- Customer management
- Webhook verification
- Graceful fallback to mocks when STRIPE_SECRET_KEY not configured
- Located in `backend/src/utils/stripe-client/stripe-client.ts`

### S3 Client
- File upload to AWS S3 or Cloudflare R2
- File download
- Signed URL generation
- File deletion
- Support for multiple providers (aws, r2, mock)
- Located in `backend/src/utils/s3-client/s3-client.ts`

### Prisma Service
- Global Prisma client with connection management
- Database lifecycle hooks
- Test database cleanup utilities
- Located in `backend/src/prisma/prisma.service.ts`

## Mobile App Integration

### AuthContext
- JWT token storage with AsyncStorage
- Automatic token injection in API requests
- Token refresh on app launch
- User state management
- Located in `mobile/src/context/AuthContext.tsx`

### API Client
- Axios instance with request/response interceptors
- Automatic Authorization header injection
- 401 error handling and token refresh
- Configurable base URL
- Located in `mobile/src/services/api.ts`

## Database Schema

The complete Prisma schema includes 12 models:

1. **User** - User accounts with authentication and subscription info
2. **Production** - Cinema productions with script and assets
3. **Asset** - Media assets (video, audio, images, thumbnails)
4. **Short** - Short-form videos with hooks and variants
5. **ShortVariant** - A/B test variants for shorts
6. **SocialAccount** - Connected social platform accounts
7. **SocialPost** - Published posts across platforms
8. **SocialMetrics** - Engagement metrics for posts
9. **BrandKit** - User brand kits with logos and colors
10. **Trip** - Individual trip purchases
11. **Payment** - Payment records for trips and subscriptions
12. **Subscription** - Pro subscription records

All models have proper relations, indexes, and cascade deletion rules.

## Architecture Notes

- **Backend:** NestJS with Prisma ORM, JWT authentication, Stripe payments, S3 storage
- **Mobile:** React Native with TypeScript, AsyncStorage for token persistence
- **Database:** PostgreSQL with Prisma migrations
- **Testing:** Jest with mocked Prisma client for backend, Jest with ts-jest for mobile
- **Type Safety:** Full TypeScript with strict mode enabled

## Troubleshooting

### Backend Issues

**"Cannot connect to database"**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify database exists: `psql -U postgres -c "CREATE DATABASE cinemai_dev;"`

**"Prisma client not generated"**
- Run `npm run prisma:generate`

**JWT type errors**
- The JWT library has known TypeScript issues with StringValue type
- We use `as any` casting for expiresIn - this is safe and expected

### Mobile Issues

**"Cannot connect to API"**
- Ensure backend is running
- Check API_BASE_URL in .env
- For Android emulator, use `http://10.0.2.2:3000/api`
- For physical device, use your computer's local IP

**Peer dependency warnings**
- Always use `npm ci --legacy-peer-deps` for mobile
- This is required for React Native compatibility

## Next Steps

1. **Queue Integration:** Implement Bull or Bee-Queue for Cinema/Shorts/Growth pipelines
2. **OAuth Clients:** Add real OAuth implementations for social platforms
3. **AI Agent Integration:** Connect Cinema and Shorts agents for actual content generation
4. **Admin Seeding:** Implement admin user seeding script
5. **API Controllers:** Wire up NestJS controllers to services (currently scaffolded)
6. **Mobile Screens:** Connect remaining mobile screens to backend APIs

## Support

For issues or questions:
- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides
- Review test files for usage examples
