import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact-info')({
    component: () => (
        <div>
            <strong>about</strong> me!
        </div>
    ),
})
