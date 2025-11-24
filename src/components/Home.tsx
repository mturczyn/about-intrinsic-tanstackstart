import arcelorMittal from '@/images/employers-logos/arcelormittal.png?small'
import flightScope from '@/images/employers-logos/Flightscope.webp?small'
import exadel from '@/images/employers-logos/exadel.png?small'
import rite from '@/images/employers-logos/rite-nrg.png?small'
import rac from '@/images/employers-logos/rac.png?small'
import rsm from '@/images/employers-logos/rsm.png?small'
import ocuco from '@/images/employers-logos/ocuco-logo.png?small'
import cSharpLogoHash from '@/images/programming-languages-logo/c-sharp-hash.png?small'
import cSharpLogoWithoutHash from '@/images/programming-languages-logo/c-sharp-without-hash.png?small'
import jsLogo from '@/images/programming-languages-logo/js-logo.webp?small'
import reactLogo from '@/images/react-logo.svg?small'
import { Trans, useTranslation } from 'react-i18next'
import authorImage100 from '@/images/author-image.jpg?small'
import authorImage200 from '@/images/author-image.jpg?medium'
import authorImage400 from '@/images/author-image.jpg?big'
import authorImage from '@/images/author-image.jpg'
import { Link } from '@tanstack/react-router'

export const Home = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className="[&_p]:my-4 [&_p]:mx-4 [&_h1]:mx-4 [&_p]:leading-7">
                <header className="bg-[rgb(255,255,255)]">
                    <img
                        src={`${authorImage400}`}
                        srcSet={`
                            ${authorImage100} 400w,
                            ${authorImage200} 800w,
                            ${authorImage400} 1600w,
                            ${authorImage}
                        `}
                        sizes="(max-width: 640px) 80vw, 
                               (max-width: 1024px) 50vw, 
                               30vw"
                        alt="Author"
                        className="rounded-[10%] w-[30%] float-right m-6 mr-8 pointer-events-none"
                    />
                    <h1>{t('helloWithIntro')}</h1>
                    <p>{t('homePageIntroduction.firstPara')}</p>
                    <p>{t('homePageIntroduction.secondPara')}</p>

                    <div className="float-left m-6 w-[30%] grid place-items-center grid-cols-[2fr_1fr] grid-rows-2 [grid-template-areas:'csharp_js'_'csharp_react']">
                        <div className="relative [grid-area:csharp]">
                            <img
                                src={`${cSharpLogoWithoutHash}`}
                                alt="C#"
                                className="w-full h-full object-contain"
                            />
                            <img
                                src={`${cSharpLogoHash}`}
                                alt="C# hash"
                                className="absolute h-[20%] left-[72%] top-[40%] animate-[rotateY_7s_infinite_linear]"
                            />
                        </div>
                        <img
                            src={`${jsLogo}`}
                            alt="JavaScript"
                            className="w-full h-full object-contain [grid-area:js]"
                        />
                        <div className="[grid-area:react] m-[0.7ch]">
                            <img
                                src={`${reactLogo}`}
                                alt="React"
                                className="w-full h-full object-contain animate-[rotateZ_7s_infinite_linear]"
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
                            <a
                                href="https://intrinsic-michal-turczyn.azurewebsites.net"
                                rel="noopener"
                                target="_blank"
                            ></a>
                        </p>
                    </Trans>
                </header>

                <h1 className="mx-4 my-4">{t('pastEmployers')}</h1>
                <p>
                    {t(
                        'I have worked for following companies throughout my career:'
                    )}
                </p>
                <div className="w-full overflow-x-hidden whitespace-nowrap overflow-y-visible relative before:absolute before:top-0 before:left-0 before:w-[250px] before:h-full before:content-[''] before:z-2 before:bg-linear-to-l before:from-[rgb(255,255,255,0)] before:to-[rgb(255,255,255,1)] after:absolute after:top-0 after:right-0 after:w-[250px] after:h-full after:content-[''] after:z-2 after:bg-linear-to-r after:from-[rgb(255,255,255,0)] after:to-[rgb(255,255,255,1)]">
                    <EmployersLogos />
                    <EmployersLogos />
                </div>
            </div>
        </>
    )
}

const EmployersLogos = () => (
    <ul
        role="list"
        className="min-w-full flex-row flex-nowrap inline-flex justify-around items-center animate-[slide_20s_infinite_linear] overflow-y-visible *:inline *:flex-[1_1_auto] [&_img]:brightness-125 [&_img]:max-h-[20vh] [&_img]:max-w-[200px] [&_img]:mx-10 [&_img]:my-0"
    >
        <li>
            <img src={`${ocuco}`} alt="Ocuco" />
        </li>
        <li>
            <img src={`${arcelorMittal}`} alt="ArcelorMittal" />
        </li>
        <li>
            <img src={`${flightScope}`} alt="FlightScope" />
        </li>
        <li>
            <img src={`${exadel}`} alt="Exadel" />
        </li>
        <li>
            <img src={`${rite}`} alt="RiteNRG" />
        </li>
        <li>
            <img src={`${rsm}`} alt="RSM" />
        </li>
        <li>
            <img src={`${rac}`} alt="RAC" />
        </li>
    </ul>
)
