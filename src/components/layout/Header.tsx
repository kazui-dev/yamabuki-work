import { SideNav } from './SideNav';
import { CalendarDays, MapPinned } from "lucide-react";
import type { PageID, Poster } from '@/types';

interface HeaderProps {
  currentPage: PageID;
  onNavigate: (page: PageID) => void;
  onResetScroll: (page: PageID) => void;
  onOpenPoster: (poster: Poster, roomName: string) => void;
  onSelectRoom: (roomId: string) => void;
  isPosterDrawerOpen: boolean;
  selectedPosterId: string | null;
}

export const Header = ({
  currentPage,
  onNavigate,
  onResetScroll,
  onOpenPoster,
  onSelectRoom,
  isPosterDrawerOpen,
  selectedPosterId
}: HeaderProps) => {
  
  const handleLogoClick = () => {
    if (currentPage === 'timetable') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onResetScroll('timetable');
      onNavigate('timetable');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <SideNav
          currentPage={currentPage}
          onNavigate={onNavigate}
          onOpenPoster={onOpenPoster}
          onSelectRoom={onSelectRoom}
          isPosterDrawerOpen={isPosterDrawerOpen}
          selectedPosterId={selectedPosterId}
        />

        <h1 
          className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:opacity-80 active:opacity-80 transition-opacity shrink truncate flex-1"
          onClick={handleLogoClick}
        >
          新宿山吹高校情報科発表会
        </h1>
        
        <div className="w-24 sm:w-28 shrink-0">
          <nav 
            className="grid w-full grid-cols-2 h-9 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-md text-slate-500 dark:text-slate-400"
            aria-label="ページ切り替え"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('timetable');
              }}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm h-full px-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${
                currentPage === 'timetable'
                  ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50'
                  : 'hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              aria-label="タイムテーブル"
              aria-current={currentPage === 'timetable' ? 'page' : undefined}
            >
              <CalendarDays size={16} />
            </a>
            <a
              href="/map"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('map');
              }}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm h-full px-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${
                currentPage === 'map'
                  ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50'
                  : 'hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              aria-label="フロアマップ"
              aria-current={currentPage === 'map' ? 'page' : undefined}
            >
              <MapPinned size={16} />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};