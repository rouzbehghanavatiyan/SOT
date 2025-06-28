import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../../components/Input";
import Stickers from "../../../components/Stickers";
import Messages from "../Messages";
import MoodIcon from "@mui/icons-material/Mood";
import { useAppSelector } from "../../../hooks/hook";

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
  socket,
  currentUser,
  selectedUser,
}) => {
  const { main } = useAppSelector((state) => state);
  const titleInputRef = useRef();
  const baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;
  const getProfileImage = main?.profileImage?.[main?.profileImage?.length - 1];
  const findImg = `${baseURL}/${getProfileImage?.attachmentType}/${getProfileImage?.fileName}${getProfileImage?.ext}`;

  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handlePrivateMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toString();
    const timeString = date.split(" ")[4];
    console.log(e);

    const message = {
      userProfile: findImg,
      sender: main?.userLogin?.userId,
      recieveId: 1,
      text: title,
      recipient: selectedUser.id,
      time: timeString,
    };

    console.log(message);
    socket.emit("send_message", message);
    setTitle("");
    titleInputRef.current.focus();
  };

  const handleReciveMessage = (data: any) => {
    console.log(data);
    const fixUserId = Number(main?.userLogin?.userId);
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

  return (
    <div className="grid grid-cols-1">
      <div className="w-full">
        <div className="overflow-y-auto sm:mt-52 md:mt-10 lg:mt-10 mt-3 mx-2  h-[calc(100vh-9rem)] bg-gray-50">
          <Messages messages={messages} />
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form className="justify-center grid grid-cols-1 bg-white z-50 items-center align-middle col-span-6 relative">
        <div className="grid grid-cols-8 justify-center shadow-card bg-white">
          <div className="col-span-6 justify-center items-center gap-3 p-2">
            <Input
              ref={titleInputRef}
              className="ms-1 rounded-lg text-gray-900"
              placeholder="message . . ."
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </div>
          <span className="flex justify-center items-center">
            <MoodIcon
              onClick={() => setShowStickers(!showStickers)}
              className="col-span-1 cursor-pointer text-gray-900 font25"
            />
          </span>
          <span className="flex justify-center items-center">
            <SendIcon
              onClick={handleSendMessage}
              className="cursor-pointer col-span-1 text-gray-900 font25 justify-center items-center"
            />
          </span>
        </div>
      </form>
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
