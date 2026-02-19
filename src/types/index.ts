export interface SessionDetails {
  description: string;
  image?: string; 
}

export interface ActionButton {
  icon?: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  targetView: 'timetable' | 'map';
}

export interface TimetableSession {
  title: string;
  time?: string;
  author?: string;
  description?: string;
  details?: SessionDetails;
  action?: ActionButton;
}

export interface TimetableItem {
  title: string;
  time?: string;
  author?: string;
  description?: string;
  details?: SessionDetails;
  sessions?: TimetableSession[];
  action?: ActionButton;
}

export interface Poster {
  id: string;
  title: string;
  author: string;
  description?: string;
  details?: SessionDetails;
}

export interface Maps{
  id: string;
  name: string;
  posters?: Poster[];
}

export interface RoomMapProps {
  roomId: string;
  className?: string;
  onPosterClick?: (posterId: string) => void;
}