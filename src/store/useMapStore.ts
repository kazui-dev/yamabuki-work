import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MapState {
  lastRoomId: string | null;
  setLastRoomId: (id: string) => void;
  scrollPositions: Record<string, number>;
  setScrollPosition: (roomId: string, pos: number) => void;
}

/**
 * マップの状態を管理するZustandストア
 * - lastRoomId: 最後に表示した部屋のID。nullなら未設定。
 * - setLastRoomId: 最後に表示した部屋のIDを更新する関数。
 * 
 * persistミドルウェアを使用して、lastRoomIdをsessionStorageに保存。
 */
export const useMapStore = create<MapState>()(
persist(
    (set) => ({
      lastRoomId: null,
      setLastRoomId: (id) => set({ lastRoomId: id }),
      scrollPositions: {},
      setScrollPosition: (roomId, pos) => 
        set((state) => ({
          scrollPositions: { ...state.scrollPositions, [roomId]: pos }
        })),
    }),
    {
      name: 'map-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);