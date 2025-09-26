import * as ReactRouter from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = ReactRouter.createRouter({
    routeTree,
    scrollRestoration: true,
  })

  return router
}