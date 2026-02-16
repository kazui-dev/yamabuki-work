import React from 'react';

type Props = {
  className?: string;
  onRoomSelect?: (roomId: string) => void;
  activeRoomId?: string | null;
};

export const FloorMap: React.FC<Props> = ({ className, onRoomSelect, activeRoomId }) => {
  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    const target = e.target as SVGElement;
    const roomElement = target.closest('[data-room-id]');
    if (roomElement && onRoomSelect) {
      onRoomSelect(roomElement.getAttribute('data-room-id')!);
    }
  };

  return (
    <svg 
      viewBox="-2 -2 458.5 259.1" 
      className={`w-full h-auto ${className}`}
      onClick={handleClick}
    >
      <style>{`
        rect, polygon, path {
          fill: #ffffff;
          stroke: #333333;
          stroke-width: 2px;
        }

        #passive_area rect, #passive_area polygon { fill: #f0f0f0; }
        #facilities rect, #facilities polygon, #facilities path { fill: #ffffff; }
        #icon_man_1, #icon_man_2 { fill: #0066cc; stroke: none; }
        #icon_woman_1, #icon_woman_2 { fill: #cc0066; stroke: none; }
        #active_area rect { cursor: pointer; transition: all 0.2s ease; fill: #ffff0044; }
        #active_area rect:hover { fill-opacity: 0.5; }
        
        ${activeRoomId ? `#active_area rect[data-room-id="${activeRoomId}"] { fill: #ff8000 !important; fill-opacity: 0.5 !important; }` : ''}
      `}</style>

      <g id="base_area">
        <rect data-room-id="base" width="453.5" height="255.1"/>
      </g>

      <g id="passive_area">
        <rect data-room-id="room_pc_ll" x="0" y="196.7" width="96.6" height="58.4" transform="translate(96.6 451.9) rotate(180)"/>
        <rect data-room-id="room_pc_2" x="375" y="196.8" width="78.5" height="58.3" transform="translate(828.5 451.9) rotate(180)"/>
        <rect data-room-id="room_311" x="179" y="196.7" width="56.5" height="58.4" transform="translate(414.6 451.9) rotate(180)"/>
        <rect data-room-id="room_310" x="235.6" y="196.7" width="39.4" height="58.4" transform="translate(510.5 451.9) rotate(180)"/>
        <rect data-room-id="room_309" x="275" y="196.8" width="100" height="58.3" transform="translate(650 451.9) rotate(180)"/>
        <rect data-room-id="top_light" x="179" y="87.8" width="196" height="79.6" transform="translate(554 255.2) rotate(180)"/>
        <rect data-room-id="EV_2" x="147.8" y="87.8" width="31.2" height="79.6" transform="translate(326.8 255.2) rotate(180)"/>
        <rect data-room-id="EV_1" x="404.9" y="114.5" width="26.4" height="26" transform="translate(836.1 255.1) rotate(180)"/>
      </g>

      <g id="active_area">
        <rect data-room-id="room_pc_3" x="96.6" y="196.7" width="82.4" height="58.4" transform="translate(275.6 451.9) rotate(180)"/>
        <rect data-room-id="room_hall" y="0" width="96.6" height="58.4" transform="translate(96.6 58.4) rotate(180)"/>
        <rect data-room-id="room_318" x="96.6" y="0" width="82.4" height="58.4" transform="translate(275.6 58.4) rotate(180)"/>
        <rect data-room-id="room_317" x="179" y="0" width="96" height="58.4" transform="translate(454 58.4) rotate(180)"/>
        <rect data-room-id="room_316" x="275" y="0" width="98" height="58.4" transform="translate(648 58.4) rotate(180)"/>
        <rect data-room-id="room_315" x="373" y="0" width="80.5" height="58.4" transform="translate(826.6 58.4) rotate(180)"/>
      </g>

      <g id="facilities">
        <path id="stairs" d="M54.1,87.8H75.3V99.2H54.1ZM75.3,99.2H96.6V87.8H75.3ZM54.1,110.5H75.3V99.2H54.1Zm21.2,0H96.6V99.2H75.3ZM54.1,121.9H75.3V110.5H54.1Zm21.2,0H96.6V110.5H75.3ZM54.1,133.3H75.3V121.9H54.1Zm21.2,0H96.6V121.9H75.3ZM54.1,144.6H75.3V133.3H54.1Zm21.2,0H96.6V133.3H75.3Zm0,11.4V144.6H54.1V156m42.5,0V144.6H75.3V156"/>
        <rect id="room_wc_4" y="127.6" width="54.1" height="39.8" transform="translate(54.1 295) rotate(180)"/>
        <rect id="room_wc_3" y="87.8" width="54.1" height="39.81" transform="translate(54.1 215.4) rotate(180)"/>
        <polygon id="room_wc-2" points="431.3 140.6 431.3 167.4 375 167.4 375 127.6 404.9 127.6 404.9 140.6 431.3 140.6"/>
        <polygon id="room_wc-1" points="431.3 87.8 431.3 114.5 404.9 114.5 404.9 127.6 375 127.6 375 87.8 431.3 87.8"/>
      </g>

      <g id="icons">
        <path id="icon_man_1" d="M391.1,104a4,4,0,1,1,4-4A4,4,0,0,1,391.1,104Zm4.6,12.2v-5.5a4.6,4.6,0,0,0-4.6-4.5h0a4.6,4.6,0,0,0-4.6,4.5v5.5a3.2,3.2,0,0,0,3.2,3.2h2.8A3.2,3.2,0,0,0,395.7,116.2Z"/>
        <path id="icon_man_2" d="M27,143.7a3.9,3.9,0,0,1-3.9-3.9,4,4,0,1,1,7.9,0A3.9,3.9,0,0,1,27,143.7ZM31.6,156v-5.5a4.6,4.6,0,0,0-4.6-4.6h0a4.6,4.6,0,0,0-4.5,4.6V156a3.1,3.1,0,0,0,3.1,3.1h2.9A3.1,3.1,0,0,0,31.6,156Z"/>
        <path id="icon_woman_1" d="M391.1,143.8a4,4,0,1,1,4-4A4,4,0,0,1,391.1,143.8Zm5.5,14-1.3-10a1.7,1.7,0,0,0-1.6-1.8h-5.1a1.8,1.8,0,0,0-1.7,1.8l-1.3,10a1.2,1.2,0,0,0,1.1,1.4h8.8A1.2,1.2,0,0,0,396.6,157.8Z"/>
        <path id="icon_woman_2" d="M27,103.9a4,4,0,1,1,4-4A4,4,0,0,1,27,103.9Zm5.6,14-1.4-10a1.7,1.7,0,0,0-1.6-1.8H24.5a1.7,1.7,0,0,0-1.6,1.8l-1.4,10a1.2,1.2,0,0,0,1.2,1.4h8.7A1.2,1.2,0,0,0,32.6,117.9Z"/>
      </g>
    </svg>
  );
};


