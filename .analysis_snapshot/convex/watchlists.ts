import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('watchlists')
      .withIndex('by_shared', (q) => q.eq('shared', true))
      .order('desc')
      .take(20)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    symbols: v.array(v.string()),
    owner: v.string(),
    shared: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('watchlists', {
      ...args,
      updatedAt: Date.now(),
    })
  },
})

export const addStock = mutation({
  args: {
    watchlistId: v.id('watchlists'),
    symbol: v.string(),
  },
  handler: async (ctx, args) => {
    const watchlist = await ctx.db.get(args.watchlistId)
    if (!watchlist) throw new Error('Watchlist not found')

    const updatedSymbols = [...watchlist.symbols, args.symbol]
    await ctx.db.patch(args.watchlistId, {
      symbols: updatedSymbols,
      updatedAt: Date.now(),
    })
  },
})
