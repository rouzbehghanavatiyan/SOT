import { sendUserNotif } from "../../services/dotNet";

export const handleTabVisibilityChange = (message: string, userId: number) => {

  const handleVisibilityChange = () => {
    if (document.hidden) {
      // کاربر تب مرورگر را ترک کرده است
      sendNotification(message);
    }
  };

  const handleWindowBlur = () => {
    // کاربر مرورگر را ترک کرده است
    sendNotification(message);
  };

  const sendNotification = async (message: string) => {
    const postData = {
      userId,
      message,
    };

    try {
      const resNotif = await sendUserNotif(postData);
      console.log("Notification sent:", resNotif);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  // اضافه کردن event listeners
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleWindowBlur);

  // بازگرداندن تابعی برای پاکسازی
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("blur", handleWindowBlur);
  };
};
