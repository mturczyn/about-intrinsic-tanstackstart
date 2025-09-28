import { createFileRoute } from '@tanstack/react-router'
import { Home } from '../../components/Home'
import { getCount } from '../../api/counterApi'

export const Route = createFileRoute('/{-$locale}/')({
    component: Home,
    loader: async () => await getCount(),
})
