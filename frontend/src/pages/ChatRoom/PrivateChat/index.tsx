import React, { useState, useEffect, useRef, useCallback } from "react";
import Messages from "../Messages";
import { useAppSelector } from "../../../hooks/reduxHookType";
import { useLocation, useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import StringHelpers from "../../../utils/helpers/StringHelper";
import { sendUserNotif } from "../../../services/dotNet";
import { handleTabVisibilityChange } from "../../../utils/helpers/NotificationHelper";
import LoadingChild from "../../../components/Loading/LoadingChild";
import usePagination from "../../../hooks/usePagination";
import { userMessages } from "../../../services/nest";

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
  const fixImage = StringHelpers.getProfile(location?.state?.userInfo);
  const [messages, setMessages] = useState<any>([]);
  const [isLoadingChild, setIsLoadingChild] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
    }, 100);
  }, []);

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

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev: any) => prev + emoji.emoji);
    setShowStickers(false);
  };

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

  const handleGetMessages = async () => {
    try {
      setIsLoadingChild(true);
      const res = await userMessages(userIdLogin, userReciver, 0, 10);
      setIsLoadingChild(false);
      setMessages(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabVisibilityChangeWrapper = useCallback(() => {
    return handleTabVisibilityChange(title, reciveUserId);
  }, [title, reciveUserId]);

  useEffect(() => {
    const cleanup = handleTabVisibilityChangeWrapper();
    return () => {
      cleanup();
    };
  }, [handleTabVisibilityChangeWrapper]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleReciveMessage);
    return () => {
      socket.off("receive_message", handleReciveMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (messages.length > 0 && !hasScrolled) {
      scrollToBottom();
      setHasScrolled(true);
    } else if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom, hasScrolled]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100); // زمان بیشتری برای اطمینان از لود شدن

    return () => clearTimeout(timer);
  }, [scrollToBottom]);

  useEffect(() => {
    if (reciveUserId) {
      localStorage.setItem(`message_read_${reciveUserId}`, "true");
      setHasMarkedAsRead(true);
      socket?.emit("messages_read", {
        sender: reciveUserId,
        receiver: userIdLogin,
      });
      setReadMessages((prev) => ({ ...prev, [reciveUserId]: true }));
    }
  }, [reciveUserId, socket, userIdLogin]);

  return (
    <div className="flex flex-col h-[calc(100vh-50px)] md:h-[calc(100vh-100px)] lg:mt-10 mt-0 pb-12 bg-white">
      <ChatHeader
        userName={location?.state?.userInfo?.userNameSender || "Unknown User"}
        userProfile={
          !fixImage?.includes("undefined")
            ? fixImage
            : location?.state?.userInfo?.userProfile
        }
        score={location?.state?.userInfo?.score || 20}
      />
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-2 bg-gray-100"
      >
        {isLoadingChild && <LoadingChild isLoading={isLoadingChild} />}
        <Messages
          handleGetMessages={handleGetMessages}
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
        onEmojiSelect={handleEmojiSelect}
        showStickers={showStickers}
      />
    </div>
  );
};
export default PrivateChat;
