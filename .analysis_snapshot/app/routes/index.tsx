import { createFileRoute } from '@tanstack/react-router'
import { useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { StockCard } from '../components/StockCard'
import { LiveStockTicker } from '../components/LiveStockTicker'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const stocks = useConvexQuery(api.stocks.list) || []
  const recommendations = useConvexQuery(api.recommendations.getTop) || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
          Welcome to Stockit
        </h1>
        <p className="text-xl text-purple-200/90 max-w-2xl mx-auto">
          Real-time stock recommendations powered by AI and live market data
        </p>
      </div>

      <div className="mb-12 animate-slide-in">
        <LiveStockTicker />
      </div>

      <div className="mt-12 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-white">
            ⭐ Top Recommendations
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        {recommendations && recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={rec._id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <StockCard stock={rec} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
              <p className="text-purple-300">Loading recommendations...</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-white">
            📊 All Stocks
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        {stocks && stocks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stocks.map((stock, index) => (
              <div key={stock._id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <StockCard stock={stock} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
              <p className="text-purple-300">Loading stocks...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
