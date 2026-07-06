# 🌴 Zanzibar Trip Tracker

A minimal Polarsteps-style travel tracker — a small PWA, no backend, no account.
All data (steps, photos, GPS trail) is stored **on your phone** in IndexedDB.

## Features

- 🗺 Full-screen map centered on Zanzibar (OpenStreetMap)
- 📱 **Installable PWA** — add to home screen, opens full-screen like a native app
- ✈️ **Works offline** — the app shell and every map area you've viewed are cached
  on the device, so patchy island data is fine
- 📍 **Track** button records your GPS trail (points logged every ~30 m) and keeps
  the screen awake while tracking so recording doesn't stop
- ➕ Add **steps** (stops) with a title, date, notes, and photos — pinned to your current GPS position, the map center, or the **photo's own geotag** (read from the picture's EXIF data)
- 🌤 **Weather & sunset per step** — fetched automatically from Open-Meteo (free, no key) for each step's date and location
- 🧵 Route line drawn through your steps, dashed line for the raw GPS trail
- ▶️ **Relive trip** — the map flies through your steps in order
- 📤 **Share trip story** — generates a single self-contained HTML file (map, route, photos, notes, weather all baked in) you can send over WhatsApp or email; opens in any browser, no app needed
- 📖 Swipe-up timeline with numbered step cards and photo lightbox
- 📊 Trip stats: steps, kilometers, days, photos
- 💾 Export / import a JSON backup (photos included) from the ⋯ menu
- 🗄 Photos live in IndexedDB (hundreds of MB), not the old 5 MB localStorage cap;
  data from the first version migrates automatically

## How to use it

1. **Host it over HTTPS** (required for GPS access). Easiest: enable GitHub Pages
   for this repo (Settings → Pages → deploy from branch), then open
   `https://<username>.github.io/<repo>/zanzibar-trip/` on your phone.
2. In your phone browser, use **Add to Home Screen** so it opens like an app.
3. On arrival, tap **📍 Track** and allow location access.
4. At each stop, tap **＋**, add a title/photos/notes, and save.
5. Before leaving Zanzibar, use **⋯ → Export backup** to save your trip as a file.

## Tips for offline use

Before you lose signal, open the app and pan/zoom around the areas you'll visit
(Stone Town, the coasts, your hotel area) — those map tiles are then cached and
available offline.

## Limitations (it's a *minimum* version 🙂)

- Tracking runs while the app is open in the foreground (it now keeps the screen
  awake, but it still won't record with the phone in your pocket all day like the
  native Polarsteps app). Tip: tap Track when you're on the move, or just rely on
  adding steps at each stop.
- Data lives in one browser on one device; use export/import to move it.
