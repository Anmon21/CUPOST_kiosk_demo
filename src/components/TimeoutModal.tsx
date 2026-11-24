"use client";

import { useCountdown } from "@/hooks/useKioskHooks";
import { useKiosk } from "@/lib/store";
import { CountdownRing } from "./Ui";

const SECONDS = 10;

/** "Are you still there?" — clears the screen so the next person can't see the last one's code. */
export default function TimeoutModal() {
  const { state, actions, t } = useKiosk();
  const left = useCountdown(SECONDS, state.timeoutOpen, actions.reset);

  if (!state.timeoutOpen) return null;

  return (
    <div className="animate-fade-in absolute inset-0 z-30 flex items-center justify-center bg-[rgba(30,20,48,0.74)]">
      <section
        role="alertdialog"
        aria-labelledby="timeout-title"
        aria-describedby="timeout-desc"
        className="animate-pop flex w-[880px] flex-col items-center rounded-[56px] bg-white px-16 pb-16 pt-[72px] text-ink"
      >
        <CountdownRing seconds={left} total={SECONDS} size={220} stroke={16} track="#F1EAF8" fontSize={104} />
        <h2 id="timeout-title" className="m-0 mt-12 text-center text-[64px] font-extrabold leading-[1.1]">
          {t("timeout.title")}
        </h2>
        <p id="timeout-desc" className="m-0 mt-5 text-center text-[32px] font-medium leading-[1.4] text-muted">
          {t("timeout.desc", { s: left })}
        </p>
        <button
          type="button"
          onClick={() => actions.setTimeoutOpen(false)}
          className="press mt-14 flex h-[150px] w-full items-center justify-center rounded-[44px] bg-lime text-[48px] font-extrabold text-ink shadow-[0_10px_0_#7FA024]"
        >
          {t("common.continue")}
        </button>
        <button
          type="button"
          onClick={actions.reset}
          className="press mt-6 flex h-[130px] w-full items-center justify-center rounded-[44px] border-[3px] border-tint-2 bg-white text-[40px] font-bold text-brand"
        >
          {t("timeout.backStart")}
        </button>
      </section>
    </div>
  );
}
