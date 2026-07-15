import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},

    //scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: 'intent',
    defaultNotFoundComponent: () => (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">404 - ページが見つかりません</h1>
      </div>
    ),
  })

  return router
}
