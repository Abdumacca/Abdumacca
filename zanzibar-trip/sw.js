/* Service worker: offline app shell + map tile caching.
   Bump SHELL version on every release so clients refresh the shell. */
const SHELL = "zanzibar-shell-v2";
const TILES = "zanzibar-tiles-v1";
const TILE_LIMIT = 2000; // ~2k tiles ≈ 30-60 MB, plenty for the island at several zooms

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== SHELL && k !== TILES).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // Map tiles: cache-first, so areas you've viewed keep working offline
  if (url.hostname.endsWith("tile.openstreetmap.org")) {
    e.respondWith(
      caches.open(TILES).then(async cache => {
        const hit = await cache.match(e.request);
        if (hit) return hit;
        const resp = await fetch(e.request);
        if (resp.ok) {
          cache.put(e.request, resp.clone());
          trimTiles(cache);
        }
        return resp;
      })
    );
    return;
  }

  // App shell + CDN libs: stale-while-revalidate.
  // cache:"no-cache" makes the background refresh revalidate with the server
  // instead of being satisfied by the HTTP cache, so updates actually land.
  const isShell = url.origin === location.origin || url.hostname === "unpkg.com";
  if (isShell) {
    e.respondWith(
      caches.open(SHELL).then(async cache => {
        const hit = await cache.match(e.request);
        const fetching = fetch(e.request, { cache: "no-cache" })
          .then(resp => { if (resp.ok) cache.put(e.request, resp.clone()); return resp; })
          .catch(() => hit);
        return hit || fetching;
      })
    );
  }
});

self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

let trimming = false;
async function trimTiles(cache) {
  if (trimming) return;
  trimming = true;
  try {
    const keys = await cache.keys();
    for (let i = 0; i < keys.length - TILE_LIMIT; i++) await cache.delete(keys[i]);
  } finally { trimming = false; }
}
