// Physical layout of the stora parcel locker (front view): 13 doors, screen in the right column.
// Small ×5, Medium ×6, Large ×2 — matches stora_parcel_locker_front_layout.svg.

export type Size = "S" | "M" | "L";

export interface Door {
  id: string;
  size: Size;
}

export type ColumnCell = { kind: "door"; door: Door } | { kind: "screen" };

const d = (id: string, size: Size): ColumnCell => ({ kind: "door", door: { id, size } });

export const LEFT_COLUMN: ColumnCell[] = [
  d("01", "M"),
  d("02", "S"),
  d("03", "S"),
  d("04", "S"),
  d("05", "S"),
  d("06", "S"),
  d("07", "M"),
  d("08", "M"),
  d("09", "L"),
];

export const RIGHT_COLUMN: ColumnCell[] = [
  d("10", "M"),
  { kind: "screen" },
  d("11", "M"),
  d("12", "M"),
  d("13", "L"),
];

export const DOORS: Door[] = [...LEFT_COLUMN, ...RIGHT_COLUMN]
  .flatMap((c) => (c.kind === "door" ? [c.door] : []))
  .sort((a, b) => a.id.localeCompare(b.id));

export const DOOR_BY_ID: Record<string, Door> = Object.fromEntries(DOORS.map((x) => [x.id, x]));

export const SIZES: Size[] = ["S", "M", "L"];

/** Height in px of each door on the 502 px locker map. */
export const MAP_DOOR_HEIGHT: Record<Size, number> = { S: 32, M: 80, L: 110 };
