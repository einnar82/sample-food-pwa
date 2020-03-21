const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];
//install sw
// best part to cache assets
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

self.addEventListener("activate", evt => {
  //console.log("Service worker has been activated");
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
