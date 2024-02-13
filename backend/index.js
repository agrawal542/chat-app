import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});


const port = process.env.PORT || 4000 


const app = express();
const server = createServer(app);

const io = new Server(server,{
    cors: {
        origin: "*",
      }
});


io.on('connection', (socket) => {
    socket.on('chat', (payload) => {
        io.emit("chat",payload)
    });
});
  
  
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});