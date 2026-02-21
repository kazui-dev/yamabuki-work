import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  const initialPageValue = initialPage ?? 'timetable';
  const [isReady, setIsReady] = useState(typeof initialPage !== 'undefined');
  const [currentPage, setCurrentPage] = useState<PageID>(initialPageValue);
  
  const scrollPositions = useRef<{ timetable: number; map: number; survey: number }>({ timetable: 0, map: 0, survey: 0 });
  
  const initialMapParams = initialPath && parsePath(initialPath).page === 'map' ? initialPath : '';
  const mapParams = useRef<string>(initialMapParams);
  
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const { page: pageFromUrl } = parsePath(window.location.pathname, window.location.search);
    initHistory(pageFromUrl);
    setCurrentPage(pageFromUrl);
    
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
    setIsReady(true);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isReady) {
      const targetScrollY = scrollPositions.current[currentPage] || 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: targetScrollY, left: 0, behavior: 'instant' });
      });
    }
  }, [currentPage, isReady]);

  const navigate = (page: PageID) => {
    if (page === currentPage) return;

    scrollPositions.current[currentPage] = window.scrollY;
    if (currentPage === 'map') {
      mapParams.current = window.location.pathname + window.location.search;
    }

    saveScroll();

    const url = page === 'timetable'
      ? '/'
      : page === 'map'
        ? (mapParams.current || '/map')
        : '/survey';
    
    const targetScrollY = scrollPositions.current[page] || 0;

    pushPage(page, url, targetScrollY);
    setCurrentPage(page);
  };

  const resetScroll = (page: PageID) => {
    scrollPositions.current[page] = 0;
  };

  return {
    isReady,
    currentPage,
    navigate,
    resetScroll,
  };
};