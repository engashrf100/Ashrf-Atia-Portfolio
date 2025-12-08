const CACHE_NAME = 'ashrf-portfolio-v2';
const ASSETS = [
  './',
  './index.html',
  './css/critical.css',
  './css/styles.css',
  './js/utils.js',
  './js/main.js',
  './js/projects.js',
  './js/certificates.js',
  './js/animations.js',
  './data/personal.json',
  './data/projects.json',
  './data/certificates.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

