// Server actions for TanStack Start
// These demonstrate server-side operations and RPCs

export async function fetchStockData(symbol: string) {
  // This would call Convex or external APIs
  // Demonstrating server-side data fetching
  return {
    symbol,
    price: 150.25,
    change: 2.5,
  }
}

export async function generateRecommendation(symbol: string) {
  // Server-side recommendation generation
  // Could use AI/ML models here
  return {
    symbol,
    score: 85,
    reasoning: 'Strong technical indicators and positive momentum',
  }
}
