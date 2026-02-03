import { Button } from "@/components/ui/button";
import { Clock, MapPin, ChevronRight, Mic, Users } from "lucide-react";

type TimetableItem = {
  title: string;
  time?: string;
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
    <div className="max-w-md mx-auto space-y-6">
      {timetableData.map((item, index) => (
        <div key={index} className="relative pl-6 border-l-2 border-slate-200 last:border-0 pb-2">
          {item.time && (
            <>
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400 border-2 border-white z-10"></div>
              <div className="flex items-center text-sm font-bold text-slate-500 mb-2 leading-none">
                <Clock className="mr-1" size={14} />
                {item.time}
              </div>
            </>
          )}

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 pb-3">

              <h2 className="text-lg font-bold text-slate-800 leading-snug">
                {item.title}
              </h2>
              
              {item.speaker && (
                <p className="text-sm text-slate-600 mt-1 flex items-center leading-none">
                  <Mic className="mr-1" size={14}/>
                  {item.speaker}
                </p>
              )}

              {item.description && (
                <p className="text-xs text-slate-500 mt-1">
                  {item.description}
                </p>
              )}

              {item.action && (
                <div className="mt-3">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <a href={item.action.url}>
                      {item.action.label} <Users className="ml-1" size={14} />
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {item.children && (
              <div className="border-t border-slate-100 bg-slate-50/50">
                {item.children.map((child, childIndex) => (
                  <div key={childIndex} className="p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">
                      {child.title}
                    </h3>

                    {child.speaker && (
                      <p className="text-xs text-slate-600 mb-2 flex items-center leading-none">
                        <Mic className="mr-1" size={14} />
                        {child.speaker}
                      </p>
                    )}

                    {child.action && (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white mt-1" asChild>
                        <a href={child.action.url}>
                          {child.action.label} <ChevronRight className="ml-1" size={14} />
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