self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
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

self.addEventListener("push", function (event) {
  const data = event.data.json();
  console.log("Seeeeeeeeeeeeeeeeeeeeeerive worker push notification");
  
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/notification-icon.png",
  });
});
