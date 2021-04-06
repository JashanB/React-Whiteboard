// const express = require('express');
// const app = express();
// const socketIo = require("socket.io");

// const http = require("http");
// const port = process.env.PORT || 4001;
// const index = require("../public/index");
// const app = express();

// app.use(index);
// const server = http.createServer(app);
// const io = socketIo(server);
// // const server = http.createServer(app);
// // const socket = require('socket.io');
// // const io = require('socket.io')(http);
// io.on('connection', onConnection);


// // const port = 8080;
// // server.listen(port, () => console.log(`server is running on port ${port}`));
// http.listen(3001, () => {
//   console.log('listening on *:3000');
// });

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const server = http.createServer(app);

const io = socketIo(server);

// let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  // if (interval) {
  //   clearInterval(interval);
  // }
  socket.on('drawing', getApiAndEmit(socket));
  // interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  console.log('triggered')
  // console.log({socket})
  socket.on('drawing', (data) => socket.emit('drawing', data));
};

server.listen(port, () => console.log(`Listening on port ${port}`));
