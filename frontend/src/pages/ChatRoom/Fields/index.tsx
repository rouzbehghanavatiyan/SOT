import { Box } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Input from "../../../components/Input";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
const nodeIp = import.meta.env.VITE_NODE_IP;

const Fields: React.FC = () => {
  const socket = io(nodeIp);
  const [title, setTitle] = useState<string>("");
  const [messages, setMessages] = useState<{ title: string; from: string }[]>(
    []
  );

  const handleReceiveMessage = (data: any) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { title: data.title, from: "friend" },
    ]);
  };

  useEffect(() => {
    socket.on("receive_Message", handleReceiveMessage);
    return () => {
      socket.off("receive_Message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div className="w-full bg-blue">
      <SentimentSatisfiedAltIcon className="text-gray-800 me-5 mt-3 cursor-pointer" />
      <Input
        className="min-w-72"
        value={title}
        onChange={(e: any) => setTitle(e.target.value)}
        placeholder="Type a room..."
      />
      <KeyboardVoiceIcon className="text-gray-800 ms-5 mt-3 cursor-pointer" />
      <AttachFileIcon className="text-gray-800 ms-5 mt-3 cursor-pointer" />
      <SendIcon
        className="text-gray-800 mx-5 mt-3 cursor-pointer"
        // onClick={sendMessage}
      />
    </div>
  );
};

export default Fields;
