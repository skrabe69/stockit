import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const listRecent = query({
  handler: async (ctx) => {
    return await ctx.db
      .query('comments')
      .withIndex('by_created')
      .order('desc')
      .take(20)
  },
})

export const getByStock = query({
  args: { symbol: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('comments')
      .withIndex('by_symbol', (q) => q.eq('symbol', args.symbol))
      .order('desc')
      .take(50)
  },
})

export const add = mutation({
  args: {
    symbol: v.string(),
    content: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('comments', {
      ...args,
      createdAt: Date.now(),
    })
  },
})
