//cache name of cache shell
const staticCacheName = "site-static-v1";
// cache name
const dynamicCacheName = "site-dynamic-v2";
//array of assets to cache
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/pages/offline.html"
];

//cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
//install sw
// best part to cache assets but
// it is fired only when the service worker change
self.addEventListener("install", evt => {
  // waitUntil is a function that
  // wait until the browser loads before to install cache
  evt.waitUntil(
    // open cache storage
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

//activate event
// intercept the fetch event
// update the cache version
self.addEventListener("activate", evt => {
  evt.waitUntil(
    // keys() methods is responsible for getting the
    // cache keys in the browser and pass Promise.all()
    // during the promise event, delete the older key
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

//fetch events
// trigger when fetching from network
self.addEventListener("fetch", evt => {
  // respondWith is a method that respond when fetching resources over the
  // server, then you can check if it in the cache or not by
  // using match(), it has a callback function
  // that returns the cache of the request if exists
  // or request again from the server
  evt.respondWith(
    caches
      .match(evt.request)
      .then(cache => {
        return (
          cache ||
          fetch(evt.request).then(fetchResponse => {
            return caches.open(dynamicCacheName).then(cache => {
              cache.put(evt.request.url, fetchResponse.clone());
              limitCacheSize(dynamicCacheName, 3);
              return fetchResponse;
            });
          })
        );
      })
      //fallback page if cache doesn't exists
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/offline.html");
        }
      })
  );
});
