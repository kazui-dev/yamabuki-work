import React from 'react';

type Props = {
  className?: string;
  onRoomSelect?: (roomId: string) => void;
  activeRoomId?: string | null;
};

export const FloorMap: React.FC<Props> = ({ className, onRoomSelect, activeRoomId }) => {
  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    const roomId = (e.target as SVGElement).getAttribute('data-room-id');
    if (roomId && onRoomSelect) {
      onRoomSelect(roomId);
    }
  };

  return (
    <svg 
      viewBox="-2 -2 460.5 260.1" 
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
        <style>{`
            #active-area rect { cursor: pointer; transition: all 0.2s ease; fill: #ffff0044; }
            #active-area rect:hover { fill-opacity: 0.5; }
            
            ${activeRoomId ? `#active-area rect[data-room-id="${activeRoomId}"] { fill: #ff8000 !important; fill-opacity: 0.5 !important; }` : ''}

            rect, polygon, path {
                fill: #ffffff;
                stroke: #333333;
                stroke-width: 2px;
            }
        `}</style>
        <g id="base">
            <rect id="base" width="453.5" height="255.1"/>
        </g>
        <g id="passive-area">
            <rect id="room_wc_4" x="0" y="87.9" width="54.1" height="39.8" transform="translate(54.1 215.6) rotate(180)"/>
            <rect id="room_wc_3" x="0" y="127.7" width="54.1" height="39.8" transform="translate(54.1 295.2) rotate(180)"/>
            <polygon id="room_wc_2" points="375 126.5 375 87.9 431.3 87.9 431.3 117.8 404.9 117.8 404.9 126.5 375 126.5"/>
            <polygon id="room_wc_1" points="375 167.5 375 126.5 404.9 126.5 404.9 144 431.3 144 431.3 167.5 375 167.5"/>
            <rect id="stairs" x="54.1" y="87.9" width="42.5" height="66.1" transform="translate(150.7 241.8) rotate(180)"/>
            <rect id="EV_2" x="147.8" y="87.9" width="31.2" height="79.6" transform="translate(326.8 255.3) rotate(180)"/>
            <rect id="EV_1" x="404.9" y="117.8" width="26.4" height="26.3" transform="translate(836.1 261.8) rotate(180)"/>
            <rect id="room_pc_ll" x="0" y="196.7" width="96.6" height="58.4" transform="translate(96.6 451.8) rotate(180)"/>
            <rect id="room_pc_2" x="375" y="196.7" width="78.5" height="58.4" transform="translate(828.5 451.8) rotate(180)"/>
            <rect id="room_311" x="179" y="196.7" width="56.5" height="58.4" transform="translate(414.6 451.8) rotate(180)"/>
            <rect id="room_310" x="235.6" y="196.7" width="39.4" height="58.4" transform="translate(510.5 451.8) rotate(180)"/>
            <rect id="room_309" x="275" y="196.7" width="100" height="58.4" transform="translate(650 451.8) rotate(180)"/>      
            <rect id="top_light" x="179" y="87.9" width="196" height="79.6" transform="translate(554 255.3) rotate(180)"/>
        </g>
        <g id="active-area">
          <rect data-room-id="room_315" x="373" width="80.5" height="58.4" transform="translate(826.6 58.4) rotate(180)"/>
          <rect data-room-id="room_316" x="275" width="98" height="58.4" transform="translate(648 58.4) rotate(180)"/>
          <rect data-room-id="room_317" x="179" width="96" height="58.4" transform="translate(454 58.4) rotate(180)"/>
          <rect data-room-id="room_318" x="96.6" width="82.4" height="58.4" transform="translate(275.6 58.4) rotate(180)"/>
          <rect data-room-id="room_pc_3" x="96.6" y="196.7" width="82.4" height="58.4" transform="translate(275.6 451.8) rotate(180)"/>
          <rect data-room-id="room_hall" x="0" width="96.6" height="58.4" transform="translate(96.6 58.4) rotate(180)"/>
        </g>
    </svg>
  );
};