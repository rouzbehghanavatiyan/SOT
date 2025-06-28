// hooks/useServiceWorker.ts
import { useEffect, useState } from "react";

export const useServiceWorker = () => {
  const notificationPreference = localStorage.getItem("notifications");
  const [showPrompt, setShowPrompt] = useState(false);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      if (Notification.permission === "default") {
        setShowPrompt(true);
      }
    } catch (error) {
      console.error("SW registration failed:", error);
    }
  };

  useEffect(() => {
    if (notificationPreference !== "denied" && "serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  const handleAllow = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === "granted") {
      new Notification("Notifications Enabled!", {
        body: "You have successfully enabled notifications.",
      });
    } else {
      console.warn("Notifications permission denied.");
    }

    setShowPrompt(false);
  };

  const handleBlock = () => {
    console.log("User blocked notifications");
    localStorage.setItem("notifications", "denied");
    setShowPrompt(false);
  };

  const canSendNotification = () => {
    return (
      Notification.permission === "granted" &&
      localStorage.getItem("notifications") !== "denied"
    );
  };

  const sendTestNotification = () => {
    if (canSendNotification()) {
      new Notification("تست نوتیفیکیشن", {
        body: "این یک پیام تستی است!",
        icon: "/assets/img/logocircle.png",
      });
    } else {
      console.warn("نمیتوان نوتیفیکیشن فرستاد: دسترسی داده نشده است.");
      alert("لطفاً ابتدا اجازهٔ نوتیفیکیشن را فعال کنید!");
    }
  };

  return {
    showPrompt,
    handleAllow,
    handleBlock,
    canSendNotification,
    sendTestNotification,
  };
};
