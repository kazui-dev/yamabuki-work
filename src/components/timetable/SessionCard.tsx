import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Clock, Speech } from "lucide-react";
import { SessionDetail } from "./SessionDetail";
import type { TimetableSession } from "@/types";

interface SessionCardProps {
  session: TimetableSession;
}

export const SessionCard = ({ session }: SessionCardProps) => {
  return (
    <div className="p-5 border-b border-slate-100 last:border-transparent hover:bg-slate-50 transition-colors">
      {session.time && (
        <div className="flex items-center gap-1.5 leading-none text-xs text-slate-500 font-bold mb-2">
          <Clock />
          {session.time}
        </div>
      )}

      <h3 className="font-bold text-slate-800 text-sm mb-2">
        {session.title}
      </h3>

      {session.author && (
        <p className="flex items-center gap-1.5 leading-none text-xs text-slate-600 mb-2">
          <Speech size={14} />
          {session.author}
        </p>
      )}

      {session.description && (
        <p className="text-xs text-slate-500 mb-2">
          {session.description}
        </p>
      )}

      {session.details ? (
        <div className="mt-3">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white">
                詳細を見る
              </Button>
            </DrawerTrigger>
            <SessionDetail
              title={session.title}
              author={session.author}
              details={session.details}
            />
          </Drawer>
        </div>
      ) : session.action ? (
        <div className="mt-3">
          <Button variant="outline" size="sm" className="w-full h-8 text-xs bg-white" asChild>
            <a href={session.action.url}>{session.action.label}</a>
          </Button>
        </div>
      ) : null}
    </div>
  );
};
