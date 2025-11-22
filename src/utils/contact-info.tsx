import { createServerFn } from '@tanstack/react-start'
import { verifyRecaptchaTokenCore } from './recaptcha'

export const getContactInformation = createServerFn({ method: 'GET' })
    .inputValidator((recaptchaToken: string) => recaptchaToken)
    .handler(async ({ data: recaptchaToken }) => {
        verifyRecaptchaTokenCore(recaptchaToken)
        return {
            phoneNumber: '+48 503 536 506',
            email: 'turek1992@o2.pl',
            linkedIn: 'https://www.linkedin.com/in/michał-turczyn-6851a2117/',
            stackOverflow:
                'https://stackoverflow.com/users/7132550/michał-turczyn',
            github: 'https://github.com/mturczyn',
        }
    })
