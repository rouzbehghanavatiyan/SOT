import React from "react";
import { useAppSelector } from "../../../hooks/hook";

const Messages: React.FC = ({ messages, messagesEndRef }) => {
  const { main } = useAppSelector((state) => state);
  const numberUserId = Number(main?.userLogin?.userId);

  return (
    <>
      {messages?.map((msg: any, index: number) => {
        const numberServerUserId = Number(msg?.userId);
        const displayTime = msg?.time.slice(0, 5);

        return (
          <div
            ref={messagesEndRef}
            key={index}
            className={`flex w-100 align-center mt-2 justify-${
              numberUserId === numberServerUserId ? "start" : "end"
            }`}
          >
            {numberUserId === numberServerUserId && (
              <span className="text-secondary font-bold mx-1">
                {msg?.username}
              </span>
            )}
            {numberUserId === numberServerUserId && (
              <div
                className={`rounded-xl my-2 p-3 ${
                  numberUserId === numberServerUserId
                    ? "bg-mainGray-dark"
                    : "border-orange-hover bg-white"
                } `}
                style={{
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                <div className="flex justify-between">
                  <span className="ms-2">{msg?.title}</span>
                </div>
              </div>
            )}
            {numberUserId === numberServerUserId && (
              <span className="text-secondary font-light font13 mx-2">
                {msg?.time}
              </span>
            )}
            {numberUserId !== numberServerUserId && (
              <div
                className={`rounded-s-xl rounded-b-lg my-2 relative p-3 ${
                  numberUserId === numberServerUserId
                    ? "bg-orange"
                    : "border-orange-disabled border-[1px] bg-white"
                }`}
                style={{
                  maxWidth: "50%",
                  wordWrap: "break-word",
                }}
              >
                <div className="flex mb-4  justify-between">
                  {numberUserId !== numberServerUserId && (
                    <span className="text-gray-200 left-1 bottom-1 absolute font9">
                      {displayTime}
                    </span>
                  )}
                  <span className="ms-2">{msg?.title}</span>
                </div>
              </div>
            )}

            {
              <span>
                <img
                  src={msg?.userProfile}
                  className="w-8 ms-2 h-8 rounded-full"
                />
              </span>
            }

            {numberUserId !== numberServerUserId && (
              <div className="flex fw-thin font10 justify-center align-center text-secondary">
                <div className="gap-2">
                  <i className="font35" />
                  <span className="">{msg?.username}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Messages;
