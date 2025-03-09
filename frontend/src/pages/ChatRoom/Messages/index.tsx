import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";

const Messages: React.FC = ({ socket, userInfo }) => {
  const [messages, setMessages] = useState<null>(null);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const fetchChatHistory = async () => {
    try {
      console.log(userInfo?.userId);
      const res = await getMessageQuery(userInfo?.userId);
      console.log(res);
      setMessages(res?.data?.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // useEffect(() => {
  //   fetchChatHistory();
  //   if (userInfo?.userId) {
  //     socket.emit("join_home", userInfo?.userId);
  //   }

  //   return () => {
  //     socket.off("update_online_users");
  //     socket.disconnect();
  //   };
  // }, [userInfo?.userId]);

  return (
    <>
      <Loading isLoading={showLoading ? true : false} />
      <div className="w-full">
        <Messages
          userInfo={userInfo}
          showLoading={showLoading}
          setShowLoading={setShowLoading}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
};

export default Messages;
