"use client";

import Header from "@/components/Header";
import { IconArrowDown, IconIdCard, IconTruck } from "@/components/Icons";
import Keypad from "@/components/Keypad";
import { useKiosk } from "@/lib/store";

export default function StaffLogin() {
  const { state, actions, t } = useKiosk();
  const pin = state.pinValue;
  const complete = pin.length === 6;

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-ink text-white">
      <Header variant="staff" />

      <main className="flex flex-1 flex-col px-16 pb-12 pt-14">
        <div className="flex items-center gap-8">
          <span className="flex size-[120px] flex-none items-center justify-center rounded-[32px] bg-lime">
            <IconTruck size={64} color="#1E1430" stroke={2.2} />
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="m-0 text-[72px] font-extrabold leading-[1.05] tracking-[-1px]">{t("staff.login.title")}</h1>
            <span className="text-[30px] font-medium text-staff-muted">{t("staff.login.sub")}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={actions.staffQrLogin}
          className="press mt-12 flex items-center gap-8 rounded-[40px] bg-staff px-10 py-9 text-left text-white"
        >
          <span className="flex size-[120px] flex-none items-center justify-center rounded-[32px] bg-staff-raised">
            <IconIdCard size={64} color="#A6CE39" />
          </span>
          <span className="flex flex-1 flex-col gap-2">
            <span className="text-[44px] font-extrabold">{t("staff.login.qrTitle")}</span>
            <span className="text-[28px] font-medium leading-[1.35] text-staff-muted">{t("staff.login.qrSub")}</span>
          </span>
          <span className="flex size-24 flex-none items-center justify-center rounded-full bg-lime">
            <IconArrowDown size={48} color="#1E1430" stroke={2.6} className="animate-nudge" />
          </span>
        </button>

        <div className="mt-11 flex items-center gap-5">
          <span className="h-0.5 flex-1 bg-staff-raised" />
          <span className="text-[28px] font-bold text-staff-muted">{t("staff.login.orPin")}</span>
          <span className="h-0.5 flex-1 bg-staff-raised" />
        </div>

        <div
          key={state.pinError ? "err" : "ok"}
          role="group"
          aria-label={t("staff.login.pinAria", { n: pin.length })}
          className={`mt-10 flex justify-center gap-7 ${state.pinError ? "animate-shake" : ""}`}
        >
          {Array.from({ length: 6 }, (_, i) => {
            const on = i < pin.length;
            return (
              <span
                key={i}
                className="size-11 rounded-full border-[3px] transition-colors"
                style={{
                  background: on ? "#A6CE39" : "transparent",
                  borderColor: state.pinError ? "#F87171" : on ? "#A6CE39" : "#5A4A72",
                }}
              />
            );
          })}
        </div>
        <div aria-live="polite" className="mt-4 h-10 text-center text-[28px] font-bold text-[#F87171]">
          {state.pinError ? t("staff.login.pinWrong") : ""}
        </div>

        <div className="mt-6">
          <Keypad variant="dark" keyHeight={140} onDigit={actions.pinDigit} onBack={actions.pinBack} onClear={actions.pinClear} />
        </div>

        <button
          type="button"
          disabled={!complete}
          onClick={actions.submitPin}
          className={`press mt-8 flex h-[150px] items-center justify-center rounded-[44px] text-[52px] font-extrabold ${
            complete ? "bg-lime text-ink" : "bg-staff text-[#6E6383]"
          }`}
        >
          {t("staff.login.submit")}
        </button>
      </main>
    </div>
  );
}
