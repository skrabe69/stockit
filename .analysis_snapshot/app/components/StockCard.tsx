import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'

interface Stock {
  _id: string
  symbol: string
  name: string
  price?: number
  change?: number
  changePercent?: number
  volume?: number
  updatedAt?: number
  // Recommendation fields
  score?: number
  riskLevel?: 'low' | 'medium' | 'high'
  sector?: string
  createdAt?: number
}

interface StockCardProps {
  stock: Stock
}

export function StockCard({ stock }: StockCardProps) {
  // Check if this is a recommendation (has score) or a stock (has price)
  const isRecommendation = 'score' in stock && !('price' in stock)
  
  if (isRecommendation) {
    // Handle recommendation display
    const recommendation = stock as any
    const scoreColor =
      recommendation.score >= 80
        ? 'text-green-400'
        : recommendation.score >= 60
        ? 'text-yellow-400'
        : 'text-red-400'
    
    return (
      <Link
        to="/stock/$symbol"
        params={{ symbol: recommendation.symbol }}
        className="group block bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-purple-800/40 hover:border-purple-500/60 card-hover relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:to-transparent transition-all duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                {recommendation.symbol}
              </h3>
              <p className="text-sm text-purple-300/80 mt-1">{recommendation.name}</p>
            </div>
            <div className={`text-right ${scoreColor}`}>
              <div className="text-3xl font-bold drop-shadow-lg">Score: {recommendation.score}/100</div>
              <div className="text-xs mt-2 px-3 py-1 rounded-full bg-opacity-20 backdrop-blur-sm inline-block" 
                   style={{
                     backgroundColor: recommendation.score >= 80 ? 'rgba(34, 197, 94, 0.2)' :
                                   recommendation.score >= 60 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                   }}>
                {recommendation.riskLevel.toUpperCase()} RISK
              </div>
            </div>
          </div>
          <div className="text-xs text-purple-400/70 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              {recommendation.sector}
            </span>
            <span>{format(new Date(recommendation.createdAt), 'HH:mm:ss')}</span>
          </div>
        </div>
      </Link>
    )
  }

  // Handle stock display
  const isPositive = (stock.change ?? 0) >= 0
  const price = stock.price ?? 0
  const change = stock.change ?? 0
  const changePercent = stock.changePercent ?? 0
  const volume = stock.volume ?? 0
  const updatedAt = stock.updatedAt ?? Date.now()

  return (
    <Link
      to="/stock/$symbol"
      params={{ symbol: stock.symbol }}
      className="group block bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-purple-800/40 hover:border-purple-500/60 card-hover relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/0 group-hover:from-purple-900/10 group-hover:to-transparent transition-all duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
              {stock.symbol}
            </h3>
            <p className="text-sm text-purple-300/80 mt-1">{stock.name}</p>
          </div>
          <div className={`text-right ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            <div className="text-3xl font-bold drop-shadow-lg">${price.toFixed(2)}</div>
            <div className="text-sm font-semibold mt-1">
              {isPositive ? '+' : ''}
              {change.toFixed(2)} ({isPositive ? '+' : ''}
              {changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        <div className="text-xs text-purple-400/70 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-purple-500">📊</span>
            {volume.toLocaleString()}
          </span>
          <span>{format(new Date(updatedAt), 'HH:mm:ss')}</span>
        </div>
      </div>
    </Link>
  )
}
