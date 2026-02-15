import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { User } from "lucide-react";
import { PosterDetail } from "./PosterDetail";
import type { Poster } from "@/types";

interface PosterCardProps {
  poster: Poster;
}

export const PosterCard = ({ poster }: PosterCardProps) => {
  return (
    <div className="p-5 border-b border-slate-100 last:border-transparent hover:bg-slate-50 transition-colors">
      <h3 className="font-bold text-slate-800 text-sm mb-2">
        {poster.title}
      </h3>

      {poster.author && (
        <p className="flex items-center gap-2 leading-none text-xs text-slate-600 mb-2">
          <User size={14} />
          {poster.author}
        </p>
      )}

      {(poster.description || poster.details?.description) && (
        <p className="text-xs text-slate-500 mb-2">
          {poster.description || poster.details?.description}
        </p>
      )}

      <div className="mt-3">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white">
              詳細を見る
            </Button>
          </DrawerTrigger>
          <PosterDetail poster={poster} />
        </Drawer>
      </div>
    </div>
  );
};