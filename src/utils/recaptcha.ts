import { createServerFn } from '@tanstack/react-start'

export const recaptchaScriptId = 'recaptcha-script'

export async function getRecaptchaToken(action): Promise<string> {
    await waitForRecaptchaScriptLoad()

    if (!(window as any)?.grecaptcha?.enterprise) {
        throw new Error('reCAPTCHA not available')
    }

    const token = await new Promise<string>((resolve) => {
        ;(window as any).grecaptcha.enterprise.ready(async () => {
            resolve(
                await (window as any).grecaptcha.enterprise.execute(
                    import.meta.env.VITE_RECAPTCHA_SITE_KEY,
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
        await verifyRecaptchaTokenCore(recaptchaToken)
        return { ok: true }
    })

function waitForRecaptchaScriptLoad(): Promise<void> {
    return new Promise((resolve, reject) => {
        // Check if grecaptcha is already available
        if ((window as any)?.grecaptcha?.enterprise) {
            resolve()
            return
        }

        // Check if script element exists
        const script = document.getElementById(
            recaptchaScriptId
        ) as HTMLScriptElement

        if (!script) {
            reject(
                new Error(
                    "reCAPTCHA script element not found. Make sure it's defined in route head."
                )
            )
            return
        }

        script.addEventListener('load', () => {
            resolve()
        })
    })
}

export async function verifyRecaptchaTokenCore(recaptchaToken: string) {
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
    const minScore = import.meta.env.RECAPTCHA_MIN_SCORE || 0.7

    if (!data.success || (data.score && data.score < minScore)) {
        throw new Response('Recaptcha failed', { status: 403 })
    }
}
