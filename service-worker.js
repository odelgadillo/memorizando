const CACHE_NAME = 'memoletras-v4';
const BASE_PATH = location.pathname.includes('/memorizando/') ? '/memorizando' : ''; // Detecta entorno

const ASSETS_TO_CACHE = [
    `${BASE_PATH}/`,
    `${BASE_PATH}/index.html`,
    `${BASE_PATH}/color-modes.css`,
    `${BASE_PATH}/cover.css`,
    `${BASE_PATH}/estilo.css`,
    `${BASE_PATH}/script.js`,
    `${BASE_PATH}/assets/js/color-modes.js`,
    `${BASE_PATH}/assets/img/logo.svg`,
    `${BASE_PATH}/assets/img/favicons/favicon.ico`,
    `${BASE_PATH}/assets/img/favicons/apple-touch-icon.png`,
    `${BASE_PATH}/assets/img/favicons/favicon-96x96.png`,
    `${BASE_PATH}/assets/img/favicons/favicon.svg`,
    `${BASE_PATH}/site.webmanifest` // Asegurar que está en la raíz
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return Promise.all(
                    ASSETS_TO_CACHE.map(url => {
                        return fetch(url, { cache: "no-store" }) // Evita cargar desde caché
                            .then(response => {
                                if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
                                return cache.put(url, response);
                            })
                            .catch(error => console.error('Error cacheando:', url, error));
                    })
                );
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Si hay versión en caché, la devolvemos y actualizamos en segundo plano
                    fetch(event.request).then(response => {
                        return caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                    }).catch(error => console.warn('No se pudo actualizar en caché:', error));
                    return cachedResponse;
                }
                // Si no está en caché, intentamos obtenerlo de la red
                return fetch(event.request);
            })
            .catch(() => caches.match(`${BASE_PATH}/index.html`)) // Si todo falla, servir el index.html (modo offline)
    );
});