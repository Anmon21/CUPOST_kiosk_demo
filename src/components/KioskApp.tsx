"use client";

import { useCallback, useEffect } from "react";
import { useIdle, useScanner } from "@/hooks/useKioskHooks";
import { KioskProvider, useKiosk, type Screen } from "@/lib/store";
import Attract from "@/screens/Attract";
import CodeEntry from "@/screens/CodeEntry";
import CodeProblem from "@/screens/CodeProblem";
import Done from "@/screens/Done";
import DoorHelp from "@/screens/DoorHelp";
import DoorsOpen from "@/screens/DoorsOpen";
import Home from "@/screens/Home";
import StaffLogin from "@/screens/StaffLogin";
import StaffPlace from "@/screens/StaffPlace";
import StaffScan from "@/screens/StaffScan";
import DemoPanel from "./DemoPanel";
import KioskStage from "./KioskStage";
import TimeoutModal from "./TimeoutModal";
import { ToastHost } from "./Ui";

/** Seconds without a touch before "Are you still there?" appears. Not used on attract / done. */
const IDLE_SECONDS: Partial<Record<Screen, number>> = {
  home: 45,
  code: 45,
  opened: 90,
  expired: 30,
  doorHelp: 60,
  staffLogin: 60,
  staffScan: 120,
  staffPlace: 120,
};

const SCREENS: Record<Screen, () => React.ReactNode> = {
  attract: () => <Attract />,
  home: () => <Home />,
  code: () => <CodeEntry />,
  opened: () => <DoorsOpen />,
  done: () => <Done />,
  expired: () => <CodeProblem />,
  doorHelp: () => <DoorHelp />,
  staffLogin: () => <StaffLogin />,
  staffScan: () => <StaffScan />,
  staffPlace: () => <StaffPlace />,
};

export default function KioskApp() {
  return (
    <KioskProvider>
      <Shell />
    </KioskProvider>
  );
}

function Shell() {
  const { state, actions, stateRef } = useKiosk();

  const idleSeconds = IDLE_SECONDS[state.screen];
  useIdle(
    idleSeconds ?? 0,
    Boolean(idleSeconds) && state.idleEnabled && !state.timeoutOpen && !state.demoOpen,
    () => actions.setTimeoutOpen(true),
  );

  // A USB QR / barcode reader "types" its payload and presses Enter.
  const onScan = useCallback(
    (raw: string) => {
      const s = stateRef.current;
      const payload = raw.trim();
      if (s.demoOpen) return;
      if (/^staff/i.test(payload)) {
        if (s.screen === "attract" || s.screen === "home" || s.screen === "staffLogin") actions.staffQrLogin();
        return;
      }
      if (s.screen === "staffScan") {
        actions.staffScan(payload);
        return;
      }
      if (s.screen === "attract" || s.screen === "home" || s.screen === "code" || s.screen === "expired") {
        const m = payload.match(/(\d{6})/);
        if (m) actions.submitCode(m[1]);
      }
    },
    [actions, stateRef],
  );
  useScanner(onScan);

  // F2 opens the demo panel when a keyboard is plugged in.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        actions.setDemoOpen(!stateRef.current.demoOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actions, stateRef]);

  useEffect(() => {
    document.documentElement.lang = state.lang;
  }, [state.lang]);

  // Open the URL with ?fullscreen=1 and the first touch switches the browser to full screen.
  // (?cursor=none hides the mouse pointer from the start.)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cursor") === "none") actions.setSetting({ hideCursor: true });
    if (params.get("fullscreen") !== "1") return;
    const goFull = () => {
      if (!document.fullscreenElement) void document.documentElement.requestFullscreen?.().catch(() => {});
    };
    window.addEventListener("pointerdown", goFull, { once: true });
    return () => window.removeEventListener("pointerdown", goFull);
  }, [actions]);

  return (
    <KioskStage hideCursor={state.hideCursor}>
      <div key={state.screen} className="animate-fade-in absolute inset-0">
        {SCREENS[state.screen]()}
      </div>
      <ToastHost />
      <TimeoutModal />
      {state.demoOpen && <DemoPanel />}
    </KioskStage>
  );
}
