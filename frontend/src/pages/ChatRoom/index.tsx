import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../hooks/hook";
import ImageRank from "../../components/ImageRank";
import { Link, useNavigate } from "react-router-dom";
import { allUserMessagese } from "../../services/nest";
import StringHelpers from "../../utils/helpers/StringHelper";
import Loading from "../../components/Loading";

interface MessageData {
  recipient: number;
  [key: string]: any;
}

const ChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const main = useAppSelector((state) => state?.main);
  const userIdLogin = main?.userLogin?.user?.id;
  const socket = main?.socketConfig;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userSender, setUserSender] = useState<MessageData[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<Record<number, boolean>>(
    {}
  );

  const checkMessageReadStatus = useCallback((senderId: number) => {
    console.log(senderId);
    return localStorage.getItem(`message_read_${senderId}`) !== "true";
  }, []);

  const handleRedirect = (data: any) => {
    console.log(data);
    localStorage.setItem(`message_read_${data.sender}`, "true");
    setUnreadMessages((prev) => ({ ...prev, [data.sender]: false }));
    navigate(`/privateMessage?id=${data?.sender}`, {
      state: {
        userInfo: data,
      },
    });
  };

  const handleMessagesReadConfirmation = (data: { sender: number }) => {
    setUnreadMessages((prev) => ({ ...prev, [data.sender]: false }));
  };

  const handleGetUserMessages = async () => {
    try {
      setIsLoading(true);
      const res = await allUserMessagese(userIdLogin);
      setIsLoading(false);

      const { data, status } = res?.data;
      if (status === 0) {
        console.log(data);

        setUserSender(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReciveMessage = useCallback(
    (data: MessageData) => {
      if (userIdLogin === data?.recieveId) {
        localStorage.setItem(`message_read_${data.sender}`, "false");
        setUnreadMessages((prev) => ({ ...prev, [data.sender]: true }));
      }
    },
    [userIdLogin]
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleReciveMessage);
    socket.on("messages_read_confirmation", handleMessagesReadConfirmation);
    return () => {
      socket.off("receive_message", handleReciveMessage);
      socket.off("messages_read_confirmation", handleMessagesReadConfirmation);
    };
  }, [socket]);

  useEffect(() => {
    handleGetUserMessages();
  }, [userIdLogin]);

  useEffect(() => {
    const storedReadStatus: Record<number, boolean> = {};
    userSender.forEach((user) => {
      const isUnread =
        localStorage.getItem(`message_read_${user.sender}`) !== "true";
      storedReadStatus[user.sender] = isUnread;
    });
    setUnreadMessages(storedReadStatus);
  }, [userSender]);

  return (
    <div className="md:mt-10 mt-0 ">
      {userSender.length >= 0 ? (
        userSender?.map((user: any) => {
          const fixImage = StringHelpers.getProfile(user);
          console.log(unreadMessages[user.sender]);
          return (
            <div
              onClick={() => handleRedirect(user)}
              className="relative border-b-[1px]  flex items-center p-1 border-gray-150  my-1 bg-gray-100"
            >
              <div className="m-2 ">
                <ImageRank
                  userNameStyle="text-gray-black"
                  userName={user?.userNameSender}
                  imgSize={60}
                  score={user?.score || 0}
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
      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
};

export default ChatRoom;
