import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
        globPatterns: [
          "**/*.{js,css,html,ico,png,jpg,jpeg,svg,gif,webp,woff,woff2,ttf,eot,json}"
        ],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/.*\.(js|css|html|png|jpg|jpeg|svg|gif|ico|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "static-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/your-api-domain\.com\/.*$/,
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
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
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