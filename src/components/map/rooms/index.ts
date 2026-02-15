import React from 'react';
import type { RoomMapProps } from './types';

import { Room315 } from './Room315';
import { Room316 } from './Room316';
import { Room317 } from './Room317';
import { Room318 } from './Room318';
import { RoomHall } from './RoomHall';  
import { RoomPC3 } from './RoomPC3';

const roomComponentRegistry: Record<string, React.FC<RoomMapProps>> = {
  'room_315': Room315,
  'room_316': Room316,
  'room_317': Room317,
  'room_318': Room318,
  'room_hall': RoomHall,
  'room_pc_3': RoomPC3,
};

export const getRoomMapComponent = (roomId: string): React.FC<RoomMapProps> => {
  return roomComponentRegistry[roomId]
};