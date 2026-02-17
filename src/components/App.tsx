import { useState } from 'react';
import { Timetable } from './timetable/Timetable';
import { Maps } from './map/Maps';

export type ViewState = 'timetable' | 'map';

export const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('timetable');

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="p-6 mb-16">
      <div className="max-w-md mx-auto mb-4 text-center" onClick={() => handleNavigate('timetable')}>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">
          新宿山吹高校<br className="sm:hidden" />
          <span className="inline-block">情報科発表会</span>
        </h1>
      </div>

      {currentView === 'timetable' ? (
        <Timetable onNavigate={handleNavigate} />
      ) : (
        <Maps />
      )}
    </main>
  );
};