const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_Room", (data) => {
    socket.join(data);
  });

  socket.on("send_Message", (data) => {
    socket.to(data.room).emit("receive_Message", data);
    socket.broadcast.emit("receive_Message", data);
  });
});

server.listen(4000, () => console.log("server is running on port", 4000));
