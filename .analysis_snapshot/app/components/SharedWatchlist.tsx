import { Link } from '@tanstack/react-router'

interface Watchlist {
  _id: string
  name: string
  symbols: string[]
  owner: string
  shared: boolean
  updatedAt: number
}

interface SharedWatchlistProps {
  watchlist: Watchlist
}

export function SharedWatchlist({ watchlist }: SharedWatchlistProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-purple-800/30">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{watchlist.name}</h3>
          <p className="text-sm text-purple-400">by {watchlist.owner}</p>
        </div>
        {watchlist.shared && (
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
            Shared
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {watchlist.symbols.map((symbol) => (
          <Link
            key={symbol}
            to="/stock/$symbol"
            params={{ symbol }}
            className="px-3 py-1 bg-purple-800/30 text-purple-300 rounded hover:bg-purple-700/50 transition-colors text-sm"
          >
            {symbol}
          </Link>
        ))}
      </div>
      <p className="text-xs text-purple-400 mt-3">
        Updated: {new Date(watchlist.updatedAt).toLocaleString()}
      </p>
    </div>
  )
}
