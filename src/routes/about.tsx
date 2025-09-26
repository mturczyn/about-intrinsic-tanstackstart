import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    component: () => (
        <div>
            <strong>about</strong> me!
        </div>
    ),
})
