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
        #icon_EV_1 { fill: #333333; stroke: none; }
        #active_area rect { cursor: pointer; transition: all 0.2s ease; fill: #ffff0044; }
        #active_area rect:hover { fill-opacity: 0.5; }
        
        ${activeRoomId ? `#active_area rect[data-room-id="${activeRoomId}"] { fill: #ff8000 !important; fill-opacity: 0.5 !important; }` : ''}
      `}</style>

      <g id="base_area">
        <rect id="base" width="453.5" height="255.1"/>
      </g>

      <g id="passive_area">
        <rect id="pc_ll" x="0" y="196.7" width="96.6" height="58.4" transform="translate(96.6 451.9) rotate(180)"/>
        <rect id="pc_2" x="375" y="196.8" width="78.5" height="58.3" transform="translate(828.5 451.9) rotate(180)"/>
        <rect id="311" x="179" y="196.7" width="56.5" height="58.4" transform="translate(414.6 451.9) rotate(180)"/>
        <rect id="310" x="235.6" y="196.7" width="39.4" height="58.4" transform="translate(510.5 451.9) rotate(180)"/>
        <rect id="309" x="275" y="196.8" width="100" height="58.3" transform="translate(650 451.9) rotate(180)"/>
        <rect id="top_light" x="179" y="87.8" width="196" height="79.6" transform="translate(554 255.2) rotate(180)"/>
      </g>

      <g id="active_area">
        <rect data-room-id="pc_3" x="96.6" y="196.7" width="82.4" height="58.4" transform="translate(275.6 451.9) rotate(180)"/>
        <rect data-room-id="hall" y="0" width="96.6" height="58.4" transform="translate(96.6 58.4) rotate(180)"/>
        <rect data-room-id="318" x="96.6" y="0" width="82.4" height="58.4" transform="translate(275.6 58.4) rotate(180)"/>
        <rect data-room-id="317" x="179" y="0" width="96" height="58.4" transform="translate(454 58.4) rotate(180)"/>
        <rect data-room-id="316" x="275" y="0" width="98" height="58.4" transform="translate(648 58.4) rotate(180)"/>
        <rect data-room-id="315" x="373" y="0" width="80.5" height="58.4" transform="translate(826.6 58.4) rotate(180)"/>
      </g>

      <g id="facilities">
        <rect id="EV_1" x="404.9" y="114.5" width="26.4" height="26" transform="translate(836.1 255.1) rotate(180)"/>
        <rect id="EV_2" x="147.8" y="87.8" width="31.2" height="79.6" transform="translate(326.8 255.2) rotate(180)"/>
        <path id="stairs" d="M54.1,87.8H75.3V99.2H54.1ZM75.3,99.2H96.6V87.8H75.3ZM54.1,110.5H75.3V99.2H54.1Zm21.2,0H96.6V99.2H75.3ZM54.1,121.9H75.3V110.5H54.1Zm21.2,0H96.6V110.5H75.3ZM54.1,133.3H75.3V121.9H54.1Zm21.2,0H96.6V121.9H75.3ZM54.1,144.6H75.3V133.3H54.1Zm21.2,0H96.6V133.3H75.3Zm0,11.4V144.6H54.1V156m42.5,0V144.6H75.3V156"/>
        <rect id="wc_4" y="127.6" width="54.1" height="39.8" transform="translate(54.1 295) rotate(180)"/>
        <rect id="wc_3" y="87.8" width="54.1" height="39.81" transform="translate(54.1 215.4) rotate(180)"/>
        <polygon id="wc-2" points="431.3 140.6 431.3 167.4 375 167.4 375 127.6 404.9 127.6 404.9 140.6 431.3 140.6"/>
        <polygon id="wc-1" points="431.3 87.8 431.3 114.5 404.9 114.5 404.9 127.6 375 127.6 375 87.8 431.3 87.8"/>
      </g>

      <g id="icons">
        <path id="icon_man_1" d="M391.1,104c-2.2,0-4-1.8-4-4s1.8-4,4-4,4,1.8,4,4-1.8,4-4,4ZM395.1,107.6l-1,10c0,1-.5,1.8-1.2,1.8h-3.7c-.7,0-1.2-.8-1.2-1.8l-1-10c0-.7.3-1.4.8-1.4h6.4c.5,0,.9.7.8,1.4Z"/>
        <path id="icon_man_2" d="M27,143.7c-2.2,0-4-1.8-4-4s1.8-4,4-4,4,1.8,4,4-1.8,4-4,4ZM31.1,147.3l-1,10c0,1-.5,1.8-1.2,1.8h-3.7c-.7,0-1.2-.8-1.2-1.8l-1-10c0-.7.3-1.4.8-1.4h6.4c.5,0,.9.7.8,1.4Z"/>
        <path id="icon_woman_1" d="M391.1,143.8c-2.2,0-4-1.8-4-4s1.8-4,4-4,4,1.8,4,4-1.8,4-4,4ZM395.1,157.8l-1-10c0-1-.5-1.8-1.2-1.8h-3.7c-.7,0-1.2.8-1.2,1.8l-1,10c0,.7.3,1.4.8,1.4h6.4c.5,0,.9-.7.8-1.4Z"/>
        <path id="icon_woman_2" d="M27,103.9c-2.2,0-4-1.8-4-4s1.8-4,4-4,4,1.8,4,4-1.8,4-4,4ZM31.1,117.9l-1-10c0-1-.5-1.8-1.2-1.8h-3.7c-.7,0-1.2.8-1.2,1.8l-1,10c0,.7.3,1.4.8,1.4h6.4c.5,0,.9-.7.8-1.4Z"/>
        <path  id="icon_EV_1" d="M418.1,129.5c-.9,0-1.6-.7-1.6-1.6s.7-1.6,1.6-1.6,1.6.7,1.6,1.6-.7,1.6-1.6,1.6ZM419.6,134.9l-.4-3.9c0-.4-.2-.7-.5-.7h-1.4c-.3,0-.5.3-.5.7l-.4,3.9c0,.3.1.5.3.5h2.6c.2,0,.3-.3.3-.5ZM414.1,129.5c-.9,0-1.6-.7-1.6-1.6s.7-1.6,1.6-1.6,1.6.7,1.6,1.6-.7,1.6-1.6,1.6ZM415.7,134.9l-.4-3.9c0-.4-.2-.7-.5-.7h-1.4c-.3,0-.5.3-.5.7l-.4,3.9c0,.3.1.5.3.5h2.6c.2,0,.3-.3.3-.5ZM422,129.5c-.9,0-1.6-.7-1.6-1.6s.7-1.6,1.6-1.6,1.6.7,1.6,1.6-.7,1.6-1.6,1.6ZM423.6,134.9l-.4-3.9c0-.4-.2-.7-.5-.7h-1.4c-.3,0-.5.3-.5.7l-.4,3.9c0,.3.1.5.3.5h2.6c.2,0,.3-.3.3-.5ZM424.4,137.9h-12.7c-.9,0-1.7-.8-1.7-1.7v-10.7c0-.9.8-1.7,1.7-1.7h12.7c.9,0,1.7.8,1.7,1.7v10.7c0,.9-.8,1.7-1.7,1.7ZM411.7,125c-.3,0-.5.2-.5.5v10.7c0,.3.2.5.5.5h12.7c.3,0,.5-.2.5-.5v-10.7c0-.3-.2-.5-.5-.5h-12.7ZM412.8,120.4l1.8-1.8,1.8,1.8c.2.2.6.2.8,0,.2-.2.2-.6,0-.8l-2.1-2.1c-.3-.3-.8-.3-1.1,0l-2.1,2.1c-.2.2-.2.6,0,.8s.3.2.4.2.3,0,.4-.2ZM415.2,122.5v-4.6c0-.3-.3-.6-.6-.6s-.6.3-.6.6v4.6c0,.3.3.6.6.6s.6-.3.6-.6ZM422.1,122.5v-4.6c0-.3-.3-.6-.6-.6s-.6.3-.6.6v4.6c0,.3.3.6.6.6s.6-.3.6-.6ZM422.1,122.8l2.1-2.1c.2-.2.2-.6,0-.8-.2-.2-.6-.2-.8,0l-1.8,1.8-1.8-1.8c-.2-.2-.6-.2-.8,0-.2.2-.2.6,0,.8l2.1,2.1c.1.1.3.2.5.2s.4,0,.5-.2Z"/>      </g>
    </svg>
  );
};


