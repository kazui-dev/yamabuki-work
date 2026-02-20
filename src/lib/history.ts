import type { PageID } from '@/types';

export type Page = PageID;

export interface HistoryState extends Record<string, unknown> {
  page?: Page;
  room?: string;
  scrollY?: number;
}

const parsePage = (value: unknown): Page | undefined => {
  if (value === 'timetable' || value === 'map' || value === 'survey') {
    return value;
  }
  return undefined;
};

export const pageFromSearch = (search: string): Page | undefined => {
  const raw = new URLSearchParams(search).get('page');
  return parsePage(raw);
};

export const roomFromSearch = (search: string): string | undefined => {
  const room = new URLSearchParams(search).get('room');
  return room ?? undefined;
};

export const initHistory = (fallback: Page = 'timetable') => {
  if (window.history.state) {
    return;
  }

  const page = pageFromSearch(window.location.search) ?? fallback;
  window.history.replaceState({ page, scrollY: 0 }, '');
};

export const saveScroll = () => {
  window.history.replaceState(
    { ...(window.history.state ?? {}), scrollY: window.scrollY },
    ''
  );
};

export const pushPage = (page: Page, url: string, scrollY: number) => {
  window.history.pushState({ page, scrollY }, '', url);
};

export const syncMapRoom = (roomId: string, options?: { scrollY?: number }) => {
  const url = new URL(window.location.href);
  const currentUrlRoom = url.searchParams.get('room');

  if (currentUrlRoom === roomId) {
    return;
  }

  url.searchParams.set('page', 'map');
  url.searchParams.set('room', roomId);

  window.history.replaceState(
    {
      ...(window.history.state ?? {}),
      page: 'map',
      room: roomId,
      ...(typeof options?.scrollY === 'number' ? { scrollY: options.scrollY } : {}),
    },
    '',
    url.toString()
  );
};