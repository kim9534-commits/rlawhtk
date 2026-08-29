"use client";

import { useState } from "react";
import { mountainList, mountainInfo, Mountain } from "@/lib/mountains-data";
import PeakModal from "@/components/PeakModal";
import KoreaMap, { MapPin } from "@/components/KoreaMap";

const defaultPoints: MapPin[] = [
  { name: "통영 방파제 일대", x: 136, y: 224, addr: "경남 통영시" },
  { name: "거제 갯바위 포인트", x: 148, y: 216, addr: "경남 거제시" },
  { name: "다대포 방파제", x: 158, y: 222, addr: "부산 사하구" },
  { name: "당사항 방파제", x: 174, y: 196, addr: "울산 북구" },
  { name: "서귀포 서쪽 해안", x: 88, y: 392, addr: "제주 서귀포시" },
  { name: "속초 동명항 방파제", x: 183, y: 65, addr: "강원 속초시" },
  { name: "후포항 방파제", x: 190, y: 112, addr: "경북 울진군" },
  { name: "포항 신항 방파제", x: 194, y: 150, addr: "경북 포항시" },
  { name: "충주호 상류", x: 112, y: 146, addr: "충북 충주시" },
];

export default function MountainsPage() {
  const [selected, setSelected] = useState<Mountain | null>(null);
  const [mapPoints, setMapPoints] = useState<MapPin[]>(defaultPoints);
  const [mapLabel, setMapLabel] = useState("이번 주 인기 포인트");

  function handleViewMap() {
    if (!selected) return;
    const info = mountainInfo[selected.num];
    if (info?.points?.length) {
      setMapPoints(
        info.points.map((p) => ({ name: p.name, x: p.x, y: p.y, addr: p.addr }))
      );
      setMapLabel(`${selected.name} 인접 포인트`);
    }
    setSelected(null);
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="max-w-[1180px] mx-auto px-8 py-16">
      <div className="font-mono text-xs text-brass tracking-widest uppercase mb-2.5">
        Guide Series · 50
      </div>
      <h1 className="font-display text-[34px] font-semibold mb-2">
        한국의 명산 50선
      </h1>
      <p className="text-inkSoft mb-10">
        오르는 길과 곁의 물길을 함께 기록하는 연재. 이름을 클릭하면 상세
        정보를 볼 수 있어요.
      </p>

      <div className="grid md:grid-cols-2 gap-x-12 border-t border-line mb-16">
        {mountainList.map((m) => (
          <div
            key={m.num}
            onClick={() => setSelected(m)}
            className="flex items-baseline gap-3.5 py-3.5 border-b border-line cursor-pointer group"
          >
            <span className="font-mono text-xs text-brass w-[22px] shrink-0">
              {m.num}
            </span>
            <span className="font-display text-[16.5px] font-medium flex-1 group-hover:text-rust transition">
              {m.name}
            </span>
            <span className="font-mono text-[11.5px] text-inkSoft shrink-0">
              {m.meta}
            </span>
          </div>
        ))}
      </div>

      <div id="map" className="scroll-mt-24">
        <div className="font-mono text-xs text-brass tracking-widest uppercase mb-2.5">
          Hotspot
        </div>
        <h2 className="font-display text-[28px] font-semibold mb-2">
          {mapLabel}
        </h2>
        {mapLabel !== "이번 주 인기 포인트" && (
          <button
            onClick={() => {
              setMapPoints(defaultPoints);
              setMapLabel("이번 주 인기 포인트");
            }}
            className="font-mono text-xs text-brassSoft border-b border-dashed border-brassSoft/50 mb-4 inline-block"
          >
            ← 전체 인기 포인트로 돌아가기
          </button>
        )}
        <KoreaMap points={mapPoints} />
      </div>

      {selected && (
        <PeakModal
          mountain={selected}
          info={
            mountainInfo[selected.num] || { desc: "상세 정보를 준비 중이에요.", tag: "", points: [] }
          }
          onClose={() => setSelected(null)}
          onViewMap={handleViewMap}
        />
      )}
    </div>
  );
}
