//cache name
const staticCacheName = "site-static-v1";
//array of assets to cache
const assets = [
  "/",
  "/index.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];
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
      console.log(keys); //
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
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
    caches.match(evt.request).then(cache => {
      return cache || fetch(evt.request);
    })
  );
});
