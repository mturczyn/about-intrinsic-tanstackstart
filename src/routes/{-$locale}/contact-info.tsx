import { AnchorWithNewPage } from '@/components/AnchorWithNewPage'
import { ContactInfoEntry } from '@/components/ContactInfoEntry'
import i18n from '@/i18n'
import { getContactInformation } from '@/utils/contact-info'
import {
    getRecaptchaToken,
    recaptchaScriptId,
    verifyRecaptchaToken,
} from '@/utils/recaptcha'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineEmail } from 'react-icons/md'
import { CiLinkedin } from 'react-icons/ci'
import { BsTelephone } from 'react-icons/bs'
import { FaStackOverflow } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { CiLocationOn } from 'react-icons/ci'

export const Route = createFileRoute('/{-$locale}/contact-info')({
    component: ContactInfoPage,
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
                await verifyRecaptchaTokenFn({ data: token }) // server-only call
                // Here we passed human verification
                setIsHuman(true)
                setLoadingContactInfo(true)
                const info = await getContactInformationFn({ data: token })
                setContactInfo(info)
                setLoadingContactInfo(false)
            } catch (err) {
                console.error(
                    'ContactInfoPage',
                    'recaptcha verification failed:',
                    err
                )
                setIsHuman(false)
            }
        }
        checkHuman()
    }, [])

    if (isHuman === null) {
        return <div>Verifying…</div>
    }

    if (isHuman === false) {
        return (
            <div style={{ color: 'red' }}>
                Access denied (reCAPTCHA verification failed)
            </div>
        )
    }

    if (loadingContactInfo) {
        return <div>Loading contact information…</div>
    }

    if (!contactInfo) {
        return <div>Could not fetch contact information.</div>
    }

    return (
        <header>
            {/* <img src={websiteLogo} alt="Intrinsic Michał Turczyn logo"></img> */}
            <h1>INTRINSIC</h1>
            <div>
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
        </header>
    )
}
