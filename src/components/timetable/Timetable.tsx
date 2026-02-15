import { Button } from "@/components/ui/button";
import { Clock, Speech } from "lucide-react";
import { TIMETABLE_STYLES, BUTTON_STYLES } from "@/constants/styleConstants";
import { timetable } from "@/constants/timetable";
import { SessionCard } from "./SessionCard";
import type { TimetableItem } from "@/types";

export const Timetable = () => {
  return (
    <div className={TIMETABLE_STYLES.container}>
      {timetable.map((item: TimetableItem, index) => (
        <div key={index} className={TIMETABLE_STYLES.itemContainer}>
          {item.time && (
            <>
              <div className={TIMETABLE_STYLES.dot}></div>
              <div className={TIMETABLE_STYLES.timeContainer}>
                <Clock size={16} />
                {item.time}
              </div>
            </>
          )}

          <div className={TIMETABLE_STYLES.cardContainer}>
            <div className={TIMETABLE_STYLES.cardContent}>
              <h2 className={TIMETABLE_STYLES.cardTitle}>
                {item.title}
              </h2>
              
              {item.author && (
                <p className={TIMETABLE_STYLES.authorText}>
                  <Speech size={14} />
                  {item.author}
                </p>
              )}
              
              {item.description && (
                <p className={TIMETABLE_STYLES.descriptionText}>
                  {item.description}
                </p>
              )}
              
              {item.action && (
                <div className={TIMETABLE_STYLES.actionButtonContainer}>
                  <Button size="sm" className={BUTTON_STYLES.actionButton} asChild>
                    <a href={item.action.url}>{item.action.label}</a>
                  </Button>
                </div>
              )}
            </div>

            {item.sessions && (
              <div className="border-t border-slate-100 bg-slate-50/50">
                {item.sessions.map((session, sIndex) => (
                  <SessionCard key={sIndex} session={session} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};