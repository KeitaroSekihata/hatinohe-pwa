const CACHE_NAME = 'appli_design_sample';
const urlsToCache = [
    'index.html',
    'question.html',
    'result.html',
    'test.css',
    'index.js',
    'question.js',
    'result.js',
    'mf.json',
    'items.csv',
    'tales.csv',
    'scores.csv',
    'favicon.ico',
    'images/icon-36.png',
    'images/icon-48.png',
    'images/icon-72.png',
    'images/icon-96.png',
    'images/icon-144.png',
    'images/icon-192.png',
    'images/nanbu1.jpg',
    'images/nanbu2.jpg',
    'images/nanbu3.jpg',
    'images/nanbu4.jpg',
    'images/nanbu5.jpg',
    'images/nanbu6.jpg',
    'images/nanbu7.jpg',
    'images/nanbu8.jpg',
    'images/nanbu9.jpg',
    'images/nanbu10.jpg',
    'images/nanbu11.jpg',
    'images/nanbu12.jpg',
    'images/nanbu13.jpg',
    'images/nanbu14.jpg',
    'images/nanbu15.jpg',
    'images/nanbu16.jpg',
    'images/nanbu17.jpg',
    'images/nanbu18.jpg',
    'images/nanbu19.jpg',
    'images/nanbu20.jpg',
    'images/nanbu21.jpg',
    'images/nanbu22.jpg',
    'images/nanbu23.jpg'
];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});


// キャッシュからレスポンスを返す
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});

// キャッシュのクリア
self.addEventListener("activate", (e) => {
    e.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          }),
        );
      }),
    );
  });