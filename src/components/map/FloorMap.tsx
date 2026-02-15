import React from 'react';

type Props = {
  onRoomClick: (roomId: string) => void;
  className?: string;
};

export const FloorMap: React.FC<Props> = ({ onRoomClick, className }) => {
  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.target as Element;
    const parentGroup = target.closest('g');

    if (parentGroup && parentGroup.id === 'active-area') {
      const roomId = target.id;
      onRoomClick(roomId);
    }
  };

  return (
    <svg 
      viewBox="-2 -2 460.5 260.1" 
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
        <style>{`
            #active-area rect { cursor: pointer; transition: opacity 0.2s; fill: #ffff0044; }
            #active-area rect:hover { fill-opacity: 0.5; }
            rect, polygon, path {
                fill: #ffffff;
                stroke: #333333;
                stroke-width: 2px;
            }
        `}</style>
        <g id="base">
            <rect id="base-2" data-name="base" width="453.5" height="255.1"/>
        </g>
        <g id="passive-area">
            <rect id="wc-4" x="21" y="87.9" width="33.1" height="50" transform="translate(75.1 225.8) rotate(180)"/>
            <rect id="wc-3" x="21" y="137.9" width="33.1" height="29.6" transform="translate(75.1 305.4) rotate(180)"/>
            <polygon id="wc-2" points="375 126.5 375 87.9 431.3 87.9 431.3 117.8 404.9 117.8 404.9 126.5 375 126.5"/>
            <polygon id="wc-1" points="375 167.5 375 126.5 404.9 126.5 404.9 144 431.3 144 431.3 167.5 375 167.5"/>
            <rect id="stairs" x="54.1" y="87.9" width="42.5" height="66.1" transform="translate(150.7 241.8) rotate(180)"/>
            <rect id="EV-2" x="147.8" y="87.9" width="31.2" height="79.6" transform="translate(326.8 255.3) rotate(180)"/>
            <rect id="EV-1" x="404.9" y="117.8" width="26.4" height="26.3" transform="translate(836.1 261.8) rotate(180)"/>
            <rect id="PC-LL" x="0" y="196.7" width="96.6" height="58.4" transform="translate(96.6 451.8) rotate(180)"/>
            <rect id="PC-2" x="375" y="196.7" width="78.5" height="58.4" transform="translate(828.5 451.8) rotate(180)"/>
            <rect id="room-314" x="0" y="117.6" width="21" height="49.9" transform="translate(21 285.1) rotate(180)"/>
            <rect id="room-311" x="179" y="196.7" width="56.5" height="58.4" transform="translate(414.6 451.8) rotate(180)"/>
            <rect id="room-310" x="235.6" y="196.7" width="39.4" height="58.4" transform="translate(510.5 451.8) rotate(180)"/>
            <rect id="room-309" x="275" y="196.7" width="100" height="58.4" transform="translate(650 451.8) rotate(180)"/>
            <rect id="machine-room" x="0" y="87.9" width="21" height="29.7" transform="translate(21 205.5) rotate(180)"/>
            <rect id="top-light" x="179" y="87.9" width="196" height="79.6" transform="translate(554 255.3) rotate(180)"/>
        </g>
        <g id="active-area">
            <rect id="PC-3" x="96.6" y="196.7" width="82.4" height="58.4" transform="translate(275.6 451.8) rotate(180)"/>
            <rect id="room-320" x="0" width="96.6" height="58.4" transform="translate(96.6 58.4) rotate(180)"/>
            <rect id="room-318" x="96.6" width="82.4" height="58.4" transform="translate(275.6 58.4) rotate(180)"/>
            <rect id="room-317" x="179" width="96" height="58.4" transform="translate(454 58.4) rotate(180)"/>
            <rect id="room-316" x="275" width="98" height="58.4" transform="translate(648 58.4) rotate(180)"/>
            <rect id="room-315" x="373" width="80.5" height="58.4" transform="translate(826.6 58.4) rotate(180)"/>
        </g>
    </svg>
  );
};