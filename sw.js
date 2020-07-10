
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
    const requestURL = new URL(event.request.url);
    console.log(requestURL);
    evt.respondWith(
        // try cache
        caches.match(evt.request).then(cacheRes => {
            if (cacheRes) {
                return cacheRes; // returns response from cache.
            }
            // fallback to network
            return fetch(evt.request).then(fetchRes => {
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
