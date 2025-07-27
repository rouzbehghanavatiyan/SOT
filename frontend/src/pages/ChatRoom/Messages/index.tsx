import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hook";
import { userMessages } from "../../../services/nest";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/Loading";

const Messages: React.FC<any> = ({ messages, setMessages, messagesEndRef }) => {
  const main = useAppSelector((state) => state?.main);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userReciver = Number(location?.search?.split("=")?.[1]);

  const userIdLogin = main?.userLogin?.user?.id;

  const handleGetMessages = async () => {
    setIsLoading(true);
    const res = await userMessages(userIdLogin, userReciver);
    setIsLoading(false);

    setMessages(res?.data?.data);
  };

  useEffect(() => {
    if (!!userIdLogin && !!userReciver) handleGetMessages();
  }, [userIdLogin, userReciver]);

  console.log(messages);

  return (
    <>
      {isLoading && <Loading isLoading={isLoading} />}
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
              ref={messagesEndRef}
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
                      <span className="text-gray-200 left-1 bottom-1 absolute font9">
                        {displayTime}
                      </span>
                    )}
                    <span className="ms-2 font18">{msg?.title}</span>
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
