import { createServerFn } from '@tanstack/react-start'
import { verifyRecaptchaTokenCore } from './recaptcha'
import { setResponseStatus } from '@tanstack/react-start/server'

export const getContactInformation = createServerFn({ method: 'GET' })
    .inputValidator((recaptchaToken: string) => recaptchaToken)
    .handler(async ({ data: recaptchaToken }) => {
        const success = verifyRecaptchaTokenCore(recaptchaToken)

        if (!success) {
            setResponseStatus(403)
            throw new Error('reCAPTCHA verification failed')
        }

        return {
            phoneNumber: '+48 503 536 506',
            email: 'turek1992@o2.pl',
            linkedIn: 'https://www.linkedin.com/in/michał-turczyn-6851a2117/',
            stackOverflow:
                'https://stackoverflow.com/users/7132550/michał-turczyn',
            github: 'https://github.com/mturczyn',
        }
    })
