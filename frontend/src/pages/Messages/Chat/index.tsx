import { Box } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Input from "../../../components/Input";
import { Button } from "../../../components/Button";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
const Chat: React.FC = () => {
  const socket = io("http://localhost:4000"); // آدرس سرور Socket.IO

  const [messages, setMessages] = useState<{ title: string; from: string }[]>(
    []
  );
  const [title, setTitle] = useState<string>("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    // ثبت listener برای دریافت پیام
    const handleReceiveMessage = (data: any) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { title: data.title, from: "friend" },
      ]);
    };

    socket.on("receive_Message", handleReceiveMessage);

    // cleanup function to remove listener
    return () => {
      socket.off("receive_Message", handleReceiveMessage);
    };
  }, [socket]);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_Room", room);
    }
  };

  const sendMessage = () => {
    if (!!title) {
      socket.emit("send_Message", { title, room });
      setMessages((prevMessages) => [...prevMessages, { title, from: "me" }]); // پیام خود را به آرایه اضافه کن
      setTitle("");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        p: 1,
        m: 1,
        display: "flex",
      }}
    >
      <div className="">
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              backgroundColor: msg.from === "me" ? "lightgreen" : "lightblue", // رنگ بر اساس فرستنده
              padding: "10px",
              margin: "5px 0",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
            }}
          >
            {msg.title}
          </div>
        ))}
      </div>
      {/* <div className="absolute bottom-0">
        <Input
          // value={room}
          onChange={() => {}}
          placeholder="Type a room..."
        />
        <Button
          label="Join Room"
          variant="default"
          className="text-gray-800 my-2"
          onClick={joinRoom}
        />
      </div> */}
      <div className="absolute w-96 flex  bottom-0">
        <Input
          className="min-w-72"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="Type a room..."
        />
        <SentimentSatisfiedAltIcon className="text-gray-800 ms-5 mt-3 cursor-pointer" />
        <SendIcon
          className="text-gray-800 ms-5 mt-3 cursor-pointer"
          onClick={sendMessage}
        />
      </div>
      {/* <div>
        <input value={title} placeholder="Type a message..." />
      </div> */}
    </Box>
  );
};

export default Chat;
