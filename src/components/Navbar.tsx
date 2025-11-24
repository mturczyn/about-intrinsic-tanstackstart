import plFlag from '@/images/flags/pl.svg'
import gbFlag from '@/images/flags/gb.svg'
import { SUPPORTED_LANGUAGES } from '@/i18n'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
    const { i18n, t } = useTranslation()

    return (
        <nav className="flex items-center gap-3 justify-end p-2">
            <Link to="/{-$locale}">{t('Home')}</Link>
            <Link to="/{-$locale}/contact-info">{t('Contact info')}</Link>
            <button
                onClick={() => i18n.changeLanguage(SUPPORTED_LANGUAGES.en)}
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
                onClick={() => i18n.changeLanguage(SUPPORTED_LANGUAGES.pl)}
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
