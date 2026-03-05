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
      viewBox="-2 -2 458.5 259.1"
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
      <g id="base_area">
        <rect id="base" width="453.54" height="255.12"/>
      </g>
      <g id="passive_area">
        <rect id="table_1" x="243.02" y="124.73" width="157.5" height="24.51"/>
        <rect id="table_2" x="53.02" y="124.73" width="157.5" height="24.51"/>
        <rect id="table_3" x="243.02" y="72.97" width="157.5" height="24.51"/>
        <rect id="table_4" x="53.02" y="72.97" width="157.5" height="24.51"/>
        <rect id="table_5" x="243.02" y="21.2" width="157.5" height="24.51"/>
        <rect id="table_6" x="53.02" y="21.2" width="157.5" height="24.51"/>
      </g>
      <g data-poster-id="1" id="posters">
        <rect x="141.73" y="175" width="170.08" height="56.69"/>
        <text x="225.73" y="210">1. 場所と金銭面を…</text>
      </g>
    </svg>
  );
};