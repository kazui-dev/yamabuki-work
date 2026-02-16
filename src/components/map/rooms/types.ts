export interface RoomMapProps {
  roomId: string;
  className?: string;
  onPosterClick?: (posterId: string) => void;
}