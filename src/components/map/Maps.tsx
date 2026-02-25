import { useState, useEffect, useCallback, useMemo }from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import FloorMap from "./FloorMap";
import PosterCard from "./PosterCard";
import { getRoomMapComponent } from "./rooms";
import { usePosterStore } from '@/store/usePosterStore';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { MapsData } from "@/constants/maps";
import { useMapStore } from '@/store/useMapStore'
import { formatRoomIdForUrl } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import "./maps.css";

export default function Maps() {
  const [api, setApi] = useState<CarouselApi>();
  const isInitialAppLoad = useAppStore(state => state.isInitialAppLoad);

  const search = useSearch({ strict: false }) as { r?: string | number };
  const urlRoomId = search.r !== undefined ? String(search.r) : undefined;

  const navigate = useNavigate();
  const setLastRoomId = useMapStore(state => state.setLastRoomId);
  const { data: posterData, openPoster } = usePosterStore();

  const activeRoomId = useMemo(() => {
    return MapsData.some(r => r.id === urlRoomId) ? urlRoomId! : MapsData[0]?.id || null;
  }, [urlRoomId]);

  useEffect(() => {
    if (activeRoomId) {
      setLastRoomId(activeRoomId);
    }
  }, [activeRoomId, setLastRoomId]);

  const [initialIndex] = useState(() => Math.max(0, MapsData.findIndex(r => r.id === activeRoomId)));
  const current = Math.max(0, MapsData.findIndex(r => r.id === activeRoomId));

  // URLに合わせてカルーセルを動かす
  useEffect(() => {
    if (!api || !activeRoomId) return;
    const targetIndex = MapsData.findIndex(r => r.id === activeRoomId);
    if (targetIndex !== -1 && targetIndex !== api.selectedScrollSnap()) {
      api.scrollTo(targetIndex);
    }
  }, [activeRoomId, api]);

  // カルーセルが動いたらURLを更新
  useEffect(() => {
    if (!api) return;
    const updateState = () => {
      const index = api.selectedScrollSnap();
      const room = MapsData[index];
      if (room && room.id !== urlRoomId) {
        navigate({ to: '/map', search: { r: formatRoomIdForUrl(room.id) }, replace: true });
      }
    };
    api.on("select", updateState);
    return () => { api.off("select", updateState); };
  }, [api, navigate, urlRoomId]);

  const handleMapPosterClick = useCallback((roomId: string, posterId: string) => {
    const room = MapsData.find(r => r.id === roomId);
    const poster = room?.posters?.find(p => p.id === posterId);
    if (room && poster) {
      openPoster(poster, room.name);
    }
  }, [openPoster]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

const scrollPositions = useMapStore(state => state.scrollPositions);
const setScrollPosition = useMapStore(state => state.setScrollPosition);

  const handleMapClick = useCallback((roomId: string) => {
    navigate({ to: '/map', search: { r: formatRoomIdForUrl(roomId) }, replace: true });
  }, [navigate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <section className="px-4 mb-8">
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
          <FloorMap 
            className="p-2" 
            onRoomSelect={handleMapClick} 
            activeRoomId={isInitialAppLoad ? null : activeRoomId}
          />
        </div>
      </section>

      <div 
        className={`transition-opacity duration-300 ease-in-out ${
          isInitialAppLoad ? "opacity-0" : "opacity-100"
        }`}
      >
        <Carousel setApi={setApi} className="w-full" opts={{ align: "center", loop: true, startIndex: initialIndex }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-9 w-9 shadow-sm" />
            <div className="flex gap-2">
              {MapsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                    index === current 
                      ? "bg-slate-800 dark:bg-slate-200 border-slate-800 dark:border-slate-200" 
                      : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
                  }`}
                />
              ))}
            </div>
            <CarouselNext className="static translate-y-0 translate-x-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 h-9 w-9 shadow-sm" />
          </div>

          <CarouselContent className="items-start">
            {MapsData.map((room) => {
              const RoomMapComponent = getRoomMapComponent(room.id);
              return (
                <CarouselItem key={room.id} className="pl-4">
                  <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-4">
                    <div className="p-4 sm:p-6">
                      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{room.name}</h2>
                      {RoomMapComponent && (
                        <RoomMapComponent 
                          roomId={room.id} 
                          onPosterClick={(posterId: string) => handleMapPosterClick(room.id, posterId)} 
                        />
                      )}
                    </div>

                    {room.posters && room.posters.length > 0 && (
                        <div 
                          className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 max-h-[58vh] overflow-y-auto"
                          onScroll={(e) => { setScrollPosition(room.id, e.currentTarget.scrollTop); }}
                          ref={(el) => { if (el && scrollPositions[room.id] !== undefined) el.scrollTop = scrollPositions[room.id]; }}
                        >
                        {room.posters.map((poster) => (
                          <PosterCard 
                            key={poster.id} 
                            poster={poster} 
                            isExpanded={posterData?.poster.id === poster.id}
                            onOpen={() => openPoster(poster, room.name)} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}