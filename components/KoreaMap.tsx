"use client";

import { useState } from "react";

export type MapPin = { name: string; x: number; y: number; addr?: string };

export default function KoreaMap({ points }: { points: MapPin[] }) {
  const [active, setActive] = useState<MapPin | null>(null);

  return (
    <div className="relative bg-navy rounded-md p-5">
      {active && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-navySoft/90 border border-paper/25 rounded-md px-3.5 py-3 backdrop-blur">
          <div className="font-display font-semibold text-[15px] text-paper mb-1">
            {active.name}
          </div>
          <div className="font-mono text-[11.5px] text-paper/70">
            {active.addr || "주소 정보 준비 중"}
          </div>
        </div>
      )}
      <svg viewBox="0 0 300 420" className="w-full h-auto max-h-[440px] mx-auto">
        <path
          d="M160,10 L185,60 L195,140 L180,200 L150,225 L165,245 L135,235 L110,255 L90,235 L60,250 L40,225 L15,235 L30,205 L5,180 L20,150 L5,120 L20,100 L5,70 L30,50 L15,30 L45,15 L70,5 Z"
          fill="rgba(243,246,241,0.06)"
          stroke="rgba(243,246,241,0.45)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <path
          d="M75,385 L100,378 L120,388 L115,400 L90,405 L70,398 Z"
          fill="rgba(243,246,241,0.06)"
          stroke="rgba(243,246,241,0.45)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        {points.map((pt, i) => (
          <g
            key={i}
            className="cursor-pointer"
            onClick={() => setActive(pt)}
          >
            <circle
              cx={pt.x}
              cy={pt.y}
              r={5.5}
              fill="#B84632"
              stroke="#17323C"
              strokeWidth={1.5}
            />
            <title>{pt.name}</title>
          </g>
        ))}
      </svg>
    </div>
  );
}
