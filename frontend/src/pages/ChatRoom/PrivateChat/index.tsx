import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../../components/Input";
import Stickers from "../../../components/Stickers";
import Messages from "../Messages";
import MoodIcon from "@mui/icons-material/Mood";
import { useAppSelector } from "../../../hooks/hook";
import { useLocation, useNavigate } from "react-router-dom";
import ImageRank from "../../../components/ImageRank";
import { sendNotify } from "../../../services/dotNet";

interface PrivateChatProps {
  socket: any;
  currentUser: {
    id: string;
    name: string;
  } | null;
  selectedUser: {
    id: string;
    name: string;
  };
}

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
}

const PrivateChat: React.FC<PrivateChatProps> = ({
  currentUser,
  selectedUser,
}) => {
  const { main } = useAppSelector((state) => state);
  const socket = main?.socketConfig;
  const titleInputRef = useRef();
  const location = useLocation();

  // Add safe destructuring with fallbacks
  const profile = location?.state?.userInfo?.profile || {};
  const { attachmentType = "", fileName = "", ext = "" } = profile;

  console.log(profile);
  const userInfo = location?.state?.userInfo || {};

  const { reciverUserName: reciverUserName = "", userId: reciveUserId = "" } =
    userInfo;

  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const getProfileImage =
    main?.profileImage?.[main?.profileImage?.length - 1] || {};
  const findImg = `${baseURL}/${getProfileImage?.attachmentType || ""}/${getProfileImage?.fileName || ""}${getProfileImage?.ext || ""}`;
  const reciverImg = `${baseURL}/${attachmentType}/${fileName}${ext}`;
  console.log(location?.state?.userInfo);
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handlePrivateMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendNotify(title, 14);
    console.log(res);
  };

  //  const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const date = new Date().toString();
  //   const timeString = date.split(" ")[4];
  //   console.log(e);

  //   const message = {
  //     userProfile: findImg,
  //     sender: main?.userLogin?.userId,
  //     recieveId: 1,
  //     text: title,
  //     recipient: reciveUserId,
  //     time: timeString,
  //     userNameSender: main?.userLogin?.userName,
  //   };

  //   console.log(message);
  //   socket.emit("send_message", message);
  //   setTitle("");
  //   titleInputRef.current.focus();
  // };

  const handleReciveMessage = (data: any) => {
    console.log(data);
    const fixServerUserId = Number(data?.userId);
    const reciveId = data?.recieverId;

    setMessages((prev: any) => [
      ...prev,
      {
        userProfile: data?.userProfile,
        recipient: data.recipient,
        sender: data.sender,
        title: data?.text,
        userId: fixServerUserId,
        username: data?.username,
        time: data?.time,
        recieverId: reciveId,
      },
    ]);
  };

  const handleEmojiSelect = (emoji: any) => {
    setTitle((prev) => prev + emoji.emoji);
    setShowStickers(false);
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", handleReciveMessage);
    socket.on(`private-message-${currentUser?.id}`, handlePrivateMessage);

    return () => {
      socket.off(`private-message-${currentUser?.id}`, handlePrivateMessage);
    };
  }, [socket, currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(reciverImg);

  return (
    <div className="flex flex-col h-[calc(100vh-50px)]">
      <div className="w-full bg-white border-b-[1px] border-gray-200 py-3 px-4 sticky top-0 z-10">
        <ImageRank
          className="w-80 h-80"
          imgSize={60}
          classUserName="text-black"
          userName={reciverUserName || "Unknown User"}
          imgSrc={reciverImg || "default-profile-image.png"}
        />
      </div>
      <div className="flex-1 overflow-hidden bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Messages messages={messages} messagesEndRef={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="w-full bg-white sticky border-t-[1px] border-gray-200 bottom-0 z-10 pb-2 px-3">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <div className="flex-1 mb-10">
              <Input
                ref={titleInputRef}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
                placeholder="Type your message..."
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowStickers(!showStickers)}
              className="p-2 flex text-gray-600 hover:text-gray-800 mb-9"
            >
              <MoodIcon className="col-span-1 cursor-pointer text-gray-900 font25" />
            </button>
            <button
              type="submit"
              className="text-blue-600 hover:text-blue-800 mb-9"
            >
              <SendIcon className="cursor-pointer col-span-1 text-gray-900 font25 justify-center items-center" />
            </button>
          </div>
        </form>
      </div>

      {showStickers && (
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowStickers(false)}
          ></div>
          <Stickers onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};

export default PrivateChat;
