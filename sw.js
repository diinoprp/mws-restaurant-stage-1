const cacheName = 'restaurant-reviews-v8';

const assets = ['/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',];

let cacheFiles = [
    '/',
    'index.html',
    'restaurant.html',
    '/js/swController.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/data/restaurants.json'
];

cacheFiles = cacheFiles.concat(assets);

console.log(cacheFiles);

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(cacheFiles);
        }).catch(function (error) {
            console.log(error);
        })
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(thisCacheName => {
                if (thisCacheName !== cacheName) {
                    return caches.delete(thisCacheName);
                }
            }))
        })
    );
});

self.addEventListener('fetch', function (event) {
    let requestUrl = new URL(event.request.url);

    if (requestUrl.origin !== location.origin) return;

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});