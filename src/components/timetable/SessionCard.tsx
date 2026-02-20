import { Button } from "@/components/ui/button";
import { Clock, Speech, ChevronUp, ChevronDown } from "lucide-react";
import type { TimetableSession } from "@/types";

interface SessionCardProps {
  session: TimetableSession;
  onNavigate: (view: 'timetable' | 'map') => void;
  onOpenDetail?: (session: TimetableSession) => void;
  isDrawerOpen: boolean;
}

export const SessionCard = ({ session, onNavigate, onOpenDetail, isDrawerOpen }: SessionCardProps) => {
  return (
    <div className="p-5 border-b border-slate-100 dark:border-slate-800 last:border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
      {session.time && (
        <div className="flex items-center gap-1.5 leading-none text-xs text-slate-500 dark:text-slate-400 font-bold mb-2">
          <Clock size={14} />
          {session.time}
        </div>
      )}

      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2">
        {session.title}
      </h3>

      {session.author && (
        <p className="flex items-center gap-1.5 leading-none text-xs text-slate-600 dark:text-slate-300 mb-2">
          <Speech size={14} />
          {session.author}
        </p>
      )}

      {session.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {session.description}
        </p>
      )}

      {session.details ? (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-8 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            onClick={() => onOpenDetail?.(session)}
          >
            {isDrawerOpen ? <ChevronDown size={14} className="text-slate-700 dark:text-slate-300" /> : <ChevronUp size={14} className="text-slate-700 dark:text-slate-300" />}
            詳細を見る
          </Button>
        </div>
      ) : session.action ? (
        <div className="mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-8 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 [&_svg]:text-slate-700 [&_svg]:dark:text-slate-300" 
            onClick={() => {
              if (session.action) {
                onNavigate(session.action.targetView);
              }
            }}
          >
            {session.action.icon && <session.action.icon size={14} />}
            {session.action.label}
          </Button>
        </div>
      ) : null}
    </div>
  );
};