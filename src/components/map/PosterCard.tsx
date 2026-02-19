import { Button } from "@/components/ui/button";
import { User, ChevronUp } from "lucide-react";
import type { Poster } from "@/types";

interface PosterCardProps {
  poster: Poster;
  onOpen: () => void;
}

export const PosterCard = ({ poster, onOpen }: PosterCardProps) => {
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

      {poster.description && (
        <p className="text-xs text-slate-500 mb-2">
          {poster.description}
        </p>
      )}

      <div className="mt-3">
        <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white" onClick={onOpen}>
          <ChevronUp size={14} />
          詳細を見る
        </Button>
      </div>
    </div>
  );
};