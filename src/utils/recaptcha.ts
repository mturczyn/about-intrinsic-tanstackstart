import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'

export async function getRecaptchaToken(action): Promise<string> {
    if (!(window as any)?.grecaptcha?.enterprise) {
        throw new Error('reCAPTCHA not available')
    }

    const token = await new Promise<string>((resolve) => {
        ;(window as any).grecaptcha.enterprise.ready(async () => {
            resolve(
                await (window as any).grecaptcha.enterprise.execute(
                    '6Le6eAwsAAAAAMa50QvuVezPhBxtxIZ5QYHbgC0D',
                    { action }
                )
            )
        })
    })

    return token
}

export const verifyRecaptchaToken = createServerFn({ method: 'POST' })
    .inputValidator((recaptchaToken: string) => recaptchaToken)
    .handler(async ({ data: recaptchaToken }) => {
        const secret = process.env.RECAPTCHA_SECRET_KEY!
        const params = new URLSearchParams()
        params.append('secret', secret)
        params.append('response', recaptchaToken)

        const verifyRes = await fetch(
            'https://www.google.com/recaptcha/api/siteverify',
            {
                method: 'POST',
                body: params,
            }
        )
        const data = await verifyRes.json()
        // v3 returns { success, score, action, ... }
        const minScore = 0.8

        if (!data.success || (data.score && data.score < minScore)) {
            throw new Response('Recaptcha failed', { status: 403 })
        }

        return { ok: true }
    })
