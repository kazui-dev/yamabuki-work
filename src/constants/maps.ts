import type { Maps } from "@/types";
import { POSTERS_BY_LOCATION } from "@/constants/posters";

export const MapsData: Maps[] = [
  { id: "hall", name: "大講義室", posters: POSTERS_BY_LOCATION["hall"] ?? [] },
  { id: "318", name: "318", posters: POSTERS_BY_LOCATION["318"] ?? [] },
  { id: "317", name: "317", posters: POSTERS_BY_LOCATION["317"] ?? [] },
  { id: "316", name: "316", posters: POSTERS_BY_LOCATION["316"] ?? [] },
  { id: "315", name: "315", posters: POSTERS_BY_LOCATION["315"] ?? [] },
  { id: "pc_3", name: "第3パソコン教室", posters: POSTERS_BY_LOCATION["pc_3"] ?? [] },
];