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
import { Clock, Speech } from "lucide-react";
import { timetable } from "@/constants/timetable";

export const Timetable = () => {
  return (
    <div className="max-w-md mx-auto space-y-8">
      {timetable.map((item, index) => (
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
              {item.speaker && (
                <p className="flex items-center gap-2 leading-none text-sm text-slate-600 mt-2">
                  <Speech size={14} />
                  {item.speaker}
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
                {item.sessions.map((session, sessionIndex) => (
                  <div key={sessionIndex} className="p-5 border-b border-slate-100 last:border-transparent hover:bg-slate-50 transition-colors">
                    
                    {session.time && (
                      <div className="flex items-center gap-1.5 leading-none text-xs text-slate-500 font-bold mb-2">
                        <Clock size={12} />
                        {session.time}
                      </div>
                    )}

                    <h3 className="font-bold text-slate-800 text-sm mb-2">
                      {session.title}
                    </h3>

                    {session.speaker && (
                      <p className="flex items-center gap-2 leading-none text-xs text-slate-600 mb-2">
                        <Speech size={14} />
                        {session.speaker}
                      </p>
                    )}

                    {session.description && (
                      <p className="text-xs text-slate-500 mb-2">
                        {session.description}
                      </p>
                    )}

                    {session.details ? (
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white mt-3">
                            詳細を見る
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <div className="mx-auto w-full max-w-md">
                            <DrawerHeader>
                              <DrawerTitle>{session.title}</DrawerTitle>
                              {session.speaker && (
                                <DrawerDescription className="flex items-center justify-center gap-2">
                                  <Speech size={14} /> {session.speaker}
                                </DrawerDescription>
                              )}
                            </DrawerHeader>
                            
                            <div className="p-5 overflow-y-auto max-h-[60vh]">
                              <div className="text-sm text-slate-700 whitespace-pre-wrap">
                                {session.details.description}
                              </div>              
                              {session.details.image && (
                                <div className="rounded-md overflow-hidden border border-slate-100 bg-slate-50 aspect-video relative mt-4">
                                  <img 
                                    src={session.details.image.src} 
                                    alt={session.title}
                                    className="object-cover w-full h-full" 
                                  />
                                </div>
                              )}
                            </div>

                            <DrawerFooter>
                              <DrawerClose asChild>
                                <Button variant="outline">閉じる</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    ) : session.action ? (
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white mt-3" asChild>
                        <a href={session.action.url}>{session.action.label}</a>
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