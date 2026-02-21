import type { PageID } from '@/types';

export type Page = PageID;

export interface HistoryState extends Record<string, unknown> {
  page?: Page;
  room?: string;
  scrollY?: number;
}

export const parsePath = (pathname: string): { page: Page; room?: string } => {
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];

  if (first === 'map') {
    return { page: 'map', room: parts[1] };
  }
  if (first === 'survey') {
    return { page: 'survey' };
  }
  return { page: 'timetable' };
};

export const initHistory = (fallback: Page = 'timetable') => {
  if (window.history.state) {
    return;
  }

  const { page, room } = parsePath(window.location.pathname);
  window.history.replaceState({ page: page ?? fallback, room, scrollY: 0 }, '');
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
  const { page, room } = parsePath(window.location.pathname);

  if (page === 'map' && room === roomId) {
    return;
  }

  const url = `/map/${roomId}`;

  window.history.replaceState(
    {
      ...(window.history.state ?? {}),
      page: 'map',
      room: roomId,
      ...(typeof options?.scrollY === 'number' ? { scrollY: options.scrollY } : {}),
    },
    '',
    url
  );
};