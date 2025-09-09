import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHookType";
import { userMessages } from "../../../services/nest";
import { useLocation } from "react-router-dom";
import LoadingChild from "../../../components/Loading/LoadingChild";
import useScrollControl from "../../../hooks/useScrollController";

const Messages: React.FC<any> = () => {
  const main = useAppSelector((state) => state?.main);
  const location = useLocation();
  const loadingRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);
  const userReciver = Number(location?.search?.split("=")?.[1]);
  const userIdLogin = main?.userLogin?.user?.id;
  const [pagination, setPagination] = useState({
    skip: 0,
    take: 10,
  });
  const messagesEndRef = useScrollControl(pagination.skip === 0);

  const fetchMessages = async () => {
    try {
      const response = await userMessages(
        userIdLogin,
        userReciver,
        pagination.skip,
        pagination.take
      );
      setMessages((prev) => [...response?.data.reverse(), ...prev]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (userIdLogin) {
      fetchMessages();
    }
  }, [userIdLogin]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPagination((prev) => ({
            ...prev,
            skip: prev.skip + prev.take,
          }));
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
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
  }, [loadingRef]);

  useEffect(() => {
    fetchMessages();
  }, [pagination]);

  return (
    <>
      <div ref={messagesEndRef}>
        {true && <LoadingChild isLoading={true} ref={loadingRef} />}
      </div>
      {messages
        ?.filter(
          (item: any) =>
            item?.sender === userIdLogin ||
            (item?.recieveId === userIdLogin && item?.sender === userReciver)
        )
        ?.map((msg: any, index: number) => {
          const numberServerUserId = Number(msg?.recieveId);
          const displayTime = msg?.time.slice(0, 5);
          return (
            <div
              key={index}
              className={`flex w-100 align-center mt-2 justify-${
                userIdLogin === numberServerUserId ? "start" : "end"
              }`}
            >
              {userIdLogin === numberServerUserId && (
                <span>
                  <img
                    src={msg?.userProfile}
                    className="w-8 ms-2 h-8 rounded-full"
                  />
                </span>
              )}
              {userIdLogin === numberServerUserId && (
                <div
                  className={`rounded-e-xl container_message rounded-b-lg my-2 ms-2 relative p-3 ${
                    userIdLogin === numberServerUserId
                      ? " bg-green text-white  "
                      : "  bg-white"
                  }`}
                >
                  <div className="flex mb-4  justify-between">
                    {userIdLogin === numberServerUserId && (
                      <span className="text-gray-200 right-1 bottom-1 absolute font9">
                        {displayTime}
                      </span>
                    )}
                    <span className="ms-2 font18">{msg?.title}</span>
                  </div>
                </div>
              )}

              {userIdLogin !== numberServerUserId && (
                <div
                  className={`rounded-s-xl container_message rounded-b-lg my-2 relative p-3 ${
                    userIdLogin === numberServerUserId
                      ? " "
                      : "border-l-orange-disabled border-[1px] bg-white"
                  }`}
                >
                  <div className="flex mb-4   justify-between">
                    {userIdLogin !== numberServerUserId && (
                      <span className="text-gray-200  left-1 bottom-1 absolute font9">
                        {displayTime}
                      </span>
                    )}
                    <span className="ms-2 font18 breakWords max-w-[50%]">
                      {msg?.title}
                    </span>
                  </div>
                </div>
              )}
              {userIdLogin !== numberServerUserId && (
                <span>
                  <img
                    src={msg?.userProfile}
                    className="w-8 ms-2 h-8 rounded-full"
                  />
                </span>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Messages;
