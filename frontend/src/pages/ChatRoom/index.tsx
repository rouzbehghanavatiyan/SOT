import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "../../hooks/hook";
import ImageRank from "../../components/ImageRank";
import { Link, useNavigate } from "react-router-dom";
import { allUserMessagese } from "../../services/nest";
import StringHelpers from "../../utils/helpers/StringHelper";
import Loading from "../../components/Loading";
import DraftsIcon from "@mui/icons-material/Drafts";

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

  console.log(userSender);

  return (
    <div className="md:mt-10 mt-0 ">
      {userSender.length > 0 ? (
        userSender?.map((user: any) => {
          const fixImage = StringHelpers.getProfile(user);
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
        <div className="flex flex-col bg-white items-center justify-center h-full p-4">
          <div className="flex items-end text-gray-800 rounded-lg p-4 gap-2 mb-2">
            <DraftsIcon className="text-gray-800 flex items-end font25" />
            <span className=""> Empty messages</span>
          </div>
        </div>
      )}
      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
};

export default ChatRoom;
