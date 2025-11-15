import { getRecaptchaToken, verifyRecaptchaToken } from '@/utils/recaptcha'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/{-$locale}/contact-info')({
    component: ContactInfoPage,
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
            <strong>about</strong> me!
        </div>
    )
}
