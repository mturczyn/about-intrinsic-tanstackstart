import { type FileRouteTypes } from '@/routeTree.gen'
import { Sitemap } from 'tanstack-router-sitemap'

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes['fullPaths']

const localeSlug = '{-$locale}'
// Define your routes as a simple array
const routePaths: TRoutes[] = ['/{-$locale}', '/{-$locale}/about']

// Helper function
const generateLocalizedRoutes = (
    routeKey: string,
    options: {
        priority?: number
        changeFrequency?:
            | 'always'
            | 'hourly'
            | 'daily'
            | 'weekly'
            | 'monthly'
            | 'yearly'
            | 'never'
        supportedLocales?: string[]
    } = {}
) => {
    const {
        priority = 0.8,
        changeFrequency = 'daily',
        supportedLocales = ['en', 'pl'],
    } = options

    return supportedLocales.map((locale) => ({
        path: routeKey.replace(localeSlug, `${locale}`),
        priority,
        changeFrequency,
    }))
}

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
    siteUrl: 'https://intrinsic-michal-turczyn.turek1992.workers.dev',
    defaultPriority: 0.5,
    routes: Object.fromEntries(
        routePaths.map((path) => [path, () => generateLocalizedRoutes(path)])
    ),
}
