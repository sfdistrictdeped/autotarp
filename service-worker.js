// AutoTarp standalone PWA service worker.
// Intentionally scoped to https://sfdistrictdeped.github.io/autotarp/.
const APP_BASE = new URL("/autotarp/", self.location.origin);
const CACHE_PREFIX = "autotarp-standalone-";
const CACHE_NAME = `${CACHE_PREFIX}v1-2-standalone-1`;
const APP_SHELL = [
  "/autotarp/",
  "/autotarp/index.html",
  "/autotarp/AutoTarp.html",
  "/autotarp/manifest.json",
  "/autotarp/assets/autotarp-logo.png",
  "/autotarp/assets/icon-192.png",
  "/autotarp/assets/icon-512.png",
  "/autotarp/assets/san-fernando-district-logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Install only succeeds if all required shell files are available.
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    // Delete only caches owned by this AutoTarp worker; never touch other apps' caches.
    await Promise.all(
      keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  // Only handle same-origin requests inside AutoTarp's own URL scope.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(APP_BASE.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // For page navigations, prefer fresh network content but retain an offline fallback.
    if (request.mode === "navigate") {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          await cache.put(request, response.clone());
        }
        return response;
      } catch (error) {
        return (await cache.match(request))
          || (await cache.match("/autotarp/index.html"))
          || (await cache.match("/autotarp/"));
      }
    }

    // For assets, return the cached copy when available and refresh it in the background.
    const cached = await cache.match(request);
    const networkUpdate = fetch(request).then(response => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    }).catch(() => null);

    if (cached) {
      event.waitUntil(networkUpdate);
      return cached;
    }
    const response = await networkUpdate;
    if (response) return response;
    throw new Error("AutoTarp resource unavailable offline: " + request.url);
  })());
});
