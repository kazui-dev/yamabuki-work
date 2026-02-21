import type { PageID } from '@/types';

type PageMetadata = {
  title: string;
  description: string;
  ogTitle?: string;
};

export const PAGE_METADATA: Record<PageID, PageMetadata> = {
  timetable: {
    title: '第9回 新宿山吹高校情報科発表会',
    ogTitle: '情報科発表会',
    description: '2026年3月13日(金)開催、第9回 新宿山吹高校情報科発表会の特設サイトです。当日のタイムテーブルや、生徒による発表の概要を掲載しています。',
  },
  map: {
    title: 'フロアマップ - 第9回 新宿山吹高校情報科発表会',
    ogTitle: 'フロアマップ - 情報科発表会',
    description: 'ポスター発表の概要をマップ形式で掲載しています。部屋やポスターをタップすると、詳細を直接表示できます。',
  },
  survey: {
    title: '来場者アンケート - 第9回 新宿山吹高校情報科発表会',
    ogTitle: '来場者アンケート - 情報科発表会',
    description: '情報科発表会では、ご来場の皆様にアンケートのご協力をお願いしております。発表に関するご意見やご感想をお寄せください。',
  },
};
