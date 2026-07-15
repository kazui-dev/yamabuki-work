import { useMemo, type Ref, type UIEvent } from 'react';
import { Link } from '@tanstack/react-router';
import { CalendarDays, MapPinned, MapPin, ChevronUp, ChevronDown, Sun, MoonStar, Smartphone, Check, ClipboardList } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MapsData } from '@/constants/maps';
import { POSTERS_BY_LOCATION } from '@/constants/posters';
import { useTheme } from '@/lib/theme';
import { usePosterStore } from '@/store/usePosterStore';
import { useScrollStore } from '@/store/useScrollStore';
import { useMapStore } from '@/store/useMapStore';
import { formatRoomIdForUrl } from '@/lib/utils';
import type { Poster } from '@/types';

interface SideNavContentProps {
  onNavigate?: () => void;
  scrollContainerRef?: Ref<HTMLDivElement>;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
}

export default function SideNavContent({ onNavigate, scrollContainerRef, onScroll }: SideNavContentProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const { data: posterData, openPoster } = usePosterStore();
  const selectedPosterId = posterData?.poster.id ?? null;
  const isPosterDrawerOpen = !!posterData;

  const lastRoomId = useMapStore(state => state.lastRoomId);

  const roomNameById = useMemo(() => Object.fromEntries(MapsData.map((room) => [room.id, room.name])), []);

  const clearScrollPosition = useScrollStore(state => state.clearScrollPosition);

  const handleMapPinClick = (path: string) => {
    clearScrollPosition(path);
    onNavigate?.();
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
            className="mb-1 flex items-center gap-1.5 text-xs text-mauve-500 dark:text-mauve-400 hover:text-mauve-700 active:text-mauve-700 dark:hover:text-mauve-200 dark:active:text-mauve-200"
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
                    ? 'bg-mauve-100 dark:bg-mauve-800'
                    : 'hover:bg-mauve-100 active:bg-mauve-100 dark:hover:bg-mauve-800 dark:active:bg-mauve-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-mauve-800 dark:text-mauve-200 font-medium truncate">
                    {poster.title}
                  </p>
                  {isPosterDrawerOpen && selectedPosterId === poster.id ? (
                    <ChevronDown size={14} className="text-mauve-500 dark:text-mauve-400 shrink-0" />
                  ) : (
                    <ChevronUp size={14} className="text-mauve-500 dark:text-mauve-400 shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    });
  }, [isPosterDrawerOpen, selectedPosterId, openPoster, roomNameById]);

  const navLinkClass = "w-full flex items-center gap-2.5 px-4 py-3 rounded-lg transition-colors text-sm font-medium hover:bg-mauve-100 active:bg-mauve-100 dark:hover:bg-mauve-800 dark:active:bg-mauve-800 text-mauve-800 dark:text-mauve-200";
  const navActiveProps = { className: 'bg-mauve-100 dark:bg-mauve-700 text-mauve-800 dark:text-mauve-200' };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-4 pt-4 pb-2">
        <Link
          to="/"
          onClick={onNavigate}
          className={`${navLinkClass} mb-2`}
          activeProps={navActiveProps}
          activeOptions={{ exact: true, includeSearch: false }}
        >
          <CalendarDays size={18} className="text-mauve-600 dark:text-mauve-300" />
          タイムテーブル
        </Link>

        <Link
          to="/map"
          onClick={onNavigate}
          search={lastRoomId ? { r: formatRoomIdForUrl(lastRoomId) } : undefined}
          className={`${navLinkClass} mb-2`}
          activeProps={navActiveProps}
          activeOptions={{ exact: true, includeSearch: false }}
        >
          <MapPinned size={18} className="text-mauve-600 dark:text-mauve-300" />
          フロアマップ
        </Link>

        <Link
          to="/survey"
          onClick={onNavigate}
          className={navLinkClass}
          activeProps={navActiveProps}
          activeOptions={{ exact: true, includeSearch: false }}
        >
          <ClipboardList size={18} className="text-mauve-600 dark:text-mauve-300" />
          来場者アンケート
        </Link>
        <div className="h-px bg-mauve-100 dark:bg-mauve-700 mt-2 mb-0" />
      </div>

      <div ref={scrollContainerRef} onScroll={onScroll} className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="pt-1.5 px-4 pb-4">
          <div className="px-4 pb-0.5">
            <h3 className="text-xs font-bold text-mauve-500 dark:text-mauve-400 uppercase tracking-wide mb-1">ポスター発表</h3>
          </div>
          <div className="space-y-2">{posterListNodes}</div>
        </nav>
      </div>

      <div className="px-4 pt-2 pb-4">
        <div className="h-px bg-mauve-100 dark:bg-mauve-700 mt-0 mb-2" />
        <Popover>
          <PopoverTrigger asChild>
            <button type="button" className="w-full flex items-center gap-1.5 px-4 py-3 rounded-lg hover:bg-mauve-100 active:bg-mauve-100 dark:hover:bg-mauve-800 dark:active:bg-mauve-800 transition-colors text-mauve-800 dark:text-mauve-200 text-sm font-medium">
              {resolvedTheme === 'dark' ? <><MoonStar size={18} className="text-mauve-600 dark:text-mauve-300" />ダークモード</> : <><Sun size={18} className="text-mauve-600 dark:text-mauve-300" />ライトモード</>}
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-mauve-100 active:bg-mauve-100 dark:hover:bg-mauve-800 dark:active:bg-mauve-800 transition-colors"
                  aria-current={theme === themeValue ? 'true' : undefined}
                >
                  <Icon size={18} className="text-mauve-600 dark:text-mauve-300" />
                  <span className="text-sm font-medium text-mauve-800 dark:text-mauve-200 flex-1 text-left">{label}</span>
                  {theme === themeValue && <Check size={16} className="text-mauve-600 dark:text-mauve-300" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
