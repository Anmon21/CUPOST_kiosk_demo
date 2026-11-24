"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSecretTaps } from "@/hooks/useKioskHooks";
import { useKiosk } from "@/lib/store";
import LockerMap from "@/components/LockerMap";
import { Lines } from "@/components/Lines";
import {
  IconArrowDown,
  IconArrowRight,
  IconCheck,
  IconCoffee,
  IconGift,
  IconHand,
  IconPackage,
  IconPin,
  IconQr,
  IconPhone,
  IconUnlock,
} from "@/components/Icons";

const SLIDE_COUNT = 3;
const SLIDE_MS = 6000;

/** Idle ad loop. Any touch goes to code entry; a QR scan works without touching. */
export default function Attract() {
  const { actions } = useKiosk();
  const [slide, setSlide] = useState(0);
  const secretTap = useSecretTaps(() => actions.setDemoOpen(true));

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDE_COUNT), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => actions.go("code")}
      onKeyDown={(e) => e.key === " " && actions.go("code")}
      className="relative h-[1920px] w-[1080px] overflow-hidden bg-brand text-ink outline-none"
    >
      <div className="absolute left-0 top-0 h-[1556px] w-[1080px] overflow-hidden">
        <div
          className="flex h-[1556px] w-[3240px]"
          style={{ transform: `translateX(${-slide * 1080}px)`, transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <SlideLocker />
          <SlideApp />
          <SlideCoffee />
        </div>
      </div>

      <button
        type="button"
        aria-label="CU POST"
        onClick={(e) => {
          e.stopPropagation();
          secretTap();
        }}
        className="absolute left-12 top-12 flex h-[84px] items-center rounded-full bg-white px-7 shadow-[0_8px_24px_rgba(30,20,48,0.18)]"
      >
        <Image src="/cupost-logo.png" alt="CU POST" width={197} height={48} priority className="h-12 w-auto" />
      </button>

      <BottomPanel slide={slide} />
    </div>
  );
}

function BottomPanel({ slide }: { slide: number }) {
  const { t } = useKiosk();
  return (
    <div className="absolute bottom-0 left-0 flex h-[420px] w-[1080px] flex-col rounded-t-[56px] bg-white px-16 pb-11 pt-9">
      <div className="flex justify-center gap-3" aria-hidden="true">
        {Array.from({ length: SLIDE_COUNT }, (_, k) => (
          <span
            key={k}
            className="h-3 rounded-full transition-all duration-500"
            style={{ width: k === slide ? 120 : 40, background: k === slide ? "#A6CE39" : "#E4D7F1" }}
          />
        ))}
      </div>
      <div className="mt-9 flex items-center gap-9">
        <span className="animate-tap-pulse flex size-[148px] flex-none items-center justify-center rounded-full bg-lime">
          <IconHand size={76} color="#1E1430" />
        </span>
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-[34px] font-semibold text-muted">{t("attract.eyebrow")}</span>
          <span className="text-[58px] font-extrabold leading-[1.05] tracking-[-1px] text-ink whitespace-nowrap">{t("attract.touch")}</span>
        </div>
        <span className="flex size-28 flex-none items-center justify-center rounded-full bg-brand">
          <IconArrowRight size={56} color="#FFFFFF" stroke={2.6} />
        </span>
      </div>
      <div className="mt-8 h-0.5 bg-tint" />
      <div className="mt-6 flex items-center justify-center gap-3.5">
        <IconQr size={36} color="#62318F" stroke={2.2} />
        <span className="text-[28px] font-semibold text-muted">{t("attract.qr")}</span>
        <IconArrowDown size={32} color="#62318F" stroke={2.6} className="animate-nudge" />
      </div>
    </div>
  );
}

function SlideLocker() {
  const { t } = useKiosk();
  return (
    <section className="relative flex h-[1556px] w-[1080px] flex-none flex-col overflow-hidden bg-brand px-[72px] pb-[136px] pt-[168px] text-white">
      <div aria-hidden="true" className="absolute -right-[220px] bottom-[60px] size-[860px] rounded-full bg-[#6E3A9E]" />
      <span className="relative self-start rounded-full bg-lime px-7 py-3 text-[28px] font-bold text-ink">{t("attract.s1.tag")}</span>
      <h2 className="relative mt-8 text-[112px] font-extrabold leading-[1.05] tracking-[-2.5px]">
        <Lines text={t("attract.s1.title")} />
      </h2>
      <p className="relative mt-5 max-w-[860px] text-[40px] font-medium leading-[1.3] text-tint-2">{t("attract.s1.sub")}</p>
      <div className="relative mt-auto flex items-center gap-10">
        <div className="flex flex-1 flex-col gap-8">
          {(["attract.s1.step1", "attract.s1.step2", "attract.s1.step3"] as const).map((k, i) => (
            <div key={k} className="flex items-center gap-5">
              <span className="flex size-16 flex-none items-center justify-center rounded-full bg-lime text-[30px] font-extrabold text-ink">
                {i + 1}
              </span>
              <span className="text-[34px] font-bold">{t(k)}</span>
            </div>
          ))}
        </div>
        <LockerMap highlight={["03"]} theme="dark" showHere={false} />
      </div>
    </section>
  );
}

function SlideApp() {
  const { t } = useKiosk();
  return (
    <section className="relative flex h-[1556px] w-[1080px] flex-none flex-col overflow-hidden bg-lime px-[72px] pb-[136px] pt-[168px] text-ink">
      <div aria-hidden="true" className="absolute -right-[180px] bottom-10 size-[820px] rounded-full bg-[#B5D85A]" />
      <span className="relative self-start rounded-full bg-ink px-7 py-3 text-[28px] font-bold text-lime">{t("attract.s2.tag")}</span>
      <h2 className="relative mt-8 text-[112px] font-extrabold leading-[1.05] tracking-[-2.5px]">
        <Lines text={t("attract.s2.title")} />
      </h2>
      <p className="relative mt-5 max-w-[880px] text-[40px] font-medium leading-[1.3] text-[#2B2440]">{t("attract.s2.sub")}</p>
      <div className="relative mt-auto flex items-center gap-10">
        <div className="flex flex-1 flex-col gap-8">
          {(["attract.s2.f1", "attract.s2.f2", "attract.s2.f3"] as const).map((k) => (
            <div key={k} className="flex items-center gap-5">
              <span className="flex size-[60px] flex-none items-center justify-center rounded-full bg-ink">
                <IconCheck size={32} color="#A6CE39" stroke={3} />
              </span>
              <span className="text-[34px] font-bold">{t(k)}</span>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="h-[720px] w-[400px] flex-none rounded-[64px] bg-ink p-[18px]">
          <div className="flex h-full flex-col gap-6 rounded-[48px] bg-brand px-7 pb-8 pt-10">
            <span className="self-center text-[30px] font-extrabold text-white">CU POST</span>
            <div className="flex flex-col gap-1.5 rounded-[28px] bg-white p-7">
              <span className="text-[22px] font-semibold text-muted">{t("attract.s2.phoneParcel")}</span>
              <span className="text-[72px] font-extrabold leading-none text-brand">03 · S</span>
              <span className="text-[22px] font-semibold text-muted">{t("common.branch").split(" · ")[0]}</span>
            </div>
            <span className="flex items-center gap-2 self-start rounded-full bg-brand-deep px-4 py-2 text-[22px] font-bold text-white">
              <IconPin size={22} color="#A6CE39" stroke={2.6} />
              {t("attract.s2.phoneNear")}
            </span>
            <div className="flex-1" />
            <span className="flex h-[92px] items-center justify-center gap-3 rounded-full bg-lime text-[32px] font-extrabold text-ink">
              <IconUnlock size={34} color="#1E1430" stroke={2.6} />
              {t("attract.s2.phoneOpen")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideCoffee() {
  const { t } = useKiosk();
  return (
    <section className="relative flex h-[1556px] w-[1080px] flex-none flex-col overflow-hidden bg-cream px-[72px] pb-[136px] pt-[168px] text-ink">
      <div aria-hidden="true" className="absolute -right-[200px] bottom-5 size-[840px] rounded-full bg-[#F8E7CF]" />
      <span className="relative flex items-center gap-2.5 self-start rounded-full bg-brand px-7 py-3 text-[28px] font-bold text-white">
        <IconGift size={30} color="#A6CE39" stroke={2.4} />
        {t("attract.s3.tag")}
      </span>
      <h2 className="relative mt-8 text-[112px] font-extrabold leading-[1.05] tracking-[-2.5px]">
        {t("attract.s3.title1")}
        <br />
        <span className="text-brand">{t("attract.s3.title2")}</span>
      </h2>
      <p className="relative mt-5 max-w-[880px] text-[40px] font-medium leading-[1.3] text-[#4A3F33]">{t("attract.s3.sub")}</p>

      <div className="relative mt-14 flex items-start">
        {[1, 2, 3].map((n) => (
          <div key={n} className="contents">
            <div className="flex flex-none flex-col items-center gap-3.5">
              <span className="relative flex size-[140px] items-center justify-center rounded-full bg-brand">
                <IconPackage size={64} color="#A6CE39" />
                <span className="absolute -right-1.5 -top-1.5 flex size-14 items-center justify-center rounded-full border-[5px] border-cream bg-lime text-[26px] font-extrabold text-ink">
                  {n}
                </span>
              </span>
              <span className="text-[28px] font-bold">{t("attract.s3.stamp", { n })}</span>
            </div>
            <span aria-hidden="true" className="mx-2 mt-[67px] flex-1 border-t-[6px] border-dashed border-[#D9C3A5]" />
          </div>
        ))}
        <div className="flex flex-none flex-col items-center gap-3.5">
          <span className="flex size-[140px] items-center justify-center rounded-full bg-lime shadow-[0_0_0_10px_#E7F2C6]">
            <IconCoffee size={72} color="#1E1430" />
          </span>
          <span className="text-[28px] font-extrabold text-brand">{t("attract.s3.reward")}</span>
        </div>
      </div>

      <div className="relative mt-auto flex items-end gap-10">
        <div className="flex flex-1 flex-col gap-6 pb-2">
          <div className="flex items-center gap-5 rounded-[32px] bg-white px-8 py-7 shadow-[0_8px_0_#F1E2CC]">
            <IconPhone size={48} color="#62318F" stroke={2.2} className="flex-none" />
            <span className="text-[30px] font-semibold leading-[1.3]">{t("attract.s3.progress")}</span>
          </div>
          <span className="text-[24px] font-medium leading-[1.4] text-[#6B5E4E]">{t("attract.s3.fine")}</span>
        </div>
        <CoffeeCup badge={t("attract.s3.badge")} />
      </div>
    </section>
  );
}

function CoffeeCup({ badge }: { badge: string }) {
  return (
    <svg width="380" height="420" viewBox="0 0 380 420" aria-hidden="true" className="flex-none">
      {[150, 190, 230].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${i === 1 ? 64 : 70} c-18 -20 18 -36 0 -58`}
          fill="none"
          stroke="#C9A983"
          strokeWidth="10"
          strokeLinecap="round"
        />
      ))}
      <ellipse cx="190" cy="398" rx="150" ry="18" fill="#EBD9C0" />
      <path
        d="M70 150 H310 L285 372 Q283 388 266 388 H114 Q97 388 95 372 Z"
        fill="#FFFFFF"
        stroke="#1E1430"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M79 230 H301 L293 302 H87 Z" fill="#62318F" />
      <text x="190" y="278" textAnchor="middle" fontFamily="Onest Variable, system-ui, sans-serif" fontSize="34" fontWeight="800" fill="#FFFFFF">
        CU POST
      </text>
      <path d="M90 124 Q190 82 290 124 Z" fill="#2A1145" />
      <rect x="58" y="120" width="264" height="34" rx="17" fill="#2A1145" />
      <g transform="rotate(-12 312 196)">
        <circle cx="312" cy="196" r="64" fill="#A6CE39" stroke="#FFF6E9" strokeWidth="8" />
        <text x="312" y="205" textAnchor="middle" fontFamily="Onest Variable, system-ui, sans-serif" fontSize="24" fontWeight="800" fill="#1E1430">
          {badge}
        </text>
      </g>
    </svg>
  );
}
