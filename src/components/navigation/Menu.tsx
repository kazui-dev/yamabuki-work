import { useRef, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu as MenuIcon, CalendarDays, MapPinned, MapPin, ChevronUp, ChevronDown } from 'lucide-react';
import { MapsData } from '@/constants/maps';
import { POSTERS_BY_LOCATION } from '@/constants/posters';
import type { Poster } from '@/types';

interface AppMenuProps {
  onNavigate: (page: 'timetable' | 'map') => void;
  onOpenPoster: (poster: Poster, roomName: string) => void;
  onSelectRoom: (roomId: string) => void;
  isPosterDrawerOpen: boolean;
}

export const AppMenu = ({ onNavigate, onOpenPoster, onSelectRoom, isPosterDrawerOpen }: AppMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const roomNameById = Object.fromEntries(MapsData.map((room) => [room.id, room.name]));

  const handleNavigate = (page: 'timetable' | 'map') => {
    onNavigate(page);
    setIsOpen(false);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const diffX = touch.clientX - touchStartX.current;
    const diffY = touch.clientY - touchStartY.current;

    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY) * 1.2;
    const isSwipeToRight = diffX > 72;

    if (isHorizontalSwipe && isSwipeToRight) {
      setIsOpen(false);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 p-0 hover:bg-slate-200/50 [&_svg]:size-5"
          aria-label="メニュー"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-64 p-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">メニュー</h2>
          </div>

          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <nav className="p-4 space-y-2">
              <button
                onClick={() => handleNavigate('timetable')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-800 text-sm font-medium"
              >
                <CalendarDays size={18} className="text-slate-600" />
                タイムテーブル
              </button>

              <button
                onClick={() => handleNavigate('map')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 transition-colors text-slate-800 text-sm font-medium"
              >
                <MapPinned size={18} className="text-slate-600" />
                フロアマップ
              </button>

              <div className="h-px bg-slate-200 my-4" />

              <div className="px-4 pt-1 pb-0.5">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
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
                        className="mb-1 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"
                      >
                        <MapPin size={12} />
                        {roomName}
                      </button>

                      <div className="space-y-2 pl-4">
                        {posters.map((poster: Poster) => (
                          <button
                            key={poster.id}
                            onClick={() => onOpenPoster(poster, roomName)}
                            className="w-full text-left rounded-md px-2 py-1 hover:bg-slate-100 transition-colors"
                          >
                            <span className="flex items-center justify-between gap-2">
                              <p className="text-sm text-slate-800 font-medium truncate">
                                {poster.title}
                              </p>
                              {isPosterDrawerOpen ? (
                                <ChevronDown size={14} className="text-slate-500 shrink-0" />
                              ) : (
                                <ChevronUp size={14} className="text-slate-500 shrink-0" />
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
        </div>
      </SheetContent>
    </Sheet>
  );
};
