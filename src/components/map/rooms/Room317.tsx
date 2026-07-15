import type React from "react";
import type { RoomMapProps } from "@/types";

export const Room317: React.FC<RoomMapProps> = ({ className = "", onPosterClick }) => {
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
        <g data-poster-id="5">
          <rect x="30.65" y="30.65" width="180.08" height="56.69"/>
          <text x="120.69" y="65.65">5. 時間割,欠時数管理…</text>
        </g>
        <g data-poster-id="6">
          <rect x="242.81" y="30.65" width="180.08" height="56.69"/>
          <text x="332.85" y="65.65">6. 学校説明会で使え…</text>
        </g>
        <g data-poster-id="7">
          <rect x="136.73" y="167.78" width="180.08" height="56.69"/>
          <text x="226.77" y="202.78">7. AfterEffects学習…</text>
        </g>
      </g>
    </svg>
  );
};