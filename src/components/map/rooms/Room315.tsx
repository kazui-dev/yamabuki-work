import type React from "react";
import type { RoomMapProps } from "@/types";

export const Room315: React.FC<RoomMapProps> = ({ className = "", onPosterClick }) => {
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
      viewBox="-2 -2 458.5 259.1"
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
      <g id="base_area">
        <rect id="base" width="453.54" height="255.12"/>
      </g>

      <g id="posters">
        <g data-poster-id="9">
          <rect x="25.41" y="25.43" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="10">
          <rect x="258.04" y="25.43" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="11">
          <rect x="141.73" y="172.99" width="170.08" height="56.69"/>
        </g>
      </g>
    </svg>
  );
};