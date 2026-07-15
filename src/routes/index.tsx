import { createFileRoute } from '@tanstack/react-router'
import Timetable from '@/components/timetable/Timetable'
import { PAGE_METADATA } from '@/constants/metadata'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: PAGE_METADATA.timetable.title },
      { name: 'description', content: PAGE_METADATA.timetable.description },
      { property: 'og:title', content: PAGE_METADATA.timetable.ogTitle || PAGE_METADATA.timetable.title },
      { property: 'og:description', content: PAGE_METADATA.timetable.ogDescription || PAGE_METADATA.timetable.description },
      { name: 'twitter:title', content: PAGE_METADATA.timetable.ogTitle },
      { name: 'twitter:description', content: PAGE_METADATA.timetable.description },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(PAGE_METADATA.timetable.jsonLd),
      },
    ],
  }),
  component: IndexPage,
})

function IndexPage() {
  return <Timetable />
}