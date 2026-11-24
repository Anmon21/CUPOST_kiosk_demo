"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Keypad from "@/components/Keypad";
import { IconAlert, IconClock, IconHelp, IconMessage, IconRetry, IconSpinner, IconUnlock } from "@/components/Icons";
import { BackButton } from "@/components/Ui";
import { useNow } from "@/hooks/useKioskHooks";
import { useKiosk } from "@/lib/store";

export default function CodeEntry() {
  const { state, actions, t } = useKiosk();
  const { codeValue: code, codeError: err } = state;
  const [checking, setChecking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const now = useNow(250);

  const locked = err === "locked";
  const lockLeft = state.lockedUntil ? Math.max(0, Math.ceil((state.lockedUntil - now) / 1000)) : 0;

  useEffect(() => {
    if (locked && state.lockedUntil && now >= state.lockedUntil) actions.unlock();
  }, [locked, now, state.lockedUntil, actions]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const submit = () => {
    if (code.length !== 6 || checking) return;
    setChecking(true);
    timer.current = setTimeout(() => {
      setChecking(false);
      actions.submitCode(code);
    }, 700);
  };

  const complete = code.length === 6;

  return (
    <div className="flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-surface text-ink">
      <Header />

      <main className="flex flex-1 flex-col px-16 py-10">
        <BackButton onClick={() => actions.go("home")} />

        <h1 className="mt-9 text-[76px] font-extrabold leading-[1.1] tracking-[-1px]">{t("code.title")}</h1>
        <p className="mt-3 flex items-center gap-3.5 text-[32px] font-medium leading-[1.3] text-muted">
          <IconMessage size={36} color="#625A70" stroke={2.2} className="flex-none" />
          {t("code.sub")}
        </p>

        <div
          key={`boxes-${state.attemptsLeft}-${err ?? "ok"}`}
          role="group"
          aria-label={t("code.group")}
          className={`mt-12 flex justify-between ${err ? "animate-shake" : ""}`}
        >
          {Array.from({ length: 6 }, (_, i) => {
            const ch = code[i] ?? "";
            const active = !err && !checking && i === code.length;
            let cls = "bg-key border-tint-2";
            if (err) cls = "bg-danger-tint border-danger text-danger-ink";
            else if (ch) cls = "bg-white border-[#CDB8E6]";
            else if (active) cls = "bg-white border-brand shadow-[0_0_0_8px_rgba(98,49,143,0.16)]";
            return (
              <div
                key={i}
                className={`flex h-[164px] w-[136px] items-center justify-center rounded-[28px] border-4 text-[96px] font-extrabold leading-none transition-colors ${cls}`}
              >
                {ch ? <span className="animate-pop">{ch}</span> : null}
                {active && <span className="animate-blink block h-[84px] w-1.5 rounded-full bg-brand" />}
              </div>
            );
          })}
        </div>

        <div aria-live="polite" className="mt-6 flex h-[112px] items-center justify-center">
          {!err && (
            <p className="m-0 flex items-center gap-3 text-[28px] font-medium text-muted">
              <IconClock size={32} color="#625A70" stroke={2.2} />
              {t("code.hint")}
            </p>
          )}
          {err && (
            <div className="animate-fade-in flex h-[112px] w-full items-center gap-[22px] rounded-[28px] border-2 border-danger-line bg-danger-tint px-8">
              <IconAlert size={52} color="#C62828" stroke={2.4} className="flex-none" />
              <div className="flex flex-col gap-1">
                <span className="text-[34px] font-extrabold text-danger-ink">
                  {locked ? t("code.locked.title") : t("code.wrong.title")}
                </span>
                <span className="text-[26px] font-medium text-[#7F1D1D]">
                  {locked ? t("code.locked.sub", { s: lockLeft }) : t("code.wrong.sub", { n: state.attemptsLeft })}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-7">
          <Keypad
            onDigit={actions.codeDigit}
            onBack={actions.codeBack}
            onClear={actions.codeClear}
            disabled={locked || checking}
          />
        </div>

        <div className="mt-7">
          {err === "wrong" ? (
            <button
              type="button"
              onClick={actions.codeClear}
              className="press flex h-40 w-full items-center justify-center gap-5 rounded-[44px] bg-brand text-[48px] font-extrabold text-white"
            >
              <IconRetry size={52} color="#FFFFFF" stroke={2.6} />
              {t("code.retry")}
            </button>
          ) : (
            <button
              type="button"
              disabled={!complete || locked || checking}
              onClick={submit}
              className={`press flex h-40 w-full items-center justify-center gap-5 rounded-[44px] text-[56px] font-extrabold transition-colors ${
                complete && !locked
                  ? "bg-lime text-ink shadow-[0_10px_0_#7FA024]"
                  : "bg-[#E4DDEC] text-[#8A8296]"
              }`}
            >
              {checking ? (
                <>
                  <IconSpinner size={56} color="#1E1430" stroke={2.6} className="animate-spin-slow" />
                  {t("code.checking")}
                </>
              ) : (
                <>
                  {complete && !locked && <IconUnlock size={56} color="#1E1430" stroke={2.6} />}
                  {t("code.open")}
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => actions.toast("code.helpToast", "info")}
          className="flex min-h-16 items-center gap-3 self-center bg-transparent text-[30px] font-semibold text-brand underline underline-offset-4"
        >
          <IconHelp size={34} color="#62318F" stroke={2.2} />
          {t("code.help")}
        </button>
      </main>
    </div>
  );
}
