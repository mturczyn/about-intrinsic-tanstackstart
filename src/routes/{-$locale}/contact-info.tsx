import i18n from '@/i18n'
import { getRecaptchaToken, verifyRecaptchaToken } from '@/utils/recaptcha'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/{-$locale}/contact-info')({
    component: ContactInfoPage,
    head: () => {
        const title = i18n.t(
            'Intrinsic | Web Development and Programming | Contact info'
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
            ],
            scripts: [
                {
                    // async: true,
                    // defer: true,
                    src: `https://www.google.com/recaptcha/enterprise.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`,
                },
            ],
        }
    },
})

function ContactInfoPage() {
    const [authorized, setAuthorized] = useState<null | boolean>(null)

    const verifyRecaptchaTokenFn = useServerFn(verifyRecaptchaToken)

    useEffect(() => {
        async function run() {
            try {
                const token = await getRecaptchaToken('visit_contact_info')
                await verifyRecaptchaTokenFn({ data: token }) // server-only call
                setAuthorized(true)
            } catch (err) {
                console.error(
                    'ContactInfoPage',
                    'recaptcha verification failed:',
                    err
                )
                setAuthorized(false)
            }
        }
        run()
    }, [])

    if (authorized === null) {
        return <div>Verifying…</div>
    }

    if (authorized === false) {
        return (
            <div style={{ color: 'red' }}>
                Access denied (reCAPTCHA verification failed)
            </div>
        )
    }

    return (
        <div>
            <strong>About</strong> me!
        </div>
    )
}
