import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Clock, Speech } from "lucide-react";
import { SESSION_STYLES, BUTTON_STYLES } from "@/constants/styleConstants";
import { SessionDetail } from "./SessionDetail";
import type { TimetableSession } from "@/types";

interface SessionCardProps {
  session: TimetableSession;
}

export const SessionCard = ({ session }: SessionCardProps) => {
  return (
    <div className={SESSION_STYLES.itemContainer}>
      {session.time && (
        <div className={SESSION_STYLES.timeContainer}>
          <Clock />
          {session.time}
        </div>
      )}

      <h3 className={SESSION_STYLES.sessionTitle}>
        {session.title}
      </h3>

      {session.author && (
        <p className={SESSION_STYLES.authorText}>
          <Speech size={14} />
          {session.author}
        </p>
      )}

      {session.description && (
        <p className={SESSION_STYLES.descriptionText}>
          {session.description}
        </p>
      )}

      {session.details ? (
        <div className={SESSION_STYLES.detailButtonContainer}>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className={BUTTON_STYLES.detailButton}>
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
        <div className={SESSION_STYLES.detailButtonContainer}>
          <Button variant="outline" size="sm" className={BUTTON_STYLES.detailButton} asChild>
            <a href={session.action.url}>{session.action.label}</a>
          </Button>
        </div>
      ) : null}
    </div>
  );
};
