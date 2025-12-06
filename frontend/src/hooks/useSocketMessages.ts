// hooks/useSocketMessages.ts
import { useEffect } from "react";

interface MessageType {
  id?: number;
  userProfile: string;
  sender: number;
  recieveId: number;
  title: string;
  time: string;
  userNameSender?: string;
}

interface UseSocketMessagesProps {
  socket: any;
  userIdLogin: number;
  reciveUserId: number;
  onMessageReceived: (message: MessageType) => void;
}

export const useSocketMessages = ({
  socket,
  userIdLogin,
  reciveUserId,
  onMessageReceived,
}: UseSocketMessagesProps): void => {
  useEffect(() => {
    if (!socket || !userIdLogin) return;

    const handleReceiveMessage = (data: MessageType) => {
      const isRelevantMessage = 
        (data.sender === userIdLogin && data.recieveId === reciveUserId) ||
        (data.recieveId === userIdLogin && data.sender === reciveUserId);

      if (isRelevantMessage) {
        onMessageReceived(data);
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      
      if (reciveUserId && userIdLogin) {
        localStorage.setItem(`message_read_${reciveUserId}`, "true");
        socket.emit("mark_messages_as_read", {
          sender: reciveUserId,
          receiver: userIdLogin,
        });
      }
    };
  }, [socket, userIdLogin, reciveUserId, onMessageReceived]);
};