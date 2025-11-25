import { SUPPORTED_LANGUAGES } from '.'

export function validateLocale(locale?: string): boolean {
    return !!locale && Object.values(SUPPORTED_LANGUAGES).includes(locale)
}
