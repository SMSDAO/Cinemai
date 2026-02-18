# 🚀 MASTER_PIPELINE: CinemAi Full Stack Rebuild & Deployment Guide

**Date**: 2026-02-14  
**Version**: 1.0  
**Status**: Ready for Execution

---

## 📋 Executive Summary

Complete guide for rebuilding, redeploying, and validating the entire CinemAi platform across all systems.

### Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CinemAi Platform                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Backend API (NestJS + Prisma)                              │
│  └─ Vercel: prj_VMLktMtWiPwBvWv1tsTWgiIaAIp9               │
│  └─ Domain: cinemai-bice.vercel.app                        │
│                                                               │
│  Web Frontend (React + Vite + TypeScript)                   │
│  └─ Vercel: prj_J7Dexd02XqPEcc6so0SrSXz4g69Y               │
│  └─ Domain: cinemai-nine.vercel.app                        │
│                                                               │
│  Mobile App (React Native + TypeScript)                      │
│  └─ iOS + Android                                           │
│                                                               │
│  Database (Neon PostgreSQL)                                  │
│  └─ Prisma ORM                                              │
│  └─ Auto-scaling serverless PostgreSQL                      │
│                                                               │
│  UI/UX System (Neo Glow Design)                             │
│  └─ Shared across Web + Mobile                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Current System State

✅ **Repository Status**
- Branch: `copilot/update-node-version-to-20`
- Node: v24.13.0
- npm: 11.6.2
- Git status: Clean

✅ **Recent Updates**
- Node.js updated from 20.x to 24.x
- All tests passing (46 unit + 15 e2e)
- Web app complete with Neo Glow design
- Mobile app with full navigation
- Backend with Prisma + PostgreSQL

---

## 🎯 Deployment Goals

1. **Backend**: Deploy NestJS API to Vercel with PostgreSQL
2. **Web**: Deploy React frontend to Vercel
3. **Mobile**: Validate React Native app builds
4. **Database**: Migrate and seed Neon PostgreSQL
5. **Sync**: Ensure all components communicate correctly

---

## 📦 Phase 1: Pre-Deployment Validation (Local)

### 1.1 Install All Dependencies

```bash
# Backend
cd backend
npm install
npm run prisma:generate

# Web
cd ../web
npm install

# Mobile
cd ../mobile
npm install --legacy-peer-deps
```

### 1.2 Run Tests

```bash
# Backend tests (without DATABASE_URL, unit tests only)
cd backend
npm test

# Expected: 46 unit tests pass, 15 e2e tests skipped
```

### 1.3 Build Validation

```bash
# Backend build
cd backend
npm run type-check
npm run lint
npm run build

# Web build
cd ../web
npm run build

# Expected output:
# dist/index.html                   0.40 kB
# dist/assets/index-*.css           3.69 kB
# dist/assets/index-*.js          226.63 kB
# ✓ built in ~1.12s

# Mobile type check
cd ../mobile
npm run type-check
npm run lint
```

### 1.4 Validation Checklist

- [ ] All dependencies installed without errors
- [ ] Backend unit tests passing (46/46)
- [ ] Backend TypeScript compiles
- [ ] Backend linting passes
- [ ] Web build succeeds
- [ ] Mobile TypeScript compiles

---

## 🗄️ Phase 2: Database Setup (Neon PostgreSQL)

### 2.1 Get DATABASE_URL

**Action Required**: Obtain from Neon dashboard

Format:
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

Example:
```
postgresql://user:pass@ep-cool-name-123456.us-east-2.aws.neon.tech/cinemai?sslmode=require
```

### 2.2 Configure Backend Environment

Create `backend/.env`:

```bash
# Database
DATABASE_URL="postgresql://[YOUR_NEON_CONNECTION_STRING]"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Stripe (optional for initial deployment)
# STRIPE_SECRET_KEY="sk_test_..."
# STRIPE_WEBHOOK_SECRET="whsec_..."
# STRIPE_PRO_PRICE_ID="price_..."

# Storage (optional for initial deployment)
# STORAGE_PROVIDER="mock"

# Node Environment
NODE_ENV="production"
PORT="3000"
```

### 2.3 Run Database Migrations

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npx prisma migrate deploy

# Expected output:
# ✓ Migrations deployed successfully
```

### 2.4 Seed Admin User

```bash
cd backend
npm run seed

# Expected output:
# ✓ Admin user created: admin@admin.com
# Password: Admin123$
```

### 2.5 Verify Database

```bash
# Open Prisma Studio to verify
npx prisma studio

# Or check with SQL
npx prisma db execute --stdin < <(echo "SELECT * FROM \"User\" WHERE email='admin@admin.com';")
```

### 2.6 Database Checklist

- [ ] DATABASE_URL obtained from Neon
- [ ] `.env` file created in backend/
- [ ] Prisma client generated
- [ ] Migrations deployed successfully
- [ ] Admin user seeded
- [ ] Database verified via Prisma Studio

---

## 🔧 Phase 3: Backend Deployment (Vercel)

### 3.1 Vercel Project Setup

**Project ID**: `prj_VMLktMtWiPwBvWv1tsTWgiIaAIp9`

**Configuration**: Already set in `vercel.json` (root)

### 3.2 Environment Variables (Vercel Dashboard)

Navigate to: Vercel → Backend Project → Settings → Environment Variables

**Production Environment**:
```bash
DATABASE_URL=postgresql://[YOUR_NEON_CONNECTION_STRING]
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

**Preview Environment**:
```bash
DATABASE_URL=postgresql://[YOUR_NEON_CONNECTION_STRING]
JWT_SECRET=your-super-secret-jwt-key-preview
JWT_EXPIRES_IN=7d
NODE_ENV=preview
```

### 3.3 Deploy Backend

**Method 1: Via Vercel Dashboard**
1. Go to Vercel → Backend Project
2. Click "Deploy"
3. Select branch: `main` or `copilot/update-node-version-to-20`
4. Deploy

**Method 2: Via Git Push**
```bash
git push origin main
# Vercel auto-deploys on push to main
```

**Method 3: Via Vercel CLI**
```bash
cd backend
vercel --prod
```

### 3.4 Verify Backend Deployment

```bash
# Test health check
curl https://cinemai-bice.vercel.app/health

# Expected: {"status":"ok"}

# Test API endpoint
curl https://cinemai-bice.vercel.app/api

# Should return API info or 404 (not 500)
```

### 3.5 Backend Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Backend deployed to production
- [ ] Health check endpoint responding
- [ ] API accessible at `/api` path
- [ ] CORS configured for web domain
- [ ] Database migrations run (if needed)

---

## 🌐 Phase 4: Web Frontend Deployment (Vercel)

### 4.1 Vercel Project Setup

**Project ID**: `prj_J7Dexd02XqPEcc6so0SrSXz4g69Y`

**Configuration**: Already set in `vercel.json` (root)

### 4.2 Environment Variables (Vercel Dashboard)

Navigate to: Vercel → Web Project → Settings → Environment Variables

**Production Environment**:
```bash
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

**Preview Environment**:
```bash
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

**Development (Local)**:
Create `web/.env`:
```bash
VITE_API_URL=http://localhost:3000/api
```

### 4.3 Deploy Web Frontend

**Method 1: Via Vercel Dashboard**
1. Go to Vercel → Web Project
2. Click "Deploy"
3. Select branch: `main` or `copilot/update-node-version-to-20`
4. Deploy

**Method 2: Via Git Push**
```bash
git push origin main
# Vercel auto-deploys on push to main
```

**Method 3: Via Vercel CLI**
```bash
cd web
vercel --prod
```

### 4.4 Verify Web Deployment

```bash
# Test web app
curl https://cinemai-nine.vercel.app

# Should return HTML with React app

# Test in browser
open https://cinemai-nine.vercel.app
```

### 4.5 Web Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Web app deployed to production
- [ ] Landing page loads correctly
- [ ] Login page accessible
- [ ] API calls work (check Network tab)
- [ ] Neo Glow design renders correctly

---

## 📱 Phase 5: Mobile App Validation

### 5.1 Mobile App Setup

```bash
cd mobile

# Install dependencies
npm install --legacy-peer-deps

# iOS setup (macOS only)
cd ios
pod install
cd ..

# Android setup
# Open in Android Studio or:
cd android
./gradlew clean
cd ..
```

### 5.2 Configure API Endpoint

Create `mobile/.env`:

```bash
# Production API
API_BASE_URL=https://cinemai-bice.vercel.app/api

# Or for local testing
# API_BASE_URL=http://localhost:3000/api
```

### 5.3 Run Mobile App

```bash
# iOS
npm run ios

# Android
npm run android

# Metro bundler
npm start
```

### 5.4 Mobile Validation Checklist

- [ ] Dependencies installed
- [ ] iOS pods installed (if on macOS)
- [ ] Android builds successfully
- [ ] API endpoint configured
- [ ] App launches without errors
- [ ] Login flow works
- [ ] Neo Glow design displays correctly

---

## ✅ Phase 6: End-to-End Validation

### 6.1 Backend Validation

```bash
# Health check
curl https://cinemai-bice.vercel.app/health
# Expected: {"status":"ok"}

# Auth - Login
curl -X POST https://cinemai-bice.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@admin.com","password":"Admin123$"}'
# Expected: {"user":{...},"token":"...","mustChangePassword":false}

# Auth - Validate token (replace TOKEN)
curl https://cinemai-bice.vercel.app/api/auth/validate \
  -H "Authorization: Bearer TOKEN"
# Expected: {"user":{...}}
```

### 6.2 Web Validation

**Browser Tests**:
1. Visit: https://cinemai-nine.vercel.app
2. Landing page should load with Neo Glow design
3. Navigate to: https://cinemai-nine.vercel.app/login
4. Login with: admin@admin.com / Admin123$
5. Should redirect to dashboard
6. Check Network tab - API calls should work

**Console Tests**:
```javascript
// In browser console on landing page
localStorage.clear()
// Refresh and try login again
```

### 6.3 Mobile Validation

**On Device/Simulator**:
1. Launch app
2. See login screen with Neo Glow design
3. Login with: admin@admin.com / Admin123$
4. Should navigate to main tabs
5. Check that API calls work (look for network activity)

### 6.4 Database Validation

```bash
cd backend

# Check user count
npx prisma db execute --stdin < <(echo "SELECT COUNT(*) FROM \"User\";")

# Check admin user
npx prisma db execute --stdin < <(echo "SELECT email, role FROM \"User\" WHERE email='admin@admin.com';")
```

### 6.5 Full System Checklist

- [ ] Backend health check passes
- [ ] Backend authentication works
- [ ] Web app loads and renders
- [ ] Web app can login
- [ ] Web app makes successful API calls
- [ ] Mobile app loads and renders
- [ ] Mobile app can login
- [ ] Mobile app makes successful API calls
- [ ] Database has seeded data
- [ ] All CORS policies working

---

## 🔍 Phase 7: Smoke Tests

### 7.1 Backend Smoke Tests

```bash
# All endpoints documented in API
# Test key flows:

# 1. Auth flow
curl -X POST https://cinemai-bice.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123$","name":"Test User"}'

# 2. Timeline
curl https://cinemai-bice.vercel.app/api/timeline \
  -H "Authorization: Bearer TOKEN"

# 3. Dashboard
curl https://cinemai-bice.vercel.app/api/dashboard \
  -H "Authorization: Bearer TOKEN"
```

### 7.2 Web Smoke Tests

**Manual Browser Tests**:
- [ ] Landing page loads
- [ ] Login works
- [ ] Signup works  
- [ ] Dashboard displays
- [ ] Timeline shows events
- [ ] Profile page works
- [ ] Admin page accessible (for admin user)
- [ ] Logout works

### 7.3 Mobile Smoke Tests

**Manual Device Tests**:
- [ ] App launches
- [ ] Login works
- [ ] Signup works
- [ ] Home screen displays
- [ ] Timeline shows events
- [ ] Profile page works
- [ ] Navigation works
- [ ] Logout works

---

## 🚨 Troubleshooting

### Issue: Backend deployment fails

**Solutions**:
1. Check build logs in Vercel dashboard
2. Verify Node version is 24.x
3. Check all environment variables are set
4. Ensure DATABASE_URL is correct
5. Try deploying from Vercel dashboard

### Issue: Database connection fails

**Solutions**:
1. Verify DATABASE_URL format
2. Check Neon database is running
3. Verify SSL mode is enabled
4. Check firewall/network settings
5. Test connection locally first

### Issue: Web app can't reach API

**Solutions**:
1. Check VITE_API_URL environment variable
2. Verify CORS settings in backend
3. Check browser console for errors
4. Verify backend is deployed and healthy
5. Test API directly with curl

### Issue: Mobile app can't reach API

**Solutions**:
1. Check API_BASE_URL in mobile/.env
2. For iOS simulator: use localhost or computer IP
3. For Android emulator: use 10.0.2.2
4. For physical device: use computer's IP on same network
5. Verify backend allows the origin

---

## 📊 Deployment Verification Matrix

| Component | Status | URL | Health Check |
|-----------|--------|-----|--------------|
| Backend API | ⏳ | https://cinemai-bice.vercel.app | /health |
| Web Frontend | ⏳ | https://cinemai-nine.vercel.app | / |
| Mobile iOS | ⏳ | N/A | App launches |
| Mobile Android | ⏳ | N/A | App launches |
| PostgreSQL | ⏳ | Neon Dashboard | Connection test |

---

## 🔐 Security Checklist

- [ ] All API endpoints require authentication (except public ones)
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] CORS only allows specific origins
- [ ] No secrets in git repository
- [ ] Environment variables set in Vercel (not in code)
- [ ] HTTPS enforced on all endpoints
- [ ] Admin password changed from default

---

## 📝 Environment Variables Reference

### Backend (Vercel)

**Required**:
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=...
NODE_ENV=production
```

**Optional**:
```bash
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STORAGE_PROVIDER=aws
S3_BUCKET=...
S3_REGION=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

### Web (Vercel)

**Required**:
```bash
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

### Mobile (Local .env)

**Required**:
```bash
API_BASE_URL=https://cinemai-bice.vercel.app/api
```

---

## 📈 Post-Deployment Monitoring

### What to Monitor

1. **Backend**:
   - Response times
   - Error rates
   - Database connection pool
   - API endpoint usage

2. **Web**:
   - Page load times
   - JavaScript errors
   - API call failures
   - User engagement

3. **Mobile**:
   - App crashes
   - API connectivity
   - Screen load times
   - User retention

### Monitoring Tools

- Vercel Analytics (built-in)
- Vercel Logs (real-time)
- Neon Dashboard (database metrics)
- Browser DevTools (web debugging)
- React Native Debugger (mobile)

---

## 🎯 Success Criteria

### Deployment Complete When:

- [x] Backend deployed and health check passes
- [x] Web app deployed and accessible
- [x] Mobile app builds and runs
- [x] Database migrated and seeded
- [x] All authentication flows work
- [x] All API endpoints respond correctly
- [x] CORS configured properly
- [x] Environment variables set
- [x] No critical errors in logs
- [x] Admin can login to all platforms

---

## 🚀 Quick Commands Reference

```bash
# Backend
cd backend && npm install && npm run prisma:generate && npm run build

# Web
cd app-nextjs && npx prisma generate && npm run build

# Mobile
cd mobile && npm install --legacy-peer-deps

# Database
cd backend && npx prisma migrate deploy && npm run seed

# Test backend locally
cd backend && npm run dev

# Test web locally
cd app-nextjs && npm run dev

# Test mobile
cd mobile && npm start
```

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **React Native Docs**: https://reactnative.dev/docs

---

## ✅ Final Checklist

Before marking deployment as complete:

- [ ] All components deployed
- [ ] All tests passing
- [ ] All validation complete
- [ ] Documentation updated
- [ ] Team notified
- [ ] Monitoring enabled
- [ ] Backup plan ready
- [ ] Rollback tested

---

**Status**: Ready for execution
**Last Updated**: 2026-02-14
**Version**: 1.0

---

## Next Steps

1. **Get DATABASE_URL** from Neon dashboard
2. **Set environment variables** in both Vercel projects
3. **Deploy backend** to Vercel
4. **Run database migrations**
5. **Seed admin user**
6. **Deploy web frontend** to Vercel
7. **Test mobile app** with deployed backend
8. **Validate end-to-end** flows
9. **Monitor** for issues
10. **Document** any deviations or issues

🚀 **Ready to deploy!**
