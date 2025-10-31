import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { generateSitemap } from 'tanstack-router-sitemap'
import { sitemap } from './src/utils/sitemap'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        viteTsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        generateSitemap(sitemap),
        imagetools({
            defaultDirectives: (url) => {
                if (url.searchParams.has('small')) {
                    return new URLSearchParams('w=100&format=webp')
                }
                if (url.searchParams.has('medium')) {
                    return new URLSearchParams('w=200&format=webp')
                }
                if (url.searchParams.has('big')) {
                    return new URLSearchParams('w=400&format=webp')
                }
                return new URLSearchParams()
            },
        }),
        cloudflare({ viteEnvironment: { name: 'ssr' } }),
        tsConfigPaths({}),
        tanstackStart({}),
        // react's vite plugin must come after start's vite plugin
        viteReact(),
        tailwindcss({}),
    ],
})
