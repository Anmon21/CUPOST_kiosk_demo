"use client";

import Header from "@/components/Header";
import { IconCall, IconCheck, IconFlag, IconRetry } from "@/components/Icons";
import { Lines } from "@/components/Lines";
import { BackButton } from "@/components/Ui";
import { DOOR_BY_ID } from "@/lib/locker";
import { useKiosk } from "@/lib/store";

export default function DoorHelp() {
  const { state, actions, t } = useKiosk();
  const doors = state.pickup?.doorIds ?? [];
  const sel = state.help.selected ?? doors[0];

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-surface text-ink">
      <Header />

      <main className="flex flex-1 flex-col px-16 pb-12 pt-10">
        <BackButton onClick={() => actions.go("opened")} />

        <h1 className="mt-9 text-[76px] font-extrabold leading-[1.1] tracking-[-1px]">
          <Lines text={t("help.title")} />
        </h1>
        <p className="mt-3 text-[34px] font-medium leading-[1.3] text-muted">{t("help.sub")}</p>

        <div role="radiogroup" aria-label={t("help.group")} className="mt-11 flex gap-6">
          {doors.map((id) => {
            const selected = id === sel;
            const size = DOOR_BY_ID[id].size;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => actions.helpSelect(id)}
                className={`press relative flex h-[260px] flex-1 flex-col items-start justify-between rounded-[40px] border-[5px] px-8 py-7 text-left ${
                  selected ? "border-brand bg-tint" : "border-tint-2 bg-white"
                }`}
              >
                <span className="text-[28px] font-bold text-muted">{t("common.door")}</span>
                <span className="text-[124px] font-extrabold leading-[0.85] tracking-[-3px] text-brand">{id}</span>
                <span className="text-[30px] font-semibold text-muted">
                  {t(`common.size.${size}`)} · {size}
                </span>
                {selected && (
                  <span className="absolute right-6 top-6 flex size-[60px] items-center justify-center rounded-full bg-brand">
                    <IconCheck size={34} color="#FFFFFF" stroke={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={actions.helpRetry}
          className="press mt-8 flex h-40 items-center justify-center gap-5 rounded-[44px] bg-lime text-[48px] font-extrabold text-ink shadow-[0_10px_0_#7FA024]"
        >
          <IconRetry size={52} color="#1E1430" stroke={2.6} />
          {t("help.retry", { d: sel })}
        </button>

        <div aria-live="polite" className="mt-6 h-[112px]">
          {state.help.retried && (
            <div className="animate-rise flex h-[112px] items-center gap-5 rounded-[28px] border-2 border-lime-line bg-lime-tint px-8">
              <IconCheck size={44} color="#3F5A0A" stroke={2.8} className="flex-none" />
              <span className="text-[30px] font-bold text-lime-ink">{t("help.retried", { d: sel })}</span>
            </div>
          )}
        </div>

        <div className="mt-9 flex items-center gap-5">
          <span className="h-0.5 flex-1 bg-tint-2" />
          <span className="text-[30px] font-bold text-muted">{t("help.stuck")}</span>
          <span className="h-0.5 flex-1 bg-tint-2" />
        </div>

        <section className="mt-8 flex flex-col gap-7 rounded-[40px] border-2 border-line bg-white p-10">
          <div className="flex items-center gap-7">
            <span className="flex size-24 flex-none items-center justify-center rounded-full bg-tint">
              <IconCall size={48} color="#62318F" stroke={2.2} />
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="text-[38px] font-extrabold text-brand">{t("help.line")}</span>
              <span className="text-[28px] font-medium leading-[1.35] text-muted">{t("help.note")}</span>
            </div>
          </div>
          {state.help.ticket ? (
            <div className="animate-rise flex min-h-[130px] items-center gap-[22px] rounded-[32px] border-2 border-lime-line bg-lime-tint px-8 py-6">
              <IconCheck size={48} color="#3F5A0A" stroke={2.8} className="flex-none" />
              <div className="flex flex-col gap-1">
                <span className="text-[32px] font-extrabold text-lime-ink">{t("help.reported", { t: state.help.ticket })}</span>
                <span className="text-[26px] font-medium text-[#3F5A0A]">{t("help.reportedSub")}</span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={actions.helpReport}
              className="press flex h-[130px] items-center justify-center gap-4 rounded-[40px] border-[3px] border-brand bg-white text-[40px] font-extrabold text-brand"
            >
              <IconFlag size={44} color="#62318F" stroke={2.4} />
              {t("help.report")}
            </button>
          )}
        </section>

        <div className="flex-1" />

        <button
          type="button"
          onClick={actions.reset}
          className="flex min-h-16 items-center self-center bg-transparent text-[32px] font-bold text-brand underline underline-offset-4"
        >
          {t("help.backHome")}
        </button>
      </main>
    </div>
  );
}
