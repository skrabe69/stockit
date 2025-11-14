# Environment Variables Setup

## Frontend Environment Variables (`.env` file)

Create a `.env` file in the **project root** (same directory as `package.json`):

```
/Users/ashasomayajula/ufit/.env
```

### Required Variables

```bash
# Convex Deployment URL (get this from Convex dashboard)
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Autumn API (optional - for enhanced financial data)
VITE_AUTUMN_API_URL=https://api.autumn.com
VITE_AUTUMN_API_KEY=your-autumn-api-key

# Note: All frontend variables MUST be prefixed with VITE_
```

## Backend Environment Variables (Convex)

For Convex backend functions (like Firecrawl), set environment variables via:

### Option 1: Convex Dashboard
1. Go to your Convex dashboard
2. Navigate to Settings → Environment Variables
3. Add: `FIRECRAWL_API_KEY`

### Option 2: Convex CLI
```bash
npx convex env set FIRECRAWL_API_KEY your-firecrawl-api-key
```

## Quick Setup

1. Create `.env` in project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your keys:
   ```bash
   VITE_CONVEX_URL=https://your-deployment.convex.cloud
   VITE_AUTUMN_API_KEY=your-key-here
   ```

3. Set Convex backend variables:
   ```bash
   npx convex env set FIRECRAWL_API_KEY your-firecrawl-key
   ```

## File Locations Summary

- **Frontend `.env`**: `/Users/ashasomayajula/ufit/.env` (project root)
- **Convex env vars**: Set via Convex dashboard or CLI (stored in Convex cloud)
