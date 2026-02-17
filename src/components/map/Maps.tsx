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
import { ROOM_DATA } from "@/constants/maps";

export const Maps: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();

  const getInitialRoomId = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomId = params.get('room');
      if (roomId && ROOM_DATA.some(r => r.id === roomId)) return roomId;
    }
    return ROOM_DATA[0]?.id || null;
  };

  const [activeRoomId, setActiveRoomId] = useState<string | null>(getInitialRoomId());
  const [current, setCurrent] = useState(0);
  const [selectedData, setSelectedData] = useState<{ poster: Poster; roomName: string } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    const initialIndex = ROOM_DATA.findIndex(r => r.id === activeRoomId);
    if (initialIndex !== -1) {
      api.scrollTo(initialIndex, true);
      setCurrent(initialIndex);
    }
  }, [api]);

  useEffect(() => {
    if (activeRoomId && typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', 'map');
      url.searchParams.set('room', activeRoomId);
      window.history.replaceState(window.history.state, '', url.toString());
    }
  }, [activeRoomId]);

  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      const index = api.selectedScrollSnap();
      setCurrent(index);
      const room = ROOM_DATA[index];
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

  const handleMapPosterClick = useCallback((roomId: string, posterId: string) => {
    const room = ROOM_DATA.find(r => r.id === roomId);
    const poster = room?.posters?.find(p => p.id === posterId);
    if (room && poster) {
      handleOpenDetail(poster, room.name);
    }
  }, [handleOpenDetail]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  const handleMapClick = useCallback((roomId: string) => {
    const index = ROOM_DATA.findIndex(r => r.id === roomId);
    if (index !== -1) {
      scrollTo(index);
    }
  }, [scrollTo]);

  return (
    <div className="w-full max-w-md mx-auto">
      <section className="px-4 mb-8">
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
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
        opts={{ align: "center", loop: true }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white border-slate-200 h-9 w-9 shadow-sm" />
          
          <div className="flex gap-2">
            {ROOM_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 w-2.5 rounded-full border transition-colors ${
                  index === current 
                    ? "bg-slate-800 border-slate-800" 
                    : "bg-white border-slate-300 hover:border-slate-400"
                }`}
              />
            ))}
          </div>

          <CarouselNext className="static translate-y-0 translate-x-0 bg-white border-slate-200 h-9 w-9 shadow-sm" />
        </div>

        <CarouselContent className="items-start">
          {ROOM_DATA.map((room) => {
            const RoomMapComponent = getRoomMapComponent(room.id);
            return (
              <CarouselItem key={room.id} className="pl-4">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-4">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-slate-800">{room.name}</h2>
                    {RoomMapComponent && (
                      <RoomMapComponent 
                        roomId={room.id} 
                        onPosterClick={(posterId: string) => handleMapPosterClick(room.id, posterId)} 
                      />
                    )}
                  </div>

                  {room.posters && room.posters.length > 0 && (
                    <div className="border-t border-slate-100 bg-slate-50/50 max-h-[58vh] overflow-y-auto">
                      {room.posters.map((poster) => (
                        <PosterCard 
                          key={poster.id} 
                          poster={poster} 
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