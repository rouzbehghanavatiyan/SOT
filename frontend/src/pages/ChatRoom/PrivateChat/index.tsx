import React, { useState, useRef, useCallback, useEffect } from "react";
import Messages from "../Messages";
import { useAppSelector } from "../../../hooks/reduxHookType";
import { useLocation } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import StringHelpers from "../../../utils/helpers/StringHelper";
import { handleTabVisibilityChange } from "../../../utils/helpers/NotificationHelper";
import LoadingChild from "../../../components/Loading/LoadingChild";
import { userMessages } from "../../../services/nest";
import MessageInput from "./MessageInput";

interface MessageType {
  id?: number;
  userProfile: string;
  sender: number;
  recieveId: number;
  title: string;
  time: string;
  userNameSender?: string;
}

const PrivateChat: React.FC = () => {
  const main = useAppSelector((state) => state?.main);
  const location = useLocation();
  const socket = main?.socketConfig;
  const userReciver = Number(location?.search?.split("=")?.[1]);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const userIdLogin = main?.userLogin?.user?.id;
  const { sender: reciveUserId = "" } = location?.state?.userInfo || {};
  const getProfileImage = main?.userLogin?.profile || {};
  const findImg = StringHelpers?.getProfile(getProfileImage);
  const fixImage = StringHelpers.getProfile(location?.state?.userInfo);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoadingChild, setIsLoadingChild] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const paginationRef = useRef({
    skip: 0,
    take: 10,
  });

  // اسکرول به پایین
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "auto",
      });
    }, 100);
  }, []);

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev: string) => prev + emoji.emoji);
    setShowStickers(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() !== "") {
      const timeString = new Date().toTimeString().slice(0, 5);
      const message: MessageType = {
        userProfile: findImg,
        sender: userIdLogin,
        recieveId: reciveUserId,
        title: title.trim(),
        time: timeString,
        userNameSender: main?.userLogin?.userName,
      };

      socket?.emit("send_message", message);
      setTitle("");
      titleInputRef.current?.focus();

      setMessages((prev) => {
        try {
          if (Array.isArray(prev)) {
            return [...prev, message];
          }
          return [message];
        } catch (error) {
          console.error("Error in setMessages:", error);
          return [message];
        }
      });

      scrollToBottom();
    }
  };

  const handleReciveMessage = useCallback(
    (data: MessageType) => {
      const shouldShowMessage =
        data.sender === userIdLogin && data.recieveId === reciveUserId;
      const giveReciver =
        data.recieveId === userIdLogin && data.sender === reciveUserId;

      if (shouldShowMessage || giveReciver) {
        setMessages((prev) => [
          ...prev,
          {
            userProfile: data?.userProfile || "",
            sender: data.sender,
            title: data?.title || "",
            time: data?.time || "",
            recieveId: data?.recieveId,
            id: data?.id,
          },
        ]);
        scrollToBottom();
      }
    },
    [userIdLogin, reciveUserId, scrollToBottom]
  );

  const handleGetMessages = useCallback(
    async (isLoadMore: boolean = false) => {
      try {
        setIsLoadingChild(true);
        const res = await userMessages(
          userIdLogin,
          userReciver,
          paginationRef.current.skip,
          paginationRef.current.take
        );

        // if (isLoadMore) {
          setMessages((prev) => {
            const previousMessages = Array.isArray(prev) ? prev : [];
            return [...(res?.data || []), ...previousMessages];
          });
        // } else {
        //   setMessages(res?.data || []);
        //   scrollToBottom();
        // }
        // setHasMore(res?.data?.length === paginationRef.current.take);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoadingChild(false);
      }
    },
    [userIdLogin, userReciver, scrollToBottom]
  );

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoadingChild) return;

    paginationRef.current.skip += paginationRef.current.take;
    handleGetMessages(true);
  }, [hasMore, isLoadingChild, handleGetMessages]);

  useEffect(() => {
    if (!socket || !userIdLogin) return;
    handleGetMessages(false);
    // socket.on("receive_message", handleReciveMessage);
    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     if (entries[0].isIntersecting && !isLoadingChild && hasMore) {
    //       handleLoadMore();
    //     }
    //   },
    //   { threshold: 0.1 }
    // );
    // if (loadingRef.current) {
    //   observer.observe(loadingRef.current);
    // }
    return () => {
      socket.off("receive_message", handleReciveMessage);
      // observer.disconnect();
      if (reciveUserId && messages.length > 0) {
        localStorage.setItem(`message_read_${reciveUserId}`, "true");
        socket.emit("mark_messages_as_read", {
          sender: reciveUserId,
          receiver: userIdLogin,
        });
      }
    };
  }, [
    socket,
    userIdLogin,
    handleReciveMessage,
    handleGetMessages,
    handleLoadMore,
    isLoadingChild,
    hasMore,
    reciveUserId,
    messages.length,
  ]);

  useEffect(() => {
    const cleanup = handleTabVisibilityChange(title, reciveUserId);
    return cleanup;
  }, [title, reciveUserId]);

  console.log(messages);

  return (
    <div className="w-full lg:mt-10 mt-0 bg-white flex flex-col h-screen max-h-[88vh]">
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
        className="p-2 bg-gray-100 overflow-y-auto flex-1 min-h-0"
      >
        {hasMore && (
          <div ref={loadingRef} className="flex justify-center py-4">
            <LoadingChild isLoading={isLoadingChild} />
          </div>
        )}
        <Messages
          messages={messages?.messages}
          messagesEndRef={messagesEndRef}
          userIdLogin={userIdLogin}
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
