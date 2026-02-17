import type { EventInfo, LayoutProps } from "@/types";

export const EVENT_INFO: EventInfo = {
  eventName: "新宿山吹高校 第9回情報科発表会",
  date: "2026-03-13",
  dateJP: "2026.03.13",
  startTime: "12:00",
  location: "大講義室",
};

export const DEFAULT_LAYOUT_PROPS: Omit<LayoutProps, "title"> = {
  description: "新宿山吹高校 第9回情報科発表会 特設サイト",
  image: "/ogp-image.png",
};

export const SITE_CONFIG = {
  name: "新宿山吹高校 情報科発表会",
  link: "http://localhost:4321",
  baseUrl: "http://localhost:4321",
  faviconUrl: "/favicon.svg",
  ogImageUrl: "/ogp-image.png",
};
