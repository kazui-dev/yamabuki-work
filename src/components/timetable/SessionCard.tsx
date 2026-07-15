import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Clock, Speech, ChevronUp, ChevronDown } from "lucide-react";
import { useScrollStore } from "@/store/useScrollStore";
import type { TimetableSession } from "@/types";

interface SessionCardProps {
  session: TimetableSession;
  onOpenDetail?: (session: TimetableSession) => void;
  isExpanded: boolean;
}

export default function SessionCard({ session, onOpenDetail, isExpanded }: SessionCardProps) {
  const clearScrollPosition = useScrollStore(state => state.clearScrollPosition);
  const targetPath = session.action?.targetView === 'timetable' ? '/' : `/${session.action?.targetView}`;

  return (
    <div className="p-5 border-b border-mauve-100 dark:border-mauve-800 last:border-transparent hover:bg-white active:bg-white dark:hover:bg-mauve-800/40 dark:active:bg-mauve-800/40 transition-colors">
      {session.time && (
        <div className="flex items-center gap-1.5 leading-none text-xs text-mauve-700 dark:text-mauve-100 font-bold mb-2">
          <Clock size={14} />
          {session.time}
        </div>
      )}

      <h3 className="font-bold text-mauve-800 dark:text-mauve-200 text-sm mb-2">
        {session.title}
      </h3>

      {session.author && (
        <p className="flex items-center gap-1.5 leading-none text-xs text-mauve-600 dark:text-mauve-300 mb-2">
          <Speech size={14} />
          {session.author}
        </p>
      )}

      {session.description && (
        <p className="text-xs text-mauve-500 dark:text-mauve-400 mb-2">
          {session.description}
        </p>
      )}

      {session.details ? (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-8 text-xs bg-white dark:bg-mauve-900 text-mauve-700 dark:text-mauve-300"
            onClick={() => onOpenDetail?.(session)}
          >
            {isExpanded ? <ChevronDown size={14} className="text-mauve-700 dark:text-mauve-300" /> : <ChevronUp size={14} className="text-mauve-700 dark:text-mauve-300" />}
            詳細を見る
          </Button>
        </div>
      ) : session.action ? (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-8 text-xs bg-white dark:bg-mauve-900 text-mauve-700 dark:text-mauve-300 [&_svg]:text-mauve-700 [&_svg]:dark:text-mauve-300" 
            asChild
          >
            <Link
              to={targetPath as any}
              onClick={() => clearScrollPosition(targetPath)}
            >
              {session.action.icon && <session.action.icon size={14} />}
              {session.action.label}
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}