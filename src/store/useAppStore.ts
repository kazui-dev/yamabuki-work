import { create } from 'zustand';

interface AppState {
  isInitialAppLoad: boolean;
  completeInitialLoad: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isInitialAppLoad: true,
  completeInitialLoad: () => set({ isInitialAppLoad: false }),
}));