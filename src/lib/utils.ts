import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URLに部屋IDをセットする際、数字だけのIDは数値型に変換するユーティリティ関数
export const formatRoomIdForUrl = (id: string) => {
  return /^\d+$/.test(id) ? Number(id) : id;
};