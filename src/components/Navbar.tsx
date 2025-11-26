import plFlag from '@/images/flags/pl.svg'
import gbFlag from '@/images/flags/gb.svg'
import { SUPPORTED_LANGUAGES } from '@/i18n'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { validateLocale } from '@/i18n/validateLocale'

export default function Navbar() {
    const { i18n, t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLanguageChange = (newLocale: string) => {
        const [_, ...path] = location.pathname.slice(1).split('/')

        // Validate the new locale, default to 'en' if invalid
        if (!validateLocale(newLocale)) {
            newLocale = 'en'
        }

        navigate({ to: `/${newLocale}/${path.join('/')}`, replace: true })
        // Also update i18n
        i18n.changeLanguage(newLocale)
        // Navigation + language change should handle it, no need to invalidate
        // router comes from useRouter hook
        // router.invalidate()
    }

    return (
        <nav className="flex items-center gap-3 justify-end p-2">
            <Link to="/{-$locale}">{t('Home')}</Link>
            <Link to="/{-$locale}/contact-info">{t('Contact info')}</Link>

            <button
                onClick={() => handleLanguageChange(SUPPORTED_LANGUAGES.en)}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:scale-105 transition-transform ml-auto"
                title="English"
            >
                <img
                    src={gbFlag}
                    alt="English"
                    className="w-full h-full object-cover"
                />
            </button>

            <button
                onClick={() => handleLanguageChange(SUPPORTED_LANGUAGES.pl)}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:scale-105 transition-transform"
                title="Polski"
            >
                <img
                    src={plFlag}
                    alt="Polski"
                    className="w-full h-full object-cover"
                />
            </button>
        </nav>
    )
}
