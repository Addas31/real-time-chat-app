const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// test route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let messageHistory = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("messageHistory", messageHistory);

  socket.on("sendMessage", (data) => {
    messageHistory.push(data);
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
