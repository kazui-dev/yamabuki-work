import { CalendarDays, Clock, MapPin } from "lucide-react";
import { EVENT_INFO } from '@/constants/config';

export const EventCard = () => {
  return (
     <div className="inline-flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-5 transition-shadow hover:shadow-md">
        <time dateTime={EVENT_INFO.date} className="flex items-center justify-center gap-2 text-xl font-bold mb-3">
          <CalendarDays className="text-slate-400" size={24} />
          {EVENT_INFO.dateJP} <span className="text-slate-400 text-sm">(Fri)</span>
        </time>

        <div className="w-full h-px bg-slate-100 mb-3"></div>

        <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
          
          <div className="flex items-center gap-1">
            <div className="p-1.5 bg-slate-50 rounded-full">
              <Clock size={16} />
            </div>
            <span className="font-medium">{EVENT_INFO.startTime} 受付開始</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="p-1.5 bg-slate-50 rounded-full">
              <MapPin size={16} />
            </div>
            <span className="font-medium">{EVENT_INFO.location}</span>
          </div>

        </div>
      </div>
    );
};