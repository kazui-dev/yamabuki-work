import React, { useState, useEffect, useCallback } from 'react';
import { FloorMap } from "./FloorMap";
import { PosterCard } from "./PosterCard";
import { getRoomMapComponent } from "./rooms";
import type { RoomData } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface MapsProps {
  roomsData: RoomData[];
}

export const Maps: React.FC<MapsProps> = ({ roomsData }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeRoomId, setActiveRoomId] = useState<string | null>(roomsData[0]?.id || null);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      const room = roomsData[currentIndex];
      if (room) {
        setActiveRoomId(room.id);
      }
    });
  }, [api, roomsData]);

  const handleMapClick = useCallback((roomId: string) => {
    const index = roomsData.findIndex(r => r.id === roomId);
    if (index !== -1 && api) {
      api.scrollTo(index);
      setActiveRoomId(roomId);
    }
  }, [api, roomsData]);

  return (
    <div className="w-full max-w-md mx-auto">
      <section className="mb-6">
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
        opts={{ align: "center" }}
      >
        <div className="flex items-center justify-end gap-2 mb-4 px-4">
          <CarouselPrevious className="static translate-y-0 translate-x-0 bg-white hover:bg-slate-50"/>
          <CarouselNext className="static translate-y-0 translate-x-0 bg-white hover:bg-slate-50"/>
        </div>
        <CarouselContent className="items-start">
          {roomsData.map((room) => {
            const RoomMapComponent = getRoomMapComponent(room.id);
            return (
              <CarouselItem key={room.id} className="pl-4 md:basis-full">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <h2 className="text-lg font-bold text-slate-800">{room.name}</h2>
                    {RoomMapComponent && <RoomMapComponent roomId={room.id} />}
                  </div>

                  {room.posters && room.posters.length > 0 && (
                    <div className="border-t border-slate-100 bg-slate-50/50">
                      {room.posters.map((poster) => (
                        <PosterCard key={poster.id} poster={poster} />
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
    
  );
};