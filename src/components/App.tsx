import { useState, useEffect } from 'react';
import { Timetable } from './timetable/Timetable';
import { Maps } from './map/Maps';

export type PageID = 'timetable' | 'map';

export const App = () => {
  const getInitialPage = (): PageID => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      if (page === 'map') return 'map';
    }
    return 'timetable';
  };

  const [currentPage, setCurrentPage] = useState<PageID>(getInitialPage());

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const page = (event.state?.page as PageID) || 'timetable';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageID) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const url = page === 'timetable' ? window.location.pathname : `?page=${page}`;
    window.history.pushState({ page }, '', url);
  };

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