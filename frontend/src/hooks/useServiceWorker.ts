// src/hooks/useServiceWorker.js
import { useEffect } from "react";

export const useServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none" // اضافه کردن این خط
          });
          
          console.log("SW registered with scope: ", registration.scope);
          
          // چک کردن وضعیت permission
          if (Notification.permission === "default") {
            const permission = await Notification.requestPermission();
            console.log("Notification permission: ", permission);
          }
          
          return registration;
        } catch (error) {
          console.error("SW registration failed: ", error);
        }
      };

      // حذف event listener برای load و مستقیما فراخوانی تابع
      registerServiceWorker();
    }
  }, []);
};