import React from "react";
import LoadingChild from "../../../components/Loading/LoadingChild";

interface Message {
  id?: number;
  userProfile: string;
  sender: number;
  recieveId: number;
  title: string;
  time: string;
  userNameSender?: string;
}

interface MessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  userIdLogin: number;
  isLoading?: boolean;
}

const Messages: React.FC<MessagesProps> = ({
  messages,
  messagesEndRef,
  userIdLogin,
  isLoading = false,
}) => {
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingChild isLoading={true} />
      </div>
    );
  }

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex justify-center items-center h-32 text-gray-500">
        There are no messages
      </div>
    );
  }

  return (
    <>
      {messages?.map((msg: Message, index: number) => {
        const displayTime = msg?.time?.slice(0, 5) || "";
        const isOwnMessage = userIdLogin === msg.sender;
        return (
          <div
            key={`${msg.id || index}_${msg.time}`}
            className={`flex  w-full items-center mt-2 ${
              isOwnMessage ? "justify-end" : "justify-start"
            }`}
          >
            {!isOwnMessage && (
              <img
                src={msg?.userProfile}
                className="w-8 h-8  rounded-full me-2 flex-shrink-0"
                alt="profile"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.png";
                }}
              />
            )}
            <div
              className={`rounded-b-lg  my-2 relative p-3 pb-6 max-w-[70%] min-w-[60px] ${
                isOwnMessage
                  ? "rounded-s-xl bg-white border text-gray-900 me-2"
                  : "rounded-e-xl border   text-gray-900 bg-orange-disabled  ms-2"
              }`}
            >
              <div className="flex flex-col">
                <span className="break-words whitespace-pre-wrap overflow-wrap">
                  {msg?.title}
                </span>
                <span
                  className={`text-gray-200 font10 absolute bottom-1 ${
                    isOwnMessage ? "left-2" : "right-2"
                  }`}
                >
                  {displayTime}
                </span>
              </div>
            </div>

            {isOwnMessage && (
              <img
                src={msg?.userProfile}
                className="w-8 h-8 rounded-full  ms-2 flex-shrink-0"
                alt="profile"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-avatar.png";
                }}
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
