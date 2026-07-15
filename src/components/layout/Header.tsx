import { useRef, useState, type MouseEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { CalendarDays, MapPinned, Menu as MenuIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import SideNavContent from '@/components/layout/SideNavContent';
import { useScrollStore } from '@/store/useScrollStore';
import { useMapStore } from '@/store/useMapStore';
import { formatRoomIdForUrl } from '@/lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef(0);

  const lastRoomId = useMapStore(state => state.lastRoomId);
  const clearScrollPosition = useScrollStore(state => state.clearScrollPosition);

  const closeMenu = () => {
    if (scrollContainerRef.current) {
      scrollTopRef.current = scrollContainerRef.current.scrollTop;
    }
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeMenu();
      return;
    }
    setIsOpen(true);
    requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollTopRef.current;
      }
    });
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }else {
      clearScrollPosition('timetable');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 py-2">
      <div className="max-w-md md:max-w-2xl mx-auto flex items-center justify-between gap-3">

        <Drawer direction="left" open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 p-0 hover:bg-slate-100/50 active:bg-slate-100/50 dark:hover:bg-slate-800/50 dark:active:bg-slate-800/50 [&_svg]:size-5">
              <MenuIcon className="text-slate-700 dark:text-slate-300" />
            </Button>
          </DrawerTrigger>

          <DrawerContent direction="left" className="w-64 p-0">
            <SideNavContent
              onNavigate={closeMenu}
              scrollContainerRef={scrollContainerRef}
              onScroll={(event) => { scrollTopRef.current = event.currentTarget.scrollTop; }}
            />
          </DrawerContent>
        </Drawer>

        <h1 className="shrink truncate flex-1">
          <Link
            to="/"
            onClick={handleLogoClick}
            className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:opacity-80 active:opacity-80 transition-opacity block"
          >
            新宿山吹高校情報科発表会
          </Link>
        </h1>

        <div className="w-24 sm:w-28 shrink-0 lg:hidden">
          <nav className="grid w-full grid-cols-2 h-9 p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-md text-slate-500 dark:text-slate-400">
            <Link
              to="/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm h-full px-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 hover:text-slate-700 dark:hover:text-slate-200"
              activeProps={{ className: 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50' }}
              activeOptions={{ exact: true, includeSearch: false }}
              aria-label="タイムテーブル"
            >
              <CalendarDays size={16} />
            </Link>
            <Link
              to="/map"
              search={lastRoomId ? { r: formatRoomIdForUrl(lastRoomId) } : undefined}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm h-full px-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 hover:text-slate-700 dark:hover:text-slate-200"
              activeProps={{ className: 'bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50' }}
              activeOptions={{ exact: true, includeSearch: false }}
              aria-label="フロアマップ"
            >
              <MapPinned size={16} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
