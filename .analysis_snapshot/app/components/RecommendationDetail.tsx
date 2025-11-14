import { Link } from '@tanstack/react-router'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Recommendation {
  _id: string
  symbol: string
  name: string
  score: number
  reasoning: string
  riskLevel: 'low' | 'medium' | 'high'
  sector: string
  priceHistory: Array<{ date: number; price: number }>
  createdAt: number
}

interface RecommendationDetailProps {
  recommendation: Recommendation
}

export function RecommendationDetail({ recommendation }: RecommendationDetailProps) {
  const scoreColor =
    recommendation.score >= 80
      ? 'text-green-400'
      : recommendation.score >= 60
      ? 'text-yellow-400'
      : 'text-red-400'

  const riskColor =
    recommendation.riskLevel === 'low'
      ? 'bg-green-500/20 text-green-400'
      : recommendation.riskLevel === 'medium'
      ? 'bg-yellow-500/20 text-yellow-400'
      : 'bg-red-500/20 text-red-400'

  const chartData = recommendation.priceHistory.map((point) => ({
    date: new Date(point.date).toLocaleDateString(),
    price: point.price,
  }))

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-800/30">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Link
            to="/stock/$symbol"
            params={{ symbol: recommendation.symbol }}
            className="text-2xl font-bold text-white hover:text-purple-300 transition-colors"
          >
            {recommendation.symbol}
          </Link>
          <p className="text-purple-300">{recommendation.name}</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${scoreColor}`}>
            {recommendation.score}/100
          </div>
          <div className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${riskColor}`}>
            {recommendation.riskLevel.toUpperCase()} RISK
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-purple-200">{recommendation.reasoning}</p>
      </div>

      {chartData.length > 0 && (
        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
              <Line
                type="monotone"
                dataKey="price"
                stroke="#a78bfa"
                strokeWidth={2}
                dot={{ fill: '#a78bfa', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-purple-400">
        <span>Sector: {recommendation.sector}</span>
        <span>Generated: {new Date(recommendation.createdAt).toLocaleString()}</span>
      </div>
    </div>
  )
}
