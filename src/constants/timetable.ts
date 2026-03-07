import type { TimetableItem } from "@/types";
import { MapPinned, ClipboardList } from "lucide-react";

export const timetable: TimetableItem[] = [
  {
    time: "12:30",
    title: "開会式",
  },
  {
    time: "12:40",
    title: "全体発表",
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
        title: "AfterEffects学習支援AIの開発",
        author: "情報科2部6組 天野匠",
        details: {
          description: "動画制作のパワフルで便利な相棒のAfterEffectsですが、それを使いこなすまでには学習期間が必要です。その期間が退屈で挫折してしまった経験がある人も多いと思います。その挫折を減らし一般にAfterEffectsを普及させることを目的にした課題研究発展の発表です。",
          image: "/images/session2.png",
        }
      },
      {
        title: "欠時数,時間割管理LINE Bot",
        author: "情報科2部5組 田中海暉",
        details: {
          description: "皆さんも新宿山吹で生活していて、一度は欠時数が管理しにくいと感じたことがあるでしょう。このシステムはその問題を解決するために作りました。普段使っているLINE上で動作し、簡単に欠時数を編集、確認できます。この研究を通して、情報科だけでなく普通科の皆さんにも、ITの力で日常生活はもっと便利になるということを知っていただければと思います。",
          image: "/images/session3.png",
        }
      },
      {
        title: "履修登録用アプリの開発",
        author: "情報科2部6組 美輪和維",
        details: {
          description: "山吹の履修登録の「紙媒体の不便さ」「比較や修整の手間」「複雑な履修要件」を解消するために、履修登録用アプリを開発しました。一人一台端末から使えるデスクトップアプリで、「時間割作成」「授業検索」「履修違反の自動検証」などの機能があり、履修違反を防止しながら快適に履修登録を行うことができます。",
          image: "/images/session4.png",
        }
      }
    ]
  },
  {
    time: "13:45",
    title: "ポスター発表",
    action: {
      icon: MapPinned,
      label: "フロアマップを見る",
      targetView: "map"
    }
  },
  {
    time: "14:50",
    title: "閉会式",
    action: {
      icon: ClipboardList,
      label: "来場者アンケートへ",
      targetView: "survey"
    }
  }
];