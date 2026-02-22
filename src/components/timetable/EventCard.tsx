import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function EventCard() {
  return (
     <div className="inline-flex flex-col bg-card rounded-xl border border-border shadow-sm p-5 transition-shadow hover:shadow-md">
        <time dateTime="2026-03-13" className="flex items-center justify-center gap-2 text-xl font-bold mb-3 text-slate-800 dark:text-slate-200">
          <CalendarDays className="text-muted-foreground" size={24} />
          2026.03.13 <span className="text-muted-foreground text-sm">(Fri)</span>
        </time>

        <div className="w-full h-px bg-border mb-3"></div>

        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
          
          <div className="flex items-center gap-1">
            <div className="p-1.5 bg-muted rounded-full">
              <Clock size={16} />
            </div>
            <span className="font-medium">12:00 受付開始</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="p-1.5 bg-muted rounded-full">
              <MapPin size={16} />
            </div>
            <span className="font-medium">大講義室</span>
          </div>

        </div>
      </div>
    );
};