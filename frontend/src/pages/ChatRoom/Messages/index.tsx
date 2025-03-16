import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";

interface Message {
  text: string;
}

interface MessagesProps {
  socket: any;
  userInfo: {
    userId?: string;
  };
}

const Messages: React.FC<MessagesProps> = ({ socket, userInfo }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  const fetchChatHistory = async () => {
    try {
      setShowLoading(true);
      const res = await getMessageQuery(userInfo?.userId);
      setMessages(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    // if (userInfo?.userId) {
    //   socket.emit("join_home", userInfo?.userId);
    // }
    // return () => {
    //   socket.off("update_online_users");
    //   socket.disconnect();
    // };
  }, [userInfo?.userId]);

  return (
    <>
      <Loading isLoading={showLoading} />
      <div className="w-full">
        {messages.map((message, index) => (
          <div key={index} className="bg-red">
            {message.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
