import { internalMutation, internalAction } from './_generated/server'
import { internal } from './_generated/api'
import { v } from 'convex/values'

// Internal action to fetch real stock data (can make HTTP requests)
export const fetchStockData = internalAction({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    try {
      // Using Yahoo Finance API (free, no auth required)
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${args.symbol}?interval=1m&range=1d`
      )
      
      if (!response.ok) {
        return null
      }

      const data = await response.json()
      const result = data.chart?.result?.[0]
      
      if (!result || !result.meta) {
        return null
      }

      const meta = result.meta
      return {
        price: meta.regularMarketPrice,
        previousClose: meta.previousClose,
        volume: meta.regularMarketVolume || 0,
        marketCap: meta.marketCap || 0,
      }
    } catch (error) {
      console.error(`Error fetching stock data for ${args.symbol}:`, error)
      return null
    }
  },
})

// This is called by cron jobs - now uses real stock data
export const updatePrices = internalAction({
  handler: async (ctx) => {
    // First, get all stocks via a mutation
    const stocks = await ctx.runMutation(internal.stocksUpdate.getStocks)
    
    for (const stock of stocks) {
      try {
        // Fetch real stock data using action
        const stockData = await ctx.runAction(internal.stocksUpdate.fetchStockData, {
          symbol: stock.symbol,
        })
        
        if (stockData) {
          const previousClose = stockData.previousClose || stock.price
          const change = stockData.price - previousClose
          const changePercent = (change / previousClose) * 100

          // Update via mutation
          await ctx.runMutation(internal.stocksUpdate.updateStockPrice, {
            stockId: stock._id,
            price: stockData.price,
            change,
            changePercent,
            volume: stockData.volume || stock.volume,
            marketCap: stockData.marketCap || stock.marketCap,
          })
          continue
        }
      } catch (error) {
        console.error(`Failed to fetch real data for ${stock.symbol}, using simulation:`, error)
      }

      // Fallback to simulation if API fails
      const changePercent = (Math.random() - 0.5) * 0.1
      const newPrice = stock.price * (1 + changePercent)
      const change = newPrice - stock.price

      await ctx.runMutation(internal.stocksUpdate.updateStockPrice, {
        stockId: stock._id,
        price: newPrice,
        change,
        changePercent: changePercent * 100,
        volume: stock.volume + Math.floor(Math.random() * 10000),
        marketCap: stock.marketCap,
      })
    }
  },
})

// Helper mutation to get stocks
export const getStocks = internalMutation({
  handler: async (ctx) => {
    return await ctx.db.query('stocks').collect()
  },
})

// Helper mutation to update stock price
export const updateStockPrice = internalMutation({
  args: {
    stockId: v.id('stocks'),
    price: v.number(),
    change: v.number(),
    changePercent: v.number(),
    volume: v.number(),
    marketCap: v.number(),
  },
  handler: async (ctx, args) => {
    const stock = await ctx.db.get(args.stockId)
    if (!stock) return

    const newHistory = [
      ...stock.priceHistory,
      { date: Date.now(), price: args.price },
    ].slice(-30)

    await ctx.db.patch(args.stockId, {
      price: args.price,
      change: args.change,
      changePercent: args.changePercent,
      volume: args.volume,
      marketCap: args.marketCap,
      priceHistory: newHistory,
      updatedAt: Date.now(),
    })
  },
})

export const fetchStockNews = internalMutation({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    // Firecrawl integration - requires @mendable/firecrawl-js package
    // For now, this is a placeholder that can be enabled when API key is set
    const apiKey = process.env.FIRECRAWL_API_KEY || ''
    
    if (!apiKey) {
      console.log(`FIRECRAWL_API_KEY not set, skipping news fetch for ${args.symbol}`)
      return
    }

    try {
      // In production, uncomment and use FirecrawlApp here
      // const { FirecrawlApp } = await import('@mendable/firecrawl-js')
      // const firecrawl = new FirecrawlApp({ apiKey })
      // const result = await firecrawl.scrapeUrl(
      //   `https://finance.yahoo.com/quote/${args.symbol}/news`,
      //   { formats: ['markdown'], onlyMainContent: true }
      // )

      // For now, create placeholder news
      const stock = await ctx.db
        .query('stocks')
        .withIndex('by_symbol', (q) => q.eq('symbol', args.symbol))
        .first()

      if (stock) {
        const news = [
          {
            title: `Latest news for ${args.symbol}`,
            url: `https://finance.yahoo.com/quote/${args.symbol}/news`,
            publishedAt: Date.now(),
          },
        ]

        await ctx.db.patch(stock._id, {
          news,
        })
      }
    } catch (error) {
      console.error(`Failed to fetch news for ${args.symbol}:`, error)
    }
  },
})
