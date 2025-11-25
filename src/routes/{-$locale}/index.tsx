import { createFileRoute, redirect } from '@tanstack/react-router'
import { Home } from '../../components/Home'
import { validateLocale } from '@/i18n/validateLocale'
// import { getCount } from '../../api/counterApi'

export const Route = createFileRoute('/{-$locale}/')({
    component: Home,
    // loader: async () => await getCount(),
    beforeLoad: async ({ params }) => {
        if (!validateLocale(params.locale)) {
            throw redirect({
                to: '/{-$locale}',
                params: { locale: 'en' },
            })
        }
    },
})
