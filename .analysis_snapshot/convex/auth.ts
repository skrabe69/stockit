import { query } from './_generated/server'

// Simple auth setup - in production, use proper auth
export const currentUser = query({
  handler: async (ctx) => {
    // In production, get from auth context
    return {
      _id: 'user-1' as any,
      name: 'Demo User',
      email: 'demo@stockit.com',
    }
  },
})
