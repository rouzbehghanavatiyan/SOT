import { useState, useRef } from "react";

export function useSendMessage(socket, userIdLogin, reciveUserId, userProfile, addMessage, scrollToBottom) {
  const [title, setTitle] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const timeString = new Date().toTimeString().slice(0, 5);

    const message = {
      userProfile,
      sender: userIdLogin,
      recieveId: reciveUserId,
      title: title.trim(),
      time: timeString
    };

    socket?.emit("send_message", message);
    addMessage(message);

    setTitle("");
    titleInputRef.current?.focus();
    scrollToBottom();
  };

  return {
    title,
    setTitle,
    sendMessage,
    titleInputRef
  };
}
