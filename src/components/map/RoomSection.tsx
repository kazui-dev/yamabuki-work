import React, { useState } from 'react';
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Speech } from "lucide-react";
import { PosterDetail } from "./PosterDetail";
import { ClassroomMap } from "./ClassroomMap";
import type { Poster, RoomData } from "@/types";

interface RoomSectionProps extends RoomData {}

export const RoomSection: React.FC<RoomSectionProps> = ({ id, name, posters }) => {
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <section id={id} className="scroll-mt-16 mb-12">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{name}</h2>
        </div>

        <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
          <ClassroomMap roomId={id} className="p-2" />
        </div>

        <div className="space-y-2">
          {posters.map((poster) => (
            <div key={poster.id} className="border border-slate-100 rounded hover:bg-slate-50 transition-colors">
              <Drawer open={isDrawerOpen && selectedPoster?.id === poster.id} onOpenChange={(open) => {
                setIsDrawerOpen(open);
                if (!open) setSelectedPoster(null);
              }}>
                <DrawerTrigger asChild>
                  <button
                    onClick={() => {
                      setSelectedPoster(poster);
                      setIsDrawerOpen(true);
                    }}
                    className="w-full text-left p-3 flex flex-col gap-1 text-sm"
                  >
                    <span className="font-bold text-slate-800">
                      {poster.title}
                    </span>
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <Speech size={12} />
                      {poster.author}
                    </span>
                  </button>
                </DrawerTrigger>
                <PosterDetail poster={poster} />
              </Drawer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};