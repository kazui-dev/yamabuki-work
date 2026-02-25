import type React from "react";
import type { RoomMapProps } from "@/types";

export const RoomHall: React.FC<RoomMapProps> = ({ className = "", onPosterClick }) => {
  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.target as SVGElement;
    const posterGroup = target.closest("[data-poster-id]");
    
    if (posterGroup && onPosterClick) {
      const posterId = posterGroup.getAttribute("data-poster-id");
      if (posterId) onPosterClick(posterId);
    }
  };

  return (
    <svg
      viewBox="-2 -2 464 264"
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
      <g id="base_area">
          <rect id="base" x="0" y="0" width="460" height="260" />
      </g>

      <g id="posters">
        <g data-poster-id="1">
          <rect x="150" y="24" width="160" height="60" />
          <text x="230" y="58">ポスターA</text>
        </g>
      </g>
    </svg>
  );
};