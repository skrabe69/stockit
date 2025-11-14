import { createFileRoute } from '@tanstack/react-router'
import { useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { RecommendationDetail } from '../components/RecommendationDetail'
import { RecommendationFilters } from '../components/RecommendationFilters'
import { useState } from 'react'

export const Route = createFileRoute('/recommendations')({
  component: Recommendations,
})

function Recommendations() {
  const [filters, setFilters] = useState({
    minScore: 0,
    sector: 'all',
    riskLevel: 'all',
  })

  const recommendations = useConvexQuery(api.recommendations.list, {
    filters,
  }) || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
          Stock Recommendations
        </h1>
        <p className="text-xl text-purple-200/90 max-w-2xl mx-auto">
          AI-powered recommendations with detailed analysis
        </p>
      </div>

      <div className="mb-8 animate-slide-in">
        <RecommendationFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="mt-8 space-y-6">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div key={rec._id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <RecommendationDetail recommendation={rec} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-purple-300">No recommendations found matching your filters</p>
              <p className="text-purple-400/70 mt-2">Try adjusting your filters to see more results</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
