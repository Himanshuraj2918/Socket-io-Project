import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { log } from "console";
const port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello server check");
});

io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);
  // socket.emit("welcome",`Welcome to the server, ${socket.id}`)
  // socket.broadcast.emit("welcome",` ${socket.id} joined the server`)

  socket.on("message",(data)=>{
    console.log(data);
    const id = socket.id;
    // socket.broadcast.emit("received-message",data,id)
    io.to(data.room).emit("received-message",data.message,id)
    
  })
  socket.on("disconnect",()=>{
    console.log("User disconnected", socket.id);
    
  })
});

server.listen(port, () => {
  console.log("Server Started....");
});
