import type { Maps } from "@/types";
import { POSTERS } from "@/constants/posters";

const getPosters = (ids: string[]) => {
  return ids.map(id => POSTERS[id]).filter(Boolean);
};

export const MapsData: Maps[] = [
  {
    id: "hall",
    name: "大講義室",
    posters: getPosters(["poster_hall_01"]),
  },
  {
    id: "318",
    name: "318",
    posters: getPosters(["poster_318_01", "poster_318_02", "poster_318_03"]),
  },
  {
    id: "317",
    name: "317",
    posters: getPosters(["poster_317_01", "poster_317_02", "poster_317_03"]),
  },
  {
    id: "316",
    name: "316",
    posters: getPosters(["poster_316_01", "poster_316_02", "poster_316_03"]),
  },
  {
    id: "315",
    name: "315",
    posters: getPosters(["poster_315_01", "poster_315_02", "poster_315_03"]),
  },
  {
    id: "pc_3",
    name: "第3パソコン教室",
    posters: getPosters(["poster_pc_3_01", "poster_pc_3_02", "poster_pc_3_03", "poster_pc_3_04", "poster_pc_3_05", "poster_pc_3_06"]),
  },
];