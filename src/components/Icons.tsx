// Stroke icons (Lucide paths, ISC licence) drawn inline so they work offline.

import type { SVGProps } from "react";

type IconProps = { size?: number; color?: string; stroke?: number } & Omit<SVGProps<SVGSVGElement>, "stroke">;

function Svg({ size = 24, color = "currentColor", stroke = 2, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
);
export const IconArrowDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Svg>
);
export const IconChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="m15 18-6-6 6-6" />
  </Svg>
);
export const IconChevronsDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
    <path d="m6 3 6 6 6-6" opacity="0.5" />
  </Svg>
);
export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const IconUnlock = (p: IconProps) => (
  <Svg {...p}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </Svg>
);
export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);
export const IconX = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Svg>
);
export const IconQr = (p: IconProps) => (
  <Svg {...p}>
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
    <path d="M21 21v.01" />
    <path d="M12 7v3a2 2 0 0 1-2 2H7" />
    <path d="M3 12h.01" />
    <path d="M12 3h.01" />
    <path d="M12 16v.01" />
    <path d="M16 12h1" />
    <path d="M21 12v.01" />
    <path d="M12 21v-1" />
  </Svg>
);
export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </Svg>
);
export const IconHelp = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </Svg>
);
export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Svg>
);
export const IconAlert = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </Svg>
);
export const IconInfo = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </Svg>
);
export const IconBackspace = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
    <path d="m12 9 6 6" />
    <path d="m18 9-6 6" />
  </Svg>
);
export const IconCall = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);
export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);
export const IconRetry = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </Svg>
);
export const IconPackage = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
    <path d="M12 22V12" />
    <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
  </Svg>
);
export const IconBarcode = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M8 7v10" />
    <path d="M12 7v10" />
    <path d="M17 7v10" />
  </Svg>
);
export const IconLogout = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </Svg>
);
export const IconIdCard = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16 10h2" />
    <path d="M16 14h2" />
    <path d="M6.17 15a3 3 0 0 1 5.66 0" />
    <circle cx="9" cy="11" r="2" />
    <rect x="2" y="5" width="20" height="14" rx="2" />
  </Svg>
);
export const IconTruck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </Svg>
);
export const IconMaximize = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 3h6v6" />
    <path d="m21 3-7 7" />
    <path d="m3 21 7-7" />
    <path d="M9 21H3v-6" />
  </Svg>
);
export const IconMessage = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);
export const IconFlag = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
  </Svg>
);
export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);
export const IconKeyboard = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 8h.01" />
    <path d="M12 12h.01" />
    <path d="M14 8h.01" />
    <path d="M16 12h.01" />
    <path d="M18 8h.01" />
    <path d="M6 8h.01" />
    <path d="M7 16h10" />
    <path d="M8 12h.01" />
    <rect width="20" height="16" x="2" y="4" rx="2" />
  </Svg>
);
export const IconGift = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </Svg>
);
export const IconCoffee = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 2v2" />
    <path d="M14 2v2" />
    <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
    <path d="M6 2v2" />
  </Svg>
);
export const IconHand = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 14a8 8 0 0 1-8 8" />
    <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
    <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
    <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
    <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </Svg>
);
export const IconSpinner = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
);
export const IconSettings = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);

/** Keypad dots (filled) used on the "Use a code" card. */
export function IconKeypad({ size = 88, color = "#1E1430" }: { size?: number; color?: string }) {
  const dots = [
    [6, 4], [12, 4], [18, 4],
    [6, 10], [12, 10], [18, 10],
    [6, 16], [12, 16], [18, 16],
    [12, 21.6],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.9" />
      ))}
    </svg>
  );
}
