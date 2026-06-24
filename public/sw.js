const CACHE_NAME = "eduagent-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/globals.css",
  "/icon.png",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Interceptor
self.addEventListener("fetch", (event) => {
  // Only cache GET requests, skip chrome-extension, LiveKit WebRTC, and API routes
  if (
    event.request.method !== "GET" ||
    event.request.url.startsWith("chrome-extension://") ||
    event.request.url.includes("/api/") ||
    event.request.url.includes("livekit")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
