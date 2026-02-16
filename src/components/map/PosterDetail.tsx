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

export const PosterDetail = ({ poster, roomName }: PosterDetailProps) => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>{poster.title}</DrawerTitle>
          <DrawerDescription className="flex flex-wrap items-center justify-center gap-x-12 gap-y-2 mt-1">
            {poster.author && (
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-slate-500" /> 
                {poster.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-500" /> 
              {roomName}
            </span>
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5 overflow-y-auto max-h-[60vh]">
          <div className="text-sm text-slate-700 whitespace-pre-wrap">
            {poster.details?.description || poster.description || "詳細情報"}
          </div>
          {poster.details?.image && (
            <div className="rounded-md overflow-hidden border border-slate-100 bg-slate-50 aspect-video relative mt-4">
              <img
                src={poster.details.image.src}
                alt={poster.title}
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
  );
};