"use client";

import { useEffect, useRef, useState } from "react";

/** Re-renders every `ms` and returns the current timestamp. */
export function useNow(ms = 250): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

/**
 * Counts down from `seconds` while `active`, calling `onDone` once at zero.
 * Returns the seconds left (whole numbers).
 */
export function useCountdown(seconds: number, active: boolean, onDone: () => void): number {
  const [left, setLeft] = useState(seconds);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!active) return;
    const endAt = Date.now() + seconds * 1000;
    let fired = false;
    const tick = () => {
      const s = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setLeft(s);
      if (s === 0 && !fired) {
        fired = true;
        doneRef.current();
      }
    };
    tick();
    const id = setInterval(tick, 200);
    return () => {
      clearInterval(id);
      setLeft(seconds);
    };
  }, [active, seconds]);

  return left;
}

/**
 * Calls `onIdle` after `seconds` with no touch / key activity while `enabled`.
 */
export function useIdle(seconds: number, enabled: boolean, onIdle: () => void) {
  const idleRef = useRef(onIdle);
  useEffect(() => {
    idleRef.current = onIdle;
  }, [onIdle]);

  useEffect(() => {
    if (!enabled) return;
    let last = Date.now();
    let fired = false;
    const bump = () => {
      last = Date.now();
      fired = false;
    };
    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "wheel"];
    events.forEach((e) => window.addEventListener(e, bump, { passive: true }));
    const id = setInterval(() => {
      if (!fired && Date.now() - last >= seconds * 1000) {
        fired = true;
        idleRef.current();
      }
    }, 500);
    return () => {
      clearInterval(id);
      events.forEach((e) => window.removeEventListener(e, bump));
    };
  }, [seconds, enabled]);
}

/**
 * USB / serial QR and barcode readers usually act as a keyboard: they "type" the
 * payload very fast and finish with Enter. This turns that into one scan event.
 */
export function useScanner(onScan: (payload: string) => void) {
  const scanRef = useRef(onScan);
  useEffect(() => {
    scanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    let buffer = "";
    let lastAt = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const now = Date.now();
      if (now - lastAt > 80) buffer = "";
      lastAt = now;
      if (e.key === "Enter") {
        if (buffer.length >= 4) scanRef.current(buffer);
        buffer = "";
        return;
      }
      if (e.key.length === 1) buffer += e.key;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** Returns a tap handler that calls `onTrigger` after `count` taps within `windowMs`. */
export function useSecretTaps(onTrigger: () => void, count = 5, windowMs = 2500) {
  const taps = useRef<number[]>([]);
  const triggerRef = useRef(onTrigger);
  useEffect(() => {
    triggerRef.current = onTrigger;
  }, [onTrigger]);

  return () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < windowMs), now];
    if (taps.current.length >= count) {
      taps.current = [];
      triggerRef.current();
    }
  };
}
