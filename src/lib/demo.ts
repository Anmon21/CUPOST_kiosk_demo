// Demo data: what is "inside" the locker when the demo starts.
// Nothing here talks to a real backend — it's all in memory and resets on reload.

export type ParcelStatus = "stored" | "collected" | "expired";

export interface Parcel {
  id: string;
  code: string;
  doorId: string | null;
  tracking: string;
  status: ParcelStatus;
  /** True for parcels a courier placed during this demo run. */
  placedInDemo?: boolean;
}

export const DEMO = {
  /** Opens two doors at once (03 · S and 11 · M) — shows the one-code-many-doors rule. */
  codeTwoDoors: "123456",
  /** Opens one large door (09 · L). */
  codeOneDoor: "777777",
  /** Parcel went back to the warehouse after 48 h. */
  codeExpired: "000000",
  /** Parcel was already picked up. */
  codeUsed: "111111",
  /** Courier / staff PIN. */
  staffPin: "999999",
  /** How many wrong codes before a short lock. */
  maxAttempts: 3,
  lockSeconds: 30,
} as const;

export function initialParcels(): Parcel[] {
  return [
    { id: "p1", code: DEMO.codeTwoDoors, doorId: "03", tracking: "UB2611234821", status: "stored" },
    { id: "p2", code: DEMO.codeTwoDoors, doorId: "11", tracking: "UB2611237730", status: "stored" },
    { id: "p3", code: DEMO.codeOneDoor, doorId: "09", tracking: "UB2611240196", status: "stored" },
    { id: "p4", code: DEMO.codeExpired, doorId: null, tracking: "UB2610998842", status: "expired" },
    { id: "p5", code: DEMO.codeUsed, doorId: null, tracking: "UB2611001257", status: "collected" },
    // Other customers' parcels, so the locker isn't empty.
    { id: "p6", code: "482913", doorId: "05", tracking: "UB2611245503", status: "stored" },
    { id: "p7", code: "650274", doorId: "08", tracking: "UB2611249968", status: "stored" },
  ];
}

export function maskTracking(tracking: string): string {
  return "••••" + tracking.slice(-4);
}

export function randomCode(taken: Set<string>): string {
  for (;;) {
    const c = String(Math.floor(100000 + Math.random() * 900000));
    if (!taken.has(c)) return c;
  }
}

export function randomTicket(): string {
  return Math.random().toString(16).slice(2, 6).toUpperCase();
}

export function randomTracking(): string {
  return "UB2611" + String(Math.floor(100000 + Math.random() * 900000));
}
