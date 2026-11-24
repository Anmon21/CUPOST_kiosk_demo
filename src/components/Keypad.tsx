"use client";

import { useKiosk } from "@/lib/store";
import { IconBackspace } from "./Icons";

interface Props {
  onDigit: (d: string) => void;
  onBack: () => void;
  onClear: () => void;
  variant?: "light" | "dark";
  disabled?: boolean;
  keyHeight?: number;
}

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** Big numeric keypad — keys are ≥140 px so they work with gloves. */
export default function Keypad({ onDigit, onBack, onClear, variant = "light", disabled, keyHeight = 148 }: Props) {
  const { t } = useKiosk();
  const dark = variant === "dark";
  const digitCls = dark
    ? "border-2 border-staff-line bg-staff text-white"
    : "border-2 border-tint-2 bg-white text-ink shadow-[0_6px_0_#E4D7F1]";
  const sideCls = dark ? "bg-transparent text-staff-muted" : "bg-key text-brand";

  return (
    <div className={`grid grid-cols-3 gap-[22px] transition-opacity ${disabled ? "pointer-events-none opacity-40" : ""}`}>
      {DIGITS.map((d) => (
        <button
          key={d}
          type="button"
          disabled={disabled}
          onClick={() => onDigit(d)}
          className={`press rounded-[32px] text-[72px] font-bold ${digitCls}`}
          style={{ height: keyHeight }}
        >
          {d}
        </button>
      ))}
      <button
        type="button"
        disabled={disabled}
        onClick={onClear}
        className={`press rounded-[32px] text-[32px] font-bold ${sideCls}`}
        style={{ height: keyHeight }}
      >
        {t("common.clear")}
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onDigit("0")}
        className={`press rounded-[32px] text-[72px] font-bold ${digitCls}`}
        style={{ height: keyHeight }}
      >
        0
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-label={t("common.deleteDigit")}
        onClick={onBack}
        className={`press flex items-center justify-center rounded-[32px] ${sideCls}`}
        style={{ height: keyHeight }}
      >
        <IconBackspace size={64} color={dark ? "#CFC6DC" : "#62318F"} />
      </button>
    </div>
  );
}
