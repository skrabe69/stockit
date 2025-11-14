import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routes/routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const convexUrl = import.meta.env.VITE_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export default function Root() {
  if (!convex) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Convex Not Configured</h1>
          <p className="text-purple-300 mb-4">
            Please set up Convex and add VITE_CONVEX_URL to your .env file
          </p>
          <ol className="text-left text-sm space-y-2 text-purple-200">
            <li>1. Run: <code className="bg-slate-800 px-2 py-1 rounded">npx convex dev</code></li>
            <li>2. Copy the deployment URL</li>
            <li>3. Create a <code className="bg-slate-800 px-2 py-1 rounded">.env</code> file with: <code className="bg-slate-800 px-2 py-1 rounded">VITE_CONVEX_URL=https://your-url.convex.cloud</code></li>
            <li>4. Restart the dev server</li>
          </ol>
        </div>
      </div>
    )
  }

  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConvexProvider>
  )
}
