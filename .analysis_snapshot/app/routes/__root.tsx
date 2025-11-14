import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
        <nav className="border-b border-purple-800/30 bg-slate-900/70 backdrop-blur-md shadow-lg shadow-purple-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent hover:from-purple-300 hover:via-pink-300 hover:to-purple-400 transition-all duration-300 drop-shadow-lg"
                >
                  💹 Stockit
                </Link>
              </div>
              <div className="flex space-x-6">
                <Link
                  to="/"
                  className="relative text-purple-300 hover:text-purple-100 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-purple-900/30 group"
                  activeProps={{ className: 'text-purple-100 font-semibold' }}
                >
                  <span className="relative z-10">Home</span>
                  <span className="absolute inset-0 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
                <Link
                  to="/recommendations"
                  className="relative text-purple-300 hover:text-purple-100 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-purple-900/30 group"
                  activeProps={{ className: 'text-purple-100 font-semibold' }}
                >
                  <span className="relative z-10">Recommendations</span>
                  <span className="absolute inset-0 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="animate-fade-in">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
