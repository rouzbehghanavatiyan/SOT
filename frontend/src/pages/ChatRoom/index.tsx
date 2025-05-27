// src/components/ChatRoom.tsx
import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import UserList from "./UserList";
import PrivateChat from "./PrivateChat";
import { useAppSelector } from "../../hooks/hook";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

const ChatRoom: React.FC = () => {
  const { main } = useAppSelector((state) => state);
  const newSocket = io(import.meta.env.VITE_NODE_SOCKET);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setSocket(newSocket);
    newSocket.on("users", (usersList: User[]) => {
      setUsers(usersList);
    });
  }, []);

  const handleGiveUsersOnline = (data) => {
    console.log("Helllllllllllll", data);
    // setUsers(usersList);
  };

  console.log("main?.userOnlines", main?.userOnlines);

  return (
    <div>
      <div className="w-full absolute top-0 bg-white border-gray-200">
        <div className="p-4 border-b border-gray-200">User online</div>
        <UserList
          users={users}
          currentUser={currentUser}
          onSelectUser={setSelectedUser}
        />
      </div>
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <PrivateChat
            socket={socket}
            currentUser={currentUser}
            selectedUser={{ id: 3212, name: "test" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Empty messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
