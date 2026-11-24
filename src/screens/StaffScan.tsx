"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { IconBarcode, IconCheck, IconChevronDown, IconKeyboard, IconLogout, IconPackage } from "@/components/Icons";
import Keypad from "@/components/Keypad";
import { Lines } from "@/components/Lines";
import { maskTracking } from "@/lib/demo";
import { DOORS, DOOR_BY_ID, SIZES } from "@/lib/locker";
import { useKiosk } from "@/lib/store";

export default function StaffScan() {
  const { state, actions, t } = useKiosk();
  const [manualOpen, setManualOpen] = useState(false);
  const placed = state.staff?.placed ?? [];

  const busy = new Set(state.openDoors);
  for (const p of state.parcels) if (p.status === "stored" && p.doorId) busy.add(p.doorId);
  const free = Object.fromEntries(SIZES.map((s) => [s, DOORS.filter((d) => d.size === s && !busy.has(d.id)).length]));

  return (
    <div className="relative flex h-[1920px] w-[1080px] flex-col overflow-hidden bg-ink text-white">
      <Header variant="staff" />

      <main className="flex flex-1 flex-col px-16 pb-12 pt-14">
        <span className="text-[30px] font-semibold text-staff-muted">
          {t("staff.scan.hello", { name: t("staff.scan.name") })}
        </span>
        <h1 className="mt-3 text-[76px] font-extrabold leading-[1.1] tracking-[-1px]">{t("staff.scan.title")}</h1>

        {/* On the real kiosk the barcode reader triggers this; in the demo, tapping simulates a scan. */}
        <button
          type="button"
          onClick={() => actions.staffScan()}
          className="press mt-10 flex h-[400px] flex-col items-center justify-center gap-[22px] rounded-[44px] border-[3px] border-dashed border-staff-border bg-staff text-white"
        >
          <IconBarcode size={180} color="#A6CE39" stroke={1.6} />
          <span className="text-center text-[32px] font-semibold leading-[1.35]">
            <Lines text={t("staff.scan.hint")} />
          </span>
          <IconChevronDown size={52} color="#A6CE39" stroke={2.6} className="animate-nudge" />
        </button>

        <button
          type="button"
          onClick={() => setManualOpen(true)}
          className="press mt-6 flex h-28 items-center justify-center gap-4 rounded-[36px] border-2 border-staff-border bg-transparent text-[32px] font-bold text-white"
        >
          <IconKeyboard size={40} color="#FFFFFF" />
          {t("staff.scan.manual")}
        </button>

        <span className="mt-11 text-[28px] font-bold text-staff-muted">{t("staff.scan.free")}</span>
        <div className="mt-4 grid grid-cols-3 gap-5">
          {SIZES.map((s) => (
            <div key={s} className="flex h-[150px] flex-col justify-between rounded-[32px] bg-staff px-7 py-6">
              <span className="text-[26px] font-semibold text-staff-muted">
                {s} · {t(`common.sizeKey.${s}`)}
              </span>
              <span className="text-[64px] font-extrabold leading-none">{free[s]}</span>
            </div>
          ))}
        </div>

        <section className="mt-10 flex flex-col rounded-[40px] bg-staff px-9 pb-3 pt-5">
          <div className="flex h-16 items-center justify-between">
            <span className="text-[28px] font-bold text-staff-muted">{t("staff.scan.placed")}</span>
            <span className="flex h-[52px] min-w-[52px] items-center justify-center rounded-full bg-lime px-4 text-[28px] font-extrabold text-ink">
              {placed.length}
            </span>
          </div>
          {placed.length === 0 && (
            <div className="flex h-[104px] items-center border-t-2 border-staff-raised text-[28px] font-medium text-staff-muted">
              {t("staff.scan.none")}
            </div>
          )}
          {placed.slice(0, 3).map((p) => (
            <div key={p.tracking} className="animate-rise flex h-[104px] items-center gap-5 border-t-2 border-staff-raised">
              <IconPackage size={40} color="#CFC6DC" />
              <span className="text-[32px] font-bold tracking-[1px]">{maskTracking(p.tracking)}</span>
              <span className="rounded-[14px] bg-lime px-4 py-1.5 text-[26px] font-extrabold text-ink">
                {p.doorId} · {DOOR_BY_ID[p.doorId].size}
              </span>
              <span className="flex-1" />
              <span className="flex items-center gap-2 text-[26px] font-semibold text-lime">
                <IconCheck size={28} color="#A6CE39" stroke={3} />
                {t("staff.scan.codeSent")}
              </span>
            </div>
          ))}
        </section>

        <div className="flex-1" />

        <button
          type="button"
          onClick={actions.staffLogout}
          className="press flex h-[140px] items-center justify-center gap-4 rounded-[44px] border-[3px] border-staff-border bg-transparent text-[40px] font-extrabold text-white"
        >
          <IconLogout size={44} color="#FFFFFF" stroke={2.4} />
          {t("staff.scan.finish")}
        </button>
      </main>

      {manualOpen && <ManualBarcode onClose={() => setManualOpen(false)} />}
    </div>
  );
}

function ManualBarcode({ onClose }: { onClose: () => void }) {
  const { actions, t } = useKiosk();
  const [value, setValue] = useState("");
  const ok = value.length >= 6;

  return (
    <div className="animate-fade-in absolute inset-0 z-30 flex items-end bg-[rgba(10,6,18,0.78)]">
      <div role="dialog" aria-label={t("staff.manual.title")} className="animate-rise w-full rounded-t-[56px] bg-[#241A35] px-16 pb-14 pt-12">
        <h2 className="m-0 text-[56px] font-extrabold">{t("staff.manual.title")}</h2>
        <p className="mt-2 text-[28px] font-medium text-staff-muted">{t("staff.manual.sub")}</p>
        <div className="mt-8 flex h-[140px] items-center rounded-[32px] border-[3px] border-staff-border bg-staff px-10 text-[72px] font-extrabold tracking-[6px]">
          {value || <span className="text-[40px] font-semibold tracking-normal text-staff-border">UB2611…</span>}
        </div>
        <div className="mt-8">
          <Keypad
            variant="dark"
            keyHeight={130}
            onDigit={(d) => setValue((v) => (v.length < 12 ? v + d : v))}
            onBack={() => setValue((v) => v.slice(0, -1))}
            onClear={() => setValue("")}
          />
        </div>
        <div className="mt-8 flex gap-6">
          <button
            type="button"
            onClick={onClose}
            className="press flex h-[140px] flex-1 items-center justify-center rounded-[44px] border-[3px] border-staff-border bg-transparent text-[40px] font-extrabold text-white"
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            disabled={!ok}
            onClick={() => {
              actions.staffScan("UB" + value);
              onClose();
            }}
            className={`press flex h-[140px] flex-1 items-center justify-center rounded-[44px] text-[40px] font-extrabold ${
              ok ? "bg-lime text-ink" : "bg-staff text-[#6E6383]"
            }`}
          >
            {t("common.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}
