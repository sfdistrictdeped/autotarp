const CACHE_NAME = "autotarp-shell-v1-4-9";
const CACHE_PREFIX = "autotarp-shell-";
const APP_SHELL = [
  "./",
  "./index.html",
  "./AutoTarp.html",
  "./manifest.json",
  "./assets/autotarp-logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/san-fernando-district-logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
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

  const requestURL = new URL(request.url);
  const scopeURL = new URL(self.registration.scope);

  // Never intercept another app's paths, even when it shares this origin.
  if (requestURL.origin !== scopeURL.origin ||
      !requestURL.pathname.startsWith(scopeURL.pathname)) {
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Use only AutoTarp's cache; do not search caches belonging to other apps.
    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response && response.ok && response.type !== "opaque") {
        event.waitUntil(cache.put(request, response.clone()));
      }
      return response;
    } catch (error) {
      if (request.mode === "navigate") {
        const appIndex = new URL("./index.html", scopeURL).href;
        const fallback = await cache.match(appIndex);
        if (fallback) return fallback;
      }
      return new Response("AutoTarp is offline and this resource is not cached.", {
        status: 503,
        statusText: "Offline",
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }
  })());
});
