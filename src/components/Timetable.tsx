import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Clock, Mic } from "lucide-react";

// 1. 型定義を拡張：詳細情報（画像とテキスト）を追加
type TimetableItem = {
  title: string;
  time?: string;
  speaker?: string;
  description?: string;
  details?: {
    description: string; // 詳細な説明文
    imageUrl?: string;   // 画像のパス
  };
  children?: TimetableItem[];
  action?: {
    label: string;
    url: string;
  };
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
        details: {
          description: "ここに詳細を入れる",
        }
      },
      {
        title: "タイトル",
        speaker: "情報科○部○組 ○○",
        details: {
          description: "ここに詳細を入れる",
        }
      },
      {
        title: "タイトル",
        speaker: "情報科○部○組 ○○",
        details: {
          description: "ここに詳細を入れる",
        }
      },
      {
        title: "タイトル",
        speaker: "情報科○部○組 ○○",
        details: {
          description: "ここに詳細を入れる",
        }
      }
    ]
  },
  {
    time: "14:00",
    title: "ポスター発表",
    description: "ここに説明を入れる",
    action: {
      label: "フロアマップはこちら",
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
        <div key={index} className="relative pl-6 border-l-2 border-slate-200 last:border-transparent pb-2">
          {item.time && (
            <>
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400 border-2 border-white z-10"></div>
              <div className="flex items-center gap-1.5 leading-none text-sm text-slate-500 font-bold mb-2">
                <Clock size={16} />
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
                <p className="flex items-center gap-1.5 leading-none text-sm text-slate-600 mt-1">
                  <Mic size={16} />
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
                    <a href={item.action.url}>{item.action.label}</a>
                  </Button>
                </div>
              )}
            </div>

            {item.children && (
              <div className="border-t border-slate-100 bg-slate-50/50">
                {item.children.map((child, childIndex) => (
                  <div key={childIndex} className="p-4 border-b border-slate-100 last:border-transparent hover:bg-slate-50 transition-colors">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">
                      {child.title}
                    </h3>

                    {child.speaker && (
                      <p className="text-xs text-slate-600 mb-2 flex items-center leading-none">
                        <Mic className="mr-1" size={14} />
                        {child.speaker}
                      </p>
                    )}

                    {child.details ? (
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white mt-1">
                            詳細を見る
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="mx-auto w-full max-w-md">
                            <DrawerHeader>
                              <DrawerTitle>{child.title}</DrawerTitle>
                              {child.speaker && (
                                <DrawerDescription className="flex items-center justify-center gap-1">
                                  <Mic size={14} /> {child.speaker}
                                </DrawerDescription>
                              )}
                            </DrawerHeader>
                            
                            {/* スクロール可能なコンテンツエリア */}
                            <div className="p-4 overflow-y-auto max-h-[60vh]">
                              {child.details.imageUrl && (
                                <div className="rounded-md overflow-hidden border border-slate-100 bg-slate-50 aspect-video mb-4 relative">
                                  <img 
                                    src={child.details.imageUrl} 
                                    alt={child.title}
                                    className="object-cover w-full h-full" 
                                  />
                                </div>
                              )}
                              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                                {child.details.description}
                              </div>
                            </div>

                            <DrawerFooter>
                              <DrawerClose asChild>
                                <Button variant="outline">閉じる</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    ) : child.action ? (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white mt-1" asChild>
                        <a href={child.action.url}>{child.action.label}</a>
                      </Button>
                    ) : null}
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