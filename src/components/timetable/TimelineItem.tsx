import { Button } from "@/components/ui/button";
import { Clock, Speech } from "lucide-react";
import { TIMELINE_STYLES, BUTTON_STYLES } from "@/constants/styleConstants";
import { SessionCard } from "./SessionCard";
import type { TimetableItem } from "@/types";

interface TimelineItemProps {
  item: TimetableItem;
}

export const TimelineItem = ({ item }: TimelineItemProps) => {
  return (
    <div className={TIMELINE_STYLES.itemContainer}>
      {item.time && (
        <>
          <div className={TIMELINE_STYLES.dot}></div>
          <div className={TIMELINE_STYLES.timeContainer}>
            <Clock size={16} />
            {item.time}
          </div>
        </>
      )}

      <div className={TIMELINE_STYLES.cardContainer}>
        <div className={TIMELINE_STYLES.cardContent}>
          <h2 className={TIMELINE_STYLES.cardTitle}>
            {item.title}
          </h2>
          {item.speaker && (
            <p className={TIMELINE_STYLES.speakerText}>
              <Speech size={14} />
              {item.speaker}
            </p>
          )}
          {item.description && (
            <p className={TIMELINE_STYLES.descriptionText}>
              {item.description}
            </p>
          )}
          {item.action && (
            <div className={TIMELINE_STYLES.actionButtonContainer}>
              <Button size="sm" className={BUTTON_STYLES.actionButton} asChild>
                <a href={item.action.url}>{item.action.label}</a>
              </Button>
            </div>
          )}
        </div>

        {item.sessions && (
          <div className="border-t border-slate-100 bg-slate-50/50">
            {item.sessions.map((session, index) => (
              <SessionCard key={index} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
