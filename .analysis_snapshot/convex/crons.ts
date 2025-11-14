import { cronJobs } from 'convex/server'
import { internal } from './_generated/api'

const crons = cronJobs()

// Update stock prices every minute (using action to fetch real data)
crons.interval(
  'update-stocks',
  { minutes: 1 },
  internal.stocksUpdate.updatePrices
)

// Generate new recommendations every hour
crons.interval(
  'generate-recommendations',
  { hours: 1 },
  internal.recommendationsGenerate.generate
)

export default crons
