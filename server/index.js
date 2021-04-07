const express = require("express");
// const http = require("http");
const httpServer = require("http").createServer();
const cors = require('cors')
const app = express();

app.use(cors())

// const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

// app.use(index);

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// const server = http.createServer(app);

// const io = socketIo(server);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   socket.on('drawing', getApiAndEmit(socket));
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
// const getApiAndEmit = socket => {
//   console.log('triggered')
//   // console.log({socket})
//   // socket.on('drawing', (data) => socket.emit('drawing', data));
// };

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
