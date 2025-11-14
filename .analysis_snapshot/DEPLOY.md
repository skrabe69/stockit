# Deployment Guide

## ✅ Build Status
- Frontend build: **Successful** (`dist/` folder created)
- Convex backend: **Deployed to production**

## Production Convex URL
Your production Convex deployment URL:
```
VITE_CONVEX_URL=https://grandiose-toad-130.convex.cloud
```

## Frontend Deployment Options

### Option 1: Netlify (Recommended)

1. **Install Netlify CLI** (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize site** (first time only):
   ```bash
   netlify init
   ```

4. **Deploy to production**:
   ```bash
   netlify deploy --prod
   ```

5. **Set environment variable in Netlify Dashboard**:
   - Go to Site Settings → Environment Variables
   - Add: `VITE_CONVEX_URL=https://grandiose-toad-130.convex.cloud`

### Option 2: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Set environment variable**:
   - Add `VITE_CONVEX_URL` in Vercel dashboard

### Option 3: Manual Deployment

The build output is in the `dist/` folder. You can deploy this to any static hosting service:
- AWS S3 + CloudFront
- GitHub Pages
- Cloudflare Pages
- Any other static host

**Important**: Make sure to set the `VITE_CONVEX_URL` environment variable to your production Convex URL:
```
VITE_CONVEX_URL=https://grandiose-toad-130.convex.cloud
```

## Post-Deployment Checklist

- [ ] Convex backend deployed to production ✅
- [ ] Frontend build completed ✅
- [ ] Set `VITE_CONVEX_URL` environment variable in hosting platform
- [ ] Test the deployed site
- [ ] Verify real-time stock updates are working
- [ ] Check that all routes load correctly

## Quick Deploy Commands

```bash
# Build frontend
npm run build

# Deploy Convex backend
npx convex deploy --yes

# Preview build locally
npm run preview

# Deploy to Netlify
netlify deploy --prod
```
