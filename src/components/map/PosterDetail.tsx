import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { User } from "lucide-react";
import type { Poster } from "@/types";

interface PosterDetailProps {
  poster: Poster;
}

export const PosterDetail = ({ poster }: PosterDetailProps) => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>{poster.title}</DrawerTitle>
          {poster.author && (
            <DrawerDescription className="flex items-center justify-center gap-2">
              <User size={14} /> {poster.author}
            </DrawerDescription>
          )}
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