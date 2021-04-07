import './App.css';
import Board from '../board';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4001/";
const io = require("socket.io-client");

// const socket = io(ENDPOINT, {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });

function App() {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);
  //home page with create "room" button
  //then whiteboard page with toolbar on left, no header? 
  //path will be randomized string of 8 digits to make unique
  //make share link button? would pop up with shareable link, copy button, and an x to close (click off too) - add with portal after 
  //features: clear all, increase size of pen, z
  return (
    <div className="App">
      {/* <Board /> */}
      <p>
      It's <time dateTime={response}>{response}</time>
    </p>
    </div>
  );
}

export default App;
