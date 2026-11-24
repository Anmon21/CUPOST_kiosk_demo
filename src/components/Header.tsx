"use client";

import Image from "next/image";
import { useSecretTaps } from "@/hooks/useKioskHooks";
import { useKiosk } from "@/lib/store";
import { IconHelp, IconIdCard, IconLogout } from "./Icons";

/** Top bar on every screen except the attract loop. Tap the logo 5× to open the demo panel. */
export default function Header({ variant = "customer" }: { variant?: "customer" | "staff" }) {
  const { state, actions, t } = useKiosk();
  const secretTap = useSecretTaps(() => actions.setDemoOpen(true));

  return (
    <header className="flex h-[168px] flex-none items-center justify-between border-b-2 border-line bg-white px-14 text-ink">
      <div className="flex items-center gap-6">
        <button type="button" onClick={secretTap} aria-label="CU POST" className="rounded-2xl p-0 outline-none">
          <Image src="/cupost-logo.png" alt="CU POST" width={279} height={68} priority className="h-[68px] w-auto" />
        </button>
        {variant === "staff" && (
          <span className="flex items-center gap-2.5 rounded-full bg-ink px-[22px] py-2.5 text-[24px] font-bold text-lime">
            <IconIdCard size={26} color="#A6CE39" stroke={2.2} />
            {t("header.staffMode")}
          </span>
        )}
      </div>

      {variant === "customer" ? (
        <div className="flex items-center gap-4">
          <div role="group" aria-label={t("header.langGroup")} className="flex rounded-full bg-tint p-1.5">
            {(["mn", "en"] as const).map((l) => {
              const active = state.lang === l;
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={active}
                  onClick={() => actions.setLang(l)}
                  className={`press h-20 rounded-full px-7 text-[26px] font-bold ${active ? "bg-brand text-white" : "bg-transparent text-brand"}`}
                >
                  {l === "mn" ? "МОН" : "ENG"}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => actions.toast("header.helpToast", "info")}
            className="press flex h-[92px] items-center gap-3 rounded-full bg-tint px-[30px] text-[28px] font-bold text-brand"
          >
            <IconHelp size={36} color="#62318F" stroke={2.2} />
            {t("header.help")}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={actions.staffLogout}
          className="press flex h-[92px] items-center gap-3 rounded-full bg-ink px-8 text-[28px] font-bold text-white"
        >
          <IconLogout size={34} color="#FFFFFF" stroke={2.2} />
          {t("header.logout")}
        </button>
      )}
    </header>
  );
}
