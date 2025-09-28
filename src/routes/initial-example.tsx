import { createFileRoute } from '@tanstack/react-router'
import { getCount } from '../api/counterApi'
import { InitialExample } from '../components/InitialExample'

export const Route = createFileRoute('/initial-example')({
    component: InitialExample,
    loader: async () => await getCount(),
})
