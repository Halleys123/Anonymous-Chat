const express = require("express");
const app = express();

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.static("public"));

const io = require("socket.io")(server);

const users = new Set();

io.on("connection", (socket) => {
  console.log("a user connected :D", socket.id);
  users.add(socket.id);
  io.emit("users", users.size);

  socket.on("disconnect", () => {
    console.log("user disconnected :(", socket.id);
    users.delete(socket.id);
    io.emit("users", users.size);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message", data);
  });
});

// function onConnected(socketNum) {
// socketNum.on("message", (data) => {
//   console.log(data);
//   socket.broadcast.emit("message", data);
// });
// socketNum.on("Hello", (data) => {
//   console.log(data);
// });
// }
