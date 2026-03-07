import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { User, MapPin } from "lucide-react";
import type { Poster } from "@/types";

interface PosterDetailProps {
  poster: Poster;
  roomName: string;
}

export default function PosterDetail({ poster, roomName }: PosterDetailProps) {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>{poster.title}</DrawerTitle>
          <DrawerDescription className="flex flex-wrap items-center w-full px-6 gap-y-2 mt-2">
            {poster.author && (
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-muted-foreground" /> 
                {poster.author}
              </span>
            )}
            <span className="flex items-center gap-1.5 ml-auto">
              <MapPin size={14} className="text-muted-foreground" /> 
              {roomName}
            </span>
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5 overflow-y-auto max-h-[60vh]">
          <div className="text-sm text-foreground whitespace-pre-wrap">
            {poster.details?.description || poster.description || "詳細情報"}
          </div>
          {poster.details?.image && (
            <div className="rounded-md overflow-hidden border border-border bg-muted/30 mt-4">
              <img
                src={poster.details.image}
                alt={poster.title}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="text-slate-700 dark:text-slate-300">閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};