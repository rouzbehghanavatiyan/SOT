import React from "react";
import { useAppSelector } from "../../../hooks/hook";

const Messages: React.FC = ({ messages, messagesEndRef }) => {
  const { main } = useAppSelector((state) => state);
  const numberUserId = Number(main?.userLogin?.userId);

  return (
    <>
      {messages?.map((msg: any, index: number) => {
        const numberServerUserId = Number(msg?.userId);
        return (
          <div
            ref={messagesEndRef}
            key={index}
            className={`flex w-100 align-center justify-${
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
                    : "bg-orange-ghost"
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
              <span className="text-secondary font-light font13 mx-2">
                {msg?.time}
              </span>
            )}
            {numberUserId !== numberServerUserId && (
              <div
                className={`rounded-xl my-2 p-3 ${
                  numberUserId === numberServerUserId ? "bg-orange" : "bg-pink"
                }`}
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
