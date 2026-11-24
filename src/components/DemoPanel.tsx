"use client";

import { DEMO } from "@/lib/demo";
import { useKiosk, type Screen } from "@/lib/store";
import { IconBarcode, IconIdCard, IconQr, IconRetry, IconSettings, IconUnlock, IconX } from "./Icons";

/**
 * Presenter-only panel. Opens with 5 quick taps on the CU POST logo, or F2 on a keyboard.
 * Lets you fake hardware events (QR / barcode scan, door sensor) and jump to any screen.
 */
export default function DemoPanel() {
  const { state, actions } = useKiosk();

  const close = () => actions.setDemoOpen(false);
  const run = (fn: () => void) => () => {
    fn();
    close();
  };

  const storedByCode = new Map<string, { doors: string[]; isNew: boolean }>();
  for (const p of state.parcels) {
    if (p.status !== "stored" || !p.doorId) continue;
    const entry = storedByCode.get(p.code) ?? { doors: [], isNew: false };
    entry.doors.push(p.doorId);
    entry.isNew = entry.isNew || Boolean(p.placedInDemo);
    storedByCode.set(p.code, entry);
  }
  const preferredCode = storedByCode.has(DEMO.codeTwoDoors) ? DEMO.codeTwoDoors : [...storedByCode.keys()][0];

  const openDoorsFlow = (thenScreen?: Screen) => {
    if (!preferredCode) {
      actions.toast("staff.scan.noDoor", "error");
      return;
    }
    actions.reset();
    actions.submitCode(preferredCode);
    if (thenScreen) actions.go(thenScreen);
  };

  const jumps: { label: string; fn: () => void }[] = [
    { label: "00 · Зар", fn: actions.reset },
    { label: "01 · Эхлэл", fn: () => { actions.reset(); actions.go("home"); } },
    { label: "02 · Код", fn: () => { actions.reset(); actions.go("code"); } },
    { label: "03 · Хаалга нээгдлээ", fn: () => openDoorsFlow() },
    { label: "04 · Дууслаа", fn: () => { openDoorsFlow(); actions.pickupAllTaken(); } },
    { label: "05 · Код буруу", fn: () => { actions.reset(); actions.submitCode("246802"); } },
    { label: "06 · Хугацаа дууссан", fn: () => { actions.reset(); actions.submitCode(DEMO.codeExpired); } },
    { label: "06b · Ашиглагдсан", fn: () => { actions.reset(); actions.submitCode(DEMO.codeUsed); } },
    { label: "07 · Хаалга нээгдээгүй", fn: () => openDoorsFlow("doorHelp") },
    { label: "08 · Идэвхгүй", fn: () => { actions.reset(); actions.go("code"); actions.setTimeoutOpen(true); } },
    { label: "09 · Курьер нэвтрэх", fn: () => { actions.reset(); actions.go("staffLogin"); } },
    { label: "10 · Баркод", fn: () => { actions.reset(); actions.staffQrLogin(); } },
    { label: "11 · Байршуулах", fn: () => { actions.reset(); actions.staffQrLogin(); actions.staffScan(); } },
  ];

  return (
    <div className="animate-fade-in absolute inset-0 z-50 flex items-end bg-[rgba(0,0,0,0.6)]" onClick={close}>
      <div
        role="dialog"
        aria-label="Демо удирдлага"
        onClick={(e) => e.stopPropagation()}
        className="animate-rise max-h-[1680px] w-full overflow-y-auto rounded-t-[48px] bg-[#14101C] px-12 pb-12 pt-10 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconSettings size={44} color="#A6CE39" />
            <h2 className="m-0 text-[44px] font-extrabold">Демо удирдлага</h2>
          </div>
          <button type="button" onClick={close} aria-label="Хаах" className="press flex size-20 items-center justify-center rounded-full bg-white/10">
            <IconX size={40} color="#FFFFFF" stroke={2.6} />
          </button>
        </div>
        <p className="mt-2 text-[24px] text-[#A99FBA]">Нээх: CU POST лого дээр 5 удаа хурдан дарах, эсвэл F2. Ажилтны ПИН: {DEMO.staffPin}</p>

        <Section title="Төхөөрөмж симуляц">
          <div className="grid grid-cols-2 gap-4">
            <PanelButton
              icon={<IconQr size={36} color="#1E1430" stroke={2.2} />}
              label={`QR уншуулах (${preferredCode ?? "—"})`}
              primary
              onClick={run(() => preferredCode && actions.submitCode(preferredCode))}
            />
            <PanelButton
              icon={<IconUnlock size={36} color="#1E1430" stroke={2.4} />}
              label="Нээлттэй хаалгыг хаах (мэдрэгч)"
              primary
              onClick={run(actions.closeAllOpenDoors)}
            />
            <PanelButton
              icon={<IconIdCard size={36} color="#FFFFFF" />}
              label="Ажилтны QR уншуулах"
              onClick={run(actions.staffQrLogin)}
            />
            <PanelButton
              icon={<IconBarcode size={36} color="#FFFFFF" />}
              label="Баркод уншуулах"
              onClick={run(() => {
                if (!state.staff) actions.staffQrLogin();
                actions.staffScan();
              })}
            />
          </div>
        </Section>

        <Section title="Идэвхтэй кодууд — дарахад QR уншуулсан мэт ажиллана">
          <div className="flex flex-col gap-3">
            {[...storedByCode.entries()].map(([code, v]) => (
              <CodeRow
                key={code}
                code={code}
                result={`${v.doors.length} хаалга · ${v.doors.join(", ")}`}
                tag={v.isNew ? "шинэ" : undefined}
                onClick={run(() => actions.submitCode(code))}
              />
            ))}
            <CodeRow code={DEMO.codeExpired} result="Хугацаа дууссан" onClick={run(() => actions.submitCode(DEMO.codeExpired))} />
            <CodeRow code={DEMO.codeUsed} result="Аль хэдийн авсан" onClick={run(() => actions.submitCode(DEMO.codeUsed))} />
            <CodeRow code="бусад" result="Буруу код (3 оролдлогын дараа 30 сек түгжинэ)" />
          </div>
        </Section>

        <Section title="Дэлгэц рүү шууд очих">
          <div className="grid grid-cols-3 gap-3">
            {jumps.map((j) => (
              <button
                key={j.label}
                type="button"
                onClick={run(j.fn)}
                className="press min-h-[96px] rounded-[24px] bg-white/8 px-4 text-[24px] font-semibold leading-tight text-white"
              >
                {j.label}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Тохиргоо">
          <div className="grid grid-cols-2 gap-4">
            <Toggle
              label="Идэвхгүй бол эхлэл рүү буцах"
              on={state.idleEnabled}
              onClick={() => actions.setSetting({ idleEnabled: !state.idleEnabled })}
            />
            <Toggle
              label="Хулганы заагч нуух"
              on={state.hideCursor}
              onClick={() => actions.setSetting({ hideCursor: !state.hideCursor })}
            />
            <Toggle
              label={`Хэл: ${state.lang === "mn" ? "МОН" : "ENG"}`}
              on={state.lang === "en"}
              onClick={() => actions.setLang(state.lang === "mn" ? "en" : "mn")}
            />
            <button
              type="button"
              onClick={() => {
                if (document.fullscreenElement) void document.exitFullscreen();
                else void document.documentElement.requestFullscreen?.();
              }}
              className="press flex min-h-[104px] items-center justify-center rounded-[24px] bg-white/8 px-6 text-[26px] font-bold"
            >
              Бүтэн дэлгэц асаах / унтраах
            </button>
          </div>
        </Section>

        <button
          type="button"
          onClick={run(actions.resetDemo)}
          className="press mt-10 flex h-[120px] w-full items-center justify-center gap-4 rounded-[36px] bg-[#C62828] text-[34px] font-extrabold"
        >
          <IconRetry size={40} color="#FFFFFF" stroke={2.6} />
          Демог эхнээс нь эхлүүлэх
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h3 className="m-0 mb-4 text-[24px] font-bold uppercase tracking-[1px] text-[#A99FBA]">{title}</h3>
      {children}
    </section>
  );
}

function PanelButton({
  icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press flex min-h-[112px] items-center gap-4 rounded-[28px] px-7 text-left text-[26px] font-bold leading-tight ${
        primary ? "bg-lime text-ink" : "bg-white/10 text-white"
      }`}
    >
      <span className="flex-none">{icon}</span>
      {label}
    </button>
  );
}

function CodeRow({ code, result, tag, onClick }: { code: string; result: string; tag?: string; onClick?: () => void }) {
  return (
    <div className="flex min-h-[88px] items-center gap-5 rounded-[24px] bg-white/6 px-6">
      <span className="w-[150px] text-[34px] font-extrabold tracking-[2px] text-lime">{code}</span>
      <span className="flex-1 text-[24px] font-medium text-[#D9D1E6]">
        {result}
        {tag && <span className="ml-3 rounded-full bg-lime px-3 py-0.5 text-[20px] font-bold text-ink">{tag}</span>}
      </span>
      {onClick && (
        <button type="button" onClick={onClick} className="press h-[68px] rounded-full bg-white px-7 text-[24px] font-bold text-ink">
          Нээх
        </button>
      )}
    </div>
  );
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className="press flex min-h-[104px] items-center justify-between gap-4 rounded-[24px] bg-white/8 px-6 text-left text-[26px] font-bold"
    >
      {label}
      <span className={`relative h-11 w-20 flex-none rounded-full transition-colors ${on ? "bg-lime" : "bg-white/20"}`}>
        <span className={`absolute top-1 size-9 rounded-full bg-white transition-all ${on ? "left-10" : "left-1"}`} />
      </span>
    </button>
  );
}
