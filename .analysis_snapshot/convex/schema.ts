import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  stocks: defineTable({
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    change: v.number(),
    changePercent: v.number(),
    volume: v.number(),
    sector: v.string(),
    marketCap: v.number(),
    priceHistory: v.array(
      v.object({
        date: v.number(),
        price: v.number(),
      })
    ),
    news: v.optional(
      v.array(
        v.object({
          title: v.string(),
          url: v.string(),
          publishedAt: v.number(),
        })
      )
    ),
    updatedAt: v.number(),
  })
    .index('by_symbol', ['symbol'])
    .index('by_updated', ['updatedAt']),

  recommendations: defineTable({
    symbol: v.string(),
    name: v.string(),
    score: v.number(),
    reasoning: v.string(),
    riskLevel: v.union(v.literal('low'), v.literal('medium'), v.literal('high')),
    sector: v.string(),
    priceHistory: v.array(
      v.object({
        date: v.number(),
        price: v.number(),
      })
    ),
    createdAt: v.number(),
  })
    .index('by_score', ['score'])
    .index('by_symbol', ['symbol'])
    .index('by_created', ['createdAt']),

  watchlists: defineTable({
    name: v.string(),
    symbols: v.array(v.string()),
    owner: v.string(),
    shared: v.boolean(),
    updatedAt: v.number(),
  })
    .index('by_owner', ['owner'])
    .index('by_shared', ['shared']),

  comments: defineTable({
    symbol: v.string(),
    content: v.string(),
    author: v.string(),
    createdAt: v.number(),
  })
    .index('by_symbol', ['symbol'])
    .index('by_created', ['createdAt']),
})
