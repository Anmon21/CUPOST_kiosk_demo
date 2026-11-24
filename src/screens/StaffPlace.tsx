"use client";

import Header from "@/components/Header";
import { IconAlert, IconCheck, IconMaximize, IconSpinner } from "@/components/Icons";
import { Lines } from "@/components/Lines";
import LockerMap from "@/components/LockerMap";
import { maskTracking } from "@/lib/demo";
import { DOOR_BY_ID } from "@/lib/locker";
import { useKiosk } from "@/lib/store";

export default function StaffPlace() {
  const { state, actions, t } = useKiosk();
  const cur = state.staff?.current;
  if (!cur) return null;
  const size = DOOR_BY_ID[cur.doorId].size;

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-ink text-white">
      <Header variant="staff" />

      <main className="flex flex-1 flex-col px-16 pb-12 pt-12">
        <div className="flex items-center gap-3.5 self-start rounded-full bg-staff px-7 py-3.5 text-[28px]">
          <IconCheck size={32} color="#A6CE39" stroke={3} />
          <span className="font-bold">{t("staff.place.scanned")}</span>
          <span className="font-medium text-staff-muted">· {maskTracking(cur.tracking)} · Partner</span>
        </div>

        <div key={cur.doorId} className="animate-pop mt-8 flex h-[280px] items-center gap-11 rounded-[44px] bg-lime px-12 py-9 text-ink">
          <span className="text-[210px] font-extrabold leading-[0.8] tracking-[-6px]">{cur.doorId}</span>
          <div className="flex flex-col gap-2.5">
            <span className="text-[56px] font-extrabold leading-[1.05]">
              <Lines text={t("staff.place.open")} />
            </span>
            <span className="text-[34px] font-bold">
              {t(`common.size.${size}`)} · {size}
            </span>
          </div>
        </div>

        <div className="mt-7 flex items-center gap-9 rounded-[44px] bg-staff p-8">
          <LockerMap highlight={[cur.doorId]} theme="dark" />
          <div className="flex flex-1 flex-col gap-8">
            <span className="text-[26px] font-bold tracking-[1px] text-staff-muted">{t("staff.place.todo")}</span>
            {(["staff.place.step1", "staff.place.step2", "staff.place.step3"] as const).map((k, i) => (
              <div key={k} className="flex items-start gap-[18px]">
                <span className="flex size-14 flex-none items-center justify-center rounded-full bg-lime text-[28px] font-extrabold text-ink">
                  {i + 1}
                </span>
                <span className="mt-2 text-[30px] font-semibold leading-[1.3]">{t(k)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-[18px]">
          <IconSpinner size={44} color="#A6CE39" stroke={2.6} className="animate-spin-slow" />
          <span className="text-[32px] font-semibold text-staff-muted">{t("staff.place.waiting")}</span>
        </div>

        <div className="flex-1" />

        <div className="flex gap-6">
          <button
            type="button"
            onClick={actions.staffBigger}
            className="press flex h-[140px] flex-1 items-center justify-center gap-3.5 rounded-[44px] border-[3px] border-staff-border bg-transparent text-[32px] font-extrabold text-white"
          >
            <IconMaximize size={40} color="#FFFFFF" stroke={2.4} />
            {t("staff.place.bigger")}
          </button>
          <button
            type="button"
            onClick={actions.staffReopen}
            className="press flex h-[140px] flex-1 items-center justify-center gap-3.5 rounded-[44px] border-[3px] border-staff-border bg-transparent text-[32px] font-extrabold text-white"
          >
            <IconAlert size={40} color="#FFFFFF" stroke={2.4} />
            {t("staff.place.notOpen")}
          </button>
        </div>
        <button
          type="button"
          onClick={actions.staffConfirmClosed}
          className="press mt-6 flex h-[150px] items-center justify-center gap-[18px] rounded-[44px] bg-lime text-[44px] font-extrabold text-ink"
        >
          <IconCheck size={48} color="#1E1430" stroke={3} />
          {t("staff.place.closed")}
        </button>
      </main>
    </div>
  );
}
