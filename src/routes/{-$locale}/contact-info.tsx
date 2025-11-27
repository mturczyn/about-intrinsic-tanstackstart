import { AnchorWithNewPage } from '@/components/AnchorWithNewPage'
import { ContactInfoEntry } from '@/components/ContactInfoEntry'
import i18n from '@/i18n'
import { getContactInformation } from '@/utils/contact-info'
import {
    getRecaptchaToken,
    recaptchaScriptId,
    verifyRecaptchaToken,
} from '@/utils/recaptcha'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineEmail } from 'react-icons/md'
import { CiLinkedin } from 'react-icons/ci'
import { BsTelephone } from 'react-icons/bs'
import { FaStackOverflow } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'
import { validateLocale } from '@/i18n/validateLocale'
import websiteLogo from '@/images/website-logo-white.svg'
import { BounceLoader } from '@/components/BounceLoader'

export const Route = createFileRoute('/{-$locale}/contact-info')({
    component: ContactInfoPage,
    beforeLoad: async ({ params }) => {
        if (!validateLocale(params.locale)) {
            throw redirect({
                to: '/{-$locale}/contact-info',
                params: { locale: 'en' },
            })
        }
    },
    head: () => {
        const title = i18n.t(
            'Intrinsic | Web Development and Programming | Contact info'
        )
        return {
            meta: [
                {
                    charSet: 'utf-8',
                },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                {
                    title: title,
                },
                {
                    name: 'og:title',
                    content: title,
                },
                {
                    name: 'twitter:title',
                    content: title,
                },
            ],
            links: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
            ],
            scripts: [
                {
                    id: recaptchaScriptId,
                    // async: true,
                    // defer: true,
                    src: `https://www.google.com/recaptcha/enterprise.js?render=${import.meta.env.VITE_RECAPTCHA_SITE_KEY}`,
                },
            ],
        }
    },
})

function ContactInfoPage() {
    const [loadingContactInfo, setLoadingContactInfo] = useState(true)
    const [isHuman, setIsHuman] = useState<null | boolean>(null)
    const [contactInfo, setContactInfo] = useState<null | Awaited<
        ReturnType<typeof getContactInformation>
    >>(null)

    const verifyRecaptchaTokenFn = useServerFn(verifyRecaptchaToken)
    const getContactInformationFn = useServerFn(getContactInformation)
    const { t } = useTranslation()

    // const { data, isPending, error } = useQuery({
    //     queryKey: ['contactInformation'],
    //     queryFn: (token: string) => getContactInformationFn({ data: token }),
    // })

    useEffect(() => {
        async function checkHuman() {
            try {
                const token = await getRecaptchaToken('visit_contact_info')
                const { ok: success } = await verifyRecaptchaTokenFn({
                    data: token,
                }) // server-only call
                // Here we passed human verification
                setIsHuman(success)
                if (!success) {
                    console.error(
                        'ContactInfoPage',
                        'recaptcha verification failed'
                    )
                    return
                }
                setLoadingContactInfo(true)
                const info = await getContactInformationFn({ data: token })
                setContactInfo(info)
                setLoadingContactInfo(false)
            } catch (err) {
                setIsHuman(false)
                setLoadingContactInfo(false)
            }
        }
        checkHuman()
    }, [])

    if (isHuman === null) {
        return (
            <div className="grid gap-4 place-items-center mt-10">
                <BounceLoader />
                {t('verifyingRecaptcha')}
            </div>
        )
    }

    if (isHuman === false) {
        return (
            <div className="text-red-600 text-center mt-10">
                {t('recaptchaFailedAccessDenied')}
            </div>
        )
    }

    if (loadingContactInfo) {
        return (
            <div className="grid gap-4 place-items-center mt-10">
                <BounceLoader />
                <div>{t('loadingContactInformation')}</div>
            </div>
        )
    }

    if (!contactInfo) {
        return (
            <div className="text-red-600 text-center mt-10">
                {t('couldNotFetchContactInformation')}
            </div>
        )
    }

    return (
        <header className="grid grid-cols-[auto_auto] grid-rows-[2fr_1fr] gap-10 py-10">
            <img
                src={websiteLogo}
                className="drop-shadow-[0_0_25px_rgb(0_0_0/1)] h-full place-self-center"
                alt="Intrinsic Michał Turczyn logo"
            ></img>
            <div className="flex flex-col align-stretch row-span-2 h-full *:flex-1">
                <ContactInfoEntry icon={<BsTelephone />}>
                    <a href={`tel:${contactInfo.phoneNumber.replace(' ', '')}`}>
                        {contactInfo.phoneNumber}
                    </a>
                </ContactInfoEntry>
                <ContactInfoEntry icon={<MdOutlineEmail />}>
                    <a href={`mailto:${contactInfo.email}`}>
                        {contactInfo.email}
                    </a>
                </ContactInfoEntry>
                <ContactInfoEntry icon={<CiLocationOn />}>
                    Zabrze, {t('Poland')}
                </ContactInfoEntry>
                <ContactInfoEntry icon={<CiLinkedin />}>
                    <AnchorWithNewPage href={contactInfo.linkedIn}>
                        linkedin.com
                    </AnchorWithNewPage>
                </ContactInfoEntry>
                <ContactInfoEntry icon={<FaStackOverflow />}>
                    <AnchorWithNewPage href={contactInfo.stackOverflow}>
                        stackoverflow.com
                    </AnchorWithNewPage>
                </ContactInfoEntry>
                <ContactInfoEntry icon={<FaGithub />}>
                    <AnchorWithNewPage href={contactInfo.github}>
                        github.com
                    </AnchorWithNewPage>
                </ContactInfoEntry>
            </div>
            <h1 className="text-shadow-[0_0_25px_rgb(0_0_0/1)] text-white place-self-center">
                INTRINSIC
            </h1>
        </header>
    )
}
