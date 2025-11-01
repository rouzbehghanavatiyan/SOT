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
import { userMessages } from "../../../services/nest";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 10,
  });
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);

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

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev: string) => prev + emoji.emoji);
    setShowStickers(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toString();
    const timeString = date.split(" ")[4];
    
    if (title.trim() !== "") {
      const message: MessageType = {
        userProfile: findImg,
        sender: main?.userLogin?.user?.id,
        recieveId: reciveUserId,
        title: title.trim(),
        time: timeString,
        userNameSender: main?.userLogin?.userName,
      };
      
      socket?.emit("send_message", message);
      setTitle("");
    }
    titleInputRef.current?.focus();
  };

  const handleReciveMessage = useCallback((data: MessageType) => {
    console.log("Received message:", data);
    setMessages((prev: MessageType[]) => [
      ...prev,
      {
        userProfile: data?.userProfile,
        sender: data.sender,
        title: data?.title,
        time: data?.time,
        recieveId: data?.recieveId,
        id: data?.id,
      },
    ]);
  }, []);

  const handleGetMessages = async (isLoadMore: boolean = false) => {
    try {
      setIsLoadingChild(true);
      const res = await userMessages(
        userIdLogin,
        userReciver,
        pagination.skip,
        pagination.take
      );
      
      setIsLoadingChild(false);
      
      if (isLoadMore) {
        setMessages((prev) => [...res?.data?.data, ...prev]);
      } else {
        setMessages(res?.data?.data || []);
      }
      
      // بررسی آیا پیام بیشتری برای لود کردن وجود دارد
      setHasMore(res?.data?.data?.length === pagination.take);
      
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsLoadingChild(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoadingChild) return;
    
    setPagination((prev) => ({
      ...prev,
      skip: prev.skip + prev.take,
    }));
  }, [hasMore, isLoadingChild]);

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
  }, [socket, handleReciveMessage]);

  useEffect(() => {
    if (messages.length > 0 && !hasScrolled) {
      scrollToBottom();
      setHasScrolled(true);
    } else if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === userIdLogin || lastMessage.recieveId === userIdLogin) {
        scrollToBottom();
      }
    }
  }, [messages, scrollToBottom, hasScrolled, userIdLogin]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollToBottom]);

  useEffect(() => {
    if (reciveUserId && messages.length > 0) {
      localStorage.setItem(`message_read_${reciveUserId}`, "true");
      socket?.emit("mark_messages_as_read", {
        sender: reciveUserId,
        receiver: userIdLogin,
      });
    }
  }, [reciveUserId, socket, userIdLogin, messages]);

  useEffect(() => {
    handleGetMessages(false);
  }, [userReciver, userIdLogin]);

  useEffect(() => {
    if (pagination.skip > 0) {
      handleGetMessages(true);
    }
  }, [pagination.skip]);

  useEffect(() => {
    if (!hasMore || !loadingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoadingChild) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, isLoadingChild, handleLoadMore]);

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
        {hasMore && (
          <div ref={loadingRef} className="flex justify-center py-4">
            <LoadingChild isLoading={isLoadingChild} />
          </div>
        )}
        
        <Messages
          messages={messages}
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