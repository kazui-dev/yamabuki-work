import { useRef, useState, useMemo, type MouseEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { CalendarDays, MapPinned, MapPin, Menu as MenuIcon, ChevronUp, ChevronDown, Sun, MoonStar, Smartphone, Check, ClipboardList } from "lucide-react";

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapsData } from '@/constants/maps';
import { POSTERS_BY_LOCATION } from '@/constants/posters';
import { useTheme } from '@/lib/theme';
import { usePosterStore } from '@/store/usePosterStore';
import { useScrollStore } from '@/store/useScrollStore';
import { useMapStore } from '@/store/useMapStore';
import { formatRoomIdForUrl } from '@/lib/utils';
import type { Poster } from '@/types';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef(0);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const { data: posterData, openPoster } = usePosterStore();
  const selectedPosterId = posterData?.poster.id ?? null;
  const isPosterDrawerOpen = !!posterData;

  const lastRoomId = useMapStore(state => state.lastRoomId);

  const roomNameById = useMemo(() => Object.fromEntries(MapsData.map((room) => [room.id, room.name])), []);

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

  const handleMapPinClick = (path: string) => {
    clearScrollPosition(path);
    closeMenu();
  };

  const posterListNodes = useMemo(() => {
    return MapsData.map((room) => {
      const posters = POSTERS_BY_LOCATION[room.id] ?? [];
      if (posters.length === 0) return null;

      const roomName = roomNameById[room.id] ?? room.id;

      return (
        <div key={room.id} className="px-4 py-2">
          <Link
            to="/map"
            search={{ r: /^\d+$/.test(room.id) ? Number(room.id) : room.id }}
            onClick={() => handleMapPinClick(`/map`)}
            className="mb-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 active:text-slate-700 dark:hover:text-slate-200 dark:active:text-slate-200"
          >
            <MapPin size={12} />
            {roomName}
          </Link>

          <div className="space-y-2 pl-4">
            {posters.map((poster: Poster) => (
              <button
                key={poster.id}
                onClick={() => openPoster(poster, roomName)}
                className={`w-full text-left rounded-md px-2 py-1 transition-colors ${
                  isPosterDrawerOpen && selectedPosterId === poster.id
                    ? 'bg-slate-100 dark:bg-slate-800'
                    : 'hover:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-800 dark:text-slate-200 font-medium truncate">
                    {poster.title}
                  </p>
                  {isPosterDrawerOpen && selectedPosterId === poster.id ? (
                    <ChevronDown size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
                  ) : (
                    <ChevronUp size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    });
  }, [isPosterDrawerOpen, selectedPosterId, openPoster, roomNameById]);

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 py-2">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        
        <Drawer direction="left" open={isOpen} onOpenChange={handleOpenChange}>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0 hover:bg-slate-200/50 active:bg-slate-200/50 dark:hover:bg-slate-800/50 dark:active:bg-slate-800/50 [&_svg]:size-5">
              <MenuIcon className="text-slate-700 dark:text-slate-300" />
            </Button>
          </DrawerTrigger>

          <DrawerContent direction="left" className="w-64 p-0">
            <div className="h-full flex flex-col overflow-hidden">
              <div className="px-4 pt-4 pb-2">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="w-full mb-2 flex items-center gap-2.5 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-800 text-slate-800 dark:text-slate-200"
                  activeProps={{ className: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' }}
                  activeOptions={{ exact: true, includeSearch: false }}
                >
                  <CalendarDays size={18} className="text-slate-600 dark:text-slate-300" />
                  タイムテーブル
                </Link>

                <Link
                  to="/map"
                  onClick={closeMenu}
                  search={lastRoomId ? { r: formatRoomIdForUrl(lastRoomId) } : undefined}
                  className="w-full mb-2 flex items-center gap-2.5 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-800 text-slate-800 dark:text-slate-200"
                  activeProps={{ className: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' }}
                  activeOptions={{ exact: true, includeSearch: false }}
                >
                  <MapPinned size={18} className="text-slate-600 dark:text-slate-300" />
                  フロアマップ
                </Link>

                <Link
                  to="/survey"
                  onClick={closeMenu}
                  className="w-full flex items-center gap-2.5 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-800 text-slate-800 dark:text-slate-200"
                  activeProps={{ className: 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200' }}
                  activeOptions={{ exact: true, includeSearch: false }}
                >
                  <ClipboardList size={18} className="text-slate-600 dark:text-slate-300" />
                  来場者アンケート
                </Link>
                <div className="h-px bg-slate-200 dark:bg-slate-700 mt-2 mb-0" />
              </div>

              <div ref={scrollContainerRef} onScroll={(event) => { scrollTopRef.current = event.currentTarget.scrollTop; }} className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <nav className="pt-1.5 px-4 pb-4">
                  <div className="px-4 pb-0.5">
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">ポスター発表</h3>
                  </div>
                  <div className="space-y-2">{posterListNodes}</div>
                </nav>
              </div>

              <div className="px-4 pt-2 pb-4">
                <div className="h-px bg-slate-200 dark:bg-slate-700 mt-0 mb-2" />
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="w-full flex items-center gap-1.5 px-4 py-3 rounded-lg hover:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-800 transition-colors text-slate-800 dark:text-slate-200 text-sm font-medium">
                      {resolvedTheme === 'dark' ? <><MoonStar size={18} className="text-slate-600 dark:text-slate-300" />ダークモード</> : <><Sun size={18} className="text-slate-600 dark:text-slate-300" />ライトモード</>}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" side="top" align="start">
                    <div className="space-y-1">
                      {[
                        { themeValue: 'light' as const, icon: Sun, label: 'ライトモード' },
                        { themeValue: 'dark' as const, icon: MoonStar, label: 'ダークモード' },
                        { themeValue: 'system' as const, icon: Smartphone, label: '端末の設定を使う' },
                      ].map(({ themeValue, icon: Icon, label }) => (
                        <button
                          key={themeValue}
                          onClick={() => setTheme(themeValue)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-slate-100 active:bg-slate-100 dark:hover:bg-slate-800 dark:active:bg-slate-800 transition-colors"
                          aria-current={theme === themeValue ? 'true' : undefined}
                        >
                          <Icon size={18} className="text-slate-600 dark:text-slate-300" />
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200 flex-1 text-left">{label}</span>
                          {theme === themeValue && <Check size={16} className="text-slate-600 dark:text-slate-300" />}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
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
        
        <div className="w-24 sm:w-28 shrink-0">
          <nav className="grid w-full grid-cols-2 h-9 p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-md text-slate-500 dark:text-slate-400">
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