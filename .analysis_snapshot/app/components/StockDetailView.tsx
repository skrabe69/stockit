import { useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Stock {
  _id: string
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  sector: string
  marketCap: number
  priceHistory: Array<{ date: number; price: number }>
  news: Array<{ title: string; url: string; publishedAt: number }>
}

interface StockDetailViewProps {
  stock: Stock
}

export function StockDetailView({ stock }: StockDetailViewProps) {
  const comments = useConvexQuery(api.comments.getByStock, {
    symbol: stock.symbol,
  })

  const isPositive = stock.change >= 0
  const chartData = stock.priceHistory.map((point) => ({
    date: new Date(point.date).toLocaleDateString(),
    price: point.price,
  }))

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{stock.symbol}</h1>
            <p className="text-xl text-purple-300">{stock.name}</p>
            <p className="text-purple-400 mt-2">Sector: {stock.sector}</p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-bold mb-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              ${(stock.price ?? 0).toFixed(2)}
            </div>
            <div className={`text-xl ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}
              {(stock.change ?? 0).toFixed(2)} ({isPositive ? '+' : ''}
              {(stock.changePercent ?? 0).toFixed(2)}%)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-purple-400 text-sm">Volume</p>
            <p className="text-white text-lg font-semibold">
              {stock.volume.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-purple-400 text-sm">Market Cap</p>
            <p className="text-white text-lg font-semibold">
              ${(stock.marketCap / 1e9).toFixed(2)}B
            </p>
          </div>
          <div>
            <p className="text-purple-400 text-sm">Change</p>
            <p className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}
              {(stock.change ?? 0).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-purple-400 text-sm">Change %</p>
            <p className={`text-lg font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}
              {(stock.changePercent ?? 0).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
          <h2 className="text-2xl font-semibold text-white mb-4">Price History</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#7c3aed" opacity={0.2} />
                <XAxis dataKey="date" stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #7c3aed',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#a78bfa"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {stock.news && stock.news.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
          <h2 className="text-2xl font-semibold text-white mb-4">Recent News</h2>
          <div className="space-y-3">
            {stock.news.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
              >
                <h3 className="text-white font-semibold mb-1">{article.title}</h3>
                <p className="text-purple-400 text-sm">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {comments && comments.length > 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
          <h2 className="text-2xl font-semibold text-white mb-4">Comments</h2>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 bg-slate-700/50 rounded-lg"
              >
                <p className="text-white">{comment.content}</p>
                <p className="text-purple-400 text-sm mt-2">
                  {comment.author} • {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
