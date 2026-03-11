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
          <rect x="25.42" y="53.78" width="117.29" height="56.69"/>
          <text x="84.07" y="88.78">12. 文字だけ…</text>
        </g>
        <g data-poster-id="13">
          <rect x="168.13" y="53.78" width="117.29" height="56.69"/>
          <text x="226.78" y="88.78">13. 勉強用タ…</text>
        </g>
        <g data-poster-id="14">
          <rect x="310.84" y="53.78" width="117.29" height="56.69"/>
          <text x="369.49" y="88.78">14. 宅内VPN</text>
        </g>
        <g data-poster-id="15">
          <rect x="25.42" y="144.65" width="117.29" height="56.69"/>
          <text x="84.07" y="179.65">15. 人間とAI…</text>
        </g>
        <g data-poster-id="16">
          <rect x="168.13" y="144.65" width="117.29" height="56.69"/>
          <text x="226.78" y="179.65">16. Python…</text>
        </g>
        <g data-poster-id="17">
          <rect x="310.84" y="144.65" width="117.29" height="56.69"/>
          <text x="369.49" y="179.65">17. シスプロ…</text>
        </g>
      </g>
    </svg>
  );
};