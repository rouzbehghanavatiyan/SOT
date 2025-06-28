import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import { useServiceWorker } from "../../hooks/useServiceWorker";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Dropdown from "../../components/Dropdown";

const Notification: React.FC = () => {
  const { showPrompt, handleAllow, handleBlock, sendTestNotification } =
    useServiceWorker();

  // const handleSubscribe = async () => {
  //   try {
  //     const permissionResult = await requestNotificationPermission();

  //     if (permissionResult.status === "granted") {
  //       const subscription = await subscribeToPushNotifications();
  //       // Send subscription to your backend
  //       console.log("Subscription successful:", subscription);
  //     } else if (permissionResult.status === "blocked") {
  //       // Show instructions to unblock notifications
  //       console.warn("Notifications are blocked by browser settings");
  //     }
  //   } catch (error) {
  //     console.error("Notification setup failed:", error);
  //     // Show user-friendly error message
  //     alert("Failed to set up notifications. Please try again later.");
  //   }
  // };

  const dropdownItems = [
    {
      label: "پروفایل",
      icon: <NotificationsIcon className="h-5 w-5" />,
      onClick: () => console.log("پروفایل کلیک شد"),
    },
    {
      label: "تنظیمات",
      icon: <NotificationsIcon className="h-5 w-5" />,
      href: "/settings",
    },
    {
      label: "اعلان‌ها",
      icon: <NotificationsIcon className="h-5 w-5" />,
      onClick: () => alert("اعلان‌ها"),
    },
    { divider: true },
    {
      label: "خروج",
      icon: <NotificationsIcon className="h-5 w-5 text-red-500" />,
      className: "text-red-500 hover:bg-red-50",
      onClick: () => confirm("آیا مطمئن هستید؟"),
    },
  ];

  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <div className="mt-8">
          <button className="bg-red" onClick={sendTestNotification}>
            Enable Notifications
          </button>
          <Dropdown
            label="tytte"
            items={dropdownItems}
            position="left"
            className="ml-4"
          />
        </div>
        {/* <section className="grid justify-center">
          <div className="w-screen p-2 md:w-full md:h-full">
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green text-white font-bold flex items-center px-6 py-1 rounded-md">
                  Accept
                </span>
                <span className="bg-white text-red border-red border-2 flex items-center px-6 py-1 rounded-md">
                  Cancel
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green text-white font-bold flex items-center px-6 py-1 rounded-md">
                  Accept
                </span>
                <span className="bg-white text-red border-red border-2 flex items-center px-6 py-1 rounded-md">
                  Cancel
                </span>
              </div>
            </div>
            <div className=" flex items-center justify-between">
              <ImageRank profileFontColor="black" profileName="rabert_igo" />
              <div className="flex justify-end  gap-3">
                <span className="bg-green text-white font-bold flex items-center px-6 py-1 rounded-md">
                  Accept
                </span>
                <span className="bg-white text-red border-red border-2 flex items-center px-6 py-1 rounded-md">
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </section> */}
      </ResponsiveMaker>
    </>
  );
};

export default Notification;
