"use client";

import Header from "@/components/Header";
import { IconClock, IconHome, IconInfo, IconX } from "@/components/Icons";
import { Lines } from "@/components/Lines";
import { useKiosk } from "@/lib/store";

/** Code expired (48 h passed) or already used. */
export default function CodeProblem() {
  const { state, actions, t } = useKiosk();
  const used = state.expiredReason === "used";

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-surface text-ink">
      <Header />

      <main className="flex flex-1 flex-col items-center px-16 pb-12 pt-28">
        <div
          className={`animate-pop flex size-[200px] items-center justify-center rounded-full ${
            used ? "bg-tint shadow-[0_0_0_24px_#F7F2FC]" : "bg-warn-tint shadow-[0_0_0_24px_#FFF9F0]"
          }`}
        >
          {used ? <IconX size={104} color="#62318F" stroke={2.2} /> : <IconClock size={104} color="#B45309" stroke={2.2} />}
        </div>

        <h1 className="animate-rise mt-[72px] text-center text-[96px] font-extrabold leading-[1.05] tracking-[-1.5px]">
          <Lines text={used ? t("used.title") : t("expired.title")} />
        </h1>
        <p className="mt-6 max-w-[880px] text-center text-[36px] font-medium leading-[1.35] text-muted">
          {used ? t("used.sub") : t("expired.sub")}
        </p>

        <section className="mt-16 flex w-full flex-col gap-7 rounded-[40px] border-2 border-line bg-white p-11">
          <h2 className="m-0 text-[40px] font-extrabold">{t("expired.whatNow")}</h2>
          <div className="flex items-start gap-6">
            <span className="flex size-16 flex-none items-center justify-center rounded-full bg-tint text-[32px] font-extrabold text-brand">1</span>
            <p className="m-0 mt-2 text-[32px] font-medium leading-[1.35]">{t("expired.step1")}</p>
          </div>
          <div className="flex items-start gap-6">
            <span className="flex size-16 flex-none items-center justify-center rounded-full bg-tint text-[32px] font-extrabold text-brand">2</span>
            <p className="m-0 mt-2 text-[32px] font-medium leading-[1.35]">
              {t("expired.step2")} <b className="font-extrabold text-brand">{t("common.helpPhone")}</b>
            </p>
          </div>
          {!used && (
            <div className="flex items-center gap-[18px] rounded-3xl bg-surface px-7 py-6">
              <IconInfo size={36} color="#625A70" stroke={2.2} className="flex-none" />
              <span className="text-[28px] font-medium leading-[1.35] text-muted">{t("expired.note")}</span>
            </div>
          )}
        </section>

        <div className="flex-1" />

        <div className="flex w-full gap-6">
          <button
            type="button"
            onClick={() => {
              actions.codeClear();
              actions.go("code");
            }}
            className="press flex h-[150px] flex-1 items-center justify-center rounded-[44px] border-[3px] border-brand bg-white text-[40px] font-extrabold text-brand"
          >
            {t("expired.otherCode")}
          </button>
          <button
            type="button"
            onClick={actions.reset}
            className="press flex h-[150px] flex-1 items-center justify-center gap-4 rounded-[44px] bg-brand text-[40px] font-extrabold text-white"
          >
            <IconHome size={44} color="#FFFFFF" stroke={2.4} />
            {t("expired.home")}
          </button>
        </div>
      </main>
    </div>
  );
}
