import { JSX, ReactNode } from 'react'

export const ContactInfoEntry = ({
    children,
    icon,
}: {
    children: ReactNode
    icon: JSX.Element
}) => {
    return (
        <div className="flex place-items-center [&_svg]:h-7 [&_svg]:w-7 gap-5">
            {icon}
            <div>{children}</div>
        </div>
    )
}
