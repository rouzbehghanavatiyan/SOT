import React, { useState } from "react";
import Chat from "./Fields";
import Messages from "./Messages";
import { io } from "socket.io-client";
import Room from "./Room";
import Fields from "./Fields";

const ChatRoom: React.FC = () => {
  const socket = io(import.meta.env.VITE_NODE_SOCKET);
  const [userInfo, setUserInfo] = useState({});

  return (
    <>
      <p className="w-full font15 font-bold bg-white flex justify-between border-b-2 px-3 py-3">
        <span className="text-white">Chat</span>
      </p>
      <div className="flex flex-row mx-1 pb-3">
        {/* <Messages userInfo={userInfo} socket={socket} /> */}
        <Room socket={socket} />
        <Fields />
      </div>
      {/* <div className="w-screen h-screen flex justify-center items-center">
        <span className="text-gray-200 font40 font-bold select-none">
          Empay messages
        </span>
      </div> */}
    </>
  );
};

export default ChatRoom;
