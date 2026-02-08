import { TIMELINE_STYLES } from "@/constants/styleConstants";
import { timetable } from "@/constants/timetable";
import { TimelineItem } from "./timetable/TimelineItem";

export const Timetable = () => {
  return (
    <div className={TIMELINE_STYLES.container}>
      {timetable.map((item, index) => (
        <TimelineItem key={index} item={item} />
      ))}
    </div>
  );
};