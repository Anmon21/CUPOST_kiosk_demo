"use client";

import Image from "next/image";
import { useKiosk } from "@/lib/store";
import { LEFT_COLUMN, MAP_DOOR_HEIGHT, RIGHT_COLUMN, type ColumnCell } from "@/lib/locker";
import { IconCheck, IconPin, IconUnlock } from "./Icons";

interface Props {
  /** Doors to highlight in lime ("your door"). */
  highlight: string[];
  /** Highlighted doors that are already closed again. */
  closed?: string[];
  theme?: "dark" | "light";
  showHere?: boolean;
}

/** Front view of the stora locker — same picture as the CU POST mini app. 502×672 px. */
export default function LockerMap({ highlight, closed = [], theme = "dark", showHere = true }: Props) {
  const { t } = useKiosk();
  const dark = theme === "dark";
  const frameBg = dark ? "#2A1145" : "#F1EAF8";
  const frameBd = dark ? "#B79AD8" : "#CDB8E6";

  const cell = (c: ColumnCell, i: number) => {
    if (c.kind === "screen") {
      return (
        <div
          key={`screen-${i}`}
          className="flex h-[192px] flex-col items-center justify-center gap-2.5 rounded-lg"
          style={{ background: dark ? "#1A0930" : "#2A1145" }}
        >
          {showHere && (
            <span className="flex items-center gap-1.5 rounded-full bg-lime px-3.5 py-1.5 text-[20px] font-extrabold text-ink">
              <IconPin size={20} color="#1E1430" stroke={2.6} />
              {t("map.here")}
            </span>
          )}
          <div className="flex h-[60px] w-[104px] items-center justify-center rounded-lg border-[3px] border-[#B79AD8] bg-[#12061F] text-[16px] font-semibold text-tint-2">
            {t("map.screen")}
          </div>
          <div className="h-2.5 w-14 rounded-full bg-[#B79AD8]" />
        </div>
      );
    }
    const { id, size } = c.door;
    const on = highlight.includes(id);
    const isClosed = on && closed.includes(id);
    const bg = on ? (isClosed ? "#EEF6D7" : "#A6CE39") : dark ? "#6B3A9C" : "#FFFFFF";
    const fg = on ? "#1E1430" : dark ? "#F4ECFC" : "#62318F";
    const bd = on ? "#D4EE84" : dark ? "#8457B3" : "#DCCDEE";
    const fs = size === "S" ? 20 : 28;
    return (
      <div
        key={id}
        className="flex items-center justify-center gap-2 rounded-lg border-2 font-bold transition-colors duration-300"
        style={{ height: MAP_DOOR_HEIGHT[size], background: bg, color: fg, borderColor: bd, fontSize: fs }}
      >
        <span>
          {id} · {size}
        </span>
        {on && (isClosed ? <IconCheck size={fs} color="#1E1430" stroke={3} /> : <IconUnlock size={fs} color="#1E1430" stroke={2.6} />)}
      </div>
    );
  };

  return (
    <div
      role="img"
      aria-label={t("map.aria", { doors: highlight.join(", ") })}
      className="flex h-[672px] w-[502px] flex-none flex-col items-center"
    >
      <div className="flex w-[502px] flex-col gap-2 rounded-3xl border-4 p-3.5" style={{ background: frameBg, borderColor: frameBd }}>
        <div className="flex h-10 items-center justify-center rounded-[10px] bg-white">
          <Image src="/cupost-logo.png" alt="" width={107} height={26} className="h-[26px] w-auto" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-2">{LEFT_COLUMN.map(cell)}</div>
          <div className="flex flex-col gap-2">{RIGHT_COLUMN.map(cell)}</div>
        </div>
      </div>
      <div className="h-3.5 w-[440px] rounded-b-xl" style={{ background: frameBd }} />
    </div>
  );
}
