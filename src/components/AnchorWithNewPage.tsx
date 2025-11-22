import React from 'react'

export const AnchorWithNewPage = ({
    children,
    href,
}: {
    children: React.ReactNode
    href: string
}) => {
    return (
        <a target="_blank" rel="noopener noreferrer" href={href}>
            {children}
        </a>
    )
}
