import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Speech } from "lucide-react";
import type { SessionDetails } from "@/types";

interface SessionDetailProps {
  title: string;
  author?: string;
  details: SessionDetails;
}

export const SessionDetail = ({ title, author, details }: SessionDetailProps) => {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {author && (
            <DrawerDescription className="flex items-center justify-center gap-2">
              <Speech size={14} /> {author}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className="p-5 overflow-y-auto max-h-[60vh]">
          <div className="text-sm text-slate-700 whitespace-pre-wrap">
            {details.description}
          </div>
          {details.image && (
            <div className="rounded-md overflow-hidden border border-slate-100 bg-slate-50 aspect-video relative mt-4">
              <img
                src={details.image.src}
                alt={title}
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
