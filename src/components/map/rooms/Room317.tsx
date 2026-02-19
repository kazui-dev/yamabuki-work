import React from "react";
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
      viewBox="-2 -2 464 264"
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
        <style>{`
            rect {
              fill: #ffffff;
              stroke: #333333;
              stroke-width: 2px;
            }
            #posters g {
              cursor: pointer;
              transition: opacity 0.2s ease;
            }
            #posters g:hover {
              opacity: 0.7;
            }
            #posters rect {
              fill: #dbeafe;
            }
            text { 
              font-size: 16px; 
              text-anchor: middle; 
              fill: #1f2937; 
              font-weight: bold; 
              pointer-events: none;
            }
        `}</style>

        <g id="base_area">
            <rect id="base" x="0" y="0" width="460" height="260" />
        </g>

        <g id="posters">
            <g data-poster-id="poster_317_01">
              <rect x="150" y="24" width="160" height="60" />
              <text x="230" y="58">ポスターA</text>
            </g>

            <g data-poster-id="poster_317_02">
              <rect x="270" y="150" width="160" height="60" />
              <text x="350" y="184">ポスターB</text>
            </g>

            <g data-poster-id="poster_317_03">
              <rect x="30" y="150" width="160" height="60" />
              <text x="110" y="184">ポスターC</text>
            </g>
        </g>
    </svg>
  );
};