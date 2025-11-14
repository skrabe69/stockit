// Server streaming utilities for TanStack Start
// Demonstrates progressive data loading and server-side streaming

export async function* streamStockData(symbol: string) {
  // Simulate streaming stock data updates
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    yield {
      symbol,
      price: 150 + Math.random() * 10,
      timestamp: Date.now(),
      updateNumber: i + 1,
    }
  }
}

export async function streamRecommendations() {
  // Stream recommendations as they're generated
  const recommendations = [
    { symbol: 'AAPL', score: 85 },
    { symbol: 'GOOGL', score: 78 },
    { symbol: 'MSFT', score: 82 },
  ]

  for (const rec of recommendations) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    yield rec
  }
}
