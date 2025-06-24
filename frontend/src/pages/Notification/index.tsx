import React from "react";
import ResponsiveMaker from "../../utils/helpers/ResponsiveMaker";
import { useServiceWorker } from "../../hooks/useServiceWorker";

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

  return (
    <>
      <ResponsiveMaker hiddenWidth={975}>
        <div className="mt-8">
          <button className="bg-red" onClick={sendTestNotification}>
            Enable Notifications
          </button>
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
