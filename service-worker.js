const CACHE_NAME = 'memoletras-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './assets/css/color-modes.css',
    './assets/css/cover.css',
    './assets/css/estilo.css',
    './assets/js/script.js',
    './assets/js/color-modes.js',
    './assets/img/logo.svg',
    './assets/img/favicons/favicon.ico',
    './assets/img/favicons/apple-touch-icon.png',
    './assets/img/favicons/favicon-96x96.png',
    './assets/img/favicons/favicon.svg',
    './assets/img/favicons/site.webmanifest'
  ];

  self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE)
                    .catch((error) => {
                        console.error('Error al cachear archivos:', error);
                    });
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});