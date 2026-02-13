# ⚡ Vercel Quick Start - CinemAi Web App

Ultra-quick reference for deploying to Vercel. For detailed guide, see [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md).

---

## 🚀 5-Minute Setup

### 1. Connect to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import **SMSDAO/Cinemai** repository
4. Click **"Import"**

### 2. Configure Build Settings

- **Framework Preset:** Vite
- **Root Directory:** `web/`
- **Build Command:** `npm install && npm run build`
- **Output Directory:** `dist`

Click **"Deploy"** (it will fail - that's okay, we need env vars first)

### 3. Add Environment Variables

Go to **Settings → Environment Variables**

#### ✅ Production Environment

```
Variable: VITE_API_URL
Value: https://cinemai-bice.vercel.app/api
Environment: Production only
```

Click **"Save"**

#### ✅ Preview Environment

```
Variable: VITE_API_URL
Value: https://cinemai-bice.vercel.app/api
Environment: Preview only
```

Click **"Save"**

### 4. Redeploy

Go to **Deployments** → Click latest failed deployment → Click **"Redeploy"**

### 5. Verify

Click the deployment URL and verify:
- ✅ App loads
- ✅ No console errors
- ✅ Login works

---

## 📋 Copy-Paste Blocks

### For Vercel Dashboard

**Production Environment Variable:**
```
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

**Preview Environment Variable:**
```
VITE_API_URL=https://cinemai-bice.vercel.app/api
```

### For Local Development

**Create `web/.env` file:**
```bash
# CinemAi Web App - Local Development
VITE_API_URL=http://localhost:3000
```

---

## 🌐 Required CORS Origins (Backend)

Your backend **must** allow these origins (already configured):

```javascript
✅ https://cinemai-bice.vercel.app
✅ https://cinemai-aq6o4qgsc-castquest.vercel.app
✅ https://cinemai-diduw8dka-castquest.vercel.app
✅ https://*.vercel.app
✅ http://localhost:3001
✅ http://localhost:5173
```

**Already configured in:** `backend/src/main.ts` ✅

---

## ⚠️ Common Issues

### Issue: "VITE_API_URL is not configured"

**Fix:** Add environment variable in Vercel dashboard, then redeploy.

### Issue: CORS Errors

**Fix:** Backend CORS is already configured. If still seeing errors:
1. Check exact domain in error message
2. Verify it matches patterns above
3. Restart backend if you changed CORS config

### Issue: 404 on Refresh

**Fix:** Already configured in `vercel.json` ✅

### Issue: Environment Variables Not Working

**Fix:** 
1. Verify you added to correct environment (Production/Preview)
2. Redeploy after adding variables
3. Hard refresh browser (Ctrl+Shift+R)

---

## 📚 Full Documentation

- **Complete Guide:** [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md)
- **Backend Setup:** [`BACKEND_PRODUCTION_FIXES.md`](./BACKEND_PRODUCTION_FIXES.md)
- **Web App Details:** [`WEB_APP_COMPLETE_SUMMARY.md`](./WEB_APP_COMPLETE_SUMMARY.md)

---

## ✅ Checklist

Before deploying:
- [ ] Backend is running and accessible
- [ ] Backend CORS is configured (already done ✅)
- [ ] Connected repository to Vercel
- [ ] Added VITE_API_URL for Production
- [ ] Added VITE_API_URL for Preview
- [ ] Deployed successfully
- [ ] Verified app works

---

**Need Help?** See full guide at [`VERCEL_DEPLOYMENT_GUIDE.md`](./VERCEL_DEPLOYMENT_GUIDE.md)

🎬 **That's it! You're ready to deploy!** ✨
