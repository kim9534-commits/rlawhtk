"use client";

import type { Mountain, MountainInfo } from "@/lib/mountains-data";

const photoPalette = [
  { skyA: "#3F6B7A", skyB: "#16302C" },
  { skyA: "#B84632", skyB: "#4a1e17" },
  { skyA: "#24444F", skyB: "#0F2229" },
  { skyA: "#4A7C68", skyB: "#1B3A4B" },
  { skyA: "#C79A5F", skyB: "#5c3d1c" },
  { skyA: "#6C8A5E", skyB: "#233A2C" },
  { skyA: "#5C7A4E", skyB: "#1F3327" },
  { skyA: "#8A5A2B", skyB: "#3d2412" },
  { skyA: "#7a4a3a", skyB: "#2b1710" },
  { skyA: "#3d5a6b", skyB: "#0e1f26" },
];

export default function PeakModal({
  mountain,
  info,
  onClose,
  onViewMap,
}: {
  mountain: Mountain;
  info: MountainInfo;
  onClose: () => void;
  onViewMap: () => void;
}) {
  const idx = (parseInt(mountain.num, 10) - 1) % photoPalette.length;
  const palette = photoPalette[idx];

  return (
    <div
      className="fixed inset-0 z-[100] bg-navy/50 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-paper border border-lineStrong rounded-lg max-w-[420px] w-full p-[34px_30px_28px] shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 w-[30px] h-[30px] rounded-full border border-lineStrong text-inkSoft hover:bg-ink hover:text-paper transition flex items-center justify-center text-sm"
        >
          ✕
        </button>

        <div
          className="h-[170px] -mx-[30px] -mt-[34px] mb-[22px] relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${palette.skyA}, ${palette.skyB})`,
          }}
        >
          <svg viewBox="0 0 400 170" preserveAspectRatio="none" className="w-full h-full block">
            <polygon
              points="0,170 0,110 60,60 120,95 180,45 240,85 300,35 360,80 400,55 400,170"
              fill="rgba(0,0,0,0.3)"
            />
            <polygon
              points="0,170 0,140 50,90 110,125 170,80 230,115 290,70 350,110 400,90 400,170"
              fill="rgba(0,0,0,0.46)"
            />
          </svg>
          <span className="absolute bottom-2.5 left-3.5 font-mono text-[10.5px] text-white bg-black/30 px-2.5 py-1 rounded-full backdrop-blur">
            {mountain.name} · 일러스트
          </span>
        </div>

        <div className="font-mono text-[11.5px] text-brass tracking-widest uppercase mb-2.5">
          No. {mountain.num} · {mountain.meta}
        </div>
        <h3 className="font-display text-[26px] font-semibold mb-3.5 leading-tight">
          {mountain.name}
        </h3>
        <p className="text-[14.5px] text-inkSoft mb-5 leading-relaxed">
          {info.desc}
        </p>
        {info.tag && (
          <div className="inline-block text-[11.5px] text-navy bg-navy/[0.08] px-3 py-1.5 rounded-full mb-5">
            {info.tag}
          </div>
        )}

        {info.points.length > 0 && (
          <div className="mb-5">
            <div className="font-mono text-[11px] text-inkSoft tracking-widest uppercase mb-2.5">
              {mountain.name} 인접 낚시 포인트
            </div>
            {info.points.map((pt, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-3 py-2.5 bg-navy/[0.045] border border-line rounded mb-1.5 text-[13.5px]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rust inline-block" />
                  {pt.name}
                </span>
                <span className="font-mono text-[10.5px] text-inkSoft">
                  {pt.type}
                </span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onViewMap}
          className="w-full font-mono text-sm bg-navy text-paper py-3.5 rounded hover:bg-navySoft transition"
        >
          전체 포인트 지도에서 보기 →
        </button>
      </div>
    </div>
  );
}
