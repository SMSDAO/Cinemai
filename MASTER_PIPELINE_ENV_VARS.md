# 🔑 MASTER PIPELINE: Environment Variables Quick Reference

**Last Updated**: 2026-02-14

---

## 🗄️ Backend Environment Variables

### Vercel Project: `prj_VMLktMtWiPwBvWv1tsTWgiIaAIp9`
### Domain: `cinemai-bice.vercel.app`

### ✅ Production Environment

```bash
# REQUIRED
DATABASE_URL=postgresql://[user]:[password]@[host].neon.tech/cinemai?sslmode=require
JWT_SECRET=[generate-strong-secret-key]
NODE_ENV=production

# OPTIONAL (can add later)
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STORAGE_PROVIDER=aws
S3_BUCKET=cinemai-assets
S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

### ✅ Preview Environment

```bash
# REQUIRED
DATABASE_URL=postgresql://[user]:[password]@[host].neon.tech/cinemai_preview?sslmode=require
JWT_SECRET=[different-secret-for-preview]
NODE_ENV=preview

# OPTIONAL
JWT_EXPIRES_IN=7d
```

### ✅ Local Development

File: `backend/.env`

```bash
# REQUIRED
DATABASE_URL=postgresql://[user]:[password]@[host].neon.tech/cinemai_dev?sslmode=require
JWT_SECRET=dev-secret-key-not-for-production
NODE_ENV=development
PORT=3000

# OPTIONAL
JWT_EXPIRES_IN=7d
STORAGE_PROVIDER=mock
```

---

## 🌐 Web Frontend Environment Variables

### Vercel Project: `prj_J7Dexd02XqPEcc6so0SrSXz4g69Y`
### Domain: `cinemai-nine.vercel.app`

### ✅ Production Environment

```bash
# REQUIRED
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

### ✅ Preview Environment

```bash
# REQUIRED
# Use production backend for previews
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

### ✅ Local Development

File: `web/.env`

```bash
# REQUIRED
VITE_API_URL=http://localhost:3000/api
```

---

## 📱 Mobile App Environment Variables

### Platform: React Native (iOS + Android)

### ✅ Production

File: `mobile/.env`

```bash
# REQUIRED
API_BASE_URL=https://cinemai-bice.vercel.app/api
```

### ✅ Development (iOS Simulator)

File: `mobile/.env`

```bash
# Local backend
API_BASE_URL=http://localhost:3000/api

# Or computer IP
API_BASE_URL=http://192.168.1.100:3000/api
```

### ✅ Development (Android Emulator)

File: `mobile/.env`

```bash
# Android emulator special IP for localhost
API_BASE_URL=http://10.0.2.2:3000/api

# Or computer IP
API_BASE_URL=http://192.168.1.100:3000/api
```

### ✅ Development (Physical Device)

File: `mobile/.env`

```bash
# Use computer's IP on same network
API_BASE_URL=http://192.168.1.100:3000/api
```

---

## 🔐 Security Best Practices

### JWT Secret Generation

```bash
# Generate a strong JWT secret (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 64
```

### Database URL Format

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

**Example**:
```
postgresql://cinemai_user:super_secret_pass@ep-cool-name-123456.us-east-2.aws.neon.tech:5432/cinemai?sslmode=require
```

**Important**:
- Always use `sslmode=require` for Neon
- Never commit DATABASE_URL to git
- Use different databases for prod/preview/dev
- Use strong passwords (20+ chars, mixed case, numbers, symbols)

---

## 📋 Checklist: Setting Environment Variables

### Backend Deployment

- [ ] Get DATABASE_URL from Neon dashboard
- [ ] Generate strong JWT_SECRET
- [ ] Set variables in Vercel dashboard (Backend project)
- [ ] Set for both Production AND Preview environments
- [ ] Test with `curl https://cinemai-bice.vercel.app/health`

### Web Deployment

- [ ] Set VITE_API_URL in Vercel dashboard (Web project)
- [ ] Set for both Production AND Preview environments
- [ ] Verify backend URL is correct
- [ ] Test with browser: `https://cinemai-nine.vercel.app`

### Mobile Development

- [ ] Create `mobile/.env` file
- [ ] Set API_BASE_URL (production or local)
- [ ] For iOS simulator: use `localhost` or computer IP
- [ ] For Android emulator: use `10.0.2.2` or computer IP
- [ ] For physical device: use computer IP on same network
- [ ] Test login flow in app

### Local Development

- [ ] Create `backend/.env` with DATABASE_URL
- [ ] Create `web/.env` with VITE_API_URL=http://localhost:3000/api
- [ ] Create `mobile/.env` with appropriate API_BASE_URL
- [ ] Run `npm install` in each directory
- [ ] Test locally before deploying

---

## 🚨 Common Issues

### Issue: "Cannot read environment variable DATABASE_URL"

**Solution**: Set DATABASE_URL in Vercel dashboard for backend project

### Issue: "CORS error when calling API from web app"

**Solution**: 
1. Verify VITE_API_URL is set correctly
2. Check backend CORS configuration includes web domain
3. Backend should allow: `https://cinemai-nine.vercel.app`

### Issue: "Network request failed" in mobile app

**Solution**:
1. Check API_BASE_URL in mobile/.env
2. For iOS simulator: use `localhost` or computer IP
3. For Android emulator: use `10.0.2.2` (not `localhost`)
4. For physical device: use computer IP on same network
5. Verify backend is running and accessible

### Issue: "JWT validation failed"

**Solution**:
1. Verify JWT_SECRET is set in backend environment
2. Ensure same JWT_SECRET across all backend instances
3. Check token is being sent in Authorization header
4. Verify token hasn't expired (check JWT_EXPIRES_IN)

---

## 📱 Quick Copy-Paste Blocks

### Backend Production (Vercel Dashboard)

```
DATABASE_URL=postgresql://REPLACE_ME
JWT_SECRET=REPLACE_ME_WITH_GENERATED_SECRET
NODE_ENV=production
JWT_EXPIRES_IN=7d
```

### Web Production (Vercel Dashboard)

```
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

### Mobile Production (mobile/.env file)

```
API_BASE_URL=https://cinemai-bice.vercel.app/api
```

### Local Development (backend/.env file)

```
DATABASE_URL=postgresql://REPLACE_ME
JWT_SECRET=dev-secret-not-for-production
NODE_ENV=development
PORT=3000
JWT_EXPIRES_IN=7d
STORAGE_PROVIDER=mock
```

### Local Development (web/.env file)

```
VITE_API_URL=http://localhost:3000/api
```

### Local Development (mobile/.env file)

```
# iOS Simulator
API_BASE_URL=http://localhost:3000/api

# Android Emulator (uncomment and use this instead)
# API_BASE_URL=http://10.0.2.2:3000/api
```

---

## 🎯 Environment-Specific Settings

| Setting | Production | Preview | Development |
|---------|-----------|---------|-------------|
| Backend DB | `cinemai` | `cinemai_preview` | `cinemai_dev` |
| Backend URL | `cinemai-bice.vercel.app` | `*-preview.vercel.app` | `localhost:3000` |
| Web URL | `cinemai-nine.vercel.app` | `*-preview.vercel.app` | `localhost:5173` |
| JWT Secret | Strong unique | Different unique | Dev only |
| SSL Required | ✅ Yes | ✅ Yes | ⚠️ Optional |
| CORS | Specific origins | Specific origins | `*` (all) |

---

## ✅ Final Checklist

Before deploying:

- [ ] All DATABASE_URLs obtained from Neon
- [ ] All JWT_SECRETs generated (different for each env)
- [ ] All environment variables set in Vercel dashboards
- [ ] All .env files created locally (not committed to git)
- [ ] .env files added to .gitignore
- [ ] Tested locally before deploying
- [ ] Backend CORS configured for web domain
- [ ] Mobile API endpoint configured correctly

---

**Ready to deploy! 🚀**

See `MASTER_PIPELINE_DEPLOYMENT_GUIDE.md` for detailed deployment steps.
