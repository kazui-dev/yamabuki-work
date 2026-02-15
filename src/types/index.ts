import type { ImageMetadata } from "astro";

export interface SessionDetails {
  description: string;
  image?: ImageMetadata;
}

export interface ActionButton {
  label: string;
  url: string;
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

export interface LayoutProps {
  title: string;
  description?: string;
  image?: string;
}

export interface EventInfo {
  eventName: string;
  date: string;
  dateJP: string;
  startTime: string;
  location: string;
}

export interface Poster {
  id: string;
  title: string;
  author: string;
  description?: string;
  details?: SessionDetails;
}

export interface RoomData {
  id: string;
  name: string;
  posters: Poster[];
}
