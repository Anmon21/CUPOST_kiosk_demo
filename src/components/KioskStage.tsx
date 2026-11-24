"use client";

import { useEffect, useState } from "react";

export const STAGE_W = 1080;
export const STAGE_H = 1920;

/**
 * Renders the kiosk at its native 1080×1920 and scales it to fit the window.
 * On the real portrait screen in full-screen mode the scale is exactly 1.
 */
export default function KioskStage({ children, hideCursor }: { children: React.ReactNode; hideCursor: boolean }) {
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    const raf = requestAnimationFrame(fit);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-hidden bg-black ${hideCursor ? "hide-cursor" : ""}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="relative flex-none overflow-hidden"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
          transition: "opacity 200ms ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
