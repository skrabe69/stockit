import { renderToString } from 'react-dom/server'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routes/routeTree.gen'

export async function render(url: string) {
  const router = createRouter({ routeTree })
  router.update({ location: url })
  await router.load()

  const html = renderToString(<RouterProvider router={router} />)

  return {
    html,
    router,
  }
}
