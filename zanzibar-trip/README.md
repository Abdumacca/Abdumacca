# 🌴 Zanzibar Trip Tracker

A minimal Polarsteps-style travel tracker — a single HTML file, no backend, no account.
All data (steps, photos, GPS trail) is stored **on your phone** in the browser's local storage.

## Features

- 🗺 Full-screen map centered on Zanzibar (OpenStreetMap)
- 📍 **Track** button records your GPS trail while the tab is open (points logged every ~30 m)
- ➕ Add **steps** (stops) with a title, date, notes, and photos — pinned to your current GPS position or the map center
- 🧵 Route line drawn through your steps, dashed line for the raw GPS trail
- 📖 Swipe-up timeline with numbered step cards and photo lightbox
- 📊 Trip stats: steps, kilometers, days, photos
- 💾 Export / import a JSON backup (photos included) from the ⋯ menu

## How to use it

1. **Host it over HTTPS** (required for GPS access). Easiest: enable GitHub Pages
   for this repo (Settings → Pages → deploy from branch), then open
   `https://<username>.github.io/<repo>/zanzibar-trip/` on your phone.
2. In your phone browser, use **Add to Home Screen** so it opens like an app.
3. On arrival, tap **📍 Track** and allow location access.
4. At each stop, tap **＋**, add a title/photos/notes, and save.
5. Before leaving Zanzibar, use **⋯ → Export backup** to save your trip as a file.

## Limitations (it's a *minimum* version 🙂)

- Tracking only runs while the browser tab is open and awake — phones suspend
  background tabs, so it won't record all day like the native Polarsteps app.
  Tip: tap Track when you're on the move, or just rely on adding steps at each stop.
- Photos are compressed and stored in localStorage (~5 MB), good for roughly
  30–50 photos. Export a backup if you get a storage warning.
- Data lives in one browser on one device; use export/import to move it.
