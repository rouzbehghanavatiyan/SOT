import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { topScoreList } from "../../services/dotNet";

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetAllScoure = async () => {
    setIsLoading(true);
    const res = await topScoreList();
    setIsLoading(false);
    console.log(res);
    const { data, status } = res?.data;
    if (status === 0) {
      setNotifications(data);
    }
  };

  useEffect(() => {
    handleGetAllScoure();
  }, []);

  return (
    <div className="container mx-auto md:mt-10 p-4">
      {isLoading && <Loading isLoading={isLoading} />}
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <h2 className="text-base font-semibold">{notification.title}</h2>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <span className="text-xs text-gray-400">{notification.time}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 flex items-center justify-center">Empty</p>
      )}
    </div>
  );
};

export default Notification;
