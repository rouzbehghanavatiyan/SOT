import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAppSelector } from "../../../hooks/reduxHookType";
import { userMessages } from "../../../services/nest";
import { useLocation } from "react-router-dom";
import LoadingChild from "../../../components/Loading/LoadingChild";

const Messages: React.FC<any> = ({ messagesEndRef }) => {
  const main = useAppSelector((state) => state?.main);
  const location = useLocation();
  const loadingRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const userReciver = Number(location?.search?.split("=")?.[1]);
  const userIdLogin = main?.userLogin?.user?.id;
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 10,
  });

  const fetchMessages = async (isInitial = false) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await userMessages(
        userIdLogin,
        userReciver,
        pagination.skip,
        pagination.take
      );

      if (response?.data) {
        const newMessages = response.data.reverse();

        if (newMessages.length === 0) {
          setHasMore(false);
        } else {
          setMessages((prev) =>
            isInitial ? newMessages : [...newMessages, ...prev]
          );
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // اسکرول به پایین هنگام لود اولیه
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (messagesEndRef?.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
    }, 100);
  }, [messagesEndRef]);

  useEffect(() => {
    if (userIdLogin && userReciver) {
      fetchMessages(true).then(() => {
        scrollToBottom();
      });
    }
  }, [userIdLogin, userReciver]);

  useEffect(() => {
    if (!hasMore || !loadingRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          setPagination((prev) => ({
            ...prev,
            skip: prev.skip + prev.take,
          }));
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (pagination.skip > 0) {
      fetchMessages();
    }
  }, [pagination]);
 
  return (
    <>
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center py-4">
          <LoadingChild isLoading={isLoading} />
        </div>
      )}
      {messages?.map((msg: any, index: number) => {
        const numberServerUserId = Number(msg?.recieveId);
        const displayTime = msg?.time?.slice(0, 5) || "";
        const isOwnMessage = userIdLogin === numberServerUserId;

        return (
          <div
            key={`${msg.id || index}_${msg.time}`}
            className={`flex w-full items-center mt-2 ${
              isOwnMessage ? "justify-start" : "justify-end"
            }`}
          >
            {isOwnMessage && (
              <img
                src={msg?.userProfile}
                className="w-8 h-8 rounded-full ms-2 flex-shrink-0"
                alt="profile"
              />
            )}

            <div
              className={`rounded-b-lg my-2 relative p-3 pb-6 max-w-[70%] min-w-[60px] ${
                isOwnMessage
                  ? "rounded-e-xl bg-green text-white ms-2"
                  : "rounded-s-xl border-l-orange-disabled border-[1px] bg-white me-2"
              }`}
            >
              <div className="flex flex-col">
                <span className="font18 break-words break-all whitespace-pre-wrap word-wrap overflow-wrap">
                  {msg?.title}
                </span>
                <span
                  className={`text-gray-200 absolute bottom-1 font9 ${
                    isOwnMessage ? "right-2" : "left-2"
                  }`}
                >
                  {displayTime}
                </span>
              </div>
            </div>

            {!isOwnMessage && (
              <img
                src={msg?.userProfile}
                className="w-8 h-8 rounded-full ms-2 flex-shrink-0"
                alt="profile"
              />
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};

export default Messages;
