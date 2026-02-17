import { useState, useEffect } from 'react';
import { Timetable } from './timetable/Timetable';
import { Maps } from './map/Maps';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Map as MapIcon } from "lucide-react";

export type PageID = 'timetable' | 'map';

export const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageID>('timetable');

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = params.get('page') as PageID;
    
    if (pageFromUrl === 'map') {
      setCurrentPage('map');
    }

    const handlePopState = (event: PopStateEvent) => {
      const pageFromState = event.state?.page as PageID;
      
      if (pageFromState) {
        setCurrentPage(pageFromState);
      } else {
        const p = new URLSearchParams(window.location.search).get('page') as PageID;
        setCurrentPage(p || 'timetable');
      }

      const savedScrollY = event.state?.scrollY || 0;
      
      setTimeout(() => {
        window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
      }, 0);
    };

    window.addEventListener('popstate', handlePopState);
    setIsReady(true);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageID) => {
    if (page === currentPage) return;

    window.history.replaceState(
      { ...window.history.state, scrollY: window.scrollY }, 
      ''
    );

    setCurrentPage(page);

    const url = page === 'timetable' ? window.location.pathname : `?page=${page}`;
    
    window.history.pushState({ page, scrollY: 0 }, '', url);

    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
  };

  if (!isReady) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-slate-50/90 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <h1 
            className="text-sm sm:text-base font-extrabold text-slate-800 cursor-pointer hover:opacity-80 transition-opacity shrink-0 leading-tight"
            onClick={() => handleNavigate('timetable')}
          >
            新宿山吹高校<br />
            情報科発表会
          </h1>
          
          <Tabs 
            value={currentPage} 
            onValueChange={(value) => handleNavigate(value as PageID)} 
            className="w-24 sm:w-28 shrink-0"
          >
            <TabsList className="grid w-full grid-cols-2 h-9 bg-slate-200/50">
              <TabsTrigger 
                value="timetable" 
                className="flex items-center justify-center px-0"
                aria-label="タイムテーブル"
              >
                <CalendarDays size={18} />
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="flex items-center justify-center px-0"
                aria-label="マップ"
              >
                <MapIcon size={18} />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="p-4 sm:p-6 mb-16 flex-1 w-full max-w-md mx-auto">
        {currentPage === 'timetable' ? (
          <Timetable onNavigate={handleNavigate} />
        ) : (
          <Maps />
        )}
      </main>
    </div>
  );
};