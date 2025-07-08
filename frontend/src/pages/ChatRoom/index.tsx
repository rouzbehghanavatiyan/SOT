import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../hooks/hook";
import ImageRank from "../../components/ImageRank";
import { Link, useNavigate } from "react-router-dom";
import { allUserMessagese } from "../../services/nest";
import StringHelpers from "../../utils/helpers/StringHelper";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface MessageData {
  recipient: number;
  [key: string]: any;
}

const ChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

  const { main } = useAppSelector((state) => state);
  const userIdLogin = Number(main?.userLogin?.userId);
  const socket = main?.socketConfig;
  const [userSender, setUserSender] = useState<MessageData[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<Record<number, boolean>>(
    {}
  );
  const checkMessageReadStatus = useCallback((senderId: number) => {
    // می‌توانید این اطلاعات را از localStorage یا سرور دریافت کنید
    return localStorage.getItem(`message_read_${senderId}`) === "true";
  }, []);
  const handleRedirect = (data: any) => {
    // ذخیره وضعیت خوانده شدن در localStorage
    localStorage.setItem(`message_read_${data.sender}`, "true");
    setUnreadMessages((prev) => ({ ...prev, [data.sender]: false }));
    navigate(`/privateMessage?id=${data?.sender}`, {
      state: {
        userInfo: data,
      },
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleReciveMessage);
    const handleMessagesReadConfirmation = (data: { sender: number }) => {
      setUnreadMessages((prev) => ({ ...prev, [data.sender]: false }));
    };

    socket.on("messages_read_confirmation", handleMessagesReadConfirmation);
    return () => {
      socket.off("receive_message", handleReciveMessage);
      socket.off("messages_read_confirmation", handleMessagesReadConfirmation);
    };
  }, [socket]);

  const handleGetUserMessages = async () => {
    const res = await allUserMessagese(userIdLogin);
    const { data, status } = res?.data;
    if (status === 0) {
      setUserSender(data);
    }
  };

  const fetchUnreadStatus = async () => {
    try {
      const response = await fetch(
        `/api/messages/unread-status?receiver=${userIdLogin}`
      );
      const data = await response.json();
      setUnreadMessages(data);
    } catch (error) {
      console.error("Error fetching unread status:", error);
    }
  };

  useEffect(() => {
    fetchUnreadStatus();
    handleGetUserMessages();
  }, [userIdLogin]);

  useEffect(() => {
    const storedReadStatus: Record<number, boolean> = {};
    userSender.forEach((user) => {
      storedReadStatus[user.sender] = checkMessageReadStatus(user.sender);
    });
    setUnreadMessages(storedReadStatus);
  }, [userSender, checkMessageReadStatus]);

  const handleReciveMessage = useCallback(
    (data: MessageData) => {
      if (userIdLogin === data?.recieveId) {
        setUnreadMessages((prev) => ({ ...prev, [data.sender]: true }));
      }
    },
    [userIdLogin]
  );

  console.log(unreadMessages);

  return (
    <div>
      <div className="">
        {userSender.length >= 0 ? (
          userSender?.map((user: any) => {
            console.log(user);
            const fixImage = StringHelpers.getProfile(user);

            return (
              <div
                onClick={() => handleRedirect(user)}
                className="relative border-b-[1px] flex items-center mt-2 border-gray-100 bg-gray-100"
              >
                <div className="m-2 ">
                  <ImageRank
                    userName={user?.userNameSender}
                    className="w-80 h-80"
                    imgSize={60}
                    score={user?.score || 0}
                    rankStyle="w-9 h-9"
                    classUserName="text-black"
                    imgSrc={fixImage || "default-profile-image.png"}
                  />
                </div>
                {unreadMessages[user.sender] && (
                  <span className="bg-red p-2 absolute rounded-full right-4" />
                )}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="mt-10 text-gray-500">Empty messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
