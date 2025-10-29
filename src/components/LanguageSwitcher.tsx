import React from 'react'
import plFlag from '@/images/flags/pl.svg'
import gbFlag from '@/images/flags/gb.svg'
import i18n, { SUPPORTED_LANGUAGES } from '@/i18n'

export default function LanguageSwitcher() {
    return (
        <div className="flex items-center gap-3 justify-end p-2">
            <button
                onClick={() => i18n.changeLanguage(SUPPORTED_LANGUAGES.en)}
                className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 hover:scale-105 transition-transform"
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
        </div>
    )
}
