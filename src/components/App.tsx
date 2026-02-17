import { useState, useEffect } from 'react';
import { Timetable } from './timetable/Timetable';
import { Maps } from './map/Maps';

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
    <main className="p-6 mb-16">
      <div 
        className="max-w-md mx-auto mb-4 text-center cursor-pointer hover:opacity-80 transition-opacity" 
        onClick={() => handleNavigate('timetable')}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
          新宿山吹高校<br className="sm:hidden" />
          <span className="inline-block">情報科発表会</span>
        </h1>
      </div>

      {currentPage === 'timetable' ? (
        <Timetable onNavigate={handleNavigate} />
      ) : (
        <Maps />
      )}
    </main>
  );
};