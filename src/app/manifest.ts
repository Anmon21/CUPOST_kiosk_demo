import type { MetadataRoute } from "next";

// Lets the kiosk browser "install" the demo and launch it full-screen in portrait.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CU POST Kiosk",
    short_name: "CU POST",
    description: "CU POST self-pickup locker kiosk demo",
    start_url: "/",
    display: "fullscreen",
    orientation: "portrait",
    background_color: "#62318F",
    theme_color: "#62318F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
