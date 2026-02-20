import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Timetable } from './components/timetable/Timetable';
import { Maps } from './components/map/Maps';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPinned } from "lucide-react";
import { AppMenu } from './components/navigation/Menu';
import { Drawer } from './components/ui/drawer';
import { PosterDetail } from './components/map/PosterDetail';
import type { Poster } from './types';
import {
  initHistory,
  pageFromSearch,
  saveScroll,
  pushPage,
  syncMapRoom,
  type HistoryState,
} from '@/lib/history';

export type PageID = 'timetable' | 'map';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageID>('timetable');
  
  const scrollPositions = useRef<{ timetable: number; map: number }>({ timetable: 0, map: 0 });
  const mapParams = useRef<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const [selectedPosterData, setSelectedPosterData] = useState<{ poster: Poster; roomName: string } | null>(null);
  const [isPosterDrawerOpen, setIsPosterDrawerOpen] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const pageFromUrl = pageFromSearch(window.location.search);

    initHistory('timetable');
    
    if (pageFromUrl === 'map') {
      setCurrentPage('map');
      mapParams.current = window.location.search;
    }

    const handlePopState = (event: PopStateEvent) => {
      const historyState = event.state as HistoryState | null;
      const targetPage =
        (historyState?.page) ??
        pageFromSearch(window.location.search) ??
        'timetable';

      const savedScrollY = typeof historyState?.scrollY === 'number' ? historyState.scrollY : 0;
      
      scrollPositions.current[targetPage] = savedScrollY;
      if (targetPage === 'map') {
        mapParams.current = window.location.search;
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

  const handleNavigate = (page: PageID) => {
    if (page === currentPage) return;

    scrollPositions.current[currentPage] = window.scrollY;
    if (currentPage === 'map') {
      mapParams.current = window.location.search;
    }

    saveScroll();

    const url = page === 'timetable' 
      ? window.location.pathname 
      : (mapParams.current || '?page=map');
    
    const targetScrollY = scrollPositions.current[page] || 0;

    pushPage(page, url, targetScrollY);
    setCurrentPage(page);
  };

  const handleLogoClick = () => {
    if (currentPage === 'timetable') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollPositions.current['timetable'] = 0;
      handleNavigate('timetable');
    }
  };

  if (!isReady) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-50 w-full bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <AppMenu
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenPoster={(poster, roomName) => {
              setSelectedPosterData({ poster, roomName });
              setIsPosterDrawerOpen(true);
            }}
            onSelectRoom={(roomId) => {
              syncMapRoom(roomId);
              setSelectedRoomId(roomId);

              window.history.replaceState(
                { ...(window.history.state ?? {}), scrollY: 0 },
                ''
              );
              scrollPositions.current.map = 0;

              if (currentPage === 'map') {
                requestAnimationFrame(() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                });
              }

              setCurrentPage('map');
            }}
            isPosterDrawerOpen={isPosterDrawerOpen}
            selectedPosterId={selectedPosterData?.poster.id ?? null}
          />

          <h1 
            className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:opacity-80 active:opacity-80 transition-opacity shrink truncate flex-1"
            onClick={handleLogoClick}
          >
            新宿山吹高校情報科発表会
          </h1>
          
          <Tabs 
            value={currentPage} 
            onValueChange={(value) => handleNavigate(value as PageID)} 
            className="w-24 sm:w-28 shrink-0"
          >
            <TabsList className="grid w-full grid-cols-2 h-9 p-1 bg-slate-200/50 dark:bg-slate-800/50">
              <TabsTrigger 
                value="timetable" 
                className="flex items-center justify-center h-full px-0 data-[state=active]:shadow-none"
                aria-label="タイムテーブル"
              >
                <CalendarDays size={16} />
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="flex items-center justify-center h-full px-0 data-[state=active]:shadow-none"
                aria-label="マップ"
              >
                <MapPinned size={16} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="p-4 sm:p-6 mb-16 flex-1 w-full max-w-md mx-auto">
        {currentPage === 'timetable' ? (
          <Timetable onNavigate={handleNavigate} />
        ) : (
          <Maps selectedRoomId={selectedRoomId} />
        )}
      </main>

      <Drawer open={isPosterDrawerOpen} onOpenChange={setIsPosterDrawerOpen}>
        {selectedPosterData && (
          <PosterDetail
            poster={selectedPosterData.poster}
            roomName={selectedPosterData.roomName}
          />
        )}
      </Drawer>
    </div>
  );
};