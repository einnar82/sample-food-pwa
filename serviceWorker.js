//install sw
self.addEventListener("install", evt => {
  console.log("service worker has been installed");
});

//activate event

self.addEventListener("activate", evt => {
  console.log("Service worker has been activated");
});

//fetch events

self.addEventListener("fetch", evt => {
  console.log("Fetch events", evt);
});
