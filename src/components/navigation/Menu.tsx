import { useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Menu as MenuIcon, CalendarDays, MapPinned, MapPin, ChevronUp, ChevronDown, Sun, MoonStar, Smartphone, Check } from 'lucide-react';
import { MapsData } from '@/constants/maps';
import { POSTERS_BY_LOCATION } from '@/constants/posters';
import type { Poster } from '@/types';
import { useTheme } from '@/lib/theme';

interface AppMenuProps {
  currentPage: 'timetable' | 'map';
  onNavigate: (page: 'timetable' | 'map') => void;
  onOpenPoster: (poster: Poster, roomName: string) => void;
  onSelectRoom: (roomId: string) => void;
  isPosterDrawerOpen: boolean;
}

export const AppMenu = ({ currentPage, onNavigate, onOpenPoster, onSelectRoom, isPosterDrawerOpen }: AppMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const roomNameById = Object.fromEntries(MapsData.map((room) => [room.id, room.name]));

  const handleNavigate = (page: 'timetable' | 'map') => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 p-0 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 [&_svg]:size-5"
          aria-label="メニュー"
        >
          <MenuIcon className="text-slate-700 dark:text-slate-300" />
        </Button>
      </DrawerTrigger>

      <DrawerContent direction="left" className="w-64 p-0">
        <div className="h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => handleNavigate('timetable')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'timetable'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <CalendarDays size={18} className="text-slate-600 dark:text-slate-300" />
                タイムテーブル
              </button>

              <button
                onClick={() => handleNavigate('map')}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                  currentPage === 'map'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <MapPinned size={18} className="text-slate-600 dark:text-slate-300" />
                フロアマップ
              </button>

              <div className="h-px bg-slate-200 dark:bg-slate-700 my-4" />

              <div className="px-4 pt-1 pb-0.5">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                  ポスター発表
                </h3>
              </div>

              <div className="space-y-2">
                {MapsData.map((room) => {
                  const posters = POSTERS_BY_LOCATION[room.id] ?? [];
                  if (posters.length === 0) {
                    return null;
                  }

                  const roomName = roomNameById[room.id] ?? room.id;

                  return (
                    <div key={room.id} className="px-4 py-2">
                      <button
                        onClick={() => {
                          onSelectRoom(room.id);
                          setIsOpen(false);
                        }}
                        className="mb-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      >
                        <MapPin size={12} />
                        {roomName}
                      </button>

                      <div className="space-y-2 pl-4">
                        {posters.map((poster: Poster) => (
                          <button
                            key={poster.id}
                            onClick={() => onOpenPoster(poster, roomName)}
                            className="w-full text-left rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <span className="flex items-center justify-between gap-2">
                              <p className="text-sm text-slate-800 dark:text-slate-200 font-medium truncate">
                                {poster.title}
                              </p>
                              {isPosterDrawerOpen ? (
                                <ChevronDown size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
                              ) : (
                                <ChevronUp size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 p-2">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full flex items-center gap-1.5 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-800 dark:text-slate-200 text-sm font-medium"
                >
                  {resolvedTheme === 'dark' ? (
                    <>
                      <MoonStar size={18} className="text-slate-600 dark:text-slate-300" />
                      ダークモード
                    </>
                  ) : (
                    <>
                      <Sun size={18} className="text-slate-600 dark:text-slate-300" />
                      ライトモード
                    </>
                  )}
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
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
  );
};
