import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chat"!</div>
}
