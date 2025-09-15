import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // اگر از React استفاده می‌کنید
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // نوع ثبت Service Worker
      devOptions: {
        enabled: true, // فعال کردن Service Worker در حالت توسعه
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/assets\/.*\.(js|css|html|png|jpg|jpeg|svg|gif|ico)$/, // کش کردن فایل‌های استاتیک
            handler: "CacheFirst",
            options: {
              cacheName: "static-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 روز
              },
            },
          },
          {
            urlPattern: /^https:\/\/your-api-domain\.com\/.*$/, // کش کردن درخواست‌های API
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  define: {
    "process.env": process.env,
  },
  server: {
    headers: {
      "Service-Worker-Allowed": "/",
    },
    host: "0.0.0.0",
    port: 5173,
  },
});
