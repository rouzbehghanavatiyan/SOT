// Messages.tsx
import React from "react";
import LoadingChild from "../../../components/Loading/LoadingChild";
import ImageRank from "../../../components/ImageRank";
import { useAppSelector } from "../../../hooks/reduxHookType";
import StringHelpers from "../../../utils/helpers/StringHelper";

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
  const safeMessages = Array.isArray(messages) ? messages : [];
  const main = useAppSelector((state) => state.main);
  const getProfileImage = main?.userLogin?.profile;
  const findImg = StringHelpers.getProfile(getProfileImage);

  if (isLoading && safeMessages.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingChild isLoading={true} />
      </div>
    );
  }

  if (safeMessages.length === 0 && !isLoading) {
    return (
      <div className="flex justify-center items-center h-32 text-gray-500">
        There are no messages
      </div>
    );
  }

  return (
    <>
      {safeMessages.map((msg: Message, index: number) => {
        const displayTime = msg?.time?.slice(0, 5) || "";
        const isOwnMessage = userIdLogin === msg.sender;
        return (
          <div
            key={`${msg.id || index}_${msg.time}`}
            className={`flex w-full items-start ${
              isOwnMessage ? "justify-end" : "justify-start"
            }`}
          >
            {!isOwnMessage && (
              <ImageRank imgSrc={msg?.userProfile} imgSize={35} />
            )}
            <div
              className={`rounded-b-lg my-2 relative p-3 pb-6 max-w-[70%] min-w-[60px] ${
                isOwnMessage
                  ? "rounded-s-xl bg-white border text-gray-900"
                  : "rounded-e-xl border text-gray-900 bg-orange-disabled"
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
              <ImageRank imgSrc={msg?.userProfile || findImg} imgSize={35} />
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};

export default Messages;
