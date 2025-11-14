import { createFileRoute } from '@tanstack/react-router'
import { useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { StockDetailView } from '../components/StockDetailView'

export const Route = createFileRoute('/stock/$symbol')({
  component: StockDetail,
})

function StockDetail() {
  const { symbol } = Route.useParams()
  const stock = useConvexQuery(api.stocks.getBySymbol, { symbol })

  if (!stock) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-purple-300">Loading stock data...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <StockDetailView stock={stock} />
    </div>
  )
}
