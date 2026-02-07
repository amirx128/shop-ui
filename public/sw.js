const CACHE_NAME = 'kaleskechi-v1';
const urlsToCache = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  // Activate new service worker immediately to avoid stale shells during dev.
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const isNavigationRequest = event.request.mode === 'navigate';
  if (event.request.method !== 'GET' || !isNavigationRequest) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        return caches.match('/');
      })
      .catch(() => caches.match('/'))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
