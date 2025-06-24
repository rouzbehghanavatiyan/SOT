export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return { status: "unsupported" };
  }

  if (Notification.permission === "denied") {
    return { status: "blocked" };
  }

  if (Notification.permission === "granted") {
    return { status: "granted" };
  }

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    return { status: "denied" };
  }

  return { status: permission };
}

export async function subscribeToPushNotifications() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported");
    return null;
  }

  // Add validation for the VAPID key
  // Temporarily add this to your code to verify the key is loaded
  const vapidPublicKey = import.meta.env.VITE_PUBLIC_KEY;
  if (!vapidPublicKey) {
    console.error("VAPID_PUBLIC_KEY is not defined in environment variables");
    throw new Error("Server configuration error - missing VAPID key");
  }

  try {
    const swRegistration = await navigator.serviceWorker.ready;
    const subscription = await swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    return subscription;
  } catch (error) {
    console.error("Error subscribing to push notifications:", error);
    throw error;
  }
}

function urlBase64ToUint8Array(base64String: string) {
  // Add input validation
  if (!base64String || typeof base64String !== "string") {
    throw new Error("Invalid base64 string provided");
  }

  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  try {
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  } catch (error) {
    console.error("Error converting VAPID key:", error);
    throw new Error("Invalid VAPID public key format");
  }
}
