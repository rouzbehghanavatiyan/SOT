import { useEffect, useState } from "react";
import { createSubscription } from "../services/dotNet";

export const useServiceWorker = () => {
  const notificationPreference = localStorage.getItem("notifications");
  const [showPrompt, setShowPrompt] = useState(false);

  const registerServiceWorker = async () => {
    try {
      await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      setShowPrompt(true);
    } catch (error) {
      console.error("SW registration failed:", error);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator && Notification.permission === "default") {
      registerServiceWorker();
    }
  }, []);

  const handleAllow = async () => {
    setShowPrompt(false);
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      new Notification("Notifications Enabled!", {
        body: "You have successfully enabled notifications.",
      });
      const res = await createSubscription();
      console.log(res);
    } else {
      console.warn("Notifications permission denied.");
    }
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
    setShowPrompt,
    handleAllow,
    handleBlock,
    canSendNotification,
    sendTestNotification,
  };
};
