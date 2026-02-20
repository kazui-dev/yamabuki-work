import React, { useState, useEffect, useCallback } from 'react';
import { FloorMap } from "./FloorMap";
import { PosterCard } from "./PosterCard";
import { PosterDetail } from "./PosterDetail";
import { getRoomMapComponent } from "./rooms";
import type { Poster } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Drawer } from "@/components/ui/drawer";
import { MapsData } from "@/constants/maps";
import { roomFromSearch, syncMapRoom } from '@/lib/history';

interface MapsProps {
  selectedRoomId?: string | null;
}

export const Maps: React.FC<MapsProps> = ({ selectedRoomId }) => {
  const [api, setApi] = useState<CarouselApi>();

  const getInitialRoomId = () => {
    if (typeof window !== 'undefined') {
      const roomId = roomFromSearch(window.location.search);
      if (roomId && MapsData.some(r => r.id === roomId)) return roomId;
    }
    return MapsData[0]?.id || null;
  };

  const [activeRoomId, setActiveRoomId] = useState<string | null>(() => getInitialRoomId());
  const [initialIndex] = useState(() => {
    const initialRoomId = getInitialRoomId();
    return Math.max(0, MapsData.findIndex(r => r.id === initialRoomId));
  });
  const [current, setCurrent] = useState(initialIndex);
  
  const [selectedData, setSelectedData] = useState<{ poster: Poster; roomName: string } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (activeRoomId) {
      syncMapRoom(activeRoomId);
    }
  }, [activeRoomId]);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      const index = api.selectedScrollSnap();
      setCurrent(index);
      const room = MapsData[index];
      
      if (room) {
        setActiveRoomId(room.id);
      }
    };

    api.on("select", updateState);
    return () => {
      api.off("select", updateState);
    };
  }, [api]);

  const handleOpenDetail = useCallback((poster: Poster, roomName: string) => {
    setSelectedData({ poster, roomName });
    setIsDrawerOpen(true);
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      const index = MapsData.findIndex(r => r.id === selectedRoomId);
      if (index !== -1) {
        setActiveRoomId(selectedRoomId);
        setCurrent(index);
        api?.scrollTo(index);
      }
    }
  }, [selectedRoomId, api]);

  const handleMapPosterClick = useCallback((roomId: string, posterId: string) => {
    const room = MapsData.find(r => r.id === roomId);
    const poster = room?.posters?.find(p => p.id === posterId);
    if (room && poster) {
      handleOpenDetail(poster, room.name);
    }
  }, [handleOpenDetail]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  const handleMapClick = useCallback((roomId: string) => {
    const index = MapsData.findIndex(r => r.id === roomId);
    if (index !== -1) {
      scrollTo(index);
    }
  }, [scrollTo]);

  return (
    <div className="w-full max-w-md mx-auto">
      <section className="px-4 mb-8">
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
          <FloorMap 
            className="p-2" 
            onRoomSelect={handleMapClick} 
            activeRoomId={activeRoomId}
          />
        </div>
      </section>

      <Carousel 
        setApi={setApi} 
        className="w-full" 
        opts={{ align: "center", loop: true, startIndex: initialIndex }}
      >
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
                    : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 hover:border-slate-400 active:border-slate-400 dark:hover:border-slate-500 dark:active:border-slate-500"
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
                    <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 max-h-[58vh] overflow-y-auto">
                      {room.posters.map((poster) => (
                        <PosterCard 
                          key={poster.id} 
                          poster={poster} 
                          isDrawerOpen={isDrawerOpen}
                          onOpen={() => handleOpenDetail(poster, room.name)} 
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

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        {selectedData && <PosterDetail poster={selectedData.poster} roomName={selectedData.roomName} />}
      </Drawer>
    </div>
  );
};