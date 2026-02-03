import { Button } from "@/components/ui/button";
import { Clock, MapPin, ChevronRight, Mic, Users } from "lucide-react";

type TimetableItem = {
  title: string;
  time?: string;
  place?: string;
  speaker?: string;
  description?: string;
  action?: {
    label: string;
    url: string;
  };
  children?: TimetableItem[];
};

const timetableData: TimetableItem[] = [
  {
    time: "12:30",
    title: "開会式",
  },
  {
    time: "12:40",
    title: "全体発表",
    description: "ここに説明を入れる",
    children: [
      {
        title: "タイトル",
        speaker: "○○チーム",
        action: { label: "詳細", url: "/presentations/id_1" }
      },
      {
        title: "タイトル",
        speaker: "情報科○部○組 ○○",
        action: { label: "詳細", url: "/presentations/id_2" }
      },
      {
        title: "タイトル",
        speaker: "情報科○部○組 ○○",
        action: { label: "詳細", url: "/presentations/id_3" }
      },
      {
        title: "タイトル",
        speaker: "情報科○部○組 ○○",
        action: { label: "詳細", url: "/presentations/id_4" }
      }
    ]
  },
  {
    time: "14:00",
    title: "ポスター発表",
    description: "ここに説明を入れる",
    action: {
      label: "フロアマップを見る",
      url: "/posters"
    }
  },
  {
    time: "14:50",
    title: "閉会式",
  }
];

export const Timetable = () => {
  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {timetableData.map((item, index) => (
        <div key={index} className="relative pl-8 border-l border-slate-200 last:border-0 pb-10">
          {item.time && (
            <>
              <div className="absolute top-1.5 -left-1.25 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white z-10"></div>
              <div className="flex items-center text-sm font-semibold text-blue-600 mb-3 ml-1">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                {item.time}
              </div>
            </>
          )}

          <div className="group bg-white rounded-xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md overflow-hidden">
            <div className="p-5">
              {item.place && (
                <div className="inline-flex items-center text-[10px] font-medium uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-1 rounded-md mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  {item.place}
                </div>
              )}

              <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
                {item.title}
              </h2>
              
              {item.speaker && (
                <p className="text-sm text-slate-500 mt-2 flex items-center">
                  <Mic className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  {item.speaker}
                </p>
              )}

              {item.description && (
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.action && (
                <div className="mt-5">
                  <Button size="sm" className="w-full bg-slate-900 text-white hover:bg-slate-800 shadow-none" asChild>
                    <a href={item.action.url} className="flex items-center justify-center">
                      {item.action.label} <Users className="w-4 h-4 ml-2 opacity-70" />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {item.children && (
              <div className="bg-slate-50 border-t border-slate-100 divide-y divide-slate-100">
                {item.children.map((child, childIndex) => (
                  <div key={childIndex} className="p-4 hover:bg-slate-100/80 transition-colors">
                    <h3 className="font-medium text-slate-900 text-sm mb-1.5">
                      {child.title}
                    </h3>

                    {child.speaker && (
                      <p className="text-xs text-slate-500 mb-3 flex items-center">
                        <Mic className="w-3 h-3 mr-1.5 text-slate-400" />
                        {child.speaker}
                      </p>
                    )}

                    {child.action && (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs font-normal border-slate-200 bg-white hover:bg-white hover:text-blue-600" asChild>
                        <a href={child.action.url} className="flex items-center justify-between px-3">
                          <span>{child.action.label}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
};