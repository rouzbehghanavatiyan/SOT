import { Server } from "socket.io";
import { postMessagesService } from "../../services/Chats";

const socketController = (server: any) => {
  let onlineUsers: any = [];
  let isMessageSend = false;
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    try {
      socket.on("join_home", (userId) => {
        if (!onlineUsers.includes(userId)) {
          onlineUsers.push(userId);
        }
        io.emit("update_online_users", onlineUsers);
        console.log("update_online_users", onlineUsers);

        socket.on("disconnect", () => {
          onlineUsers = onlineUsers.filter((user: any) => user !== userId);
          io.emit("update_online_users", onlineUsers);
          console.log("offline users:", onlineUsers);
        });
      });
      socket.on("join_room_id", (roomId) => {
        console.log(`User joined room ${roomId}`);
        socket.join(roomId);
      });

      socket.on("add_group", async (data) => {
        console.log("add_group", data);
        socket.emit("recieve_group", {
          userId: data?.userId,
          groupName: data?.groupName,
        });
      });

      socket.on("send_message", async (msgData) => {
        const savedMessages = await postMessagesService(msgData);
        socket.broadcast.emit("receive_message", {
          id: savedMessages[0].id,
          userId: msgData.userId,
          time: msgData.time,
          username: msgData.username,
          message: msgData.title,
          recieverId: msgData.recieverId,
          roomId: Number(msgData.roomId),
        });
        socket.emit("receive_message", {
          id: savedMessages[0].id,
          userId: msgData.userId,
          time: msgData.time,
          username: msgData.username,
          message: msgData.title,
          recieverId: msgData.recieverId,
          roomId: Number(msgData.roomId),
        });
      });
      socket.on("attach_file", (data) => {
        console.log("attach_file", data);
      });
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
    // socket.on("request_chat_history", async () => {
    //   const fixId = MsgData.userId;

    //   const chatHistory = await getMessagesService();
    //   socket.emit("chat_history", chatHistory);
    // });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  return io;
};

export default socketController;
