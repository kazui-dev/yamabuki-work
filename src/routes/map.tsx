import { createFileRoute } from '@tanstack/react-router'
import Maps from '@/components/map/Maps'

type MapSearch = {
  r?: string;
};

export const Route = createFileRoute('/map')({
  validateSearch: (search: Record<string, unknown>): MapSearch => ({
    r: typeof search.r === 'string' ? search.r : undefined,
  }),
  component: Maps,
})