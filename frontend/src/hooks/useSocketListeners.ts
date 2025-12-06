import { useEffect } from "react";

export function useSocketListener(socket, handler, userIdLogin, reciveUserId, messages) {
  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler);

      if (reciveUserId && messages.length > 0) {
        localStorage.setItem(`message_read_${reciveUserId}`, "true");

        socket.emit("mark_messages_as_read", {
          sender: reciveUserId,
          receiver: userIdLogin,
        });
      }
    };
  }, [socket, handler, reciveUserId, userIdLogin, messages]);
}
