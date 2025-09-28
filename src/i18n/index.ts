import { en } from './en'
import { pl } from './pl'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'

export const SUPPORTED_LANGUAGES = { pl: 'pl-PL', en: 'en-US' }

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
    [SUPPORTED_LANGUAGES.pl]: {
        translation: pl,
    },
    [SUPPORTED_LANGUAGES.en]: {
        translation: en,
    },
}

const i18CookieName = 'intrinsic-language'
i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: SUPPORTED_LANGUAGES.en,
        supportedLngs: Object.values(SUPPORTED_LANGUAGES), // add your supported languages
        debug: true,
        interpolation: {
            escapeValue: false, // react already escapes
        },
        // backend: {
        //     loadPath: '/locales/{{lng}}/{{ns}}.json',
        // },
        react: {
            useSuspense: false,
        },
        detection: {
            order: ['path'],
            lookupFromPathIndex: 0,
        },
    })

// export const setSsrLanguage = createIsomorphicFn().server(async () => {
//     const language = getCookie(i18CookieName)
//     await i18n.changeLanguage(language || SUPPORTED_LANGUAGES.en)
// })

export default i18n
