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
    <div className="p-5 border-b border-mauve-100 dark:border-mauve-800 last:border-transparent hover:bg-mauve-50 active:bg-mauve-50 dark:hover:bg-mauve-800/40 dark:active:bg-mauve-800/40 transition-colors">
      <h3 className="font-bold text-mauve-800 dark:text-mauve-200 text-sm mb-2 flex">
        <span className="w-7">{poster.id}.</span>
        <span>{poster.title}</span>
      </h3>

      {poster.author && (
        <p className="flex items-center gap-2 leading-none text-xs text-mauve-600 dark:text-mauve-300 mb-2">
          <User size={14} />
          {poster.author}
        </p>
      )}

      {poster.description && (
        <p className="text-xs text-mauve-500 dark:text-mauve-400 mb-2">
          {poster.description}
        </p>
      )}

      <div className="mt-3">
        <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white dark:bg-mauve-900 text-mauve-700 dark:text-mauve-300" onClick={onOpen}>
          {isExpanded ? <ChevronDown size={14} className="text-mauve-700 dark:text-mauve-300" /> : <ChevronUp size={14} className="text-mauve-700 dark:text-mauve-300" />}
          詳細を見る
        </Button>
      </div>
    </div>
  );
};