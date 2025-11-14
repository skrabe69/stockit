import { useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

export function LiveStockTicker() {
  const stocks = useConvexQuery(api.stocks.listLive)

  if (!stocks || stocks.length === 0) {
    return null
  }

  return (
    <div className="relative bg-gradient-to-r from-slate-800/80 via-purple-900/30 to-slate-800/80 backdrop-blur-md rounded-2xl p-5 border border-purple-800/40 shadow-xl shadow-purple-900/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse"></div>
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📈</span>
          <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">Live Market</span>
        </div>
        <div className="flex animate-scroll space-x-8">
          {stocks.map((stock) => {
            const price = stock.price ?? 0
            const changePercent = stock.changePercent ?? 0
            const isPositive = changePercent >= 0
            return (
              <div
                key={stock._id}
                className="flex-shrink-0 flex items-center space-x-4 bg-slate-900/50 px-4 py-2 rounded-lg border border-purple-800/30 backdrop-blur-sm"
              >
                <span className="font-bold text-white text-lg">{stock.symbol}</span>
                <span className="text-purple-200 font-semibold">${price.toFixed(2)}</span>
                <span className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive ? '↑' : '↓'} {isPositive ? '+' : ''}
                  {changePercent.toFixed(2)}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
        }
      `}</style>
    </div>
  )
}
