import React from 'react';
import type { RoomMapProps } from "./types";

export const RoomHall: React.FC<RoomMapProps> = ({ className = '' }) => {
    return (
    <svg
      viewBox="-2 -2 464 264"
      className={`w-full h-auto ${className}`}
    >
      <style>{`
        rect {
          fill: #ffffff;
          stroke: #333333;
          stroke-width: 2px;
        }
        #posters rect {
          fill: #dbeafe;
        }
        text { 
          font-size: 16px; 
          text-anchor: middle; 
          fill: #1f2937; 
          font-weight: bold; 
        }
      `}</style>

      <g id="base">
        <rect id="base" x="0" y="0" width="460" height="260" />
      </g>

      <g id="posters">
        <rect x="150" y="24" width="160" height="60" />
        <text x="230" y="58">ポスターA</text>

        <rect x="360" y="50" width="60" height="160" />
        <text x="390" y="135" transform="rotate(90 390,130)">ポスターB</text>

        <rect x="40" y="50" width="60" height="160" />
        <text x="70" y="135" transform="rotate(-90 70,130)">ポスターC</text>
      </g>
    </svg>
  );
};