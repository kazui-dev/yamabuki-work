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
import { DRAWER_STYLES } from "@/constants/styleConstants";
import type { SessionDetails } from "@/types";

interface SessionDetailProps {
  title: string;
  speaker?: string;
  details: SessionDetails;
}

export const SessionDetail = ({ title, speaker, details }: SessionDetailProps) => {
  return (
    <DrawerContent>
      <div className={DRAWER_STYLES.container}>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {speaker && (
            <DrawerDescription className="flex items-center justify-center gap-2">
              <Speech size={14} /> {speaker}
            </DrawerDescription>
          )}
        </DrawerHeader>

        <div className={DRAWER_STYLES.contentArea}>
          <div className={DRAWER_STYLES.contentText}>
            {details.description}
          </div>
          {details.image && (
            <div className={DRAWER_STYLES.imageContainer}>
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
