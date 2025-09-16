import { useEffect, useState, useCallback, useMemo } from "react";
import { createSubscription, saveSubscription } from "../services/dotNet";
import { useAppSelector } from "./reduxHookType";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
type NotificationPermission = "default" | "granted" | "denied";

export const useServiceWorker = () => {
  const main = useAppSelector((state) => state.main);
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(false);
  const [pushSubscription, setPushSubscription] =
    useState<PushSubscription | null>(null);
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationPermission>(
      Notification.permission as NotificationPermission
    );

  // Get user ID from token
  const userId = useMemo(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
      return null;
    }
    const token = sessionStorage.getItem("token") as string;
    const userData = jwtDecode(token);
    return Object.values(userData)?.[1];
  }, [navigate]);

  // Utility functions
  // const urlBase64ToUint8Array = useCallback((base64String: string) => {
  //   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/-/g, "+")
  //     .replace(/_/g, "/");
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }, []);
  // const token: any = sessionStorage.getItem("token");
  // const userData = jwtDecode(token);
  // let Vals = Object.values(userData);
  // const userId = Vals?.[1];

  const urlBase64ToUint8Array = (base64String: any) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const arrayBufferToBase64 = (buffer: any) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const registerServiceWorker =
    useCallback(async (): Promise<ServiceWorkerRegistration | null> => {
      try {
        if (!("serviceWorker" in navigator)) {
          console.warn("Service workers are not supported");
          return null;
        }
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        return registration;
      } catch (error) {
        console.error("Service Worker registration failed:", error);
        return null;
      }
    }, []);

  const subscribeToPush = useCallback(
    async (registration: ServiceWorkerRegistration) => {
      try {
        if (!("PushManager" in window)) {
          console.warn("Push messaging is not supported");
          return;
        }

        const existingSubscription =
          await registration.pushManager.getSubscription();
        if (existingSubscription) {
          setPushSubscription(existingSubscription);
          return existingSubscription;
        }

        const res = await createSubscription();
        if (!res?.data?.publicKey) {
          throw new Error("Failed to get VAPID public key");
        }

        const applicationServerKey = urlBase64ToUint8Array(res.data.publicKey);

        const newSubscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey,
        });

        if (newSubscription?.endpoint !== "") {
          handleSaveSubscription(newSubscription);
        }
        setPushSubscription(newSubscription);
        return newSubscription;
      } catch (error) {
        console.error("Push subscription failed:", error);
        throw error;
      }
    },
    []
  );

  const handleSaveSubscription = async (newSubscription: any) => {
    console.log("main?.userLogin?.user?.id", main?.userLogin);

    const postData = {
      endpoint: newSubscription.endpoint,
      userId: Number(userId),
      keys: {
        p256dh: arrayBufferToBase64(newSubscription?.getKey("p256dh")),
        auth: arrayBufferToBase64(newSubscription?.getKey("auth")),
      },
    };

    try {
      const response = await saveSubscription(postData);
      console.log("Server Response:", response);
    } catch (error) {
      console.error("Error sending subscription to server:", error);
    }
  };

  const handleAllow = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);

      if (permission === "granted") {
        localStorage.setItem("notifications", "granted");
        setShowPrompt(false);

        const registration = await registerServiceWorker();
        if (registration) {
          await subscribeToPush(registration);
          new Notification("Notifications Enabled", {
            body: "You have successfully enabled notifications.",
            icon: "/assets/img/logocircle.png",
          });
        }
      } else {
        localStorage.setItem("notifications", "denied");
      }
    } catch (error) {
      console.error("Error enabling notifications:", error);
    }
  }, [registerServiceWorker, subscribeToPush]);

  // const handleAllow = useCallback(async () => {
  //   try {
  //     localStorage.setItem("notifications", "granted");
  //     setNotificationStatus("granted");
  //     setShowPrompt(false);

  //     const registration = await registerServiceWorker();
  //     if (registration) {
  //       await subscribeToPush(registration);
  //       console.log("Service worker and push subscription set up without notification permission");
  //     }
  //   } catch (error) {
  //     console.error("Error enabling notifications:", error);
  //   }
  // }, [registerServiceWorker, subscribeToPush]);

  const handleBlock = useCallback(() => {
    localStorage.setItem("notifications", "denied");
    setNotificationStatus("denied");
    setShowPrompt(false);
    console.log("User blocked notifications");
  }, []);

  const canSendNotification = useCallback((): boolean => {
    return (
      Notification.permission === "granted" &&
      localStorage.getItem("notifications") !== "denied"
    );
  }, []);

  const sendTestNotification = useCallback(() => {
    if (canSendNotification()) {
      new Notification("Test Notification", {
        body: "This is a test notification!",
        icon: "/assets/img/logocircle.png",
      });
    } else {
      console.warn("Cannot send notification: Permission not granted");
    }
  }, [canSendNotification]);

  const checkPermissions = async () => {
    if ("serviceWorker" in navigator && "Notification" in window) {
      const permission = Notification.permission;
      const storedPreference = localStorage.getItem("notifications");

      if (permission === "default" && storedPreference !== "denied") {
        const registration = await registerServiceWorker();
        if (registration) {
          setShowPrompt(true);
        }
      }
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [registerServiceWorker]);

  return {
    showPrompt,
    notificationStatus,
    pushSubscription,
    handleAllow,
    handleBlock,
    canSendNotification,
    sendTestNotification,
    setShowPrompt,
  };
};
