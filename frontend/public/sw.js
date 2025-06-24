// public/sw.js
const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/*", // همه فایل‌های assets را cache کنید
  "/src/*", // فایل‌های src را هم اضافه کنید
];

self.addEventListener("install", (event) => {
  console.log("install install install ", event);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // اضافه کردن این خط برای فعال شدن سریعتر SW
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
  console.log("PPPPPPPPPP");

  const payload = event.data?.json() || { title: "New Notification", body: "" };
  console.log("payload payload", payload);

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/icon.png",
      data: { url: payload.url || "/" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // بستن نوتیفیکیشن پس از کلیک

  if (event.action === "accept") {
    console.log("User accepted notifications");
    // باز کردن یک پنجره یا انجام عملیات مورد نظر
    event.waitUntil(
      self.registration.showNotification("Thank you!", {
        body: "You have enabled notifications.",
        icon: "/path/to/icon.png",
      })
    );
    // درخواست مجوز از کاربر (اگر نیاز باشد)
    event.waitUntil(
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission after accept:", permission);
      })
    );
  } else if (event.action === "reject") {
    console.log("User rejected notifications");
    // انجام عملیات مورد نظر در صورت رد
    event.waitUntil(
      self.registration.showNotification("Notifications disabled", {
        body: "You have chosen to disable notifications.",
        icon: "/path/to/icon.png",
      })
    );
  } else {
    // کلیک روی خود نوتیفیکیشن (بدون انتخاب اکشن)
    console.log("Notification clicked");
    event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
  }
});
