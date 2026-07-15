import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import Survey from '@/components/survey/Survey'
import { PAGE_METADATA } from '@/constants/metadata'
import { useBackgroundStore } from '@/store/useBackgroundStore'
import bgImage from '@/assets/bg-image.webp'

export const Route = createFileRoute('/survey')({
  head: () => ({
    meta: [
      { title: PAGE_METADATA.survey.title },
      { name: 'description', content: PAGE_METADATA.survey.description },
      { property: 'og:title', content: PAGE_METADATA.survey.ogTitle || PAGE_METADATA.survey.title },
      { property: 'og:description', content: PAGE_METADATA.survey.ogDescription || PAGE_METADATA.survey.description },
      { name: 'twitter:title', content: PAGE_METADATA.survey.ogTitle },
      { name: 'twitter:description', content: PAGE_METADATA.survey.description },
    ],
  scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(PAGE_METADATA.survey.jsonLd),
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const setBackground = useBackgroundStore(state => state.setBackground)
  useEffect(() => {
    setBackground(bgImage)
    return () => setBackground(null)
  }, [setBackground])
  return <Survey />;
}
