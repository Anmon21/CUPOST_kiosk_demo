"use client";

import { useEffect } from "react";
import { useKiosk } from "@/lib/store";
import { IconAlert, IconCheck, IconChevronLeft, IconInfo } from "./Icons";

/** Pill "Back" button used at the top of customer screens. */
export function BackButton({ onClick }: { onClick: () => void }) {
  const { t } = useKiosk();
  return (
    <button
      type="button"
      onClick={onClick}
      className="press flex h-[88px] items-center gap-2.5 self-start rounded-full border-2 border-tint-2 bg-white pl-6 pr-9 text-[32px] font-bold text-ink"
    >
      <IconChevronLeft size={40} color="#1E1430" stroke={2.6} />
      {t("common.back")}
    </button>
  );
}

/** Circular countdown ring. */
export function CountdownRing({
  seconds,
  total,
  size = 112,
  stroke = 10,
  color = "#62318F",
  track = "#E4D7F1",
  fontSize = 48,
}: {
  seconds: number;
  total: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  fontSize?: number;
}) {
  const r = (size - stroke) / 2 - 2;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, seconds / total));
  return (
    <div className="relative flex-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * frac} ${c}`}
          style={{ transition: "stroke-dasharray 250ms linear" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-extrabold tracking-tight"
        style={{ color, fontSize }}
        aria-live="polite"
      >
        {seconds}
      </span>
    </div>
  );
}

/** Small toast at the top of the stage. */
export function ToastHost() {
  const { state, actions, t } = useKiosk();
  const toast = state.toast;

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => actions.toastClear(toast.id), 3200);
    return () => clearTimeout(id);
  }, [toast, actions]);

  if (!toast) return null;
  const tone = {
    ok: { bg: "#1E1430", fg: "#FFFFFF", icon: <IconCheck size={36} color="#A6CE39" stroke={3} /> },
    info: { bg: "#1E1430", fg: "#FFFFFF", icon: <IconInfo size={36} color="#A6CE39" stroke={2.4} /> },
    error: { bg: "#C62828", fg: "#FFFFFF", icon: <IconAlert size={36} color="#FFFFFF" stroke={2.4} /> },
  }[toast.tone];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[196px] z-40 flex justify-center px-16">
      <div
        key={toast.id}
        role="status"
        className="animate-rise flex max-w-[952px] items-center gap-4 rounded-[32px] px-9 py-6 text-[30px] font-semibold leading-snug shadow-[0_16px_40px_rgba(30,20,48,0.35)]"
        style={{ background: tone.bg, color: tone.fg }}
      >
        <span className="flex-none">{tone.icon}</span>
        {t(toast.key, toast.vars)}
      </div>
    </div>
  );
}
