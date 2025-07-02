import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import UserList from "./UserList";
import PrivateChat from "./PrivateChat";
import { useAppSelector } from "../../hooks/hook";
import ImageRank from "../../components/ImageRank";
import { Link, useNavigate } from "react-router-dom";

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
  const { main } = useAppSelector((state) => state);
  const socket = main?.socketConfig;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userSender, setUserSender] = useState<MessageData[]>([]);

  const handleReciveMessage = (data: MessageData) => {
    if (Number(main?.userLogin?.userId) === data?.recipient) {
      console.log(data);
      setUserSender((prevSenders) => [...prevSenders, data]);
    }
  };

  const handleRedirect = (data: any) => {
    navigate(`/privateMessage?id=${data?.sender}`, {
      state: {
        userInfo: data,
      },
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleReciveMessage);

    return () => {
      socket.off("receive_message", handleReciveMessage);
    };
  }, [socket]);

  console.log(userSender);

  return (
    <div>
      <div className="">
        {userSender.length > 0 ? (
          userSender?.map((user: any, index) => {
            console.log(user);

            return (
              <div
                onClick={() => handleRedirect(user)}
                className="border-b-[1px] border-gray-100 bg-gray-100"
              >
                <div className="m-4 ms-2 ">
                  <ImageRank
                    userName={user?.userNameSender}
                    className="w-80 h-80"
                    imgSize={60}
                    classUserName="text-black"
                    imgSrc={user?.userProfile || "default-profile-image.png"}
                  />
                </div>
              </div>
            );
          })
        ) : (
          // <PrivateChat
          //   socket={socket}
          //   currentUser={currentUser}
          //   selectedUser={{ id: 3212, name: "test" }}
          // />
          <div className="flex items-center justify-center h-full">
            <p className="mt-10 text-gray-500">Empty messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
