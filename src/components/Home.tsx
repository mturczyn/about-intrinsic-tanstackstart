import authorImage from '@/images/author-image.jpg'
import arcelorMittal from '@/images/employers-logos/arcelormittal.png'
import flightScope from '@/images/employers-logos/Flightscope.webp'
import exadel from '@/images/employers-logos/exadel.png'
import rite from '@/images/employers-logos/rite-nrg.png'
import rac from '@/images/employers-logos/rac.png'
import rsm from '@/images/employers-logos/rsm.png'
import ocuco from '@/images/employers-logos/ocuco-logo.png'
import cSharpLogoHash from '@/images/programming-languages-logo/c-sharp-hash.png'
import cSharpLogoWithoutHash from '@/images/programming-languages-logo/c-sharp-without-hash.png'
import jsLogo from '@/images/programming-languages-logo/js-logo.webp'
import reactLogo from '@/images/react-logo.svg'
import { Trans, useTranslation } from 'react-i18next'
import i18n, { SUPPORTED_LANGUAGES } from '@/i18n'

export const Home = () => {
    const { t } = useTranslation()

    const setLanguage = () => {
        const lng =
            SUPPORTED_LANGUAGES.en === i18n.language
                ? SUPPORTED_LANGUAGES.pl
                : SUPPORTED_LANGUAGES.en
        i18n.changeLanguage(lng)
    }

    return (
        <>
            <div>
                <button onClick={setLanguage}>
                    Change language (current: {i18n.language})
                </button>
                <header className="home-header">
                    <img
                        src={authorImage}
                        alt="Author"
                        className="author-image"
                    />
                    <h1>{t('helloWithIntro')}</h1>
                    <p>{t('homePageIntroduction.firstPara')}</p>
                    <p>{t('homePageIntroduction.secondPara')}</p>

                    <div className={'programming-languages'}>
                        <div className="csharp">
                            <img
                                src={cSharpLogoWithoutHash}
                                alt="C#"
                                className="c-sharp"
                            />
                            <img
                                src={cSharpLogoHash}
                                alt="C# hash"
                                className="c-sharp-hash"
                            />
                        </div>
                        <img src={jsLogo} alt="JavaScript" className="js" />
                        <div>
                            <img
                                src={reactLogo}
                                alt="React"
                                className="react"
                            />
                        </div>
                    </div>

                    <p>{t('homePageIntroduction.thirdPara')}</p>
                    <Trans i18nKey="homePageIntroduction.fourthPara">
                        <p>
                            <a
                                href="https://about-intrinsic-nextjs.vercel.app"
                                rel="noopener"
                                target="_blank"
                            ></a>
                        </p>
                    </Trans>
                </header>

                <h1>{t('pastEmployers')}</h1>
                <p>
                    {t(
                        'I have worked for following companies throughout my career:'
                    )}
                </p>
                <div className="logos">
                    <EmployersLogos />
                    <EmployersLogos />
                </div>
            </div>
        </>
    )
}

const EmployersLogos = () => (
    <ul role="list" className="logos-slide">
        <li>
            <img src={ocuco} alt="Ocuco" />
        </li>
        <li>
            <img src={arcelorMittal} alt="ArcelorMittal" />
        </li>
        <li>
            <img src={flightScope} alt="FlightScope" />
        </li>
        <li>
            <img src={exadel} alt="Exadel" />
        </li>
        <li>
            <img src={rite} alt="RiteNRG" />
        </li>
        <li>
            <img src={rsm} alt="RSM" />
        </li>
        <li>
            <img src={rac} alt="RAC" />
        </li>
    </ul>
)
