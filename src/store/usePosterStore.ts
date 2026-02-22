import { create } from 'zustand';
import type { Poster } from '@/types';

interface PosterState {
  data: { poster: Poster; roomName: string } | null;
  openPoster: (poster: Poster, roomName: string) => void;
  closePoster: () => void;
}

export const usePosterStore = create<PosterState>((set) => ({
  data: null,
  openPoster: (poster, roomName) => set({ data: { poster, roomName } }),
  closePoster: () => set({ data: null }),
}));