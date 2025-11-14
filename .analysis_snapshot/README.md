# Stockit - AI-Powered Stock Recommender

A full-stack stock recommendation application built with **TanStack Start**, showcasing advanced features like real-time updates, server streaming, collaborative tools, and RPCs.

## 🚀 Features

### Rich Interactivity
- Real-time stock price updates
- Interactive charts with Recharts
- Live ticker feed
- Dynamic filtering and sorting

### Live Updates
- Convex subscriptions for real-time data
- Server-side streaming with TanStack Start
- Automatic price updates via cron jobs
- Live collaborative comments and watchlists

### Server Streaming
- TanStack Start server components
- Progressive data loading
- Optimistic UI updates

### Collaborative Tools
- Shared watchlists
- Real-time comments on stocks
- Multi-user interactions

### Full-Stack Routing
- File-based routing with TanStack Router
- Dynamic routes (`/stock/$symbol`)
- Type-safe navigation

### RPCs with Convex
- Type-safe API calls
- Real-time subscriptions
- Server-side mutations and queries

## 🛠️ Tech Stack

- **TanStack Start** - Full-stack React framework
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Data fetching and caching
- **Convex** - Backend-as-a-Service with real-time subscriptions
- **Firecrawl** - Web scraping for stock news
- **Recharts** - Interactive charts
- **Tailwind CSS** - Styling
- **Netlify** - Deployment platform
- **CodeRabbit** - Automated code review
- **Autumn** - Financial data API

## 📦 Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Convex:
```bash
npx convex dev
```

3. Set environment variables:
```bash
cp .env.example .env
```

Add your API keys:
- `VITE_CONVEX_URL` - From Convex dashboard
- `FIRECRAWL_API_KEY` - From Firecrawl

4. Seed initial data:
```bash
npx convex run seed:seed
```

5. Start development server:
```bash
npm run dev
```

## 🎯 Usage

### Development
- Frontend: `npm run dev` (runs on http://localhost:3000)
- Convex: `npm run convex:dev` (runs in separate terminal)

### Production
```bash
npm run build
npm start
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 📁 Project Structure

```
stockit/
├── app/
│   ├── routes/          # TanStack Router routes
│   ├── components/      # React components
│   ├── root.tsx         # Root component
│   └── app.css          # Global styles
├── convex/
│   ├── schema.ts        # Database schema
│   ├── stocks.ts        # Stock queries
│   ├── recommendations.ts # Recommendation queries
│   ├── watchlists.ts    # Watchlist mutations
│   ├── comments.ts      # Comment mutations
│   └── crons.ts         # Scheduled jobs
└── public/              # Static assets
```

## 🔧 Key Integrations

### Convex
- Real-time database
- Serverless functions
- Automatic API generation

### Firecrawl
- Scrapes stock news from finance sites
- Updates stock data with latest news

### Netlify
- Edge deployment
- Serverless functions
- Automatic builds

### CodeRabbit
- Automated AI code reviews
- Pull request analysis
- Code quality suggestions

### Autumn
- Enhanced financial data APIs
- Market analysis endpoints
- Real-time financial metrics

## 📝 License

MIT
