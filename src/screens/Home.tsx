"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { IconArrowDown, IconArrowRight, IconChevronsDown, IconKeypad, IconPackage, IconPhone, IconQr, IconTruck } from "@/components/Icons";
import { Lines } from "@/components/Lines";
import { useKiosk } from "@/lib/store";

export default function Home() {
  const { actions, t } = useKiosk();
  const [shake, setShake] = useState(0);

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-brand text-white">
      <Header />

      <main className="flex flex-1 flex-col px-16 pt-[72px]">
        <div className="animate-rise flex items-center gap-3 self-start rounded-full bg-lime px-7 py-3 text-[28px] font-bold text-ink">
          <IconPackage size={30} color="#1E1430" stroke={2.4} />
          {t("home.tag")}
        </div>

        <h1 className="animate-rise mt-8 text-[112px] font-extrabold leading-[1.02] tracking-[-2px]">
          <Lines text={t("home.title")} />
        </h1>
        <p className="mt-6 text-[38px] font-medium leading-[1.3] text-tint-2">{t("home.sub")}</p>

        <div className="mt-14 flex flex-col gap-8">
          <button
            type="button"
            onClick={() => actions.go("code")}
            className="press flex h-[300px] items-center gap-10 rounded-[44px] bg-white px-11 text-left text-ink shadow-[0_12px_0_rgba(30,20,48,0.18)]"
          >
            <span className="flex size-[168px] flex-none items-center justify-center rounded-[40px] bg-lime">
              <IconKeypad size={88} />
            </span>
            <span className="flex flex-1 flex-col gap-2.5">
              <span className="text-[60px] font-extrabold leading-[1.05]">{t("home.code.title")}</span>
              <span className="text-[32px] font-medium leading-[1.3] text-muted">{t("home.code.sub")}</span>
            </span>
            <span className="flex size-28 flex-none items-center justify-center rounded-full bg-brand">
              <IconArrowRight size={56} color="#FFFFFF" stroke={2.6} />
            </span>
          </button>

          {/* Not a real button on the kiosk — scanning needs no tap. Tapping it just shows where the reader is. */}
          <button
            type="button"
            onClick={() => {
              setShake((n) => n + 1);
              actions.toast("home.qrToast", "info");
            }}
            className="press flex h-[300px] items-center gap-10 rounded-[44px] bg-white px-11 text-left text-ink shadow-[0_12px_0_rgba(30,20,48,0.18)]"
          >
            <span className="flex size-[168px] flex-none items-center justify-center rounded-[40px] bg-tint">
              <IconQr size={88} color="#62318F" stroke={2.2} />
            </span>
            <span className="flex flex-1 flex-col gap-2.5">
              <span className="text-[60px] font-extrabold leading-[1.05]">{t("home.qr.title")}</span>
              <span className="text-[32px] font-medium leading-[1.3] text-muted">{t("home.qr.sub")}</span>
            </span>
            <span className="flex size-28 flex-none items-center justify-center rounded-full bg-lime">
              <IconArrowDown size={56} color="#1E1430" stroke={2.6} />
            </span>
          </button>

          <div className="flex items-center gap-7 rounded-[36px] bg-brand-mid px-10 py-8">
            <IconPhone size={56} color="#A6CE39" stroke={2.2} className="flex-none" />
            <p className="m-0 text-[30px] font-medium leading-[1.35]">
              <b className="font-extrabold">{t("home.app.bold")}</b> {t("home.app.text")}
            </p>
          </div>
        </div>

        <div className="flex-1" />

        <div key={shake} className={`flex flex-col items-center gap-2 pb-7 ${shake ? "animate-shake" : ""}`}>
          <span className="text-[30px] font-bold text-lime">{t("home.scanner")}</span>
          <IconChevronsDown size={72} color="#A6CE39" stroke={2.6} className="animate-nudge" />
        </div>
      </main>

      <footer className="flex h-[120px] flex-none items-center justify-between bg-brand-deep px-16">
        <button
          type="button"
          onClick={() => actions.go("staffLogin")}
          className="press flex h-[88px] items-center gap-3.5 rounded-full border-2 border-white/30 px-8 text-[28px] font-semibold text-white"
        >
          <IconTruck size={36} color="#FFFFFF" />
          {t("home.courier")}
        </button>
        <span className="text-[26px] font-medium text-lav">{t("common.branch")}</span>
      </footer>
    </div>
  );
}
