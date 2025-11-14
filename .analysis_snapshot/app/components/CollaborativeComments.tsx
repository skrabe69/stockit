import { useState } from 'react'
import { useMutation, useQuery as useConvexQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'

interface Comment {
  _id: string
  symbol: string
  content: string
  author: string
  createdAt: number
}

interface CollaborativeCommentsProps {
  initialComments?: Comment[]
}

export function CollaborativeComments({
  initialComments = [],
}: CollaborativeCommentsProps) {
  const [newComment, setNewComment] = useState({ symbol: '', content: '' })
  const liveComments = useConvexQuery(api.comments.listRecent) || []
  const comments = liveComments.length > 0 ? liveComments : initialComments
  const addComment = useMutation(api.comments.add)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.symbol && newComment.content) {
      await addComment({
        symbol: newComment.symbol.toUpperCase(),
        content: newComment.content,
        author: 'User', // In real app, get from auth
      })
      setNewComment({ symbol: '', content: '' })
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="bg-slate-800/50 rounded-lg p-4 border border-purple-800/30">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Stock Symbol (e.g., AAPL)"
            value={newComment.symbol}
            onChange={(e) =>
              setNewComment({ ...newComment, symbol: e.target.value })
            }
            className="w-full bg-slate-700 border border-purple-800/50 rounded-md px-3 py-2 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Add your comment..."
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            rows={3}
            className="w-full bg-slate-700 border border-purple-800/50 rounded-md px-3 py-2 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-slate-800/50 rounded-lg p-4 border border-purple-800/30"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-purple-300 font-semibold">
                  {comment.symbol}
                </span>
                <span className="text-purple-400 text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-white mb-2">{comment.content}</p>
              <p className="text-purple-400 text-sm">— {comment.author}</p>
            </div>
          ))
        ) : (
          <p className="text-purple-300 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  )
}
