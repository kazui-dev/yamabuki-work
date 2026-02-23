import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatRoomIdForUrl = (id: string) => {
  return /^\d+$/.test(id) ? Number(id) : id;
};