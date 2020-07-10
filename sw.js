
const dynamicCacheName = 'site-dynamic-v1';// activate event

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        // try cache
        caches.match(evt.request).then(cacheRes => {
            // return from cache or fallback to network
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        }).catch(function() {
          // If both fail, show a generic fallback
            return fetch(evt.request).then(fetchRes => {
                return fetchRes;
            })
        })
    );
});
