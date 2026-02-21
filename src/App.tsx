import { useState } from 'react';
import { useRouter } from '@/hooks/useRouter';
import { Header } from './components/layout/Header';
import { Timetable } from './components/timetable/Timetable';
import { Maps } from './components/map/Maps';
import { Survey } from './components/survey/Survey';
import { Drawer } from './components/ui/drawer';
import { PosterDetail } from './components/map/PosterDetail';
import { syncMapRoom } from '@/lib/history';
import type { Poster } from './types';

export const App = () => {
  const { isReady, currentPage, navigate, resetScroll } = useRouter();
  
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedPosterData, setSelectedPosterData] = useState<{ poster: Poster; roomName: string } | null>(null);
  const [isPosterDrawerOpen, setIsPosterDrawerOpen] = useState(false);

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