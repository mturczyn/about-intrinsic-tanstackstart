import { useRouter } from '@tanstack/react-router'
import { Route } from '../routes/{-$locale}'
import { updateCount } from '../api/counterApi'

export function InitialExample() {
    const router = useRouter()
    const state = Route.useLoaderData()

    return (
        <button
            onClick={() => {
                updateCount({ data: 1 }).then(() => {
                    router.invalidate()
                })
            }}
        >
            Add 1 to {state}
        </button>
    )
}
