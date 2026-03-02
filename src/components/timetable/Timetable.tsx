import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Clock, Speech } from "lucide-react";

import { timetable } from "@/constants/timetable";
import EventCard from "./EventCard";
import SessionCard from "./SessionCard";
import SessionDetail from "./SessionDetail";
import type { TimetableItem, TimetableSession } from "@/types";

import { useMapStore } from '@/store/useMapStore';
import { useScrollStore } from '@/store/useScrollStore';
import { formatRoomIdForUrl } from '@/lib/utils';

export default function Timetable() {
  const [selectedSession, setSelectedSession] = useState<TimetableSession | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const lastRoomId = useMapStore(state => state.lastRoomId);
  const clearScrollPosition = useScrollStore(state => state.clearScrollPosition);

  const handleOpenDetail = (session: TimetableSession) => {
    setSelectedSession(session);
    setIsDrawerOpen(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-8 relative">
      <div className="flex justify-center w-full">
        <EventCard />
      </div>
      {timetable.map((item: TimetableItem, index) => {
        const action = item.action;
        const targetPath = action?.targetView === 'timetable' ? '/' : `/${action?.targetView}`;
        const isMapTarget = action?.targetView === 'map';

        return (
        <div key={`${item.title}-${index}`} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-700 last:border-transparent pb-4">
          {item.time && (
            <>
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-500 border-2 border-white dark:border-slate-950 z-10"></div>
              <div className="flex items-center gap-1.5 leading-none text-sm text-slate-500 dark:text-slate-400 font-bold mb-3">
                <Clock size={16} />
                {item.time}
              </div>
            </>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 pb-4">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.title}</h2>
              {item.author && (
                <p className="flex items-center gap-2 leading-none text-sm text-slate-600 dark:text-slate-300 mt-2">
                  <Speech size={14} />{item.author}
                </p>
              )}
              {item.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.description}</p>
              )}

              {action && (
                <div className="mt-4">
                  <Button size="sm" asChild className="w-full bg-slate-100 hover:bg-slate-200 active:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-600 text-slate-800 dark:text-slate-100">
                    {isMapTarget ? (
                      <Link 
                        to="/map"
                        search={lastRoomId ? { r: formatRoomIdForUrl(lastRoomId) } : undefined}
                        onClick={() => clearScrollPosition('/map')}
                      >
                        {action.icon && <action.icon size={16} />}
                        {action.label}
                      </Link>
                      ) : (
                      <Link 
                        to={targetPath as any}
                        onClick={() => clearScrollPosition(targetPath)}
                      >
                        {action.icon && <action.icon size={16} />}
                        {action.label}
                      </Link>
                      )}
                  </Button>
                </div>
              )}
            </div>

            {item.sessions && (
              <div className="border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50">
                {item.sessions.map((session, sIndex) => (
                  <SessionCard 
                    key={sIndex} 
                    session={session} 
                    onOpenDetail={handleOpenDetail}
                    isExpanded={isDrawerOpen && selectedSession === session}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        )
      })}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        {selectedSession?.details && (
          <SessionDetail
            title={selectedSession.title}
            author={selectedSession.author}
            details={selectedSession.details}
          />
        )}
      </Drawer>
    </div>

  );
}