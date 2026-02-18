import type { TimetableItem } from "@/types";
import { MapPinned } from "lucide-react";

export const timetable: TimetableItem[] = [
  {
    time: "12:30",
    title: "開会式",
  },
  {
    time: "12:40",
    title: "全体発表",
    description: "ここに説明を入れる",
    sessions: [
      {
        title: "タイトル",
        author: "○○チーム",
        details: {
          description: "東京都立新宿山吹高等学校（とうきょうとりつ しんじゅく やまぶき こうとうがっこう、英: Shinjuku Yamabuki High School）は、東京都新宿区山吹町に所在する東京都立高等学校。",
          image: "/images/session1.jpg",
        }
      },
      {
        title: "タイトル",
        author: "情報科○部○組 ○○",
        details: {
          description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        }
      },
      {
        title: "タイトル",
        author: "情報科○部○組 ○○",
        details: {
          description: "あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。",
        }
      },
      {
        title: "タイトル",
        author: "情報科○部○組 ○○",
        details: {
          description: "ここに詳細を入れる",
        }
      }
    ]
  },
  {
    time: "14:00",
    title: "ポスター発表",
    description: "ここに説明を入れる",
    action: {
      icon: MapPinned,
      label: "フロアマップを見る",
      targetView: "map"
    }
  },
  {
    time: "14:50",
    title: "閉会式",
  }
];