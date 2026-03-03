import { create } from 'zustand';

interface BackgroundState {
  backgroundImage: string | null;
  setBackground: (url: string | null) => void;
}

export const useBackgroundStore = create<BackgroundState>((set) => ({
  backgroundImage: null,
  setBackground: (url) => set({ backgroundImage: url }),
}));
