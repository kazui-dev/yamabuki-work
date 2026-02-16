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
            #active_area rect { cursor: pointer; transition: all 0.2s ease; fill: #ffff0044; }
            #active_area rect:hover { fill-opacity: 0.5; }
            #passive_area rect, polygon { fill: #f0f0f0; }
            
            ${activeRoomId ? `#active_area rect[data-room-id="${activeRoomId}"] { fill: #ff8000 !important; fill-opacity: 0.5 !important; }` : ''}
        `}</style>
      <g id="base_area">
        <rect data-room-id="base" width="453.5" height="255.1"/>
      </g>
      <g id="passive_area">
        <rect data-room-id="room_wc_4" x="0" y="127.6" width="54.1" height="39.8" transform="translate(54.1 295) rotate(180)"/>
        <rect data-room-id="room_wc_3" x="0" y="87.8" width="54.1" height="39.8" transform="translate(54.1 215.4) rotate(180)"/>
        <polygon data-room-id="room_wc-2" points="431.3 140.6 431.3 167.4 375 167.4 375 127.6 404.9 127.6 404.9 140.6 431.3 140.6"/>
        <polygon data-room-id="room_wc-1" points="431.3 87.8 431.3 114.5 404.9 114.5 404.9 127.6 375 127.6 375 87.8 431.3 87.8"/>
        <rect data-room-id="stairs" x="54.1" y="87.8" width="42.5" height="66.1" transform="translate(150.7 241.6) rotate(180)"/>
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
	    <path id="stairs" class="cls-1" d="M96.6,87.8V156M75.3,87.8V156M54.1,87.8H96.6M54.1,99.2H96.6M54.1,110.5H96.6M54.1,121.9H96.6M54.1,133.3H96.6M54.1,144.6H96.6"/></g>  
    </svg>
  );

};

