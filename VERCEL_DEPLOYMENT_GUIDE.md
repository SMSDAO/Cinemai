# 🚀 Vercel Deployment Guide - CinemAi Web App

Complete guide for deploying the CinemAi Neo web app to Vercel with proper environment configuration.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Environment Variables](#environment-variables)
3. [Backend CORS Configuration](#backend-cors-configuration)
4. [Deployment Steps](#deployment-steps)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Quick Start

### What You Need

1. **Vercel Account** - [Sign up at vercel.com](https://vercel.com)
2. **Backend API** - Running and accessible (e.g., Railway, Render, Fly.io)
3. **GitHub Repository** - Connected to Vercel

### Deployment Time

- Initial setup: ~5 minutes
- Each deployment: ~1-2 minutes

---

## 🔑 Environment Variables

### ✅ 1. PRODUCTION Environment Variables

**Where:** Vercel → Project → Settings → Environment Variables → Production

**Copy-Paste Block:**

```bash
# CinemAi Web App - Production Environment Variables

# Backend API URL (REQUIRED)
# Replace with your actual backend URL if different
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

**When to use:**
- Main production deployment (usually `main` branch)
- Accessed via your primary domain

---

### ✅ 2. PREVIEW Environment Variables

**Where:** Vercel → Project → Settings → Environment Variables → Preview

**Copy-Paste Block:**

```bash
# CinemAi Web App - Preview Environment Variables

# Backend API URL (REQUIRED)
# Previews use the production backend
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

**Why use production backend for previews?**
- ✅ Backend does NOT redeploy per PR
- ✅ Previews need a stable, working backend
- ✅ Using production backend ensures consistency
- ✅ Allows testing frontend changes without backend changes

**When to use:**
- Pull request previews
- Branch previews
- Preview deployments (all non-production)

---

### ✅ 3. DEVELOPMENT Environment Variables

**Where:** Local `.env` file in `web/` directory

**File:** `web/.env`

**Copy-Paste Block:**

```bash
# CinemAi Web App - Local Development

# Backend API URL (REQUIRED)
# Points to your local backend server
VITE_API_URL=http://localhost:3000
```

**Setup:**

```bash
# 1. Navigate to web directory
cd web

# 2. Copy example file
cp .env.example .env

# 3. Edit .env and set VITE_API_URL
# VITE_API_URL=http://localhost:3000
```

**When to use:**
- Running `npm run dev` locally
- Local development and testing
- Before pushing to GitHub

---

## 🌐 Backend CORS Configuration

### ⭐ Required CORS Origins

Your backend **MUST** allow these origins:

```javascript
// backend/src/main.ts - CORS Configuration

app.enableCors({
  origin: [
    // Production domain
    'https://cinemai-bice.vercel.app',
    
    // Specific preview deployments (your current tabs)
    'https://cinemai-aq6o4qgsc-castquest.vercel.app',
    'https://cinemai-diduw8dka-castquest.vercel.app',
    
    // All Vercel preview deployments (wildcard)
    /^https:\/\/.*\.vercel\.app$/,
    
    // Local development
    'http://localhost:3001',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
});
```

### Why These Domains?

| Domain | Purpose |
|--------|---------|
| `https://cinemai-bice.vercel.app` | Production deployment |
| `https://*.vercel.app` | All PR and branch previews |
| `http://localhost:3001` | Local React dev server |
| `http://localhost:5173` | Local Vite dev server |

### ✅ Backend Already Configured

The backend CORS has been configured in the latest fixes:
- ✅ Production domain allowed
- ✅ Preview deployments allowed (regex pattern)
- ✅ Credentials enabled
- ✅ Proper headers configured

**File:** `backend/src/main.ts` (lines 7-16)

---

## 📦 Deployment Steps

### Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose **SMSDAO/Cinemai**
5. Click **"Import"**

### Step 2: Configure Project Settings

**Framework Preset:** Vite

**Root Directory:** `web/`

**Build Command:**
```bash
npm install && npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### Step 3: Add Environment Variables

#### Production Environment

1. Go to **Settings → Environment Variables**
2. Select **"Production"** environment
3. Add variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://cinemai-bice.vercel.app/api`
4. Click **"Save"**

#### Preview Environment

1. Stay in **Settings → Environment Variables**
2. Select **"Preview"** environment
3. Add variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://cinemai-bice.vercel.app/api`
4. Click **"Save"**

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (~1-2 minutes)
3. Click on deployment URL to view
4. Verify app loads correctly

### Step 5: Set Custom Domain (Optional)

1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (~5-60 minutes)

---

## ✅ Verification Checklist

After deployment, verify:

### 1. Web App Loads

```bash
# Production
curl https://cinemai-bice.vercel.app

# Should return HTML with React app
```

### 2. API Connection Works

**Open browser console:**
1. Go to `https://cinemai-bice.vercel.app`
2. Open Developer Tools (F12)
3. Go to **Console** tab
4. Check for errors

**Expected:**
- ✅ No CORS errors
- ✅ No "VITE_API_URL is not configured" errors

### 3. Login Flow Works

1. Navigate to `/login`
2. Enter credentials
3. Click **"Login"**
4. Should redirect to `/dashboard`

**If login fails:**
- Check Network tab for API requests
- Verify backend is running
- Check CORS configuration

### 4. Preview Deployments Work

1. Create a PR
2. Wait for preview deployment
3. Click preview URL
4. Verify app works on preview domain

---

## 🔧 Troubleshooting

### Issue 1: "VITE_API_URL is not configured" Error

**Symptom:**
```
Error: API URL is not configured. Please set VITE_API_URL.
```

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Ensure `VITE_API_URL` is set for:
   - Production
   - Preview
3. Redeploy the application

---

### Issue 2: CORS Errors

**Symptom:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

1. **Check Backend CORS Configuration**
   ```javascript
   // backend/src/main.ts should include:
   app.enableCors({
     origin: [
       'https://cinemai-bice.vercel.app',
       /^https:\/\/.*\.vercel\.app$/,
     ],
     credentials: true,
   });
   ```

2. **Verify Frontend Domain**
   - Open browser console
   - Note the exact domain in the error message
   - Add that domain to backend CORS origins

3. **Restart Backend**
   ```bash
   # After updating CORS config
   npm run start
   ```

---

### Issue 3: 404 on Page Refresh

**Symptom:**
- App works on first load
- Refreshing any route (e.g., `/dashboard`) shows 404

**Solution:**

Check `vercel.json` has correct rewrites:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Already configured in this project** ✅

---

### Issue 4: Environment Variables Not Working

**Symptom:**
- Variables set in Vercel
- But app still shows "not configured" error

**Solution:**

1. **Check Environment Name**
   - Production variables only work on production deployments
   - Preview variables only work on preview deployments

2. **Redeploy After Adding Variables**
   - Variables are applied at build time
   - Changes require a new deployment

3. **Use Correct Prefix**
   - Must be `VITE_API_URL` (not `API_URL`)
   - Vite requires `VITE_` prefix for client-side vars

---

### Issue 5: Preview Shows Old Code

**Symptom:**
- Pushed new code
- Preview still shows old version

**Solution:**

1. **Check Deployment Status**
   - Go to Vercel dashboard
   - Verify latest commit was deployed

2. **Clear Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache

3. **Check Git Branch**
   - Verify you pushed to the correct branch
   - Check PR is open and commit is included

---

## 📊 Deployment Dashboard

### Key Metrics to Monitor

| Metric | Ideal Value | How to Check |
|--------|-------------|--------------|
| Build Time | < 2 minutes | Vercel Dashboard → Deployments |
| Bundle Size | < 500 KB gzipped | Build logs |
| Lighthouse Score | > 90 | Chrome DevTools → Lighthouse |
| Response Time | < 500ms | Network tab |

### Build Outputs

**Successful Build:**
```
✓ 98 modules transformed
dist/index.html                   0.40 kB │ gzip:  0.27 kB
dist/assets/index-DfCxZhtm.css    3.69 kB │ gzip:  1.17 kB
dist/assets/index-DV-0PHWG.js   226.63 kB │ gzip: 73.54 kB
✓ built in 1.08s
```

---

## 🎯 Best Practices

### 1. Environment Variables

- ✅ **DO** use descriptive names
- ✅ **DO** document all required variables
- ✅ **DO** use different values per environment
- ❌ **DON'T** commit `.env` files to git
- ❌ **DON'T** expose secrets in client-side code

### 2. Deployments

- ✅ **DO** test in preview before merging
- ✅ **DO** review build logs
- ✅ **DO** monitor production deployments
- ❌ **DON'T** deploy untested code to production
- ❌ **DON'T** skip environment variable checks

### 3. CORS Configuration

- ✅ **DO** use specific origins (not `*`)
- ✅ **DO** include all Vercel preview domains
- ✅ **DO** enable credentials for auth
- ❌ **DON'T** use wildcard (`*`) in production
- ❌ **DON'T** forget localhost for development

---

## 📚 Additional Resources

### Official Documentation

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

### CinemAi Documentation

- `BACKEND_PRODUCTION_FIXES.md` - Backend deployment fixes
- `WEB_APP_COMPLETE_SUMMARY.md` - Web app implementation
- `DEPLOYMENT.md` - General deployment guide

---

## 🆘 Getting Help

### Check These First

1. **Build Logs** - Vercel Dashboard → Deployments → Build Logs
2. **Browser Console** - F12 → Console tab
3. **Network Tab** - F12 → Network tab (check API requests)

### Common Issues

- Missing environment variables → Add in Vercel settings
- CORS errors → Update backend CORS config
- 404 on routes → Check `vercel.json` rewrites
- Stale cache → Hard refresh browser

### Support Channels

- Create GitHub Issue
- Check existing documentation
- Review deployment logs

---

## ✅ Quick Reference

### Environment Variables Summary

| Environment | Where to Set | Value |
|-------------|--------------|-------|
| **Production** | Vercel → Settings → Env Vars → Production | `https://cinemai-bice.vercel.app/api` |
| **Preview** | Vercel → Settings → Env Vars → Preview | `https://cinemai-bice.vercel.app/api` |
| **Development** | Local `web/.env` file | `http://localhost:3000` |

### Required CORS Origins

```
✅ https://cinemai-bice.vercel.app
✅ https://*.vercel.app
✅ http://localhost:3001
✅ http://localhost:5173
```

### Deploy Command

```bash
# Automatic on git push
git push origin main

# Or manual in Vercel Dashboard
# Click "Deploy" → Select branch → Deploy
```

---

**Last Updated:** 2026-02-13  
**Version:** 1.0.0  
**Maintained by:** CinemAi Team

🎬 **Happy Deploying!** ✨
