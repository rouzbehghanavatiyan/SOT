const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/*",
  "/src/*",
  "/assets/img/logocircle.png",
];

self.addEventListener("install", (event) => {
  console.log("install install install ", event);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener("push", (event) => {
  console.log("Push event received");
  let payload = { title: "New Notification", body: "" };
  try {
    if (event.data) {
      payload = event.data.json();
    }
  } catch (error) {
    payload = { title: event.data?.text() || "New Notification", body: "" };
  }
  console.log("Payload:", payload);

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body || "You have a new message.",
      icon: "/assets/img/logocircle.png",
      data: { url: payload.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
  
  if (event.action === "accept") {
    console.log("User accepted notifications");
    event.waitUntil(
      self.registration.showNotification("Thank you!", {
        body: "You have enabled notifications.",
        icon: "/path/to/icon.png",
      })
    );
    event.waitUntil(
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission after accept:", permission);
      })
    );
  } else if (event.action === "reject") {
    console.log("User rejected notifications");
    event.waitUntil(
      self.registration.showNotification("Notifications disabled", {
        body: "You have chosen to disable notifications.",
        icon: "/path/to/icon.png",
      })
    );
  } else {
    console.log("Notification clicked");
    event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
  }
});
