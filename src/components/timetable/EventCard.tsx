import { CalendarDays, Clock, MapPin } from "lucide-react";

export const EventCard = () => {
  return (
     <div className="inline-flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-5 transition-shadow hover:shadow-md">
        <time dateTime="2026-03-13" className="flex items-center justify-center gap-2 text-xl font-bold mb-3">
          <CalendarDays className="text-slate-400" size={24} />
          2026.03.13 <span className="text-slate-400 text-sm">(Fri)</span>
        </time>

        <div className="w-full h-px bg-slate-100 mb-3"></div>

        <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
          
          <div className="flex items-center gap-1">
            <div className="p-1.5 bg-slate-50 rounded-full">
              <Clock size={16} />
            </div>
            <span className="font-medium">12:00 受付開始</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="p-1.5 bg-slate-50 rounded-full">
              <MapPin size={16} />
            </div>
            <span className="font-medium">大講義室</span>
          </div>

        </div>
      </div>
    );
};