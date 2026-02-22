import { Button } from "@/components/ui/button";
import { User, ChevronUp, ChevronDown } from "lucide-react";
import type { Poster } from "@/types";

interface PosterCardProps {
  poster: Poster;
  onOpen: () => void;
  isExpanded: boolean;
}

export default function PosterCard({ poster, onOpen, isExpanded }: PosterCardProps) {
  return (
    <div className="p-5 border-b border-slate-100 dark:border-slate-800 last:border-transparent hover:bg-slate-50 active:bg-slate-50 dark:hover:bg-slate-800/40 dark:active:bg-slate-800/40 transition-colors">
      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">
        {poster.title}
      </h3>

      {poster.author && (
        <p className="flex items-center gap-2 leading-none text-xs text-slate-600 dark:text-slate-300 mb-2">
          <User size={14} />
          {poster.author}
        </p>
      )}

      {poster.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {poster.description}
        </p>
      )}

      <div className="mt-3">
        <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300" onClick={onOpen}>
          {isExpanded ? <ChevronDown size={14} className="text-slate-700 dark:text-slate-300" /> : <ChevronUp size={14} className="text-slate-700 dark:text-slate-300" />}
          詳細を見る
        </Button>
      </div>
    </div>
  );
};