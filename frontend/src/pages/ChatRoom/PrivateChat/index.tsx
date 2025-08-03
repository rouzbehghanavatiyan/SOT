import React, { useState, useEffect, useRef, useCallback } from "react";
import Messages from "../Messages";
import { useAppSelector } from "../../../hooks/hook";
import { useLocation, useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import StringHelpers from "../../../utils/helpers/StringHelper";
import { sendUserNotif } from "../../../services/dotNet";

// interface PrivateChatProps {
//   socket: any;
//   currentUser: {
//     id: string;
//     name: string;
//   } | null;
//   selectedUser: {
//     id: string;
//     name: string;
//   };
// }

// interface Message {
//   id: string;
//   sender: string;
//   text: string;
//   timestamp: Date;
// }

const PrivateChat: React.FC = ({}) => {
  const main = useAppSelector((state) => state?.main);
  const location = useLocation();
  const socket = main?.socketConfig;
  const titleInputRef = useRef<HTMLInputElement>(null);
  const userIdLogin = main?.userLogin?.user?.id;
  const { sender: reciveUserId = "" } = location?.state?.userInfo || {};
  const getProfileImage = main?.userLogin?.profile || {};
  const [readMessages, setReadMessages] = useState<Record<number, boolean>>({});
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);
  const findImg = StringHelpers?.getProfile(getProfileImage);

  const [messages, setMessages] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const markMessagesAsRead = useCallback(
    (senderId: number) => {
      if (hasMarkedAsRead) return;

      setReadMessages((prev) => ({ ...prev, [senderId]: true }));
      socket?.emit("messages_read", {
        sender: senderId,
        receiver: userIdLogin,
      });
      setHasMarkedAsRead(true);
    },
    [socket, userIdLogin, hasMarkedAsRead]
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toString();
    const timeString = date.split(" ")[4];
    if (title !== "") {
      const message = {
        userProfile: findImg,
        sender: main?.userLogin?.user?.id,
        recieveId: reciveUserId,
        title: title,
        time: timeString,
        userNameSender: main?.userLogin?.userName,
      };
      socket.emit("send_message", message);
      setTitle("");
    }
    if (!location?.pathname?.includes("privateMessage")) {
      const postData = {
        message: title,
      };
      const resNotif = await sendUserNotif(postData);
      console.log(resNotif);
    }
    titleInputRef.current?.focus();
  };

  const handleReciveMessage = (data: any) => {
    console.log(data);
    setMessages((prev: any) => [
      ...prev,
      {
        userProfile: data?.userProfile,
        sender: data.sender,
        title: data?.title,
        time: data?.time,
        recieveId: data?.recieveId,
      },
    ]);
  };

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev) => prev + emoji.emoji);
    setShowStickers(false);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleReciveMessage);
    return () => {
      socket.off("receive_message", handleReciveMessage);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (reciveUserId) {
      // علامت‌گذاری پیام‌های این کاربر به عنوان "خوانده شده"
      localStorage.setItem(`message_read_${reciveUserId}`, "true");
      setHasMarkedAsRead(true);

      // ارسال تاییدیه به سرور
      socket?.emit("messages_read", {
        sender: reciveUserId,
        receiver: userIdLogin,
      });

      setReadMessages((prev) => ({ ...prev, [reciveUserId]: true }));
    }
  }, [reciveUserId, socket, userIdLogin]);

  const fixImage = StringHelpers.getProfile(location?.state?.userInfo);
  console.log(location?.state?.userInfo);

  return (
    <div className="flex flex-col h-[calc(100vh-50px)] md:h-[calc(100vh-70px)] md:mt-5 pb-16  bg-white shadow-card">
      <ChatHeader
        userName={location?.state?.userInfo?.userNameSender || "Unknown User"}
        userProfile={
          !fixImage?.includes("undefined")
            ? fixImage
            : location?.state?.userInfo?.userProfile
        }
        score={location?.state?.userInfo?.score || 20}
      />
      <div className="flex-1 overflow-y-auto p-2 bg-gray-100">
        <Messages
          setMessages={setMessages}
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <MessageInput
        title={title}
        setTitle={setTitle}
        handleSendMessage={handleSendMessage}
        titleInputRef={titleInputRef}
        setShowStickers={setShowStickers}
        showStickers={showStickers}
      />
    </div>
  );
};
export default PrivateChat;
