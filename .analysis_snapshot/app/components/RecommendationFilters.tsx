interface Filters {
  minScore: number
  sector: string
  riskLevel: string
}

interface RecommendationFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function RecommendationFilters({
  filters,
  onFiltersChange,
}: RecommendationFiltersProps) {
  const sectors = [
    'all',
    'Technology',
    'Finance',
    'Healthcare',
    'Energy',
    'Consumer',
    'Industrial',
  ]

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-purple-800/30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Minimum Score: {filters.minScore}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minScore}
            onChange={(e) =>
              onFiltersChange({ ...filters, minScore: parseInt(e.target.value) })
            }
            className="w-full accent-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Sector
          </label>
          <select
            value={filters.sector}
            onChange={(e) =>
              onFiltersChange({ ...filters, sector: e.target.value })
            }
            className="w-full bg-slate-700 border border-purple-800/50 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector === 'all' ? 'All Sectors' : sector}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Risk Level
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) =>
              onFiltersChange({ ...filters, riskLevel: e.target.value })
            }
            className="w-full bg-slate-700 border border-purple-800/50 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>
    </div>
  )
}
