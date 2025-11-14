import { internalMutation } from './_generated/server'

// Seed initial stock data
export const seed = internalMutation({
  handler: async (ctx) => {
    const stocks = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 175.43,
        change: 2.15,
        changePercent: 1.24,
        volume: 52345678,
        sector: 'Technology',
        marketCap: 2.8e12,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 175.43 + (Math.random() - 0.5) * 10,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 142.56,
        change: -1.23,
        changePercent: -0.86,
        volume: 23456789,
        sector: 'Technology',
        marketCap: 1.8e12,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 142.56 + (Math.random() - 0.5) * 8,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 378.92,
        change: 5.67,
        changePercent: 1.52,
        volume: 34567890,
        sector: 'Technology',
        marketCap: 2.9e12,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 378.92 + (Math.random() - 0.5) * 12,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        price: 248.76,
        change: -3.45,
        changePercent: -1.37,
        volume: 67890123,
        sector: 'Consumer',
        marketCap: 790e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 248.76 + (Math.random() - 0.5) * 15,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 495.32,
        change: 12.45,
        changePercent: 2.58,
        volume: 45678901,
        sector: 'Technology',
        marketCap: 1.2e12,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 495.32 + (Math.random() - 0.5) * 20,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 152.34,
        change: 1.89,
        changePercent: 1.26,
        volume: 56789012,
        sector: 'Consumer',
        marketCap: 1.6e12,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 152.34 + (Math.random() - 0.5) * 10,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        price: 158.92,
        change: 2.45,
        changePercent: 1.57,
        volume: 12456789,
        sector: 'Finance',
        marketCap: 460e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 158.92 + (Math.random() - 0.5) * 8,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        price: 162.34,
        change: 0.89,
        changePercent: 0.55,
        volume: 9876543,
        sector: 'Healthcare',
        marketCap: 420e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 162.34 + (Math.random() - 0.5) * 6,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'XOM',
        name: 'Exxon Mobil Corporation',
        price: 112.45,
        change: -1.23,
        changePercent: -1.08,
        volume: 14567890,
        sector: 'Energy',
        marketCap: 470e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 112.45 + (Math.random() - 0.5) * 7,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'BA',
        name: 'The Boeing Company',
        price: 198.76,
        change: 3.21,
        changePercent: 1.64,
        volume: 11234567,
        sector: 'Industrial',
        marketCap: 120e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 198.76 + (Math.random() - 0.5) * 12,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'UNH',
        name: 'UnitedHealth Group Inc.',
        price: 542.18,
        change: 8.45,
        changePercent: 1.58,
        volume: 3456789,
        sector: 'Healthcare',
        marketCap: 510e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 542.18 + (Math.random() - 0.5) * 15,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'BAC',
        name: 'Bank of America Corp',
        price: 35.67,
        change: 0.45,
        changePercent: 1.28,
        volume: 45678901,
        sector: 'Finance',
        marketCap: 280e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 35.67 + (Math.random() - 0.5) * 3,
        })),
        updatedAt: Date.now(),
      },
      // High risk stocks (volatility >= 5%)
      {
        symbol: 'RIVN',
        name: 'Rivian Automotive, Inc.',
        price: 15.23,
        change: -1.25,
        changePercent: -7.58, // High volatility - high risk
        volume: 45678901,
        sector: 'Consumer',
        marketCap: 15e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 15.23 + (Math.random() - 0.5) * 3,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'PLTR',
        name: 'Palantir Technologies Inc.',
        price: 24.56,
        change: 1.89,
        changePercent: 8.34, // High volatility - high risk
        volume: 67890123,
        sector: 'Technology',
        marketCap: 45e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 24.56 + (Math.random() - 0.5) * 4,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'HOOD',
        name: 'Robinhood Markets, Inc.',
        price: 18.92,
        change: -1.12,
        changePercent: -5.59, // High volatility - high risk
        volume: 34567890,
        sector: 'Finance',
        marketCap: 18e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 18.92 + (Math.random() - 0.5) * 2.5,
        })),
        updatedAt: Date.now(),
      },
      // Medium risk stocks (volatility 2-5%)
      {
        symbol: 'WMT',
        name: 'Walmart Inc.',
        price: 165.78,
        change: 4.23,
        changePercent: 2.62, // Medium volatility - medium risk
        volume: 12345678,
        sector: 'Consumer',
        marketCap: 440e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 165.78 + (Math.random() - 0.5) * 5,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'PG',
        name: 'Procter & Gamble Co',
        price: 152.34,
        change: -4.56,
        changePercent: -2.91, // Medium volatility - medium risk
        volume: 8765432,
        sector: 'Consumer',
        marketCap: 360e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 152.34 + (Math.random() - 0.5) * 4,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'V',
        name: 'Visa Inc.',
        price: 278.45,
        change: 7.89,
        changePercent: 2.92, // Medium volatility - medium risk
        volume: 7654321,
        sector: 'Finance',
        marketCap: 580e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 278.45 + (Math.random() - 0.5) * 8,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'CVX',
        name: 'Chevron Corporation',
        price: 158.23,
        change: -5.12,
        changePercent: -3.14, // Medium volatility - medium risk
        volume: 9876543,
        sector: 'Energy',
        marketCap: 300e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 158.23 + (Math.random() - 0.5) * 5,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'CAT',
        name: 'Caterpillar Inc.',
        price: 245.67,
        change: 6.78,
        changePercent: 2.84, // Medium volatility - medium risk
        volume: 5432109,
        sector: 'Industrial',
        marketCap: 130e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 245.67 + (Math.random() - 0.5) * 7,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'PFE',
        name: 'Pfizer Inc.',
        price: 28.45,
        change: -0.89,
        changePercent: -3.03, // Medium volatility - medium risk
        volume: 6543210,
        sector: 'Healthcare',
        marketCap: 160e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 28.45 + (Math.random() - 0.5) * 2,
        })),
        updatedAt: Date.now(),
      },
      // Low risk stocks (volatility < 2%) - already have some, adding a few more
      {
        symbol: 'KO',
        name: 'The Coca-Cola Company',
        price: 62.34,
        change: 0.45,
        changePercent: 0.73, // Low volatility - low risk
        volume: 11111111,
        sector: 'Consumer',
        marketCap: 270e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 62.34 + (Math.random() - 0.5) * 1.5,
        })),
        updatedAt: Date.now(),
      },
      {
        symbol: 'MCD',
        name: "McDonald's Corporation",
        price: 285.67,
        change: 1.23,
        changePercent: 0.43, // Low volatility - low risk
        volume: 2222222,
        sector: 'Consumer',
        marketCap: 210e9,
        priceHistory: Array.from({ length: 30 }, (_, i) => ({
          date: Date.now() - (30 - i) * 24 * 60 * 60 * 1000,
          price: 285.67 + (Math.random() - 0.5) * 3,
        })),
        updatedAt: Date.now(),
      },
    ]

    for (const stock of stocks) {
      const existing = await ctx.db
        .query('stocks')
        .withIndex('by_symbol', (q) => q.eq('symbol', stock.symbol))
        .first()

      if (!existing) {
        await ctx.db.insert('stocks', stock)
      }
    }
  },
})
