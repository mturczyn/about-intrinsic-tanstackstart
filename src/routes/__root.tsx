import { useEffect, type ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
    useRouter,
} from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { setSsrLanguage } from '../i18n'
import appCss from '@/styles/app.css?url'

export const Route = createRootRoute({
    beforeLoad: async () => {
        await setSsrLanguage()
    },
    head: () => ({
        meta: [
            {
                charSet: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                title: 'TanStack Start Starter',
            },
        ],
        links: [
            {
                rel: 'icon',
                href: '/favicon.ico',
            },
            // {
            //     rel: 'preload',
            //     href: appCss,
            //     as: 'style',
            // },
            {
                rel: 'stylesheet',
                href: appCss,
            },
        ],
    }),
    component: RootComponent,
})

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    const { i18n } = useTranslation()
    const router = useRouter()

    useEffect(() => {
        const handler = () => {
            router.invalidate()
        }
        i18n.on('languageChanged', handler)
        return () => {
            i18n.off('languageChanged', handler)
        }
    }, [router])
    return (
        <html lang={i18n.language}>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    )
}
