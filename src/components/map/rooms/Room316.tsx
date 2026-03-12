import type React from "react";
import type { RoomMapProps } from "@/types";

export const Room316: React.FC<RoomMapProps> = ({ className = "", onPosterClick }) => {
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
        <g data-poster-id="8">
          <rect x="30.65" y="30.65" width="180.08" height="56.69"/>
          <text x="120.69" y="65.65">8. スマブラ大会の通…</text>
        </g>
        <g data-poster-id="9">
          <rect x="242.81" y="30.65" width="180.08" height="56.69"/>
          <text x="332.85" y="65.65">9. iTunes APIを利用…</text>
        </g>
        <g data-poster-id="10">
          <rect x="136.73" y="167.78" width="180.08" height="56.69"/>
          <text x="226.77" y="202.78">10. 遊びながら物理を…</text>
        </g>
      </g>
    </svg>
  );
};