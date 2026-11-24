import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CU POST — Шүүгээний дэлгэц (demo)",
  description: "CU POST self-pickup locker kiosk — interactive demo for 1080×1920 portrait screens.",
  applicationName: "CU POST Kiosk",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#62318F",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body>{children}</body>
    </html>
  );
}
