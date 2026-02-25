import type { PageID } from '@/types';

type PageMetadata = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd: Record<string, any>;
};

const SITE_URL = "https://yamabuki.work";
const SITE_NAME = "第9回 新宿山吹高校情報科発表会";

export const PAGE_METADATA: Record<PageID, PageMetadata> = {
  timetable: {
    title: '第9回 新宿山吹高校情報科発表会',
    ogTitle: '情報科発表会',
    ogDescription: '第9回 新宿山吹高校情報科発表会 特設サイト',
    description: '2026年3月13日(金)開催、第9回 新宿山吹高校情報科発表会の特設サイトです。当日のタイムテーブルや、生徒による発表の概要を掲載しています。',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": SITE_NAME,
          "url": `${SITE_URL}/`,
          "alternateName": ["新宿山吹高校情報科発表会", "山吹情報科発表会", "情報科発表会"],
          "description": "2026年3月13日(金)開催、第9回 新宿山吹高校情報科発表会の特設サイトです。"
        },
        {
          "@type": "Event",
          "name": SITE_NAME,
          "startDate": "2026-03-13T12:30:00+09:00",
          "endDate": "2026-03-13T15:00:00+09:00",
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": "新宿山吹高校 大講義室",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "東京都新宿区山吹町81",
              "addressLocality": "新宿区",
              "addressRegion": "東京都",
              "postalCode": "162-8612",
              "addressCountry": "JP"
            }
          },
          "subEvent": [
            {
              "@type": "Event",
              "name": "開会式",
              "startDate": "2026-03-13T12:30:00+09:00",
            },
            {
              "@type": "Event",
              "name": "全体発表",
              "startDate": "2026-03-13T12:40:00+09:00",
            },
            {
              "@type": "Event",
              "name": "ポスター発表",
              "startDate": "2026-03-13T14:00:00+09:00",
              "location": {
                "@type": "Place",
                "name": "新宿山吹高校 3階",
              },
              "description": "大講義室、315~318教室、第3パソコン教室にて、各生徒によるポスター発表が行われます。"
            },
            {
              "@type": "Event",
              "name": "閉会式",
              "startDate": "2026-03-13T14:50:00+09:00",
            }
          ],
          "image": [ 
            "https://yamabuki.work/ogp-image.png"
          ],
          "description": "2026年3月13日(金)開催、第9回 新宿山吹高校情報科発表会の特設サイトです。当日のタイムテーブルや、生徒による発表の概要を掲載しています。"
        },
        {
          "@type": "Organization",
          "name": "東京都立新宿山吹高等学校 情報科",
          "alternateName": ["新宿山吹高校 情報科", "山吹情報科", "情報科"],
          "url" : `${SITE_URL}/`,
          "logo": `${SITE_URL}/favicon.svg`,
          "sameAs": [          
            "https://www.metro.ed.jp/shinjukuyamabuki-h/"
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "タイムテーブル",
              "item": `${SITE_URL}/`
            }
          ]
        }
      ]
    }
  },
  map: {
    title: 'フロアマップ - 第9回 新宿山吹高校情報科発表会',
    ogTitle: 'フロアマップ - 情報科発表会',
    ogDescription: '第9回 新宿山吹高校情報科発表会 特設サイト',
    description: 'ポスター発表の概要をマップ形式で掲載しています。部屋やポスターをタップすると、詳細を直接表示できます。',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": `フロアマップ - ${SITE_NAME}`,
          "url": `${SITE_URL}/map`,
          "description": "ポスター発表の概要をマップ形式で掲載しています。"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "タイムテーブル",
              "item": `${SITE_URL}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "フロアマップ",
              "item": `${SITE_URL}/map`
            }
          ]
        }
      ]
    }
  },
  survey: {
    title: '来場者アンケート - 第9回 新宿山吹高校情報科発表会',
    ogTitle: '来場者アンケート - 情報科発表会',
    ogDescription: '第9回 新宿山吹高校情報科発表会 特設サイト',
    description: '情報科発表会では、ご来場の皆様にアンケートのご協力をお願いしております。発表に関するご意見やご感想をお寄せください。',
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": `来場者アンケート - ${SITE_NAME}`,
          "url": `${SITE_URL}/survey`,
          "description": "情報科発表会では、ご来場の皆様にアンケートのご協力をお願いしております。発表に関するご意見やご感想をお寄せください。"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "タイムテーブル",
              "item": `${SITE_URL}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "来場者アンケート",
              "item": `${SITE_URL}/survey`
            }
          ]
        }
      ]
    }
  },
};
