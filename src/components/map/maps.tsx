import React, { useState } from 'react';
import { FloorMap } from "./FloorMap"; // 追加
import { PosterCard } from "./PosterCard";
import { getRoomMapComponent } from "./rooms";
import type { RoomData } from "@/types";

// Propsを、1つの部屋のデータではなく全データを受け取るように変更
interface MapsProps {
  roomsData: RoomData[];
}

export const Maps: React.FC<MapsProps> = ({ roomsData }) => {
  // 選択された部屋のIDを管理
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // 選択された部屋のデータを取得
  const selectedRoom = roomsData.find(room => room.id === selectedRoomId);
  
  // 選択された部屋がある場合のみ、その部屋の詳細コンポーネントを取得
  const RoomMapComponent = selectedRoom ? getRoomMapComponent(selectedRoom.id) : null;

  return (
    <>
      <section className="mb-8 max-w-md mx-auto">
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <FloorMap 
            className="p-2" 
            onRoomSelect={(id) => setSelectedRoomId(id)} 
          />
        </div>
      </section>

      {selectedRoom && RoomMapComponent ? (
        <section id={selectedRoom.id} className="mb-12">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-bold text-slate-800">{selectedRoom.name}</h2>
                <RoomMapComponent roomId={selectedRoom.id} />
              </div>

              {selectedRoom.posters && selectedRoom.posters.length > 0 && (
                <div className="border-t border-slate-100 bg-slate-50/50">
                  {selectedRoom.posters.map((poster) => (
                    <PosterCard key={poster.id} poster={poster} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="max-w-md mx-auto text-center p-8 border border-dashed border-slate-300 rounded-lg text-slate-500 bg-slate-50">
          <p>フロアマップから、見たい部屋を選択してください。</p>
        </div>
      )}
    </>
  );
};