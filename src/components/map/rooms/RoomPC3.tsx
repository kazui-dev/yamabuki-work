import type React from "react";
import type { RoomMapProps } from "@/types";

export const RoomPC3: React.FC<RoomMapProps> = ({ className = "", onPosterClick }) => {
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
        <g data-poster-id="12">
          <rect x="25.42" y="53.78" width="116.32" height="56.69"/>
        </g>
        <g data-poster-id="13">
          <rect x="168.62" y="53.78" width="116.32" height="56.69"/>
        </g>
        <g data-poster-id="14">
          <rect x="311.8" y="53.78" width="116.32" height="56.69"/>
        </g>
        <g data-poster-id="15">
          <rect x="25.42" y="144.65" width="116.32" height="56.69"/>
        </g>
        <g data-poster-id="16">
          <rect x="168.62" y="144.65" width="116.32" height="56.69"/>
        </g>
        <g data-poster-id="17">
          <rect x="311.81" y="144.65" width="116.32" height="56.69"/>
        </g>
      </g>
      {/* <g id="posters">
        <g data-poster-id="12">
          <rect x="61.99" y="99.21" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="13">
          <rect x="258.04" y="25.43" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="12">
          <rect x="61.99" y="25.43" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="15">
          <rect x="258.04" y="172.99" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="16">
          <rect x="61.99" y="172.99" width="170.08" height="56.69"/>
        </g>
        <g data-poster-id="17">
          <rect x="258.04" y="99.21" width="170.08" height="56.69"/>
        </g>
      </g> */}
    </svg>
  );
};