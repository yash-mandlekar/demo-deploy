const CATCH_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CATCH_NAME).then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
        })
    );
    });

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((res) => {
        return fetch(event.request).catch(() => caches.match('offline.html'));
        })
    );
    });

this.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CATCH_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
            }
            })
        ))
    );
    });
    