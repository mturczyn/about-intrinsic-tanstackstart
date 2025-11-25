import { useEffect, type ReactNode } from 'react'
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
    useRouter,
    Link,
    useLocation,
    useNavigate,
} from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import i18n, { setSsrLanguage } from '@/i18n'
import appCss from '@/styles/app.css?url'
import Navbar from '@/components/Navbar'

export const Route = createRootRoute({
    beforeLoad: async () => {
        await setSsrLanguage()
    },
    head: () => {
        const title = i18n.t(
            'Intrinsic | Web Development and Programming | Zabrze'
        )
        return {
            meta: [
                {
                    charSet: 'utf-8',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    title: title,
                },
                {
                    name: 'og:title',
                    content: title,
                },
                {
                    name: 'twitter:title',
                    content: title,
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
        }
    },
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

    // const location = useLocation()
    // const navigate = useNavigate()

    const handleLanguageChange = (lang: string) => {
        // const [language, ...path] = location.pathname.slice(1).split('/')
        // console.log('location', location)
        // console.log('lang', lang)
        // console.log('language', language)
        // console.log('path', path)
        // console.log('`/${lang}/${path.join(/)}`', `/${lang}/${path.join('/')}`)

        // navigate({ to: `/${lang}/${location.pathname}`, replace: true })
        router.invalidate()
    }

    useEffect(() => {
        i18n.on('languageChanged', handleLanguageChange)
        return () => {
            i18n.off('languageChanged', handleLanguageChange)
        }
    }, [router])

    return (
        <html lang={i18n.language}>
            <head>
                <HeadContent />
            </head>
            <body>
                <Navbar />
                {children}
                <Scripts />
            </body>
        </html>
    )
}
