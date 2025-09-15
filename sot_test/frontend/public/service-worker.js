self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  // کش کردن فایل‌ها
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/index.html", "/styles.css", "/script.js"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
