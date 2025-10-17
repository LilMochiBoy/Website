const PRECACHE = 'zendo-precache-v1';
const RUNTIME = 'zendo-runtime-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/script.js'
];

// Install - precache important assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== PRECACHE && key !== RUNTIME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Fetch handler: Navigation requests -> network-first fallback to cache (so app updates quickly)
// Other requests -> cache-first (static assets)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const request = event.request;

  // handle navigation requests with network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        // If we got a valid response, update the cache and return it
        const copy = response.clone();
        caches.open(RUNTIME).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // For other requests, try cache first
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      // Put a copy in the runtime cache for future
      return caches.open(RUNTIME).then(cache => {
        try { cache.put(request, response.clone()); } catch(e) {}
        return response;
      });
    }).catch(() => {
      // If it's an image and we don't have it, you could return a placeholder image
      return caches.match('/index.html');
    }))
  );
});

// Listen for messages from the page (used to trigger skipWaiting when update is ready)
self.addEventListener('message', event => {
  if (!event.data) return;
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
