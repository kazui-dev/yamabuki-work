import { create } from 'zustand';
import type { Poster } from '@/types';

interface PosterState {
  data: { poster: Poster; roomName: string } | null;
  openPoster: (poster: Poster, roomName: string) => void;
  closePoster: () => void;
}

/**
 * ポスターの表示状態を管理するZustandストア
 * - data: 現在表示中のポスターと部屋の情報。nullならポスター非表示。
 * - openPoster: ポスターを開く関数。引数にポスターと部屋名を取る。
 */
export const usePosterStore = create<PosterState>((set) => ({
  data: null,
  openPoster: (poster, roomName) => set({ data: { poster, roomName } }),
  closePoster: () => set({ data: null }),
}));