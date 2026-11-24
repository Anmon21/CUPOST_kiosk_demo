"use client";

import Header from "@/components/Header";
import { IconCheck, IconPhone } from "@/components/Icons";
import { CountdownRing } from "@/components/Ui";
import { useCountdown } from "@/hooks/useKioskHooks";
import { DOOR_BY_ID } from "@/lib/locker";
import { useKiosk } from "@/lib/store";

const BACK_AFTER = 8;

export default function Done() {
  const { state, actions, t } = useKiosk();
  const left = useCountdown(BACK_AFTER, !state.demoOpen, actions.reset);
  const doors = state.pickup?.doorIds ?? [];

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-surface text-ink">
      <Header />

      <main className="flex flex-1 flex-col items-center px-16 pb-12 pt-[120px]">
        <div className="animate-pop flex size-[240px] items-center justify-center rounded-full bg-lime shadow-[0_0_0_28px_#E7F2C6]">
          <IconCheck size={130} color="#1E1430" stroke={3} />
        </div>

        <h1 className="animate-rise mt-20 text-[120px] font-extrabold leading-[1.05] tracking-[-2px]">{t("done.title")}</h1>
        <p className="mt-3 text-[44px] font-semibold leading-[1.3] text-muted">{t("done.sub")}</p>

        {doors.length > 0 && (
          <div className="mt-[72px] flex w-full flex-col rounded-[40px] border-2 border-line bg-white px-10 py-2">
            {doors.map((id, i) => (
              <div
                key={id}
                className={`flex h-[120px] items-center justify-between ${i < doors.length - 1 ? "border-b-2 border-tint" : ""}`}
              >
                <div className="flex items-center gap-5">
                  <span className="rounded-[20px] bg-tint px-[22px] py-2 text-[48px] font-extrabold text-brand">{id}</span>
                  <span className="text-[30px] font-semibold text-muted">
                    {t(`common.size.${DOOR_BY_ID[id].size}`)} · {DOOR_BY_ID[id].size}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[32px] font-bold">{t("common.closed")}</span>
                  <span className="flex size-[52px] items-center justify-center rounded-full bg-lime">
                    <IconCheck size={30} color="#1E1430" stroke={3} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 flex items-center gap-3.5 text-[30px] font-medium text-muted">
          <IconPhone size={36} color="#625A70" stroke={2.2} />
          {t("done.app")}
        </p>

        <div className="flex-1" />

        <div className="flex items-center gap-6">
          <CountdownRing seconds={left} total={BACK_AFTER} />
          <span className="text-[30px] font-medium text-muted">{t("done.countdown")}</span>
        </div>

        <button
          type="button"
          onClick={actions.reset}
          className="press mt-8 flex h-40 w-full items-center justify-center rounded-[44px] bg-brand text-[52px] font-extrabold text-white"
        >
          {t("done.finish")}
        </button>
      </main>
    </div>
  );
}
