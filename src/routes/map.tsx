import { createFileRoute } from '@tanstack/react-router'
import Maps from '@/components/map/Maps'
import { PAGE_METADATA } from '@/constants/metadata'

type MapSearch = {
  r?: string | number;
};

export const Route = createFileRoute('/map')({
  validateSearch: (search: Record<string, unknown>): MapSearch => ({
    r: search.r as string | number | undefined,
  }),
  head: () => ({
    meta: [
      { title: PAGE_METADATA.map.title },
      { name: 'description', content: PAGE_METADATA.map.description },
      { property: 'og:title', content: PAGE_METADATA.map.ogTitle || PAGE_METADATA.map.title },
      { property: 'og:description', content: PAGE_METADATA.map.ogDescription || PAGE_METADATA.map.description },
      { property: 'og:url', content: 'https://yamabuki.work/map' }, 
      { name: 'twitter:title', content: PAGE_METADATA.map.ogTitle },
      { name: 'twitter:description', content: PAGE_METADATA.map.description },
    ],
    links: [
      { rel: 'canonical', href: 'https://yamabuki.work/map' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(PAGE_METADATA.map.jsonLd),
      },
    ],
  }),
  component: Maps,
})