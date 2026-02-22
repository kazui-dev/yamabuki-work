import { createFileRoute } from '@tanstack/react-router'
import Survey from '@/components/survey/Survey'

export const Route = createFileRoute('/survey')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Survey />;
}
