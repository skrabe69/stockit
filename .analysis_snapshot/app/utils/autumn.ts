// Autumn API integration
// Autumn provides financial data APIs for enhanced stock analysis

const AUTUMN_API_URL = import.meta.env.VITE_AUTUMN_API_URL || 'https://api.autumn.com'
const AUTUMN_API_KEY = import.meta.env.VITE_AUTUMN_API_KEY || ''

export interface AutumnStockData {
  symbol: string
  price: number
  volume: number
  marketCap: number
  peRatio?: number
  dividendYield?: number
  analystRating?: string
}

export async function fetchAutumnStockData(symbol: string): Promise<AutumnStockData | null> {
  if (!AUTUMN_API_KEY) {
    console.warn('Autumn API key not configured')
    return null
  }

  try {
    const response = await fetch(`${AUTUMN_API_URL}/v1/stocks/${symbol}`, {
      headers: {
        'Authorization': `Bearer ${AUTUMN_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Autumn API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch Autumn data for ${symbol}:`, error)
    return null
  }
}

export async function fetchAutumnMarketAnalysis(symbol: string) {
  if (!AUTUMN_API_KEY) {
    return null
  }

  try {
    const response = await fetch(`${AUTUMN_API_URL}/v1/analysis/${symbol}`, {
      headers: {
        'Authorization': `Bearer ${AUTUMN_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Autumn API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch Autumn analysis for ${symbol}:`, error)
    return null
  }
}
