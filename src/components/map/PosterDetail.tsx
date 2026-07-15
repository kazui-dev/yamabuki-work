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
      <div className="mx-auto w-full max-w-md md:max-w-2xl">
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
          {poster.details?.images && poster.details.images.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              {poster.details.images.map((src, i) => (
                <div key={i} className="rounded-md overflow-hidden border border-border bg-muted/30">
                  <img src={src} alt={`${poster.title} ${i + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          )}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="text-mauve-700 dark:text-mauve-300">閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
};