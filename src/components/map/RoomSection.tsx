import React from 'react';
import { ClassroomMap } from "./ClassroomMap";
import { PosterCard } from "./PosterCard";
import type { RoomData } from "@/types";

interface RoomSectionProps extends RoomData {}

export const RoomSection: React.FC<RoomSectionProps> = ({ id, name, posters }) => {
  return (
    <section id={id} className="scroll-mt-16 mb-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-bold text-slate-800">{name}</h2>
            <ClassroomMap roomId={id} />
          </div>

          {posters && posters.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50/50">
              {posters.map((poster) => (
                <PosterCard key={poster.id} poster={poster} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};