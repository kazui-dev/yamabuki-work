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
    <div className="max-w-md mx-auto space-y-6">
      {timetableData.map((item, index) => (
        <div key={index} className="relative pl-6 border-l-2 border-slate-200 last:border-0 pb-2">
          {item.time && (
            <>
              {/* 修正1: top-0 を top-0.5 に変更し、text-sm(20px高)の中心(10px)と h-4(16px高)の中心を合わせる */}
              <div className="absolute -left-2.25 top-0.5 w-4 h-4 rounded-full bg-slate-400 border-2 border-white z-10"></div>
              
              <div className="flex items-center text-sm font-bold text-slate-500 mb-2 leading-5">
                {/* 微調整: アイコンが小さい(w-3)ため、視覚的に少し上げたい場合は mb-0.5 などで調整可能ですが、基本はitems-centerでOK */}
                <Clock className="w-3 h-3 mr-1" />
                {item.time}
              </div>
            </>
          )}

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 pb-3">
              {item.place && (
                <div className="inline-flex items-center text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded mb-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {item.place}
                </div>
              )}

              <h2 className="text-lg font-bold text-slate-800 leading-snug">
                {item.title}
              </h2>
              
              {item.speaker && (
                /* 修正2: items-center を items-start に変更し、長文対応。
                   text-sm (line-height: 20px) に対し、アイコン(12px)を中央に置くため mt-1 (4px) を追加 
                   ((20px - 12px) / 2 = 4px) */
                <p className="text-sm text-slate-600 mt-1 flex items-start">
                  <Mic className="w-3 h-3 mr-1 mt-1 shrink-0" />
                  <span>{item.speaker}</span>
                </p>
              )}

              {item.description && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.action && (
                <div className="mt-3">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <a href={item.action.url} className="flex items-center justify-center">
                      {item.action.label} <Users className="w-4 h-4 ml-1" />
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
                      /* 修正3: children内のスピーカーも同様に items-start + mt-0.5 (text-xs用) に修正 
                         text-xs (line-height: 16px) - icon(12px) = 4px余り / 2 = 2px (mt-0.5) */
                      <p className="text-xs text-slate-600 mb-2 flex items-start">
                        <Mic className="w-3 h-3 mr-1 mt-0.5 shrink-0" />
                        <span>{child.speaker}</span>
                      </p>
                    )}

                    {child.action && (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white mt-1" asChild>
                        <a href={child.action.url} className="flex items-center justify-center">
                          {child.action.label} <ChevronRight className="w-3 h-3 ml-1" />
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