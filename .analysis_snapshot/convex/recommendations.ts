import { query, mutation } from './_generated/server'
import { internal } from './_generated/api'
import { v } from 'convex/values'

export const list = query({
  args: {
    filters: v.optional(
      v.object({
        minScore: v.number(),
        sector: v.string(),
        riskLevel: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    let recommendations = await ctx.db.query('recommendations').order('desc').collect()

    if (args.filters) {
      const { minScore, sector, riskLevel } = args.filters

      recommendations = recommendations.filter((rec) => {
        if (rec.score < minScore) return false
        if (sector !== 'all' && rec.sector !== sector) return false
        if (riskLevel !== 'all' && rec.riskLevel !== riskLevel) return false
        return true
      })
    }

    return recommendations
  },
})

export const getTop = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('recommendations')
      .withIndex('by_score', (q) => q.gte('score', 0))
      .order('desc')
      .take(10)
  },
})

export const getBySymbol = query({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('recommendations')
      .withIndex('by_symbol', (q) => q.eq('symbol', args.symbol))
      .first()
  },
})

// Public mutation to trigger recommendation generation
export const generate = mutation({
  handler: async (ctx) => {
    // Call the internal mutation via action
    const stocks = await ctx.db.query('stocks').collect()

    for (const stock of stocks) {
      // Calculate recommendation score based on various factors
      const volatility = Math.abs(stock.changePercent) // Use absolute value for volatility calculation
      const momentum = stock.changePercent
      const volumeScore = Math.min(stock.volume / 1000000, 1) // Normalize volume

      // Simple scoring algorithm (0-100)
      let score = 50 // Base score
      score += momentum * 2 // Momentum contributes
      score += volumeScore * 20 // Volume contributes
      score += Math.random() * 10 - 5 // Some randomness
      score = Math.max(0, Math.min(100, Math.round(score))) // Clamp to 0-100

      const riskLevel =
        volatility < 2 ? 'low' : volatility < 5 ? 'medium' : 'high'

      const reasoning = `Based on technical analysis: ${
        momentum > 0 ? 'positive momentum' : 'negative momentum'
      }, volume ${volumeScore > 0.5 ? 'above average' : 'below average'}, volatility ${
        volatility < 2 ? 'low' : volatility < 5 ? 'moderate' : 'high'
      }.`

      // Check if recommendation already exists
      const existing = await ctx.db
        .query('recommendations')
        .withIndex('by_symbol', (q) => q.eq('symbol', stock.symbol))
        .first()

      const recommendationData = {
        symbol: stock.symbol,
        name: stock.name,
        score,
        reasoning,
        riskLevel: riskLevel as 'low' | 'medium' | 'high',
        sector: stock.sector,
        priceHistory: stock.priceHistory.slice(-10), // Last 10 data points
        createdAt: Date.now(),
      }

      if (existing) {
        await ctx.db.patch(existing._id, recommendationData)
      } else {
        await ctx.db.insert('recommendations', recommendationData)
      }
    }
    
    return { success: true, count: stocks.length }
  },
})
