"use client";

import Header from "@/components/Header";
import { IconCheck, IconHelp, IconPin, IconUnlock } from "@/components/Icons";
import LockerMap from "@/components/LockerMap";
import { DOOR_BY_ID } from "@/lib/locker";
import { useKiosk } from "@/lib/store";

export default function DoorsOpen() {
  const { state, actions, t } = useKiosk();
  const pickup = state.pickup;
  if (!pickup) return null;

  const many = pickup.doorIds.length > 1;

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-brand text-white">
      <Header />

      <main className="flex flex-1 flex-col items-center px-16 pb-8 pt-12">
        <div className="animate-pop flex size-[140px] items-center justify-center rounded-full bg-lime shadow-[0_0_0_18px_rgba(166,206,57,0.18)]">
          <IconUnlock size={72} color="#1E1430" stroke={2.4} />
        </div>

        <h1 className="animate-rise mt-9 text-center text-[96px] font-extrabold leading-[1.08] tracking-[-1.5px]">
          {many ? t("opened.titleMany", { n: pickup.doorIds.length }) : t("opened.titleOne")}
        </h1>
        <p className="mt-3 text-center text-[36px] font-medium leading-[1.3] text-tint-2">
          {many ? t("opened.subMany") : t("opened.subOne")}
        </p>

        <div className="mt-9 flex w-full gap-6">
          {pickup.doorIds.map((id) => {
            const closed = pickup.closed.includes(id);
            const size = DOOR_BY_ID[id].size;
            return (
              <div
                key={id}
                className={`animate-rise flex h-[220px] flex-1 flex-col justify-between rounded-[40px] px-8 py-[26px] transition-colors duration-300 ${
                  closed ? "bg-white/12 text-white" : "bg-lime text-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[28px] font-bold">{t("common.door")}</span>
                  <span
                    className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[22px] font-bold ${
                      closed ? "bg-white text-ink" : "bg-ink text-lime"
                    }`}
                  >
                    {closed ? (
                      <IconCheck size={22} color="#1E1430" stroke={3} />
                    ) : (
                      <span className="size-2.5 rounded-full bg-lime" />
                    )}
                    {closed ? t("common.closed") : t("common.open")}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-[124px] font-extrabold leading-[0.85] tracking-[-3px]">{id}</span>
                  <span className="text-[30px] font-bold">
                    {t(`common.size.${size}`)} · {size}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-7 flex w-full items-center gap-9 rounded-[44px] bg-brand-deep p-8">
          <LockerMap highlight={pickup.doorIds} closed={pickup.closed} theme="dark" />
          <div className="flex flex-1 flex-col gap-7">
            <span className="text-[26px] font-bold tracking-[1px] text-lav">{t("opened.mapTitle")}</span>
            <div className="flex items-center gap-[18px]">
              <span className="size-11 flex-none rounded-[10px] border-2 border-[#D4EE84] bg-lime" />
              <span className="text-[30px] font-semibold leading-[1.2]">{t("opened.legendYours")}</span>
            </div>
            <div className="flex items-center gap-[18px]">
              <span className="size-11 flex-none rounded-[10px] border-2 border-[#8457B3] bg-brand-door" />
              <span className="text-[30px] font-semibold leading-[1.2]">{t("opened.legendOther")}</span>
            </div>
            <div className="flex items-center gap-[18px]">
              <span className="flex size-11 flex-none items-center justify-center rounded-full bg-lime">
                <IconPin size={26} color="#1E1430" stroke={2.6} />
              </span>
              <span className="text-[30px] font-semibold leading-[1.2]">{t("opened.legendHere")}</span>
            </div>
            <div className="h-0.5 bg-white/16" />
            <div className="flex flex-col gap-2.5 text-[28px] font-medium text-lav">
              {(["S", "M", "L"] as const).map((s) => (
                <span key={s}>
                  <b className="text-white">{s}</b> · {t(`common.sizeKey.${s}`)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={actions.pickupAllTaken}
          className="press flex h-40 w-full items-center justify-center gap-5 rounded-[44px] bg-lime text-[52px] font-extrabold text-ink shadow-[0_10px_0_#7FA024]"
        >
          <IconCheck size={56} color="#1E1430" stroke={3} />
          {many ? t("opened.doneMany") : t("opened.doneOne")}
        </button>
        <button
          type="button"
          onClick={() => actions.go("doorHelp")}
          className="mt-5 flex min-h-16 items-center gap-3 bg-transparent text-[32px] font-semibold text-white underline underline-offset-4"
        >
          <IconHelp size={34} color="#FFFFFF" stroke={2.2} />
          {t("opened.problem")}
        </button>
      </main>
    </div>
  );
}
