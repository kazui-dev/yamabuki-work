import { createFileRoute } from '@tanstack/react-router'
import Timetable from '@/components/timetable/Timetable'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  return (
    <Timetable />
  )
}