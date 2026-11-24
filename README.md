# CU POST — Locker kiosk demo

Interactive demo of the CU POST self-pickup locker screen (stora locker, **1080 × 1920 portrait**).
Next.js 16 + TypeScript + Tailwind CSS 4. All data is in memory — no backend, nothing is saved.
Reloading the page resets the demo.

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production check: `npm run build && npm start`.

## Deploy to Vercel

**Option A — Vercel CLI (fastest)**

```bash
npm i -g vercel
vercel            # first time: log in, accept the defaults
vercel --prod     # production URL
```

**Option B — GitHub**

```bash
git init && git add . && git commit -m "CU POST kiosk demo"
git branch -M main
git remote add origin https://github.com/<you>/cupost-kiosk-demo.git
git push -u origin main
```

Then on vercel.com → **Add New… → Project** → import the repo → **Deploy**. No settings or environment variables needed.

## Showing it on the 1080 × 1920 screen

The app draws the kiosk at exactly 1080 × 1920 and scales it to fit the window, so on the real
portrait screen in full screen it is 1:1.

- **Easiest:** open the URL in Chrome and press **F11**.
- **Full screen on first touch:** open `https://<your-app>.vercel.app/?fullscreen=1` — the first tap switches to full screen.
- **Real kiosk mode (no browser bars, no exit by touch):**
  - Windows: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk "https://<your-app>.vercel.app/?cursor=none" --overscroll-history-navigation=0`
  - macOS: `open -a "Google Chrome" --args --kiosk "https://<your-app>.vercel.app/?cursor=none"`
  - Exit kiosk mode with **Alt+F4** (Windows) or **⌘Q** (Mac).
- If the monitor is a landscape screen turned on its side, set the OS display rotation to **Portrait** first.
- `?cursor=none` hides the mouse pointer on touchscreens.

## Demo script (for the presentation)

**Secret demo panel:** tap the **CU POST logo 5 times quickly** (any screen), or press **F2** if a keyboard is
plugged in. From there you can fake a QR scan, a barcode scan and the door sensor, jump to any screen,
switch language and reset the demo.

| Try this | What happens |
| --- | --- |
| Touch the ad screen | Goes to code entry |
| Code **123456** | Opens **2 doors** (03 · S and 11 · M) with one code |
| Code **777777** | Opens 1 large door (09 · L) |
| Code **000000** | "Code expired" (48 h passed, parcel returned) |
| Code **111111** | "Code already used" |
| Any other code | Wrong code → after 3 tries the keypad locks for 30 s |
| "Хаалга нээгдээгүй юу?" on the open-doors screen | Retry one door, then report → ticket number, 48 h timer paused |
| Courier / Ажилтан (bottom-left on Home) | Staff login — PIN **999999**, or "Ажилтны QR" in the demo panel |
| Tap the dashed barcode box (staff) | Simulates a barcode scan → the system picks a free door by size |
| "Хаалаа · дараагийнх" | Door closed → a new 6-digit code is "sent". It appears in the demo panel — enter it as a customer to open that door |
| Leave the screen alone | After 30–120 s: "Are you still there?" → back to the ads after 10 s |
| МОН / ENG (top right) | Whole UI switches language; goes back to МОН after each customer |

Suggested 3-minute run: ads → touch → **123456** → show the locker map → "Бүгдийг авлаа" → thank-you screen →
courier login **999999** → scan → close → enter the new code from the demo panel as a customer.

## Hardware hooks already in place

- **QR / barcode reader:** most USB readers act like a keyboard (type the payload + Enter). The app listens for
  that. A customer QR containing a 6-digit code (e.g. `CUPOST:123456`) opens the doors from the ads, home or
  code screen; a payload starting with `STAFF` logs a courier in; any barcode on the staff scan screen places a parcel.
- **Door sensor:** simulated with "Нээлттэй хаалгыг хаах (мэдрэгч)" in the demo panel. When all of a customer's
  doors close, the app moves to the thank-you screen by itself.

## Project structure

```
src/
  app/            layout, page, manifest (full-screen PWA), icons
  components/     KioskApp (screen router, idle timer, scanner), KioskStage (1080×1920 scaling),
                  Header, LockerMap, Keypad, TimeoutModal, DemoPanel, Icons, Ui
  screens/        Attract, Home, CodeEntry, DoorsOpen, Done, CodeProblem, DoorHelp,
                  StaffLogin, StaffScan, StaffPlace
  lib/            store.tsx (state + actions), i18n.ts (МОН/ENG), locker.ts (door layout), demo.ts (demo data)
```

## Placeholders to replace before a real launch

`[ТУСЛАМЖИЙН УТАС]` help phone, `CU [Салбар] · Шүүгээ #[ID]` branch / locker ID, `[Курьерын нэр]`,
and the coffee promo terms `[Хугацаа]` / `[Кофены төрөл]`.
