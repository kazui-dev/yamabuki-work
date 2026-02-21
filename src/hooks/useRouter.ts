import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
  initHistory,
  parsePath,
  saveScroll,
  pushPage,
  type HistoryState,
} from '@/lib/history';
import type { PageID } from '@/types';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type RouterOptions = {
  initialPage?: PageID;
  initialPath?: string;
};

export const useRouter = (options: RouterOptions = {}) => {
  const { initialPage, initialPath } = options;
  
  const getInitialPage = (): PageID => {
    if (initialPage) return initialPage;
    if (typeof window !== 'undefined') {
      return parsePath(window.location.pathname, window.location.search).page;
    }
    return 'timetable';
  };

  const [currentPage, setCurrentPage] = useState<PageID>(getInitialPage);
  const scrollPositions = useRef<{ timetable: number; map: number; survey: number }>({ timetable: 0, map: 0, survey: 0 });
  
  const parseInitial = () => {
    if (!initialPath) return { page: getInitialPage(), room: undefined };
    const [path, search] = initialPath.split('?');
    return parsePath(path, search ? `?${search}` : '');
  };

  const initialMapParams = initialPath && parseInitial().page === 'map' ? initialPath : '';
  const mapParams = useRef<string>(initialMapParams);
  
  useIsomorphicLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const { page: pageFromUrl } = parsePath(window.location.pathname, window.location.search);
    initHistory(pageFromUrl);
    
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }

    if (pageFromUrl === 'map') {
      mapParams.current = window.location.pathname + window.location.search;
    }

    const handlePopState = (event: PopStateEvent) => {
      const historyState = event.state as HistoryState | null;
      const { page: urlPage } = parsePath(window.location.pathname, window.location.search);
      const targetPage = (historyState?.page) ?? urlPage;

      const savedScrollY = typeof historyState?.scrollY === 'number' ? historyState.scrollY : 0;
      
      scrollPositions.current[targetPage] = savedScrollY;
      if (targetPage === 'map') {
        mapParams.current = window.location.pathname + window.location.search;
      }
      
      setCurrentPage(targetPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const targetScrollY = scrollPositions.current[currentPage] || 0;
    requestAnimationFrame(() => {
      window.scrollTo({ top: targetScrollY, left: 0, behavior: 'instant' });
    });
  }, [currentPage]);

  const navigate = (page: PageID, options?: { roomId?: string }) => {
    if (page === currentPage && !options?.roomId) return;

    scrollPositions.current[currentPage] = window.scrollY;
    if (currentPage === 'map') {
      mapParams.current = window.location.pathname + window.location.search;
    }

    saveScroll();

    let url = '';
    if (page === 'timetable') {
      url = '/';
    } else if (page === 'survey') {
      url = '/survey';
    } else if (page === 'map') {
      if (options?.roomId) {
        url = `/map?r=${options.roomId}`;
        mapParams.current = url;
      } else {
        url = mapParams.current || '/map';
      }
    }
    
    const targetScrollY = scrollPositions.current[page] || 0;

    pushPage(page, url, targetScrollY);
    setCurrentPage(page);
  };

  const resetScroll = (page: PageID) => {
    scrollPositions.current[page] = 0;
  };

  return {
    currentPage,
    navigate,
    resetScroll,
  };
};