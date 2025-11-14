import { query } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('stocks').order('desc').take(50)
  },
})

export const listLive = query({
  handler: async (ctx) => {
    const now = Date.now()
    const oneMinuteAgo = now - 60 * 1000
    return await ctx.db
      .query('stocks')
      .withIndex('by_updated', (q) => q.gte('updatedAt', oneMinuteAgo))
      .order('desc')
      .take(20)
  },
})

export const getBySymbol = query({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('stocks')
      .withIndex('by_symbol', (q) => q.eq('symbol', args.symbol))
      .first()
  },
})
