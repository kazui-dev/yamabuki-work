import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ScrollState {
  positions: Record<string, number>;
  setScrollPosition: (path: string, position: number) => void;
  clearScrollPosition: (path: string) => void;
}

export const useScrollStore = create<ScrollState>()(
  persist(
    (set) => ({
      positions: {},
      setScrollPosition: (path, position) =>
        set((state) => ({
          positions: { ...state.positions, [path]: position },
        })),
      clearScrollPosition: (path) =>
        set((state) => {
          const { [path]: _, ...rest } = state.positions;
          return { positions: rest };
        }),
    }),
    {
      name: 'page-scroll-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);