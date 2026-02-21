import { useState, useEffect } from 'react';
import { useRouter } from '@/hooks/useRouter';
import { Header } from './components/layout/Header';
import { Timetable } from './components/timetable/Timetable';
import { Maps } from './components/map/Maps';
import { Survey } from './components/survey/Survey';
import { Drawer } from './components/ui/drawer';
import { PosterDetail } from './components/map/PosterDetail';
import { syncMapRoom } from '@/lib/history';
import type { Poster, PageID } from './types';

const PAGE_METADATA: Record<PageID, { title: string; description: string }> = {
  timetable: {
    title: '第9回 新宿山吹高校情報科発表会',
    description: '2026年3月13日(金)開催、第9回 新宿山吹高校情報科発表会の特設サイトです。当日のタイムテーブルや、生徒による発表の概要を掲載しています。',
  },
  map: {
    title: 'フロアマップ - 第9回 新宿山吹高校情報科発表会',
    description: 'ポスター発表の概要をマップ形式で掲載しています。部屋やポスターをタップすると、詳細を直接表示できます。',
  },
  survey: {
    title: '来場者アンケート - 第9回 新宿山吹高校情報科発表会',
    description: '情報科発表会では、ご来場の皆様にアンケートのご協力をお願いしております。発表に関するご意見やご感想をお寄せください。',
  },
};

const updatePageMeta = (pageId: PageID) => {
  const meta = PAGE_METADATA[pageId];
  document.title = meta.title;
  
  let descriptionElement = document.querySelector('meta[name="description"]');
  if (!descriptionElement) {
    descriptionElement = document.createElement('meta');
    descriptionElement.setAttribute('name', 'description');
    document.head.appendChild(descriptionElement);
  }
  descriptionElement.setAttribute('content', meta.description);
};

export const App = () => {
  const { isReady, currentPage, navigate, resetScroll } = useRouter();
  
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedPosterData, setSelectedPosterData] = useState<{ poster: Poster; roomName: string } | null>(null);
  const [isPosterDrawerOpen, setIsPosterDrawerOpen] = useState(false);

  useEffect(() => {
    if (isReady) {
      updatePageMeta(currentPage);
    }
  }, [currentPage, isReady]);

  if (!isReady) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header 
        currentPage={currentPage}
        onNavigate={navigate}
        onResetScroll={resetScroll}
        onOpenPoster={(poster, roomName) => {
          setSelectedPosterData({ poster, roomName });
          setIsPosterDrawerOpen(true);
        }}
        onSelectRoom={(roomId) => {
          syncMapRoom(roomId, { scrollY: 0 });
          setSelectedRoomId(roomId);
          resetScroll('map');

          if (currentPage === 'map') {
            requestAnimationFrame(() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            });
          }
          navigate('map');
        }}
        isPosterDrawerOpen={isPosterDrawerOpen}
        selectedPosterId={isPosterDrawerOpen ? selectedPosterData?.poster.id ?? null : null}
      />

      <main className="p-4 sm:p-6 mb-16 flex-1 w-full max-w-md mx-auto">
        {currentPage === 'timetable' && (
          <Timetable onNavigate={navigate} onResetScroll={resetScroll} />
        )}
        
        {currentPage === 'map' && (
          <Maps
            selectedRoomId={selectedRoomId}
            onSelectedRoomHandled={() => setSelectedRoomId(null)}
            onOpenPoster={(poster, roomName) => {
              setSelectedPosterData({ poster, roomName });
              setIsPosterDrawerOpen(true);
            }}
            selectedPosterId={isPosterDrawerOpen ? selectedPosterData?.poster.id ?? null : null}
          />
        )}
        
        {currentPage === 'survey' && <Survey />}
      </main>

      <Drawer open={isPosterDrawerOpen} onOpenChange={setIsPosterDrawerOpen}>
        {selectedPosterData && (
          <PosterDetail
            poster={selectedPosterData.poster}
            roomName={selectedPosterData.roomName}
          />
        )}
      </Drawer>
    </div>
  );
};