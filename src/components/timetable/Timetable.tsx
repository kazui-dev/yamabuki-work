import { Button } from "@/components/ui/button";
import { Clock, Speech } from "lucide-react";
import { timetable } from "@/constants/timetable";
import { SessionCard } from "./SessionCard";
import type { TimetableItem } from "@/types";

export const Timetable = () => {
  return (
    <div className="max-w-md mx-auto space-y-8">
      {timetable.map((item: TimetableItem, index) => (
        <div key={index} className="relative pl-6 border-l-2 border-slate-200 last:border-transparent pb-4">
          {item.time && (
            <>
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400 border-2 border-white z-10"></div>
              <div className="flex items-center gap-1.5 leading-none text-sm text-slate-500 font-bold mb-3">
                <Clock size={16} />
                {item.time}
              </div>
            </>
          )}

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {item.title}
              </h2>

              {item.author && (
                <p className="flex items-center gap-2 leading-none text-sm text-slate-600 mt-2">
                  <Speech size={14} />
                  {item.author}
                </p>
              )}

              {item.description && (
                <p className="text-xs text-slate-500 mt-2">
                  {item.description}
                </p>
              )}

              {item.action && (
                <div className="mt-4">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <a href={item.action.url}>{item.action.label}</a>
                  </Button>
                </div>
              )}
            </div>

            {item.sessions && (
              <div className="border-t border-slate-100 bg-slate-50/50">
                {item.sessions.map((session, sIndex) => (
                  <SessionCard key={sIndex} session={session} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};