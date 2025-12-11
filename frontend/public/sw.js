const CACHE_NAME = "vite-cache-v1";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener("push", (event) => {
  let payload = { title: "New Notification", body: "" };

  try {
    if (event.data) payload = event.data.json();
  } catch {
    payload = { title: event.data?.text() || "New Notification", body: "" };
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body || "You have a new message.",
      icon: "/assets/img/logocircle.png",
      data: { url: payload.url || "/" },
      actions: [
        { action: "open", title: "Open" }
      ]
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data?.url || "/")
  );
});
