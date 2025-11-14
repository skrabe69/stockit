import { createFileRoute } from '@tanstack/react-router'
import { useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { SharedWatchlist } from '../components/SharedWatchlist'
import { CollaborativeComments } from '../components/CollaborativeComments'

export const Route = createFileRoute('/collaborate')({
  component: Collaborate,
})

function Collaborate() {
  const watchlists = useConvexQuery(api.watchlists.list) || []
  const comments = useConvexQuery(api.comments.listRecent) || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Collaborative Tools
        </h1>
        <p className="text-purple-200">
          Share watchlists and discuss stocks in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Shared Watchlists
          </h2>
          {watchlists && watchlists.length > 0 ? (
            <div className="space-y-4">
              {watchlists.map((watchlist) => (
                <SharedWatchlist key={watchlist._id} watchlist={watchlist} />
              ))}
            </div>
          ) : (
            <p className="text-purple-300">No shared watchlists yet...</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Recent Comments
          </h2>
          <CollaborativeComments initialComments={comments} />
        </div>
      </div>
    </div>
  )
}
